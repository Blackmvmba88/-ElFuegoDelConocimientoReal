"""
SQLAlchemy models for the application.
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship

from app.db.session import Base


class User(Base):
    """User model for authentication and progress tracking."""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    # Masonic degree progression
    current_degree = Column(Integer, default=1)
    current_chamber = Column(String, default="silence")  # silence, light, fire, air, ether

    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    library_items = relationship("LibraryItem", back_populates="user")
    search_history = relationship("SearchHistory", back_populates="user")
    annotations = relationship("Annotation", back_populates="user")
    synthesized_texts = relationship("SynthesizedText", back_populates="user")


class Book(Base):
    """Book model for storing indexed books from various sources."""

    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    author = Column(String, index=True)
    source = Column(String, nullable=False)  # gutenberg, archive.org, local
    source_id = Column(String, index=True)  # External ID from source

    description = Column(Text)
    language = Column(String)
    publication_year = Column(Integer)

    # Full text content
    content = Column(Text)

    # Hermetic metadata
    hermetic_symbols = Column(JSON, default=list)  # List of detected symbols
    elemental_energy = Column(JSON, default=dict)  # {fire: 0.3, water: 0.2, ...}
    correspondences = Column(JSON, default=list)  # List of detected correspondences

    # Vector embeddings stored in Qdrant, reference ID here
    embedding_id = Column(String, index=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    library_items = relationship("LibraryItem", back_populates="book")
    annotations = relationship("Annotation", back_populates="book")


class LibraryItem(Base):
    """User's personal library - books they've added."""

    __tablename__ = "library_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)

    # Reading progress
    progress_percentage = Column(Float, default=0.0)
    is_favorite = Column(Boolean, default=False)
    reading_status = Column(String, default="to_read")  # to_read, reading, completed

    added_at = Column(DateTime, default=datetime.utcnow)
    last_read_at = Column(DateTime)

    # Relationships
    user = relationship("User", back_populates="library_items")
    book = relationship("Book", back_populates="library_items")


class SearchHistory(Base):
    """Track user search queries for suggestions and analytics."""

    __tablename__ = "search_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    query = Column(String, nullable=False)
    filters = Column(JSON, default=dict)
    results_count = Column(Integer)

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="search_history")


class Annotation(Base):
    """User annotations on books."""

    __tablename__ = "annotations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)

    content = Column(Text, nullable=False)
    location = Column(String)  # Chapter, page, or section reference
    highlight_text = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="annotations")
    book = relationship("Book", back_populates="annotations")


class SynthesizedText(Base):
    """AI-synthesized texts created by users."""

    __tablename__ = "synthesized_texts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)

    # Source books used for synthesis
    source_book_ids = Column(JSON, default=list)

    # AI metadata
    model_used = Column(String)
    synthesis_type = Column(String)  # fusion, transformation, generation

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="synthesized_texts")


class HermeticSymbol(Base):
    """Database of hermetic symbols for detection and analysis."""

    __tablename__ = "hermetic_symbols"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False, index=True)
    category = Column(String, nullable=False)  # alchemical, masonic, kabbalistic

    description = Column(Text)
    keywords = Column(JSON, default=list)  # Keywords for detection
    correspondences = Column(JSON, default=dict)  # Related symbols and meanings

    created_at = Column(DateTime, default=datetime.utcnow)


class Session(Base):
    """User sessions for state synchronization."""

    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    session_token = Column(String, unique=True, nullable=False, index=True)

    # Session state as JSON
    state = Column(JSON, default=dict)

    device_info = Column(String)
    last_activity = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
