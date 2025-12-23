"""
Health check and monitoring endpoints.
"""
from fastapi import APIRouter, Depends
from datetime import datetime

from app.schemas.schemas import HealthResponse
from app.db.session import get_db
from app.db.redis import get_redis_client
from app.services.embedding_service import get_embedding_service
from app.core.config import settings

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check(db=Depends(get_db)):
    """
    Health check endpoint that tests all critical services.
    """
    # Check database
    try:
        db.execute("SELECT 1")
        db_status = "healthy"
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"
    
    # Check Redis
    try:
        redis = await get_redis_client()
        await redis.ping()
        redis_status = "healthy"
    except Exception as e:
        redis_status = f"unhealthy: {str(e)}"
    
    # Check Qdrant
    try:
        embedding_service = get_embedding_service()
        embedding_service.client.get_collections()
        qdrant_status = "healthy"
    except Exception as e:
        qdrant_status = f"unhealthy: {str(e)}"
    
    # Overall status
    overall_status = "healthy" if all(
        s == "healthy" for s in [db_status, redis_status, qdrant_status]
    ) else "degraded"
    
    return HealthResponse(
        status=overall_status,
        version=settings.app_version,
        database=db_status,
        redis=redis_status,
        qdrant=qdrant_status,
        timestamp=datetime.utcnow(),
    )


@router.get("/metrics")
async def metrics():
    """
    Prometheus-compatible metrics endpoint.
    """
    # TODO: Implement actual metrics collection
    return {
        "message": "Metrics endpoint - to be implemented with prometheus_client"
    }
