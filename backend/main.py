"""
El Fuego del Conocimiento Real - Backend
Main application entry point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# TODO: Import routers when implemented
# from app.api import books, users, ai

app = FastAPI(
    title="El Fuego del Conocimiento Real API",
    description="API del Núcleo Hermético - Sistema de Gestión del Conocimiento",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint - Health check"""
    return {
        "message": "🔥 El Fuego del Conocimiento Real API",
        "status": "active",
        "version": "1.0.0",
        "grado": 33
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


# TODO: Include routers when implemented
# app.include_router(books.router, prefix="/api/v1/books", tags=["books"])
# app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
# app.include_router(ai.router, prefix="/api/v1/ai", tags=["ai"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
