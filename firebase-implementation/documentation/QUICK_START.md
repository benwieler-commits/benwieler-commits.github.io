# ⚡ Quick Start Guide

## TL;DR - Get Running in 15 Minutes

### 1. Firebase Setup (5 min)

```bash
1. Go to https://console.firebase.google.com/
2. Create project "QUEERZ-Game"
3. Enable Realtime Database (test mode)
4. Copy your config from Project Settings
```

### 2. Clone Repos (2 min)

```bash
cd ~/projects
git clone https://github.com/benwieler-commits/queerz-mc-app.git
git clone https://github.com/benwieler-commits/queerz-player-app.git
```

### 3. Copy Implementation Files (3 min)

**For MC App:**
```bash
cd queerz-mc-app
# Copy these files from firebase-implementation/mc-app-files/:
# - firebase-config.js (update with your config)
# - firebase-broadcast.js
# - app.js
```

**For Player App:**
```bash
cd queerz-player-app
# Copy these files from firebase-implementation/player-app-files/:
# - firebase-config.js (same config as MC)
# - firebase-broadcast.js
```

### 4. Modify Files (5 min)

**MC App - index.html:**
- Add Firebase SDK in `<head>`
- Add Dice Roll Monitor Panel
- Add Tag Broadcast Panel
- Add `<script src="app.js"></script>` at bottom

**Player App - app.js:**
- Add session management code (see player-app-modifications.md)
- Update imports at top
- Update DOMContentLoaded

**Player App - index.html:**
- Add Session Join Modal before `</body>`
- Add Folio Display divs
- Add Firebase SDK scripts

### 5. Test (3 min)

```bash
# Terminal 1
cd queerz-mc-app && python3 -m http.server 8000

# Terminal 2
cd queerz-player-app && python3 -m http.server 8001

# Open in browser:
# MC: http://localhost:8000
# Player: http://localhost:8001
```

**Test:**
1. MC App: Note Session ID in header
2. Player App: Enter Session ID in modal
3. Player App: Select move, roll dice
4. MC App: See roll appear, select move result, send
5. Player App: See result modal

### 6. Deploy

```bash
cd queerz-mc-app
git checkout -b firebase-dice-roll-sync
git add .
git commit -m "Add Firebase dice roll sync"
git push -u origin firebase-dice-roll-sync

cd ../queerz-player-app
git checkout -b firebase-dice-roll-sync
git add .
git commit -m "Add Firebase dice roll sync"
git push -u origin firebase-dice-roll-sync
```

---

## File Checklist

### MC App - New Files:
- ✅ `firebase-config.js`
- ✅ `firebase-broadcast.js`
- ✅ `app.js`

### MC App - Modified Files:
- ✅ `index.html` (add panels + SDK)
- ✅ `styles.css` (add styles from mc-app-styles-additions.css)

### Player App - New Files:
- ✅ `firebase-config.js`
- ✅ `firebase-broadcast.js`

### Player App - Modified Files:
- ✅ `app.js` (add session code - see player-app-modifications.md)
- ✅ `index.html` (add modals + SDK)
- ✅ `styles.css` (add styles from player-app-styles-additions.css)

---

## What Gets Synced?

### Player → MC:
- Dice roll results (move, dice, power, total)
- Player name, pronouns
- Juice, Clues
- Current tags

### MC → Player:
- Hard/Soft move results
- Story Tags ('example-tag')
- Status Tags ('example-tag-1' to '-6')
- Environment images
- NPC portraits
- Music tracks

---

## Key Features

✅ **Dice Roll Monitor** - MC sees all player rolls in real-time
✅ **Move Assignment** - MC assigns Hard (6-) or Soft (7-9) moves
✅ **Story Tags** - Ongoing clue reminders, non-intrusive
✅ **Status Tags** - Negative to Power, tiered 1-6
✅ **Media Broadcast** - Environment, NPC, Music to all players
✅ **Smart Music** - Stops only on location change
✅ **Target Selection** - Send tags to individual or group

---

## Need More Detail?

See `DEPLOYMENT_GUIDE.md` for complete step-by-step instructions.
