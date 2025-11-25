# 🔥 Firebase Dice Roll Sync - Implementation Package

This directory contains all files needed to implement Firebase synchronization between the QUEERZ! MC App and Player App.

## 📁 Directory Structure

```
firebase-implementation/
├── README.md (this file)
├── mc-app-files/              # Files for MC App
│   ├── firebase-config.js
│   ├── firebase-broadcast.js
│   └── app.js                 # COMPLETE NEW FILE - See note below
├── player-app-files/          # Files for Player App
│   ├── firebase-config.js
│   ├── firebase-broadcast.js
│   └── (app.js modifications - see documentation)
└── documentation/
    ├── DEPLOYMENT_GUIDE.md    # Full step-by-step guide
    ├── QUICK_START.md         # 15-minute quick start
    └── (additional guides)
```

---

## 🚀 How to Use This Package

### Option 1: Quick Start (Recommended)

1. **Read:** `documentation/QUICK_START.md`
2. **Setup Firebase:** Follow Firebase project creation steps
3. **Copy Files:** Copy files from `mc-app-files/` and `player-app-files/` to respective repos
4. **Modify:** Make the HTML/CSS changes documented in DEPLOYMENT_GUIDE.md
5. **Test:** Run local servers and test
6. **Deploy:** Commit and push to your repos

### Option 2: Detailed Implementation

1. **Read:** `documentation/DEPLOYMENT_GUIDE.md`
2. **Follow each step** precisely
3. **Use checklists** to verify completion

---

## 📍 Current Location

These files are in your local repository:

```
/home/user/benwieler-commits.github.io/firebase-implementation/
```

This is your **deployment package repository**, NOT the actual MC/Player app repos.

---

## 🎯 Where to Deploy

You need to copy these files to the actual app repositories:

### MC App Repository
**GitHub:** `https://github.com/benwieler-commits/queerz-mc-app`
**Clone:**
```bash
cd ~/projects
git clone https://github.com/benwieler-commits/queerz-mc-app.git
```

**Files to copy:**
- `firebase-config.js` ← Copy from `mc-app-files/`
- `firebase-broadcast.js` ← Copy from `mc-app-files/`
- `app.js` ← **IMPORTANT: See note below**

**Files to modify:**
- `index.html` (add panels, SDK)
- `styles.css` (add new styles)

### Player App Repository
**GitHub:** `https://github.com/benwieler-commits/queerz-player-app`
**Clone:**
```bash
cd ~/projects
git clone https://github.com/benwieler-commits/queerz-player-app.git
```

**Files to copy:**
- `firebase-config.js` ← Copy from `player-app-files/`
- `firebase-broadcast.js` ← Copy from `player-app-files/`

**Files to modify:**
- `app.js` (add session management - see DEPLOYMENT_GUIDE)
- `index.html` (add modals, SDK)
- `styles.css` (add new styles)

---

## ⚠️ IMPORTANT: MC App app.js

The MC App needs a NEW `app.js` file. Since this is a large file (~700 lines), I'll provide it in the complete chat history above.

**To create it:**

1. Navigate to your MC App repo:
   ```bash
   cd ~/projects/queerz-mc-app
   ```

2. Create the file:
   ```bash
   touch app.js
   ```

3. Copy the complete MC app.js code from the implementation guide in the chat above (search for "MC APP - MAIN APPLICATION LOGIC")

4. Or reference it from this repository if you commit it

---

## 🔑 Firebase Configuration

**CRITICAL:** Both apps must use the **SAME** Firebase configuration.

1. Create your Firebase project: https://console.firebase.google.com/
2. Get your config object from Project Settings
3. Replace in BOTH `firebase-config.js` files:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_ACTUAL_API_KEY",
       authDomain: "your-project.firebaseapp.com",
       databaseURL: "https://your-project.firebaseio.com",
       projectId: "your-project",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "123456789",
       appId: "1:123456789:web:abc123"
   };
   ```

---

## ✅ Implementation Checklist

### Firebase Setup
- [ ] Create Firebase project
- [ ] Enable Realtime Database
- [ ] Set database rules (test mode)
- [ ] Copy configuration

### MC App
- [ ] Clone repository
- [ ] Create feature branch: `firebase-dice-roll-sync`
- [ ] Copy `firebase-config.js` (update config)
- [ ] Copy `firebase-broadcast.js`
- [ ] Create `app.js` (see chat history)
- [ ] Modify `index.html` (add panels)
- [ ] Modify `styles.css` (add styles)
- [ ] Test locally
- [ ] Commit and push
- [ ] Create pull request

### Player App
- [ ] Clone repository
- [ ] Create feature branch: `firebase-dice-roll-sync`
- [ ] Copy `firebase-config.js` (same config as MC)
- [ ] Copy `firebase-broadcast.js`
- [ ] Modify `app.js` (add session code)
- [ ] Modify `index.html` (add modals)
- [ ] Modify `styles.css` (add styles)
- [ ] Test locally
- [ ] Commit and push
- [ ] Create pull request

### Testing
- [ ] MC App loads without errors
- [ ] Player App shows session join modal
- [ ] Player can join MC session
- [ ] Dice rolls appear in MC App
- [ ] MC can assign move results
- [ ] Player receives move results
- [ ] Tags broadcast correctly
- [ ] Media broadcasts correctly
- [ ] Music stops only on location change

---

## 📚 Documentation Files

### QUICK_START.md
- 15-minute implementation guide
- Essential steps only
- Perfect for experienced developers

### DEPLOYMENT_GUIDE.md
- Complete step-by-step guide
- Detailed explanations
- Troubleshooting section
- Security considerations

---

## 🔧 Getting the Actual Repos

Since you can't push to both repos from here, you need to:

1. **On your local machine or wherever you have git access:**

```bash
# Create a working directory
mkdir ~/queerz-firebase-implementation
cd ~/queerz-firebase-implementation

# Clone both repos
git clone https://github.com/benwieler-commits/queerz-mc-app.git
git clone https://github.com/benwieler-commits/queerz-player-app.git

# Clone this deployment package (to get the implementation files)
git clone https://github.com/benwieler-commits/benwieler-commits.github.io.git

# Copy files from benwieler-commits.github.io/firebase-implementation/
# to the respective app repos
```

2. **Or download the files:**

From this chat, save each file locally, then copy to your repos.

---

## 💡 Tips

1. **Use the same Firebase config** in both apps
2. **Test locally first** before pushing
3. **Use feature branches** for safety
4. **Create pull requests** for review
5. **Check Firebase Console** to see data flow
6. **Use browser console** for debugging

---

## 🆘 Need Help?

1. Check `DEPLOYMENT_GUIDE.md` Troubleshooting section
2. Check browser console for errors (F12)
3. Check Firebase Console > Realtime Database
4. Verify all files are in place
5. Verify Firebase config is correct

---

## 🎉 What You Get

- ✅ Real-time dice roll synchronization
- ✅ Hard/Soft move assignment by MC
- ✅ Story Tag broadcasting (clue reminders)
- ✅ Status Tag broadcasting (negative to power)
- ✅ Environment/NPC/Music broadcasting
- ✅ Smart music control (stops only on location change)
- ✅ Individual or group tag targeting
- ✅ Session-based multiplayer support
- ✅ Non-intrusive notifications
- ✅ Mobile-responsive design

---

**Created:** 2025-11-25
**For:** QUEERZ! Tabletop RPG Companion Apps
**Repositories:**
- MC App: github.com/benwieler-commits/queerz-mc-app
- Player App: github.com/benwieler-commits/queerz-player-app
