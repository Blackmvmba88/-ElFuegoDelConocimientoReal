# Examples: Using the Authentication System

This document provides practical examples of using the GitHub OAuth authentication system in "El Fuego del Conocimiento Real".

## Frontend Examples

### 1. Basic Authentication Check

```tsx
'use client'

import { useAuth } from '@/lib/useAuth'

export default function MyPage() {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>
  }

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
    </div>
  )
}
```

### 2. Protected Route Component

```tsx
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>This content is only visible to authenticated users</h1>
      </div>
    </ProtectedRoute>
  )
}
```

### 3. Creator-Only Content

```tsx
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function AdminPage() {
  return (
    <ProtectedRoute requireCreator={true}>
      <div>
        <h1>Admin Panel - Creator Only</h1>
        <p>This content is only visible to the project creator</p>
      </div>
    </ProtectedRoute>
  )
}
```

### 4. Conditional Rendering Based on Role

```tsx
'use client'

import { useAuth } from '@/lib/useAuth'

export default function Dashboard() {
  const { isCreator, isAdmin, user } = useAuth()

  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Everyone sees this */}
      <section>
        <h2>Your Profile</h2>
        <p>Username: {user?.name}</p>
      </section>

      {/* Only admins see this */}
      {isAdmin && (
        <section>
          <h2>Admin Tools</h2>
          <button>Manage Users</button>
        </section>
      )}

      {/* Only the creator sees this */}
      {isCreator && (
        <section>
          <h2>Creator Tools</h2>
          <button>System Settings</button>
        </section>
      )}
    </div>
  )
}
```

### 5. Making Authenticated API Calls

```tsx
'use client'

import { useAuth } from '@/lib/useAuth'
import { useState } from 'react'

export default function DataFetcher() {
  const { getAuthHeaders } = useAuth()
  const [data, setData] = useState(null)

  const fetchProtectedData = async () => {
    const response = await fetch('http://localhost:8000/api/protected-endpoint', {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      }
    })
    
    if (response.ok) {
      const json = await response.json()
      setData(json)
    }
  }

  return (
    <div>
      <button onClick={fetchProtectedData}>
        Fetch Protected Data
      </button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
```

## Backend Examples

### 1. Protected Endpoint

```python
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.models.models import User

router = APIRouter()

@router.get("/protected")
async def protected_endpoint(current_user: User = Depends(get_current_user)):
    return {
        "message": f"Hello {current_user.username}!",
        "user_id": current_user.id,
        "degree": current_user.current_degree
    }
```

### 2. Creator-Only Endpoint

```python
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_creator
from app.models.models import User

router = APIRouter()

@router.post("/admin/settings")
async def update_settings(
    settings: dict,
    current_user: User = Depends(get_current_creator)
):
    # Only the creator can access this
    return {
        "message": "Settings updated by creator",
        "creator": current_user.username
    }
```

### 3. Admin-Only Endpoint

```python
from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_admin
from app.models.models import User

router = APIRouter()

@router.get("/admin/users")
async def list_users(
    current_user: User = Depends(get_current_admin)
):
    # Only admins and creator can access this
    return {
        "message": "User list",
        "admin": current_user.username
    }
```

### 4. Optional Authentication

```python
from typing import Optional
from fastapi import APIRouter, Depends
from app.core.dependencies import get_optional_current_user
from app.models.models import User

router = APIRouter()

@router.get("/books")
async def list_books(current_user: Optional[User] = Depends(get_optional_current_user)):
    # Works for both authenticated and anonymous users
    if current_user:
        # Return personalized content
        return {
            "books": [...],
            "user_favorites": current_user.library_items
        }
    else:
        # Return public content only
        return {
            "books": [...]
        }
```

### 5. Custom Permission Check

```python
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.dependencies import get_current_user
from app.models.models import User

router = APIRouter()

@router.put("/books/{book_id}")
async def update_book(
    book_id: int,
    book_data: dict,
    current_user: User = Depends(get_current_user)
):
    # Custom logic to check if user can edit this book
    if not (current_user.is_creator or current_user.is_admin):
        # Check if user owns this book
        book_owner = get_book_owner(book_id)
        if book_owner != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to edit this book"
            )
    
    # Proceed with update
    return {"message": "Book updated"}
```

## Testing Authentication

### Test User Creation

```python
# test_auth.py
import pytest
from app.core.auth import create_access_token, decode_access_token

def test_token_creation():
    token = create_access_token(data={"sub": 1, "username": "testuser"})
    assert token is not None
    
    payload = decode_access_token(token)
    assert payload["sub"] == 1
    assert payload["username"] == "testuser"

def test_creator_identification():
    # Test that creator is properly identified
    from app.core.config import settings
    assert settings.creator_github_username == "Blackmvmba88"
```

### Test Frontend Auth Hook

```tsx
// __tests__/useAuth.test.tsx
import { renderHook } from '@testing-library/react'
import { useAuth } from '@/lib/useAuth'

jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        name: 'Test User',
        isCreator: true
      }
    },
    status: 'authenticated'
  })
}))

test('useAuth returns correct values', () => {
  const { result } = renderHook(() => useAuth())
  
  expect(result.current.isAuthenticated).toBe(true)
  expect(result.current.isCreator).toBe(true)
  expect(result.current.user?.name).toBe('Test User')
})
```

## Common Patterns

### Pattern 1: Page-Level Protection

```tsx
// app/admin/page.tsx
import { ProtectedRoute } from '@/components/ProtectedRoute'
import AdminDashboard from '@/components/AdminDashboard'

export default function AdminPage() {
  return (
    <ProtectedRoute requireCreator={true}>
      <AdminDashboard />
    </ProtectedRoute>
  )
}
```

### Pattern 2: Component-Level Protection

```tsx
// components/AdvancedFeature.tsx
'use client'

import { useAuth } from '@/lib/useAuth'

export function AdvancedFeature() {
  const { isAdmin } = useAuth()

  if (!isAdmin) return null

  return (
    <div>
      <h3>Advanced Feature</h3>
      {/* Admin-only feature */}
    </div>
  )
}
```

### Pattern 3: API Route Protection

```tsx
// app/api/admin/route.ts
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!(session.user as any)?.isCreator) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json({ data: 'Admin data' })
}
```

## Best Practices

1. **Always validate on the backend**: Frontend checks are for UX, backend checks are for security
2. **Use TypeScript types**: Properly type session and user objects
3. **Handle loading states**: Show appropriate UI while checking auth
4. **Provide clear error messages**: Help users understand why they can't access something
5. **Log auth events**: Track login, logout, and failed auth attempts (coming in Phase 3)

## Security Considerations

1. **Never expose secrets**: Keep `NEXTAUTH_SECRET` and `GITHUB_CLIENT_SECRET` private
2. **Use HTTPS in production**: OAuth requires secure connections
3. **Validate tokens server-side**: Don't trust client-provided auth data
4. **Rate limit auth endpoints**: Prevent brute force attacks
5. **Rotate secrets regularly**: Change `SECRET_KEY` and `NEXTAUTH_SECRET` periodically
