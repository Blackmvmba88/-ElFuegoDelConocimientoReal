"""
Redis client configuration and connection management.
"""
import redis.asyncio as redis
from typing import Optional

from app.core.config import settings

# Global Redis client instance
_redis_client: Optional[redis.Redis] = None


async def get_redis_client() -> redis.Redis:
    """
    Get or create Redis client instance.
    Returns an async Redis client.
    """
    global _redis_client

    if _redis_client is None:
        _redis_client = redis.from_url(
            str(settings.redis_url),
            encoding="utf-8",
            decode_responses=True,
            max_connections=50,
        )

    return _redis_client


async def close_redis_client() -> None:
    """Close Redis client connection."""
    global _redis_client

    if _redis_client is not None:
        await _redis_client.close()
        _redis_client = None
