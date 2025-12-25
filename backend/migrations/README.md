# Database Migrations

This directory contains SQL migration scripts for the database schema.

## Running Migrations

### Apply Migration

```bash
# Using psql
psql -U postgres -d elfuego -f migrations/001_add_github_oauth_fields.sql
```

### Rollback Migration

```bash
# Using psql
psql -U postgres -d elfuego -f migrations/001_add_github_oauth_fields_rollback.sql
```

## Migration History

### 001_add_github_oauth_fields.sql
**Date:** 2025-12-25
**Description:** Adds GitHub OAuth authentication fields and role management to the users table

**Changes:**
- Added `github_id` (unique, indexed)
- Added `github_username` (indexed)
- Added `avatar_url`
- Added `is_creator` (boolean, indexed)
- Added `is_admin` (boolean, indexed)
- Made `hashed_password` nullable for OAuth users
- Added indexes for better query performance

**Rollback:** `001_add_github_oauth_fields_rollback.sql`

## Future Migrations

When using Alembic (recommended for production):

```bash
# Initialize Alembic
alembic init alembic

# Create a new migration
alembic revision -m "description"

# Apply migrations
alembic upgrade head

# Rollback migrations
alembic downgrade -1
```
