"""
Database initialization script.
Creates all tables defined in models.
"""
from app.db.session import engine, Base
from app.models.models import (  # noqa: F401
    User,
    Book,
    LibraryItem,
    SearchHistory,
    Annotation,
    SynthesizedText,
    HermeticSymbol,
    Session,
)


def init_db() -> None:
    """
    Initialize database by creating all tables.
    """
    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully")


def drop_db() -> None:
    """
    Drop all database tables.
    WARNING: This will delete all data!
    """
    Base.metadata.drop_all(bind=engine)
    print("⚠️  Database tables dropped")


def reset_db() -> None:
    """
    Reset database by dropping and recreating all tables.
    WARNING: This will delete all data!
    """
    drop_db()
    init_db()


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1:
        command = sys.argv[1]
        if command == "init":
            init_db()
        elif command == "drop":
            drop_db()
        elif command == "reset":
            reset_db()
        else:
            print(f"Unknown command: {command}")
            print("Usage: python -m app.db.init_db [init|drop|reset]")
    else:
        # Default: just initialize
        init_db()
