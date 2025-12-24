# Backend - El Fuego del Conocimiento Real

Backend API for El Fuego del Conocimiento Real, providing AI-powered semantic analysis, intelligent search, and text synthesis capabilities.

## 🏗️ Architecture

- **FastAPI**: Modern, fast web framework
- **PostgreSQL**: Primary database for storing books, users, and metadata
- **Redis**: Cache and session management
- **Qdrant**: Vector database for semantic search
- **Sentence Transformers**: Text embeddings
- **OpenAI/Anthropic**: AI text synthesis (optional)

## 🚀 Quick Start

### Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# Check service health
curl http://localhost:8000/health

# View logs
docker-compose logs -f backend
```

### Local Development

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Start PostgreSQL, Redis, and Qdrant
docker-compose up -d postgres redis qdrant

# Run database migrations
# alembic upgrade head  # TODO: Add migrations

# Start the server
uvicorn app.main:app --reload
```

The API will be available at:
- API: http://localhost:8000
- Interactive docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

## 📚 API Endpoints

### Health & Monitoring
- `GET /health` - Health check for all services
- `GET /metrics` - Prometheus metrics (WIP)

### Search
- `POST /api/search/search` - Semantic search for books
- `GET /api/search/suggestions` - Search suggestions
- `GET /api/search/filters` - Available search filters

### Semantic Analysis
- `POST /api/semantic/analyze` - Analyze text for hermetic symbols and energy
- `GET /api/semantic/symbols` - List all known symbols
- `GET /api/semantic/elements` - List elemental correspondences

### Synthesis (AI)
- `POST /api/synthesis/synthesize` - Synthesize new texts
- `POST /api/synthesis/transform` - Transform existing text
- `POST /api/synthesis/generate` - Generate original hermetic text

### State Synchronization
- `POST /api/sync/sessions` - Create new session
- `GET /api/sync/sessions/{token}` - Get session data
- `PUT /api/sync/sessions/{token}/state` - Update session state
- `POST /api/sync/sessions/{token}/sync` - Sync across devices
- `POST /api/sync/sessions/{token}/events` - Record event
- `GET /api/sync/sessions/{token}/events` - Get session events

## 🧪 Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# View coverage report
open htmlcov/index.html
```

## 📊 Database Schema

### Tables
- **users**: User accounts and progression
- **books**: Indexed books from various sources
- **library_items**: User's personal library
- **search_history**: User search queries
- **annotations**: User notes on books
- **synthesized_texts**: AI-generated texts
- **hermetic_symbols**: Symbol database
- **sessions**: User sessions for state sync

## 🔧 Configuration

All configuration is managed through environment variables. See `.env.example` for available options.

Key configurations:
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `QDRANT_HOST/PORT`: Qdrant vector database
- `OPENAI_API_KEY`: OpenAI API key (optional)
- `ANTHROPIC_API_KEY`: Anthropic API key (optional)

## 🔐 Security

- API keys should never be committed to the repository
- Use strong `SECRET_KEY` in production
- Configure CORS origins appropriately
- Use HTTPS in production

## 📈 Performance

- Redis caching for frequent queries
- Vector search with Qdrant for semantic similarity
- Database connection pooling
- Async request handling with FastAPI

## 🛠️ Development

### Adding New Endpoints

1. Create endpoint in `app/api/endpoints/`
2. Add route to `app/main.py`
3. Create/update schemas in `app/schemas/`
4. Add tests in `tests/`

### Adding New Models

1. Define model in `app/models/models.py`
2. Create Alembic migration
3. Run migration with `alembic upgrade head`

## 📝 TODO

- [ ] Add authentication and authorization
- [ ] Implement user management endpoints
- [ ] Add book ingestion from Gutenberg API
- [ ] Create database migrations with Alembic
- [ ] Add comprehensive tests
- [ ] Implement rate limiting
- [ ] Add caching layer for expensive operations
- [ ] Implement background jobs for text processing
- [ ] Add monitoring with Prometheus
- [ ] Create admin panel

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

## 📄 License

This backend is part of El Fuego del Conocimiento Real project and follows the same dual licensing:
- Code: MIT License
- Content: CC BY-NC-SA 4.0
