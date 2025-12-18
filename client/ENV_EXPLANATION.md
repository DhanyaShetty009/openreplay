# Understanding .env Files

## Why Two Files?

### 1. `.env.example` (Template File)
- **Purpose**: A template that shows what environment variables are needed
- **Contains**: Placeholder values (like `your_project_key_here`)
- **Committed to Git**: ✅ YES - Safe to commit, no secrets
- **Used by**: Other developers to know what to set up

### 2. `.env` (Your Actual Config)
- **Purpose**: Contains your real/actual values
- **Contains**: Real API keys, passwords, secrets
- **Committed to Git**: ❌ NO - Should NEVER be committed (in .gitignore)
- **Used by**: Your app at runtime

## The Current Situation

You **only have** `.env.example` right now, which is why you're getting the warning.

You need to **create** a `.env` file with your actual OpenReplay project key.

## How to Fix

1. Copy `.env.example` to `.env`:
   ```
   cp .env.example .env
   ```
   (Or just create a new `.env` file)

2. Edit `.env` and replace `your_project_key_here` with your real project key from OpenReplay

3. Restart your dev server (React only reads .env at startup)

## Current Status

✅ `.env.example` - Template (exists, safe to commit)
❌ `.env` - Your actual config (doesn't exist yet - you need to create this!)

