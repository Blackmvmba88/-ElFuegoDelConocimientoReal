"""
Main FastAPI application for El Fuego del Conocimiento Real backend.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.db.redis import close_redis_client
from app.api.endpoints import health, search, semantic, synthesis, state_sync, ingest


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    """
    # Startup
    print(f"Starting {settings.app_name} v{settings.app_version}")

    yield

    # Shutdown
    print("Shutting down...")
    await close_redis_client()


# Create FastAPI application
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description=(
        "Backend API for El Fuego del Conocimiento Real - "
        "A hermetic knowledge platform with AI-powered semantic analysis and synthesis"
    ),
    lifespan=lifespan,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, tags=["health"])
app.include_router(search.router, prefix="/api/search", tags=["search"])
app.include_router(semantic.router, prefix="/api/semantic", tags=["semantic"])
app.include_router(synthesis.router, prefix="/api/synthesis", tags=["synthesis"])
app.include_router(state_sync.router, prefix="/api/sync", tags=["state-sync"])
app.include_router(ingest.router, prefix="/api/ingest", tags=["ingest"])


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": f"Welcome to {settings.app_name}",
        "version": settings.app_version,
        "docs": "/docs",
        "health": "/health",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
    )
