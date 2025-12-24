# 🚀 Quick Start Guide - Phase 2 Features

## TL;DR - Get Everything Running in 5 Minutes

### 1. Start Backend Services

```bash
cd backend
cp .env.example .env
docker-compose up -d
```

**Services started:**
- PostgreSQL on `localhost:5432`
- Redis on `localhost:6379`
- Qdrant on `localhost:6333`
- FastAPI on `localhost:8000`

### 2. Start Frontend

```bash
# In project root
cp .env.example .env.local
npm install
npm run dev
```

Frontend running on `http://localhost:3000`

### 3. Verify Everything Works

```bash
# Check backend health
curl http://localhost:8000/health

# Expected response: all services "healthy"
```

## 📍 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Qdrant Dashboard**: http://localhost:6333/dashboard

## 🧪 Test the Features

### Test 1: Semantic Analysis

```bash
curl -X POST http://localhost:8000/api/semantic/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "The alchemist sought the philosopher stone with mercury and sulfur",
    "analyze_symbols": true,
    "analyze_energy": true
  }'
```

Should return detected symbols and elemental energy.

### Test 2: Search (once you have data)

```bash
curl -X POST http://localhost:8000/api/search/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "alchemy",
    "limit": 5
  }'
```

### Test 3: AI Generation (requires API key)

First, add your OpenAI or Anthropic key to `backend/.env`:

```bash
OPENAI_API_KEY=your-key-here
```

Then restart backend:

```bash
docker-compose restart backend
```

Generate text:

```bash
curl -X POST http://localhost:8000/api/synthesis/generate \
  -H "Content-Type: application/json" \
  -d '{
    "theme": "wisdom",
    "style": "alchemical"
  }'
```

## 🎨 Using the New Components

### In Any Next.js Page

```tsx
import EnhancedSearch from '@/components/EnhancedSearch';
import SemanticAnalyzer from '@/components/SemanticAnalyzer';
import TextSynthesizer from '@/components/TextSynthesizer';

export default function MyPage() {
  return (
    <div>
      {/* Semantic search with filters */}
      <EnhancedSearch />
      
      {/* Symbol and energy analysis */}
      <SemanticAnalyzer />
      
      {/* AI text generation */}
      <TextSynthesizer />
    </div>
  );
}
```

## 🔑 Required Configuration

### Minimum (works without AI)

**backend/.env:**
```bash
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/elfuego
REDIS_URL=redis://redis:6379/0
QDRANT_HOST=qdrant
QDRANT_PORT=6333
```

**.env.local (frontend):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Full (with AI features)

Add to `backend/.env`:
```bash
OPENAI_API_KEY=sk-...
# OR
ANTHROPIC_API_KEY=sk-ant-...
```

## 🆘 Troubleshooting

### "Connection refused" errors

```bash
# Check all services are running
docker-compose ps

# Should show 4 services: postgres, redis, qdrant, backend
# All should be "Up" or "healthy"
```

### Backend won't start

```bash
# View logs
docker-compose logs backend

# Common issues:
# - Port 8000 already in use: Stop other processes on that port
# - Database connection failed: Check postgres is running
```

### Frontend can't reach backend

1. Verify backend is accessible:
   ```bash
   curl http://localhost:8000/health
   ```

2. Check `.env.local` has correct API URL:
   ```bash
   cat .env.local
   # Should contain: NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. Restart frontend:
   ```bash
   npm run dev
   ```

## 📚 What Each Component Does

### EnhancedSearch
- Semantic search (meaning-based, not just keywords)
- Filter by: element (fire/water/air/earth/ether), symbols (alchemical/masonic/kabbalistic), author, language
- Shows hermetic metadata on results

### SemanticAnalyzer
- Detects 20+ hermetic symbols in text
- Analyzes elemental energy composition
- Shows correspondences between symbols
- Visual charts and breakdowns

### TextSynthesizer
- **Generate**: Create new hermetic texts on any theme
- **Transform**: Change style (modernize, archaize, simplify, amplify, poetize)
- **Fuse**: Combine multiple texts (coming soon)
- Requires OpenAI or Anthropic API key

## 🎯 Next Steps

1. **Add Books**: Implement book ingestion from Gutenberg API
2. **Test Components**: Try the new features in your pages
3. **Customize**: Adjust styling, add features
4. **Deploy**: Follow deployment guide when ready

## 📖 Full Documentation

- [Backend README](./backend/README.md)
- [Backend SETUP](./backend/SETUP.md)
- [Integration Guide](./docs/INTEGRATION.md)
- [Phase 2 Summary](./docs/PHASE2_SUMMARY.md)

## 🎉 You're Ready!

All Phase 2 features are now available:
- ✅ Backend API with 18 endpoints
- ✅ Semantic search and analysis
- ✅ AI text synthesis
- ✅ State synchronization
- ✅ 3 new React components
- ✅ Full TypeScript type safety
- ✅ Docker deployment

Start building! 🔥
