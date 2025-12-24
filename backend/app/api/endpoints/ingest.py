"""
Book ingestion endpoints for importing books from external sources.
"""
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List

from app.schemas.schemas import BookResponse
from app.db.session import get_db
from app.services.ingest.gutenberg import get_book_ingest_service


router = APIRouter()


@router.post("/gutenberg/{gutenberg_id}", response_model=BookResponse)
async def ingest_gutenberg_book(
    gutenberg_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """
    Ingest a single book from Project Gutenberg.
    
    Args:
        gutenberg_id: Gutenberg book ID
        
    Returns:
        Ingested book details
    """
    ingest_service = get_book_ingest_service()
    
    try:
        book = await ingest_service.ingest_book_from_gutenberg(
            gutenberg_id=gutenberg_id,
            db=db,
        )
        
        if not book:
            raise HTTPException(
                status_code=404,
                detail=f"Book {gutenberg_id} not found or could not be ingested"
            )
        
        return BookResponse.from_orm(book)
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to ingest book: {str(e)}"
        )


@router.post("/gutenberg/batch", response_model=List[BookResponse])
async def ingest_gutenberg_batch(
    gutenberg_ids: List[int],
    db: Session = Depends(get_db),
):
    """
    Ingest multiple books from Project Gutenberg.
    
    Args:
        gutenberg_ids: List of Gutenberg book IDs
        
    Returns:
        List of ingested books
    """
    ingest_service = get_book_ingest_service()
    
    try:
        books = await ingest_service.ingest_multiple_books(
            gutenberg_ids=gutenberg_ids,
            db=db,
        )
        
        return [BookResponse.from_orm(book) for book in books]
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to ingest books: {str(e)}"
        )


@router.get("/gutenberg/search")
async def search_gutenberg(
    query: str,
    limit: int = 10,
):
    """
    Search Project Gutenberg for books.
    
    Args:
        query: Search query
        limit: Maximum number of results
        
    Returns:
        List of books from Gutenberg
    """
    ingest_service = get_book_ingest_service()
    
    try:
        results = await ingest_service.search_gutenberg(
            query=query,
            limit=limit,
        )
        
        return {
            "results": results,
            "total": len(results),
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to search Gutenberg: {str(e)}"
        )
