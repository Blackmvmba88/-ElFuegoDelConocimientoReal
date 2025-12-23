# 🔗 Backend-Frontend Integration Guide

This guide explains how the frontend Next.js application integrates with the FastAPI backend.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────────┐ │
│  │ Components │  │   Hooks    │  │     API Client         │ │
│  │  (UI/UX)   │──│  (Logic)   │──│  (HTTP Interface)      │ │
│  └────────────┘  └────────────┘  └────────────────────────┘ │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP/JSON
                             │
┌────────────────────────────▼────────────────────────────────┐
│                    Backend (FastAPI)                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────────┐ │
│  │  Endpoints │  │  Services  │  │      Databases         │ │
│  │   (API)    │──│  (Logic)   │──│  (PostgreSQL/Redis)    │ │
│  └────────────┘  └────────────┘  └────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 📁 File Structure

### Frontend
```
lib/
├── api-client.ts          # HTTP client for backend API
└── use-api.ts             # React hooks for API calls

components/
├── EnhancedSearch.tsx     # Semantic search with filters
├── SemanticAnalyzer.tsx   # Hermetic symbol detection
└── TextSynthesizer.tsx    # AI text generation
```

### Backend
```
backend/
├── app/
│   ├── api/endpoints/     # API route handlers
│   │   ├── health.py
│   │   ├── search.py
│   │   ├── semantic.py
│   │   ├── synthesis.py
│   │   └── state_sync.py
│   ├── services/          # Business logic
│   │   ├── embedding_service.py
│   │   ├── semantic_analysis/
│   │   ├── synthesis/
│   │   └── state_sync/
│   └── main.py            # FastAPI app
└── docker-compose.yml     # Service orchestration
```

## 🔌 API Integration

### 1. API Client (`lib/api-client.ts`)

The API client provides a clean interface to all backend endpoints:

```typescript
import apiClient from '@/lib/api-client';

// Health check
const health = await apiClient.health.check();

// Search books
const results = await apiClient.search.searchBooks('alchemy', { element: 'fire' });

// Analyze text
const analysis = await apiClient.semantic.analyzeText(text);

// Generate text
const generated = await apiClient.synthesis.generateText('wisdom', 'alchemical');

// State sync
const session = await apiClient.stateSync.createSession(userId);
```

### 2. React Hooks (`lib/use-api.ts`)

Hooks provide state management for API calls:

```typescript
import { useBookSearch, useSemanticAnalysis } from '@/lib/use-api';

function MyComponent() {
  const { results, loading, error, searchBooks } = useBookSearch();
  
  const handleSearch = async () => {
    await searchBooks('hermetic texts');
  };
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {results && <BookList books={results.results} />}
    </div>
  );
}
```

## 🎯 Available Endpoints

### Health & Monitoring
- `GET /health` - Check all services status
- `GET /metrics` - Prometheus metrics (WIP)

### Search (`/api/search`)
- `POST /search` - Semantic book search
- `GET /suggestions` - Search suggestions
- `GET /filters` - Available filters

### Semantic Analysis (`/api/semantic`)
- `POST /analyze` - Analyze text for symbols
- `GET /symbols` - List all symbols
- `GET /elements` - List elemental keywords

### Synthesis (`/api/synthesis`)
- `POST /synthesize` - Synthesize from multiple sources
- `POST /transform` - Transform text style
- `POST /generate` - Generate new text

### State Sync (`/api/sync`)
- `POST /sessions` - Create session
- `GET /sessions/{token}` - Get session
- `PUT /sessions/{token}/state` - Update state
- `POST /sessions/{token}/sync` - Sync across devices
- `POST /sessions/{token}/events` - Record event
- `GET /sessions/{token}/events` - Get events

## 🚀 Quick Start

### 1. Start Backend Services

```bash
cd backend
docker-compose up -d
```

This starts:
- PostgreSQL on port 5432
- Redis on port 6379
- Qdrant on ports 6333/6334
- FastAPI on port 8000

### 2. Configure Frontend

Add to `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Use Components

```tsx
import EnhancedSearch from '@/components/EnhancedSearch';
import SemanticAnalyzer from '@/components/SemanticAnalyzer';
import TextSynthesizer from '@/components/TextSynthesizer';

export default function Page() {
  return (
    <div>
      <EnhancedSearch />
      <SemanticAnalyzer />
      <TextSynthesizer />
    </div>
  );
}
```

## 🔧 Configuration

### Environment Variables

**Frontend (`.env.local`):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Backend (`.env`):**
```bash
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/elfuego
REDIS_URL=redis://localhost:6379/0

# Qdrant
QDRANT_HOST=localhost
QDRANT_PORT=6333

# Optional: AI Keys for synthesis
OPENAI_API_KEY=your-key-here
ANTHROPIC_API_KEY=your-key-here

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:8000
```

## 📊 Data Flow Examples

### Example 1: Semantic Search

```
User Input (Frontend)
    ↓
useBookSearch() hook
    ↓
apiClient.search.searchBooks()
    ↓
POST /api/search/search
    ↓
Backend: search.py endpoint
    ↓
EmbeddingService (generate query embedding)
    ↓
Qdrant (vector similarity search)
    ↓
PostgreSQL (fetch book details)
    ↓
Response with books + metadata
    ↓
Frontend: Display results
```

### Example 2: Semantic Analysis

```
User Input (Text)
    ↓
useSemanticAnalysis() hook
    ↓
apiClient.semantic.analyzeText()
    ↓
POST /api/semantic/analyze
    ↓
Backend: semantic.py endpoint
    ↓
SemanticAnalyzer service
    ↓
- Detect symbols (regex patterns)
    - Analyze elemental energy (keyword matching)
    - Find correspondences (symbol mapping)
    ↓
Response with analysis results
    ↓
Frontend: Visualize symbols, energy, correspondences
```

### Example 3: AI Text Generation

```
User Input (Theme + Style)
    ↓
useTextSynthesis() hook
    ↓
apiClient.synthesis.generateText()
    ↓
POST /api/synthesis/generate
    ↓
Backend: synthesis.py endpoint
    ↓
SynthesisEngine service
    ↓
OpenAI/Anthropic API
    ↓
Response with generated text
    ↓
Frontend: Display result with copy/transform options
```

## 🧪 Testing Integration

### Test Backend Connectivity

```bash
# From frontend directory
curl http://localhost:8000/health

# Expected response:
{
  "status": "healthy",
  "version": "1.3.0",
  "database": "healthy",
  "redis": "healthy",
  "qdrant": "healthy",
  "timestamp": "2024-01-01T00:00:00"
}
```

### Test from Browser Console

```javascript
// Test search
fetch('http://localhost:8000/api/search/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'alchemy', limit: 5 })
})
  .then(r => r.json())
  .then(console.log);

// Test semantic analysis
fetch('http://localhost:8000/api/semantic/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'The alchemist sought the philosopher stone',
    analyze_symbols: true,
    analyze_energy: true
  })
})
  .then(r => r.json())
  .then(console.log);
```

## 🐛 Troubleshooting

### CORS Issues

If you see CORS errors:

1. Check backend CORS settings in `backend/app/core/config.py`
2. Verify `CORS_ORIGINS` includes your frontend URL
3. Restart backend after changes

### Connection Refused

If frontend can't connect:

1. Check backend is running: `docker-compose ps`
2. Check port 8000 is accessible: `curl http://localhost:8000/health`
3. Verify `NEXT_PUBLIC_API_URL` in `.env.local`

### API Errors

If getting 500 errors:

1. Check backend logs: `docker-compose logs backend`
2. Verify all services are healthy: `curl http://localhost:8000/health`
3. Check database/Redis/Qdrant connectivity

## 📚 Next Steps

1. **Add Authentication**: Implement JWT auth for user endpoints
2. **Add Caching**: Use React Query for client-side caching
3. **Add Optimistic Updates**: Update UI before API response
4. **Add Error Boundaries**: Handle errors gracefully
5. **Add Loading States**: Better UX during API calls
6. **Add Offline Support**: Service workers and local storage

## 🤝 Contributing

When adding new endpoints:

1. **Backend**: Add endpoint in `backend/app/api/endpoints/`
2. **API Client**: Add method in `lib/api-client.ts`
3. **Hook**: Add hook in `lib/use-api.ts` (if needed)
4. **Component**: Create component using the hook
5. **Tests**: Add integration tests

## 📖 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [React Hooks](https://react.dev/reference/react)
- [Backend README](./backend/README.md)
- [Backend SETUP](./backend/SETUP.md)
