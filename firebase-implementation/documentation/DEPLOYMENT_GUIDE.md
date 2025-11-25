# 🔥 Firebase Dice Roll Sync - Deployment Guide

## 📋 Overview

This guide will help you deploy Firebase synchronization to both the MC App and Player App repositories.

**Repositories:**
- MC App: `github.com/benwieler-commits/queerz-mc-app`
- Player App: `github.com/benwieler-commits/queerz-player-app`

---

## 🎯 Step 1: Firebase Project Setup (10 minutes)

### 1.1 Create Firebase Project

1. Go to: https://console.firebase.google.com/
2. Click "Add project"
3. Project name: `QUEERZ-Game` (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create project"

### 1.2 Enable Realtime Database

1. In left sidebar: Click "Realtime Database"
2. Click "Create Database"
3. Location: Choose closest to your users
4. Security rules: Start in **test mode** (we'll update later)
5. Click "Enable"

### 1.3 Set Database Rules

1. Go to "Realtime Database" > "Rules" tab
2. Replace with:

```json
{
  "rules": {
    "sessions": {
      "$sessionId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

3. Click "Publish"

### 1.4 Get Firebase Configuration

1. Go to Project Settings (gear icon) > General
2. Scroll to "Your apps" section
3. Click "</>" (Web app icon)
4. Register app name: `QUEERZ-MC` (you'll create two apps)
5. Copy the `firebaseConfig` object:

```javascript
const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

6. **SAVE THIS** - you'll need it for both apps

---

## 🎮 Step 2: Clone and Prepare Repositories

### 2.1 Clone MC App Repository

```bash
cd ~/projects  # or wherever you keep your repos
git clone https://github.com/benwieler-commits/queerz-mc-app.git
cd queerz-mc-app
git checkout -b firebase-dice-roll-sync
```

### 2.2 Clone Player App Repository

```bash
cd ~/projects
git clone https://github.com/benwieler-commits/queerz-player-app.git
cd queerz-player-app
git checkout -b firebase-dice-roll-sync
```

---

## 📦 Step 3: Deploy MC App Files

### 3.1 Copy New Files

From this implementation directory, copy these files to `queerz-mc-app/`:

```bash
# Navigate to where you saved the firebase-implementation files
cd /path/to/firebase-implementation/mc-app-files

# Copy to MC App repo
cp firebase-config.js ~/projects/queerz-mc-app/
cp firebase-broadcast.js ~/projects/queerz-mc-app/
cp app.js ~/projects/queerz-mc-app/
```

### 3.2 Update Firebase Config

Edit `queerz-mc-app/firebase-config.js`:

1. Replace `YOUR_API_KEY` etc. with your Firebase config from Step 1.4
2. Save the file

### 3.3 Modify index.html

Open `queerz-mc-app/index.html` and make these changes:

#### Change 1: Add Firebase SDK to `<head>` (around line 10)

**ADD BEFORE** closing `</head>` tag:

```html
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>

    <!-- Firebase Config & Broadcast -->
    <script src="firebase-config.js"></script>
    <script src="firebase-broadcast.js"></script>
</head>
```

#### Change 2: Add Dice Roll Monitor Panel (after line 131)

**ADD AFTER** the Player Tags container:

```html
        <!-- DICE ROLL MONITOR PANEL -->
        <section class="panel">
            <div class="panel-header">
                <h3>🎲 Player Dice Rolls</h3>
                <button class="header-btn" id="clearRollsBtn">🗑️ Clear All</button>
            </div>
            <div id="diceRollContainer">
                <p style="color: var(--text-secondary); text-align: center; padding: 20px;">
                    Waiting for player rolls...
                </p>
            </div>
        </section>

        <!-- STORY & STATUS TAG BROADCAST PANEL -->
        <section class="panel">
            <div class="panel-header">
                <h3>🏷️ Send Tags to Players</h3>
            </div>

            <!-- Player/Group Selector -->
            <div class="tag-target-selector" style="margin-bottom: 20px;">
                <label>
                    <strong>Send To:</strong>
                    <select id="tagTargetSelect" class="styled-select">
                        <option value="group">📢 Entire Group</option>
                    </select>
                </label>
            </div>

            <!-- Story Tags -->
            <div class="tag-broadcast-section">
                <h4>📖 Story Tags (Clue Reminders)</h4>
                <p style="font-size: 0.9em; color: var(--text-secondary); margin-bottom: 10px;">
                    Format: 'example-tag' • Ongoing until removed • No playback interrupt
                </p>
                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                    <input
                        type="text"
                        id="storyTagInput"
                        class="text-input"
                        placeholder="Enter story tag (e.g., 'hidden-passage')"
                        style="flex: 1;"
                    >
                    <button class="btn-primary" id="sendStoryTagBtn">
                        ➕ Add Story Tag
                    </button>
                </div>

                <div id="activeStoryTagsList" style="margin-top: 10px;">
                    <p style="color: var(--text-secondary); font-size: 0.9em;">No active story tags</p>
                </div>
            </div>

            <hr style="margin: 20px 0; border: 1px solid var(--border-color);">

            <!-- Status Tags -->
            <div class="tag-broadcast-section">
                <h4>⚠️ Status Tags (Negative Statuses)</h4>
                <p style="font-size: 0.9em; color: var(--text-secondary); margin-bottom: 10px;">
                    Format: 'example-tag-1' to 'example-tag-6' • Ongoing • Negative to Power
                </p>
                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                    <input
                        type="text"
                        id="statusTagNameInput"
                        class="text-input"
                        placeholder="Enter status name (e.g., 'shaken')"
                        style="flex: 1;"
                    >
                    <select id="statusTagTierSelect" class="styled-select" style="width: 120px;">
                        <option value="1">Tier 1</option>
                        <option value="2">Tier 2</option>
                        <option value="3">Tier 3</option>
                        <option value="4">Tier 4</option>
                        <option value="5">Tier 5</option>
                        <option value="6">Tier 6</option>
                    </select>
                    <button class="btn-primary" id="sendStatusTagBtn">
                        ➕ Add Status Tag
                    </button>
                </div>

                <div id="activeStatusTagsList" style="margin-top: 10px;">
                    <p style="color: var(--text-secondary); font-size: 0.9em;">No active status tags</p>
                </div>
            </div>
        </section>
```

#### Change 3: Update script tags at bottom

**FIND** (near end of file):

```html
    <script src="firebase-config.js"></script>
    <script src="firebase-broadcast.js"></script>
```

**REPLACE WITH:**

```html
    <!-- Firebase already loaded in head -->
    <script src="app.js"></script>
    <script src="campaign-manager-mc.js"></script>
```

### 3.4 Add CSS Styles

See `mc-app-styles-additions.css` in the documentation folder for complete CSS to add to `styles.css`.

---

## 📱 Step 4: Deploy Player App Files

### 4.1 Copy New Files

```bash
cd /path/to/firebase-implementation/player-app-files

cp firebase-config.js ~/projects/queerz-player-app/
cp firebase-broadcast.js ~/projects/queerz-player-app/
```

### 4.2 Update Firebase Config

Edit `queerz-player-app/firebase-config.js`:

1. Use the **SAME** Firebase config as MC App
2. Save the file

### 4.3 Modify app.js

See `player-app-modifications.md` for detailed line-by-line changes to make to the existing `app.js` file.

**Key additions:**
- Import Firebase functions (top of file)
- Add session management code (~300 lines)
- Update DOMContentLoaded event
- Add MC broadcast handlers

### 4.4 Modify index.html

**ADD BEFORE** closing `</body>` tag:

```html
    <!-- SESSION JOIN MODAL -->
    <div class="modal" id="sessionJoinModal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2>🎮 Join Game Session</h2>
            </div>
            <p style="margin-bottom: 15px;">Enter the Session ID provided by your MC:</p>
            <input
                type="text"
                class="text-input"
                id="sessionIdInput"
                placeholder="e.g., session-abc123"
                style="margin-bottom: 15px;"
            >
            <div class="modal-buttons">
                <button class="btn-primary" id="joinSessionBtn">Join Session</button>
            </div>
        </div>
    </div>

    <!-- FOLIO CENTER DISPLAY -->
    <div id="folioCenterDisplay" style="display: none;">
        <div class="folio-content">
            <div id="folioEnvironment" class="folio-section"></div>
            <div id="folioNPC" class="folio-section"></div>
            <div id="folioMusic" class="folio-section"></div>
        </div>
    </div>

    <!-- MC MOVE RESULT NOTIFICATION -->
    <div id="mcMoveResultNotification" style="display: none;"></div>

    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>

    <!-- Firebase Config & Broadcast -->
    <script src="firebase-config.js"></script>
    <script src="firebase-broadcast.js"></script>
</body>
```

### 4.5 Add CSS Styles

See `player-app-styles-additions.css` in the documentation folder for complete CSS to add to `styles.css`.

---

## ✅ Step 5: Test Everything

### 5.1 Local Testing

```bash
# MC App
cd ~/projects/queerz-mc-app
python3 -m http.server 8000

# Player App (in new terminal)
cd ~/projects/queerz-player-app
python3 -m http.server 8001
```

Open:
- MC App: http://localhost:8000
- Player App: http://localhost:8001

### 5.2 Testing Checklist

- [ ] MC App loads without console errors
- [ ] MC App displays Session ID
- [ ] Player App shows Session Join modal
- [ ] Player can join MC's session
- [ ] Player dice roll appears in MC App
- [ ] MC can select and send move result
- [ ] Player receives move result modal
- [ ] MC can send Story Tag
- [ ] Player receives Story Tag notification
- [ ] MC can send Status Tag
- [ ] Player receives Status Tag (power updates)
- [ ] MC can broadcast Environment/NPC/Music
- [ ] Music stops only on location change

---

## 🚀 Step 6: Commit and Push

### 6.1 MC App

```bash
cd ~/projects/queerz-mc-app
git add .
git commit -m "Add Firebase dice roll sync and tag broadcasting

- Add Firebase configuration and broadcast system
- Add dice roll monitor panel for viewing player rolls
- Add Hard/Soft move result assignment
- Add Story Tag and Status Tag broadcasting
- Add real-time player connection management
- Broadcast Environment, NPC, and Music to all players
- Music stops only on location changes"

git push -u origin firebase-dice-roll-sync
```

### 6.2 Player App

```bash
cd ~/projects/queerz-player-app
git add .
git commit -m "Add Firebase dice roll sync and MC broadcast reception

- Add Firebase configuration and broadcast system
- Add session join functionality with modal
- Add MC broadcast listeners for tags and media
- Add Story Tag and Status Tag reception with notifications
- Add Folio display for Environment, NPC, and Music
- Add Hard/Soft move result display
- Automatic dice roll broadcasting to MC
- Non-intrusive tag notifications"

git push -u origin firebase-dice-roll-sync
```

### 6.3 Create Pull Requests

1. Go to https://github.com/benwieler-commits/queerz-mc-app
2. Click "Compare & pull request" for `firebase-dice-roll-sync` branch
3. Title: "Add Firebase dice roll sync and tag broadcasting"
4. Add testing checklist to description
5. Create pull request

Repeat for Player App repository.

---

## 🔒 Step 7: Security (Production)

### Before going live, update Firebase Rules:

```json
{
  "rules": {
    "sessions": {
      "$sessionId": {
        ".read": "auth != null",
        ".write": "auth != null",
        ".validate": "newData.hasChildren(['timestamp'])",
        "$message": {
          ".validate": "newData.isString() || newData.hasChildren()"
        }
      }
    }
  }
}
```

### Add Anonymous Authentication:

In `firebase-config.js` (both apps), add after initialization:

```javascript
// Anonymous authentication
firebase.auth().signInAnonymously()
    .then(() => {
        console.log('🔐 Authenticated anonymously');
    })
    .catch((error) => {
        console.error('❌ Auth error:', error);
    });
```

---

## 📞 Troubleshooting

### Issue: "Firebase is not defined"
**Fix:** Ensure Firebase SDK scripts load BEFORE firebase-config.js

### Issue: No data in Firebase Console
**Fix:** Check Database Rules allow read/write

### Issue: Rolls not appearing
**Fix:** Verify both apps use same Session ID

### Issue: Tags not removing
**Fix:** Check onclick handlers reference global functions

---

## 🎉 Success!

You've successfully implemented Firebase synchronization between the MC and Player apps!

**Next steps:**
- Test with multiple players
- Customize tag categories
- Add session passwords (optional)
- Deploy to GitHub Pages or your hosting

---

**Need help?** Check the full implementation guide in this repository or open an issue on GitHub.
