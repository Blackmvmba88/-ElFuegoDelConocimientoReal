"""
Pydantic schemas for API request/response validation.
"""
from datetime import datetime
from typing import Optional, Dict, List, Any
from pydantic import BaseModel, Field, EmailStr


# User schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    current_degree: int
    current_chamber: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


# Book schemas
class BookBase(BaseModel):
    title: str
    author: Optional[str] = None
    source: str
    source_id: Optional[str] = None
    description: Optional[str] = None
    language: Optional[str] = None
    publication_year: Optional[int] = None


class BookCreate(BookBase):
    content: str


class BookResponse(BookBase):
    id: int
    hermetic_symbols: List[str] = []
    elemental_energy: Dict[str, float] = {}
    correspondences: List[str] = []
    created_at: datetime
    
    class Config:
        from_attributes = True


class BookDetail(BookResponse):
    content: str


# Search schemas
class SearchRequest(BaseModel):
    query: str
    filters: Optional[Dict[str, Any]] = None
    limit: int = Field(default=20, ge=1, le=100)
    offset: int = Field(default=0, ge=0)


class SearchResponse(BaseModel):
    results: List[BookResponse]
    total: int
    query: str


# Library schemas
class LibraryItemCreate(BaseModel):
    book_id: int


class LibraryItemResponse(BaseModel):
    id: int
    book: BookResponse
    progress_percentage: float
    is_favorite: bool
    reading_status: str
    added_at: datetime
    last_read_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


# Annotation schemas
class AnnotationCreate(BaseModel):
    book_id: int
    content: str
    location: Optional[str] = None
    highlight_text: Optional[str] = None


class AnnotationResponse(BaseModel):
    id: int
    book_id: int
    content: str
    location: Optional[str] = None
    highlight_text: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Synthesis schemas
class SynthesisRequest(BaseModel):
    source_book_ids: List[int]
    synthesis_type: str = Field(..., description="fusion, transformation, or generation")
    prompt: Optional[str] = None
    model: Optional[str] = None


class SynthesisResponse(BaseModel):
    id: int
    title: str
    content: str
    source_book_ids: List[int]
    model_used: str
    synthesis_type: str
    created_at: datetime
    
    class Config:
        from_attributes = True


# Semantic analysis schemas
class SemanticAnalysisRequest(BaseModel):
    text: str
    analyze_symbols: bool = True
    analyze_energy: bool = True
    analyze_correspondences: bool = True


class HermeticSymbolDetail(BaseModel):
    symbol: str
    category: str
    count: int
    positions: List[int]


class CorrespondenceDetail(BaseModel):
    symbol: str
    category: str
    correspondences: List[str]


class SemanticAnalysisResponse(BaseModel):
    hermetic_symbols: List[HermeticSymbolDetail]
    elemental_energy: Dict[str, float]
    correspondences: List[CorrespondenceDetail]
    summary: str


# Health check schema
class HealthResponse(BaseModel):
    status: str
    version: str
    database: str
    redis: str
    qdrant: str
    timestamp: datetime
