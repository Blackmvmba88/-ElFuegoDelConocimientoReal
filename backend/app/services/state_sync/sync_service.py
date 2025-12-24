"""
State synchronization service for managing user sessions across devices.
"""
from typing import Optional, Dict, Any
from datetime import datetime, timedelta
import json
import uuid

from app.db.redis import get_redis_client
from app.core.config import settings


class StateSyncService:
    """Service for synchronizing user state across devices."""
    
    def __init__(self):
        self.ttl = settings.redis_ttl
    
    async def create_session(
        self,
        user_id: int,
        device_info: Optional[str] = None,
    ) -> str:
        """
        Create a new session for a user.
        
        Args:
            user_id: User ID
            device_info: Optional device information
            
        Returns:
            Session token
        """
        session_token = str(uuid.uuid4())
        
        session_data = {
            "user_id": user_id,
            "device_info": device_info or "unknown",
            "created_at": datetime.utcnow().isoformat(),
            "last_activity": datetime.utcnow().isoformat(),
            "state": {},
        }
        
        redis = await get_redis_client()
        session_key = f"session:{session_token}"
        
        await redis.setex(
            session_key,
            self.ttl,
            json.dumps(session_data),
        )
        
        # Add to user's session list
        user_sessions_key = f"user:{user_id}:sessions"
        await redis.sadd(user_sessions_key, session_token)
        
        return session_token
    
    async def get_session(self, session_token: str) -> Optional[Dict[str, Any]]:
        """
        Retrieve session data.
        
        Args:
            session_token: Session token
            
        Returns:
            Session data or None if not found
        """
        redis = await get_redis_client()
        session_key = f"session:{session_token}"
        
        data = await redis.get(session_key)
        if data:
            return json.loads(data)
        return None
    
    async def update_session_state(
        self,
        session_token: str,
        state_updates: Dict[str, Any],
    ) -> bool:
        """
        Update session state with new data.
        
        Args:
            session_token: Session token
            state_updates: State updates to merge
            
        Returns:
            True if successful, False otherwise
        """
        session = await self.get_session(session_token)
        if not session:
            return False
        
        # Merge state updates
        session["state"].update(state_updates)
        session["last_activity"] = datetime.utcnow().isoformat()
        
        redis = await get_redis_client()
        session_key = f"session:{session_token}"
        
        await redis.setex(
            session_key,
            self.ttl,
            json.dumps(session),
        )
        
        return True
    
    async def sync_state_across_devices(
        self,
        user_id: int,
        state_updates: Dict[str, Any],
    ) -> int:
        """
        Sync state updates across all user's active sessions.
        
        Args:
            user_id: User ID
            state_updates: State updates to broadcast
            
        Returns:
            Number of sessions updated
        """
        redis = await get_redis_client()
        user_sessions_key = f"user:{user_id}:sessions"
        
        # Get all active sessions for user
        session_tokens = await redis.smembers(user_sessions_key)
        
        updated_count = 0
        for session_token in session_tokens:
            success = await self.update_session_state(session_token, state_updates)
            if success:
                updated_count += 1
            else:
                # Remove dead session from set
                await redis.srem(user_sessions_key, session_token)
        
        return updated_count
    
    async def delete_session(self, session_token: str) -> bool:
        """
        Delete a session.
        
        Args:
            session_token: Session token
            
        Returns:
            True if successful
        """
        session = await self.get_session(session_token)
        if not session:
            return False
        
        redis = await get_redis_client()
        session_key = f"session:{session_token}"
        user_sessions_key = f"user:{session['user_id']}:sessions"
        
        # Delete session data
        await redis.delete(session_key)
        
        # Remove from user's session set
        await redis.srem(user_sessions_key, session_token)
        
        return True
    
    async def record_event(
        self,
        session_token: str,
        event_type: str,
        event_data: Dict[str, Any],
    ) -> None:
        """
        Record an event for replay/debugging.
        
        Args:
            session_token: Session token
            event_type: Type of event
            event_data: Event data
        """
        redis = await get_redis_client()
        events_key = f"session:{session_token}:events"
        
        event = {
            "type": event_type,
            "data": event_data,
            "timestamp": datetime.utcnow().isoformat(),
        }
        
        # Store as list with TTL
        await redis.rpush(events_key, json.dumps(event))
        await redis.expire(events_key, self.ttl)
    
    async def get_session_events(
        self,
        session_token: str,
        limit: Optional[int] = None,
    ) -> list[Dict[str, Any]]:
        """
        Get recorded events for a session.
        
        Args:
            session_token: Session token
            limit: Optional limit on number of events
            
        Returns:
            List of events
        """
        redis = await get_redis_client()
        events_key = f"session:{session_token}:events"
        
        if limit:
            events_data = await redis.lrange(events_key, -limit, -1)
        else:
            events_data = await redis.lrange(events_key, 0, -1)
        
        return [json.loads(event) for event in events_data]
    
    async def get_user_sessions(self, user_id: int) -> list[Dict[str, Any]]:
        """
        Get all active sessions for a user.
        
        Args:
            user_id: User ID
            
        Returns:
            List of session data
        """
        redis = await get_redis_client()
        user_sessions_key = f"user:{user_id}:sessions"
        
        session_tokens = await redis.smembers(user_sessions_key)
        
        sessions = []
        for session_token in session_tokens:
            session = await self.get_session(session_token)
            if session:
                sessions.append({
                    "token": session_token,
                    **session,
                })
            else:
                # Clean up dead session
                await redis.srem(user_sessions_key, session_token)
        
        return sessions


# Global instance
_state_sync_service: Optional[StateSyncService] = None


def get_state_sync_service() -> StateSyncService:
    """Get or create the global state sync service instance."""
    global _state_sync_service
    if _state_sync_service is None:
        _state_sync_service = StateSyncService()
    return _state_sync_service
