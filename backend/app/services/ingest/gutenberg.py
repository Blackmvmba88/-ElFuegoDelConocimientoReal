"""
Book ingestion service for importing books from external sources.
"""
from typing import Optional, List, Dict, Any
import httpx
from sqlalchemy.orm import Session

from app.models.models import Book
from app.services.embedding_service import get_embedding_service
from app.services.semantic_analysis.analyzer import get_semantic_analyzer


class BookIngestService:
    """Service for ingesting books from external sources."""

    GUTENBERG_API_BASE = "https://gutendex.com"

    def __init__(self):
        self.embedding_service = get_embedding_service()
        self.semantic_analyzer = get_semantic_analyzer()

    async def search_gutenberg(
        self,
        query: str,
        limit: int = 10,
    ) -> List[Dict[str, Any]]:
        """
        Search Project Gutenberg for books.

        Args:
            query: Search query
            limit: Maximum number of results

        Returns:
            List of book metadata from Gutenberg
        """
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.GUTENBERG_API_BASE}/books",
                params={
                    "search": query,
                    "page": 1,
                },
                timeout=30.0,
            )
            response.raise_for_status()
            data = response.json()

            return data.get("results", [])[:limit]

    async def fetch_book_text(
        self,
        gutenberg_id: int,
    ) -> Optional[str]:
        """
        Fetch full text of a book from Gutenberg.

        Args:
            gutenberg_id: Gutenberg book ID

        Returns:
            Full text content or None if not available
        """
        # Try to fetch from Gutenberg's text format
        text_url = f"https://www.gutenberg.org/files/{gutenberg_id}/{gutenberg_id}-0.txt"

        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(text_url, timeout=60.0)
                if response.status_code == 200:
                    return response.text
            except Exception:
                pass

            # Try alternative format
            alt_url = f"https://www.gutenberg.org/cache/epub/{gutenberg_id}/pg{gutenberg_id}.txt"
            try:
                response = await client.get(alt_url, timeout=60.0)
                if response.status_code == 200:
                    return response.text
            except Exception:
                pass

        return None

    async def ingest_book_from_gutenberg(
        self,
        gutenberg_id: int,
        db: Session,
    ) -> Optional[Book]:
        """
        Ingest a book from Project Gutenberg into the database.

        Args:
            gutenberg_id: Gutenberg book ID
            db: Database session

        Returns:
            Created Book object or None if failed
        """
        # Check if book already exists
        existing_book = (
            db.query(Book)
            .filter(
                Book.source == "gutenberg",
                Book.source_id == str(gutenberg_id),
            )
            .first()
        )

        if existing_book:
            return existing_book

        # Fetch book metadata
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.GUTENBERG_API_BASE}/books/{gutenberg_id}",
                timeout=30.0,
            )

            if response.status_code != 200:
                return None

            metadata = response.json()

        # Fetch book content
        content = await self.fetch_book_text(gutenberg_id)

        if not content:
            # If we can't get content, still store metadata
            content = metadata.get("description", "")

        # Extract metadata
        title = metadata.get("title", "Unknown Title")
        authors = metadata.get("authors", [])
        author = authors[0]["name"] if authors else "Unknown Author"
        languages = metadata.get("languages", [])
        language = languages[0] if languages else "en"

        # Perform semantic analysis on content
        analysis = self.semantic_analyzer.analyze_text(content)

        # Create book record
        book = Book(
            title=title,
            author=author,
            source="gutenberg",
            source_id=str(gutenberg_id),
            description=metadata.get("description"),
            language=language,
            content=content,
            hermetic_symbols=analysis.get("hermetic_symbols", []),
            elemental_energy=analysis.get("elemental_energy", {}),
            correspondences=analysis.get("correspondences", []),
        )

        db.add(book)
        db.commit()
        db.refresh(book)

        # Generate and store embedding
        try:
            embedding_id = self.embedding_service.store_embedding(
                text=f"{title} by {author}. {content[:1000]}",  # Use title, author, and excerpt
                metadata={
                    "book_id": book.id,
                    "title": title,
                    "author": author,
                    "source": "gutenberg",
                },
            )

            book.embedding_id = embedding_id
            db.commit()
        except Exception as e:
            print(f"Failed to generate embedding: {e}")

        return book

    async def ingest_multiple_books(
        self,
        gutenberg_ids: List[int],
        db: Session,
    ) -> List[Book]:
        """
        Ingest multiple books from Gutenberg.

        Args:
            gutenberg_ids: List of Gutenberg book IDs
            db: Database session

        Returns:
            List of created Book objects
        """
        books = []
        for gutenberg_id in gutenberg_ids:
            try:
                book = await self.ingest_book_from_gutenberg(gutenberg_id, db)
                if book:
                    books.append(book)
                    print(f"✅ Ingested: {book.title}")
            except Exception as e:
                print(f"❌ Failed to ingest book {gutenberg_id}: {e}")

        return books


# Global instance
_book_ingest_service: Optional[BookIngestService] = None


def get_book_ingest_service() -> BookIngestService:
    """Get or create the global book ingest service instance."""
    global _book_ingest_service
    if _book_ingest_service is None:
        _book_ingest_service = BookIngestService()
    return _book_ingest_service
