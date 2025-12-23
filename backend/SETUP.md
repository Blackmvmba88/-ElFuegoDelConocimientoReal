# 🔧 Backend Setup Guide

Complete guide for setting up and running the El Fuego del Conocimiento Real backend.

## 📋 Prerequisites

- Python 3.11 or higher
- Docker and Docker Compose (recommended)
- PostgreSQL 16 (if not using Docker)
- Redis 7 (if not using Docker)

## 🚀 Quick Start with Docker

The easiest way to get started is using Docker Compose, which will set up all required services:

```bash
# Navigate to backend directory
cd backend

# Copy environment file
cp .env.example .env

# Start all services (PostgreSQL, Redis, Qdrant, and Backend API)
docker-compose up -d

# Check services are running
docker-compose ps

# View logs
docker-compose logs -f backend

# Test the API
curl http://localhost:8000/health
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive API Docs**: http://localhost:8000/docs
- **Qdrant Dashboard**: http://localhost:6333/dashboard

## 🐍 Local Development Setup

For local development without Docker:

### 1. Install Python Dependencies

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy model (for NLP)
python -m spacy download en_core_web_sm
```

### 2. Start Required Services

Start PostgreSQL, Redis, and Qdrant using Docker Compose (without the backend):

```bash
docker-compose up -d postgres redis qdrant
```

Or install them locally:

**PostgreSQL:**
```bash
# Ubuntu/Debian
sudo apt-get install postgresql-16

# macOS
brew install postgresql@16

# Create database
createdb elfuego
```

**Redis:**
```bash
# Ubuntu/Debian
sudo apt-get install redis-server

# macOS
brew install redis

# Start Redis
redis-server
```

**Qdrant:**
```bash
# Using Docker (recommended)
docker run -p 6333:6333 -p 6334:6334 \
    -v $(pwd)/qdrant_storage:/qdrant/storage \
    qdrant/qdrant
```

### 3. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit with your settings
nano .env
```

Update at minimum:
- `DATABASE_URL`: Your PostgreSQL connection string
- `REDIS_URL`: Your Redis connection string
- `QDRANT_HOST`: Qdrant host (default: localhost)

Optional for AI features:
- `OPENAI_API_KEY`: Your OpenAI API key
- `ANTHROPIC_API_KEY`: Your Anthropic API key

### 4. Initialize Database

```bash
# TODO: Once Alembic migrations are added
# alembic upgrade head
```

### 5. Run the Server

```bash
# Development mode with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 🧪 Running Tests

```bash
# Activate virtual environment first
source venv/bin/activate

# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html --cov-report=term

# Run specific test file
pytest tests/test_api.py -v

# View coverage report
open htmlcov/index.html
```

## 📊 Verify Installation

Test that all services are working:

```bash
# Health check (should return status of all services)
curl http://localhost:8000/health

# List hermetic symbols
curl http://localhost:8000/api/semantic/symbols

# Test semantic analysis
curl -X POST http://localhost:8000/api/semantic/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "The alchemist sought the philosopher stone through mercury and sulfur",
    "analyze_symbols": true,
    "analyze_energy": true,
    "analyze_correspondences": true
  }'
```

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DEBUG` | Enable debug mode | `false` |
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `8000` |
| `DATABASE_URL` | PostgreSQL connection string | See .env.example |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379/0` |
| `QDRANT_HOST` | Qdrant host | `localhost` |
| `QDRANT_PORT` | Qdrant port | `6333` |
| `OPENAI_API_KEY` | OpenAI API key | None |
| `ANTHROPIC_API_KEY` | Anthropic API key | None |
| `EMBEDDING_MODEL` | Sentence transformer model | `sentence-transformers/all-MiniLM-L6-v2` |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost:3000,http://localhost:8000` |

### Docker Compose Services

The `docker-compose.yml` includes:

1. **PostgreSQL** (port 5432): Primary database
2. **Redis** (port 6379): Caching and sessions
3. **Qdrant** (ports 6333, 6334): Vector database for semantic search
4. **Backend API** (port 8000): FastAPI application

All services include health checks and volume persistence.

## 🚨 Troubleshooting

### Port Already in Use

```bash
# Find process using port 8000
lsof -i :8000
# or
netstat -tulpn | grep 8000

# Kill the process
kill -9 <PID>
```

### Database Connection Issues

```bash
# Check PostgreSQL is running
docker-compose ps postgres

# View PostgreSQL logs
docker-compose logs postgres

# Connect to PostgreSQL shell
docker-compose exec postgres psql -U postgres -d elfuego
```

### Redis Connection Issues

```bash
# Check Redis is running
docker-compose ps redis

# Test Redis connection
docker-compose exec redis redis-cli ping
# Should return: PONG
```

### Qdrant Connection Issues

```bash
# Check Qdrant is running
docker-compose ps qdrant

# View Qdrant logs
docker-compose logs qdrant

# Check collections
curl http://localhost:6333/collections
```

### Import Errors

Make sure you're in the correct directory and virtual environment:

```bash
# Should be in backend/ directory
pwd

# Virtual environment should be activated
which python  # Should point to venv/bin/python
```

### Missing Dependencies

```bash
# Reinstall all dependencies
pip install -r requirements.txt --force-reinstall
```

## 🔄 Development Workflow

1. **Make Changes**: Edit files in `app/`
2. **Auto-Reload**: Server automatically reloads with `--reload` flag
3. **Test**: Run pytest to verify changes
4. **Format**: Use black for code formatting
   ```bash
   black app/ tests/
   ```
5. **Lint**: Check code with flake8
   ```bash
   flake8 app/ tests/
   ```

## 📦 Adding New Dependencies

```bash
# Install package
pip install package-name

# Update requirements
pip freeze > requirements.txt

# Or add to pyproject.toml for poetry
poetry add package-name
```

## 🔐 Security Notes

- Never commit `.env` file
- Use strong `SECRET_KEY` in production
- Enable HTTPS in production
- Rotate API keys regularly
- Use environment-specific credentials

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Qdrant Documentation](https://qdrant.tech/documentation/)
- [Sentence Transformers](https://www.sbert.net/)

## 🤝 Need Help?

- Check the [main README](../README.md)
- Review [backend README](./README.md)
- Open an issue on GitHub
- Check existing documentation in `/docs`

---

**Happy Coding! 🔥**
