# OpenReplay Troubleshooting Guide

## Error: "Your website must be publicly accessible and running on SSL"

### ✅ FIXED
This has been automatically handled for localhost development. The tracker now disables secure mode when running on `localhost` or `127.0.0.1`.

### For Production
When you deploy to production, make sure your site:
- Uses HTTPS (SSL certificate)
- Is publicly accessible (not behind VPN or private network)

---

## Error: CORS Policy / "Failed to fetch" on localhost

### ⚠️ This is Normal for Localhost!

OpenReplay's API blocks requests from `localhost` and `127.0.0.1` due to CORS restrictions. This is **expected behavior** and not a bug.

### Solutions:

**Option 1: Use in Production (Recommended)**
- OpenReplay is designed for production environments
- Deploy your app to a server with HTTPS
- It will work perfectly there!

**Option 2: Use a Tunnel for Local Testing**
- Use a service like [ngrok](https://ngrok.com/) to create a public URL for your localhost
- Example: `ngrok http 3001`
- Access your app via the ngrok URL (e.g., `https://abc123.ngrok.io`)
- OpenReplay will work through the tunnel

**Option 3: Accept Limited Functionality**
- The app will work fine, but OpenReplay won't track on localhost
- This is fine for development
- All your code is correct and will work in production!

---

## Error: "Browser doesn't support required API, or doNotTrack is active"

This means either:
1. **Do Not Track is enabled** in your browser (most common)
2. Your browser is too old or missing required APIs

### How to Fix Do Not Track:

#### Chrome/Edge:
1. Click the **three dots** (⋮) → **Settings**
2. Go to **Privacy and security** → **Cookies and other site data**
3. Make sure **"Send a 'Do Not Track' request"** is **OFF**

#### Firefox:
1. Click the **menu** (☰) → **Settings**
2. Go to **Privacy & Security**
3. Under **Tracking Protection**, make sure **"Send websites a 'Do Not Track' signal"** is **UNCHECKED**

#### Safari:
1. Go to **Safari** → **Preferences**
2. Click **Privacy** tab
3. **UNCHECK** "Ask websites not to track me"

### After Disabling Do Not Track:
1. **Restart your browser** completely
2. **Restart your dev server** (`Ctrl+C` then `npm start`)
3. The error should be gone!

---

## Summary

| Issue | Status | Solution |
|-------|--------|----------|
| SSL/HTTPS error on localhost | ✅ Fixed | Automatically disabled for localhost |
| Do Not Track error | ⚠️ User Action Needed | Disable Do Not Track in browser settings |
| Missing project key | ⚠️ User Action Needed | Add `REACT_APP_OPENREPLAY_PROJECT_KEY` to `.env` |

---

## Quick Checklist

- [ ] Created `.env` file with your project key
- [ ] Disabled "Do Not Track" in browser
- [ ] Restarted browser after changing Do Not Track
- [ ] Restarted dev server (`npm start`)

After these steps, OpenReplay should work! 🎉

