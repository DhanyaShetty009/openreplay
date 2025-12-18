# OpenReplay Setup Instructions

## The Error You're Seeing

If you see this error:
```
OpenReplay: projectKey is missing or wrong type (string is expected)
```

It means you need to set up your OpenReplay project key.

## How to Fix

### Step 1: Get Your OpenReplay Project Key

1. Sign up at [OpenReplay](https://app.openreplay.com/)
2. Create a new project (or use an existing one)
3. Copy your project key from the project settings

### Step 2: Create `.env` File

Create a file named `.env` in the `client` directory with the following content:

```env
REACT_APP_OPENREPLAY_PROJECT_KEY=your_actual_project_key_here
```

Replace `your_actual_project_key_here` with your actual project key from OpenReplay.

### Step 3: Optional - Custom Ingest Point

If you're using a self-hosted OpenReplay instance, add:

```env
REACT_APP_OPENREPLAY_INGEST_POINT=https://your-custom-ingest-point.com
```

### Step 4: Restart Your Dev Server

After creating the `.env` file, you must restart your React development server:

1. Stop the server (Ctrl+C)
2. Start it again: `npm start`

**Important**: React only reads environment variables at startup, so you must restart!

## Example `.env` File

```env
# Required: Your OpenReplay project key
REACT_APP_OPENREPLAY_PROJECT_KEY=abc123xyz456

# Optional: Custom ingest point (leave commented if using default)
# REACT_APP_OPENREPLAY_INGEST_POINT=https://api.openreplay.com
```

## What Happens Now?

- ✅ If the key is set: OpenReplay will start and track sessions
- ⚠️ If the key is missing: The app will work normally, but OpenReplay won't track (no error shown)

## Note About Other Errors

The other messages you see are **not errors**:

1. **React DevTools message** - Just a helpful suggestion (can be ignored)
2. **Cross-origin subframe messages** - Normal browser security warnings when loading external websites in iframes (can be ignored)
3. **"play" message** - This is just console.log output from your code (line 208 in App.js)

The only real error was the OpenReplay projectKey one, which is now fixed! 🎉

