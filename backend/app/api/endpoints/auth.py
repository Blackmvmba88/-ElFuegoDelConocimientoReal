"""
Authentication endpoints for GitHub OAuth and user management.
"""
from typing import Optional
from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import httpx

from app.core.config import settings
from app.core.auth import create_access_token, get_password_hash, verify_password
from app.core.dependencies import get_current_user, get_optional_current_user
from app.db.session import get_db
from app.models.models import User
from app.schemas.schemas import (
    Token,
    UserResponse,
    GitHubAuthRequest,
    GitHubUserInfo,
)

router = APIRouter()


@router.post("/github", response_model=Token)
async def github_auth(
    auth_request: GitHubAuthRequest,
    db: Session = Depends(get_db)
):
    """
    Authenticate user with GitHub OAuth code.
    
    This endpoint:
    1. Exchanges the GitHub OAuth code for an access token
    2. Fetches the user's GitHub profile
    3. Creates or updates the user in the database
    4. Returns a JWT token for API authentication
    """
    # Exchange code for GitHub access token
    async with httpx.AsyncClient() as client:
        # Step 1: Exchange code for access token
        token_response = await client.post(
            "https://github.com/login/oauth/access_token",
            json={
                "client_id": settings.github_client_id,
                "client_secret": settings.github_client_secret,
                "code": auth_request.code,
                "redirect_uri": auth_request.redirect_uri,
            },
            headers={"Accept": "application/json"}
        )
        
        if token_response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to exchange GitHub code for access token"
            )
        
        token_data = token_response.json()
        github_access_token = token_data.get("access_token")
        
        if not github_access_token:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No access token received from GitHub"
            )
        
        # Step 2: Fetch user info from GitHub
        user_response = await client.get(
            "https://api.github.com/user",
            headers={
                "Authorization": f"Bearer {github_access_token}",
                "Accept": "application/json"
            }
        )
        
        if user_response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to fetch user info from GitHub"
            )
        
        github_user = user_response.json()
        
        # Step 3: Fetch user email if not public
        email = github_user.get("email")
        if not email:
            emails_response = await client.get(
                "https://api.github.com/user/emails",
                headers={
                    "Authorization": f"Bearer {github_access_token}",
                    "Accept": "application/json"
                }
            )
            if emails_response.status_code == 200:
                emails = emails_response.json()
                # Get primary email
                primary_email = next(
                    (e["email"] for e in emails if e["primary"]),
                    None
                )
                if primary_email:
                    email = primary_email
                elif emails:
                    email = emails[0]["email"]
        
        # If still no email, create a unique placeholder
        if not email:
            email = f"{github_user['login']}+noreply@users.noreply.github.com"
    
    github_id = str(github_user["id"])
    github_username = github_user["login"]
    avatar_url = github_user.get("avatar_url")
    
    # Step 4: Create or update user in database
    user = db.query(User).filter(User.github_id == int(github_id)).first()
    
    if not user:
        # Check if user exists with this email
        user = db.query(User).filter(User.email == email).first()
        
        if user:
            # Update existing user with GitHub info
            user.github_id = int(github_id)
            user.github_username = github_username
            user.avatar_url = avatar_url
        else:
            # Create new user
            user = User(
                email=email,
                username=github_username,
                github_id=int(github_id),
                github_username=github_username,
                avatar_url=avatar_url,
                is_creator=(github_username.lower() == settings.creator_github_username.lower()),
                is_admin=(github_username.lower() == settings.creator_github_username.lower()),
            )
            db.add(user)
    else:
        # Update existing GitHub user
        user.email = email
        user.username = github_username
        user.github_username = github_username
        user.avatar_url = avatar_url
        user.is_active = True
        
        # Update creator/admin status if username matches
        if github_username.lower() == settings.creator_github_username.lower():
            user.is_creator = True
            user.is_admin = True
    
    db.commit()
    db.refresh(user)
    
    # Step 5: Create JWT access token
    access_token = create_access_token(
        data={"sub": user.id, "username": user.username}
    )
    
    return Token(access_token=access_token, token_type="bearer")


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    """
    Get current authenticated user information.
    """
    return current_user


@router.get("/check")
async def check_auth(
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    """
    Check if user is authenticated.
    Returns user info if authenticated, null if not.
    """
    if current_user:
        return {
            "authenticated": True,
            "user": UserResponse.model_validate(current_user)
        }
    return {"authenticated": False, "user": None}
