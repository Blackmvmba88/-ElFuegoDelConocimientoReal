-- Migration: Add GitHub OAuth fields to users table
-- Date: 2025-12-25
-- Description: Adds GitHub OAuth authentication fields and role management to the users table

-- Add GitHub OAuth fields
ALTER TABLE users ADD COLUMN IF NOT EXISTS github_id VARCHAR UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS github_username VARCHAR;
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url VARCHAR;

-- Add role management fields
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_creator BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Make hashed_password nullable for OAuth users
ALTER TABLE users ALTER COLUMN hashed_password DROP NOT NULL;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_github_id ON users(github_id);
CREATE INDEX IF NOT EXISTS idx_users_github_username ON users(github_username);
CREATE INDEX IF NOT EXISTS idx_users_is_creator ON users(is_creator);
CREATE INDEX IF NOT EXISTS idx_users_is_admin ON users(is_admin);

-- Comments for documentation
COMMENT ON COLUMN users.github_id IS 'GitHub user ID for OAuth authentication';
COMMENT ON COLUMN users.github_username IS 'GitHub username';
COMMENT ON COLUMN users.avatar_url IS 'User avatar URL from GitHub';
COMMENT ON COLUMN users.is_creator IS 'True if user is the project creator (configured in CREATOR_GITHUB_USERNAME)';
COMMENT ON COLUMN users.is_admin IS 'True if user has admin privileges';
