# API Documentation

## Base URL

```
Development: http://localhost:8000
Production: TBD
```

## Authentication

Currently, the API is open. Authentication will be implemented in future phases.

**Planned Authentication:**
- JWT Bearer tokens
- Token refresh mechanism
- Role-based access control (RBAC)

## Endpoints

### Health & Status

#### GET `/`
Get API information and status.

**Response:**
```json
{
  "message": "🔥 El Fuego del Conocimiento Real API",
  "status": "active",
  "version": "1.0.0",
  "grado": 33
}
```

#### GET `/health`
Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy"
}
```

---

## Planned Endpoints (Roadmap)

### Books API (`/api/v1/books`)

#### GET `/api/v1/books/search`
Search for books semantically.

**Query Parameters:**
- `q` (string, required): Search query
- `limit` (integer, optional): Number of results (default: 10)
- `offset` (integer, optional): Pagination offset

**Response:**
```json
{
  "results": [
    {
      "id": "uuid",
      "title": "Book Title",
      "author": "Author Name",
      "similarity_score": 0.95,
      "summary": "Book summary..."
    }
  ],
  "total": 100,
  "limit": 10,
  "offset": 0
}
```

#### GET `/api/v1/books/{book_id}`
Get detailed information about a specific book.

**Response:**
```json
{
  "id": "uuid",
  "title": "Book Title",
  "author": "Author Name",
  "publication_year": 1900,
  "language": "es",
  "content": "Full book content...",
  "metadata": {
    "source": "gutenberg",
    "genre": ["philosophy", "alchemy"]
  }
}
```

#### POST `/api/v1/books/sync`
Trigger synchronization with external book sources.

**Request Body:**
```json
{
  "sources": ["gutenberg", "archive_org"],
  "limit": 100
}
```

---

### AI Hermética API (`/api/v1/ai`)

#### POST `/api/v1/ai/synthesize`
Generate new text by synthesizing multiple sources.

**Request Body:**
```json
{
  "sources": ["book_id_1", "book_id_2"],
  "prompt": "Synthesize the concept of enlightenment",
  "style": "hermetic",
  "max_length": 500
}
```

**Response:**
```json
{
  "text": "Generated synthesized text...",
  "sources_used": ["book_id_1", "book_id_2"],
  "processing_time_ms": 1234
}
```

#### POST `/api/v1/ai/analyze`
Analyze text for symbols and hermetic concepts.

**Request Body:**
```json
{
  "text": "Text to analyze..."
}
```

**Response:**
```json
{
  "symbols": [
    {
      "symbol": "Fire",
      "occurrences": 5,
      "significance": "Transformation and purification"
    }
  ],
  "concepts": [
    {
      "concept": "Alchemy",
      "confidence": 0.92,
      "context": "Textual context..."
    }
  ]
}
```

---

### Users API (`/api/v1/users`)

#### POST `/api/v1/users/register`
Register a new user.

**Request Body:**
```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "secure_password"
}
```

#### POST `/api/v1/users/login`
Authenticate and get JWT token.

**Request Body:**
```json
{
  "username": "user123",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "access_token": "jwt_token_here",
  "token_type": "bearer",
  "expires_in": 3600
}
```

#### GET `/api/v1/users/me`
Get current user profile.

**Headers:**
- `Authorization: Bearer {token}`

**Response:**
```json
{
  "id": "uuid",
  "username": "user123",
  "email": "user@example.com",
  "grado": 1,
  "reading_progress": {
    "books_read": 5,
    "total_pages": 1234
  }
}
```

---

### Grados API (`/api/v1/grados`)

#### GET `/api/v1/grados`
Get list of all grados (initiation levels).

**Response:**
```json
{
  "grados": [
    {
      "level": 1,
      "name": "Aprendiz",
      "description": "First steps in knowledge",
      "requirements": {
        "books_read": 0
      }
    }
  ]
}
```

#### GET `/api/v1/grados/{level}`
Get detailed information about a specific grado.

#### POST `/api/v1/grados/advance`
Check if user can advance to next grado.

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "detail": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "detail": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## Rate Limiting

**Current:** No rate limiting  
**Planned:** 
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

---

## Interactive Documentation

Once the backend is running, you can access interactive API documentation:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

These interfaces allow you to test endpoints directly from your browser.

---

## Versioning

The API uses URI versioning (`/api/v1/`). Breaking changes will result in a new version (`/api/v2/`, etc.).

---

## WebSocket Endpoints (Future)

### `/ws/llama-trina`
Real-time updates for the Llama Trina 3D visualization.

### `/ws/notifications`
User notifications for grade advancement, new content, etc.
