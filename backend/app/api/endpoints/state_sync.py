"""
State synchronization endpoints for managing user sessions.
"""
from fastapi import APIRouter, HTTPException
from typing import Optional, Dict, Any

from app.services.state_sync.sync_service import get_state_sync_service

router = APIRouter()


@router.post("/sessions")
async def create_session(
    user_id: int,
    device_info: Optional[str] = None,
):
    """
    Create a new session for a user.
    """
    sync_service = get_state_sync_service()

    try:
        session_token = await sync_service.create_session(
            user_id=user_id,
            device_info=device_info,
        )

        return {
            "session_token": session_token,
            "message": "Session created successfully",
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/sessions/{session_token}")
async def get_session(session_token: str):
    """
    Get session data.
    """
    sync_service = get_state_sync_service()

    session = await sync_service.get_session(session_token)

    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    return session


@router.put("/sessions/{session_token}/state")
async def update_session_state(
    session_token: str,
    state_updates: Dict[str, Any],
):
    """
    Update session state.
    """
    sync_service = get_state_sync_service()

    success = await sync_service.update_session_state(
        session_token=session_token,
        state_updates=state_updates,
    )

    if not success:
        raise HTTPException(status_code=404, detail="Session not found")

    return {"message": "State updated successfully"}


@router.post("/sessions/{session_token}/sync")
async def sync_state(
    session_token: str,
    state_updates: Dict[str, Any],
):
    """
    Sync state across all user's devices.
    """
    sync_service = get_state_sync_service()

    # Get session to find user_id
    session = await sync_service.get_session(session_token)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    updated_count = await sync_service.sync_state_across_devices(
        user_id=session["user_id"],
        state_updates=state_updates,
    )

    return {
        "message": f"State synced across {updated_count} devices",
        "devices_updated": updated_count,
    }


@router.delete("/sessions/{session_token}")
async def delete_session(session_token: str):
    """
    Delete a session.
    """
    sync_service = get_state_sync_service()

    success = await sync_service.delete_session(session_token)

    if not success:
        raise HTTPException(status_code=404, detail="Session not found")

    return {"message": "Session deleted successfully"}


@router.post("/sessions/{session_token}/events")
async def record_event(
    session_token: str,
    event_type: str,
    event_data: Dict[str, Any],
):
    """
    Record an event for debugging/replay.
    """
    sync_service = get_state_sync_service()

    await sync_service.record_event(
        session_token=session_token,
        event_type=event_type,
        event_data=event_data,
    )

    return {"message": "Event recorded"}


@router.get("/sessions/{session_token}/events")
async def get_session_events(
    session_token: str,
    limit: Optional[int] = None,
):
    """
    Get recorded events for a session.
    """
    sync_service = get_state_sync_service()

    events = await sync_service.get_session_events(
        session_token=session_token,
        limit=limit,
    )

    return {"events": events}


@router.get("/users/{user_id}/sessions")
async def get_user_sessions(user_id: int):
    """
    Get all active sessions for a user.
    """
    sync_service = get_state_sync_service()

    sessions = await sync_service.get_user_sessions(user_id)

    return {"sessions": sessions}
