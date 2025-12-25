"""
Authentication dependencies for FastAPI routes.
"""
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.core.auth import decode_access_token
from app.db.session import get_db
from app.models.models import User

# HTTP Bearer token security
security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """
    Get the current authenticated user from JWT token.
    
    Args:
        credentials: HTTP Bearer credentials
        db: Database session
    
    Returns:
        Current user object
    
    Raises:
        HTTPException: If token is invalid or user not found
    """
    token = credentials.credentials
    
    # Decode token
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Extract user ID
    user_id: Optional[int] = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Get user from database
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user"
        )
    
    return user


async def get_current_active_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Get the current active user.
    
    Args:
        current_user: Current user from get_current_user
    
    Returns:
        Current active user
    
    Raises:
        HTTPException: If user is inactive
    """
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user"
        )
    return current_user


async def get_current_creator(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Get the current user if they are the creator.
    
    Args:
        current_user: Current user from get_current_user
    
    Returns:
        Current user if they are the creator
    
    Raises:
        HTTPException: If user is not the creator
    """
    if not current_user.is_creator:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the creator can perform this action"
        )
    return current_user


async def get_current_admin(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Get the current user if they are an admin or creator.
    
    Args:
        current_user: Current user from get_current_user
    
    Returns:
        Current user if they are an admin or creator
    
    Raises:
        HTTPException: If user is not an admin or creator
    """
    if not (current_user.is_admin or current_user.is_creator):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required"
        )
    return current_user


async def get_optional_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer(auto_error=False)),
    db: Session = Depends(get_db)
) -> Optional[User]:
    """
    Get the current user if authenticated, None otherwise.
    Useful for routes that work with or without authentication.
    
    Args:
        credentials: Optional HTTP Bearer credentials
        db: Database session
    
    Returns:
        Current user if authenticated, None otherwise
    """
    if not credentials:
        return None
    
    try:
        token = credentials.credentials
        payload = decode_access_token(token)
        if not payload:
            return None
        
        user_id = payload.get("sub")
        if user_id is None:
            return None
        
        user = db.query(User).filter(User.id == user_id).first()
        if not user or not user.is_active:
            return None
        
        return user
    except Exception:
        return None
