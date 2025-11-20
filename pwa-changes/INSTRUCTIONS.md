# PWA Changes - Installation Instructions

## What's Here

This folder contains all the PWA (Progressive Web App) changes for both QUEERZ apps:

- `player-app/` - Files for queerz-player-app
- `mc-app/` - Files for queerz-mc-app

## How to Apply These Changes

### Step 1: Copy Files to Each Repository

**For Player App:**
```bash
cd /path/to/queerz-player-app

# Copy all new files
cp -r /path/to/pwa-changes/player-app/icons ./
cp /path/to/pwa-changes/player-app/manifest.json ./
cp /path/to/pwa-changes/player-app/service-worker.js ./
cp /path/to/pwa-changes/player-app/PWA-README.md ./
```

**For MC App:**
```bash
cd /path/to/queerz-mc-app

# Copy all new files
cp -r /path/to/pwa-changes/mc-app/icons ./
cp /path/to/pwa-changes/mc-app/manifest.json ./
cp /path/to/pwa-changes/mc-app/service-worker.js ./
cp /path/to/pwa-changes/mc-app/PWA-README.md ./
```

### Step 2: Apply index.html Changes

**Player App:**
```bash
cd /path/to/queerz-player-app
git apply /path/to/pwa-changes/player-app/index.html.patch
```

**MC App:**
```bash
cd /path/to/queerz-mc-app
git apply /path/to/pwa-changes/mc-app/index.html.patch
```

### Step 3: Create Branch, Commit, and Push

**For Each App:**
```bash
# Create new branch
git checkout -b claude/pwa-mobile-conversion-01H1pwaAyyfrUfX9NpYBWpB2

# Stage all changes
git add .

# Commit
git commit -m "Add Progressive Web App (PWA) support for mobile conversion"

# Push to GitHub
git push -u origin claude/pwa-mobile-conversion-01H1pwaAyyfrUfX9NpYBWpB2
```

### Step 4: Test

Once pushed, deploy to GitHub Pages or your hosting platform and test:

1. Open the app on a mobile device (HTTPS required!)
2. Look for "Add to Home Screen" prompt
3. Install the app
4. Test offline functionality

## What Changed

### New Files:
- `manifest.json` - PWA configuration
- `service-worker.js` - Offline caching logic
- `icons/` - App icons (8 sizes)
- `PWA-README.md` - Full documentation

### Modified Files:
- `index.html` - Added PWA meta tags and service worker registration

## Need Help?

See `PWA-README.md` in each app folder for detailed documentation.
