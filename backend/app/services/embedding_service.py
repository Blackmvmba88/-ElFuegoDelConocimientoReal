"""
Vector embeddings service for semantic search.
Uses sentence-transformers for generating embeddings and Qdrant for storage.
"""
from typing import List, Optional, Dict, Any
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct, Filter, FieldCondition, MatchValue
import uuid

from app.core.config import settings


class EmbeddingService:
    """Service for generating and managing text embeddings."""
    
    def __init__(self):
        self.model = None
        self.client = None
        self.collection_name = settings.qdrant_collection_name
        self._initialized = False
    
    def _initialize(self) -> None:
        """Lazy initialization of the embedding service."""
        if self._initialized:
            return
        
        try:
            self.model = SentenceTransformer(settings.embedding_model)
            self.client = QdrantClient(
                host=settings.qdrant_host,
                port=settings.qdrant_port,
            )
            self._ensure_collection()
            self._initialized = True
        except Exception as e:
            print(f"Warning: Failed to initialize embedding service: {e}")
            print("Embedding features will be disabled")
    
    def _ensure_collection(self) -> None:
        """Ensure the Qdrant collection exists."""
        if not self.client:
            return
        
        try:
            collections = self.client.get_collections()
            collection_names = [col.name for col in collections.collections]
            
            if self.collection_name not in collection_names:
                self.client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(
                        size=settings.embedding_dimension,
                        distance=Distance.COSINE,
                    ),
                )
        except Exception as e:
            print(f"Warning: Failed to ensure collection: {e}")
    
    def generate_embedding(self, text: str) -> List[float]:
        """
        Generate embedding vector for a text.
        
        Args:
            text: Input text to embed
            
        Returns:
            List of floats representing the embedding vector
        """
        self._initialize()
        if not self.model:
            raise RuntimeError("Embedding service not initialized - model not available")
        
        embedding = self.model.encode(text, convert_to_numpy=True)
        return embedding.tolist()
    
    def store_embedding(
        self,
        text: str,
        metadata: Dict[str, Any],
        embedding_id: Optional[str] = None,
    ) -> str:
        """
        Generate and store embedding in Qdrant.
        
        Args:
            text: Text to embed and store
            metadata: Additional metadata to store with the embedding
            embedding_id: Optional custom ID, otherwise generates UUID
            
        Returns:
            The ID of the stored embedding
        """
        if embedding_id is None:
            embedding_id = str(uuid.uuid4())
        
        embedding = self.generate_embedding(text)
        
        point = PointStruct(
            id=embedding_id,
            vector=embedding,
            payload={
                "text": text,
                **metadata,
            },
        )
        
        self.client.upsert(
            collection_name=self.collection_name,
            points=[point],
        )
        
        return embedding_id
    
    def search_similar(
        self,
        query: str,
        limit: int = 10,
        filters: Optional[Dict[str, Any]] = None,
    ) -> List[Dict[str, Any]]:
        """
        Search for similar texts using semantic similarity.
        
        Args:
            query: Search query text
            limit: Maximum number of results
            filters: Optional filters for metadata
            
        Returns:
            List of search results with scores and metadata
        """
        query_embedding = self.generate_embedding(query)
        
        # Build Qdrant filter if provided
        qdrant_filter = None
        if filters:
            conditions = []
            for key, value in filters.items():
                conditions.append(
                    FieldCondition(
                        key=key,
                        match=MatchValue(value=value),
                    )
                )
            if conditions:
                qdrant_filter = Filter(must=conditions)
        
        results = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_embedding,
            limit=limit,
            query_filter=qdrant_filter,
        )
        
        return [
            {
                "id": result.id,
                "score": result.score,
                "metadata": result.payload,
            }
            for result in results
        ]
    
    def delete_embedding(self, embedding_id: str) -> None:
        """Delete an embedding from Qdrant."""
        self.client.delete(
            collection_name=self.collection_name,
            points_selector=[embedding_id],
        )
    
    def update_embedding(
        self,
        embedding_id: str,
        text: str,
        metadata: Dict[str, Any],
    ) -> None:
        """Update an existing embedding."""
        self.store_embedding(text, metadata, embedding_id)


# Global instance
_embedding_service: Optional[EmbeddingService] = None


def get_embedding_service() -> EmbeddingService:
    """Get or create the global embedding service instance."""
    global _embedding_service
    if _embedding_service is None:
        _embedding_service = EmbeddingService()
    return _embedding_service
