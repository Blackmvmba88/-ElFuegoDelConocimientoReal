-- Migration Rollback: Remove GitHub OAuth fields from users table
-- Date: 2025-12-25
-- Description: Reverts the GitHub OAuth authentication changes

-- Drop indexes
DROP INDEX IF EXISTS idx_users_is_admin;
DROP INDEX IF EXISTS idx_users_is_creator;
DROP INDEX IF EXISTS idx_users_github_username;
DROP INDEX IF EXISTS idx_users_github_id;

-- Make hashed_password NOT NULL again (only if all users have passwords)
-- ALTER TABLE users ALTER COLUMN hashed_password SET NOT NULL;

-- Drop role management fields
ALTER TABLE users DROP COLUMN IF EXISTS is_admin;
ALTER TABLE users DROP COLUMN IF EXISTS is_creator;

-- Drop GitHub OAuth fields
ALTER TABLE users DROP COLUMN IF EXISTS avatar_url;
ALTER TABLE users DROP COLUMN IF EXISTS github_username;
ALTER TABLE users DROP COLUMN IF EXISTS github_id;
