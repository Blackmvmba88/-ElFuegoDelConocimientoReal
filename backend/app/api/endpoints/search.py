"""
Search endpoints for semantic and filtered book search.
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.schemas.schemas import SearchRequest, SearchResponse, BookResponse
from app.db.session import get_db
from app.services.embedding_service import get_embedding_service
from app.models.models import Book

router = APIRouter()


@router.post("/search", response_model=SearchResponse)
async def search_books(
    request: SearchRequest,
    db: Session = Depends(get_db),
):
    """
    Semantic search for books using vector embeddings.
    """
    embedding_service = get_embedding_service()

    # Perform semantic search
    search_results = embedding_service.search_similar(
        query=request.query,
        limit=request.limit,
        filters=request.filters,
    )

    # Get book details from database
    book_ids = [result["metadata"].get("book_id") for result in search_results]
    books = db.query(Book).filter(Book.id.in_(book_ids)).all()

    # Create response maintaining search order
    book_map = {book.id: book for book in books}
    ordered_books = [
        BookResponse.from_orm(book_map[book_id]) for book_id in book_ids if book_id in book_map
    ]

    return SearchResponse(
        results=ordered_books,
        total=len(ordered_books),
        query=request.query,
    )


@router.get("/search/suggestions")
async def search_suggestions(
    query: str = Query(..., min_length=2),
    limit: int = Query(default=5, ge=1, le=20),
):
    """
    Get search suggestions based on partial query.
    """
    # TODO: Implement smart suggestions based on search history and popular terms
    return {
        "suggestions": [
            f"{query} alchemy",
            f"{query} hermetic",
            f"{query} masonic",
        ][:limit]
    }


@router.get("/search/filters")
async def get_search_filters(db: Session = Depends(get_db)):
    """
    Get available search filters (authors, languages, categories, etc.).
    """
    # Get unique values for filters
    authors = db.query(Book.author).distinct().limit(100).all()
    languages = db.query(Book.language).distinct().all()

    return {
        "authors": [a[0] for a in authors if a[0]],
        "languages": [lang[0] for lang in languages if lang[0]],
        "elements": ["fire", "water", "air", "earth", "ether"],
        "symbols": ["alchemical", "masonic", "kabbalistic"],
    }
