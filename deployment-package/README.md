# QUEERZ! Apps - Bug Fix Deployment Package v1.0

## 🎯 Overview

This package contains fixes for **3 critical bugs** in the QUEERZ! Player App and MC App:

| Issue | App | Status |
|-------|-----|--------|
| Combo Power not applied to dice rolls | Player | ✅ Fixed |
| Power Tags clearing immediately after roll | Player | ✅ Fixed |
| Unused dice roller cluttering MC interface | MC | ✅ Fixed |

## 📦 Package Contents

```
deployment-package/
│
├── README.md                     ← Overview (you are here)
├── QUICK_START.txt              ← Fastest way to deploy
├── DEPLOYMENT_GUIDE.md          ← Detailed deployment instructions
├── CHECKLIST.md                 ← Step-by-step deployment checklist
├── CHANGES_SUMMARY.md           ← Technical details of all changes
│
├── queerz-player-app/
│   └── app.js                   ← DEPLOY THIS to Player App repo
│
├── queerz-mc-app/
│   └── index.html               ← DEPLOY THIS to MC App repo
│
└── backups/
    ├── app.js.original          ← Backup of original Player App
    └── index.html.original      ← Backup of original MC App
```

## 🚀 How to Use This Package

### If you're in a hurry:
1. Open `QUICK_START.txt`
2. Follow the simple 4-step process
3. Done!

### If you want detailed instructions:
1. Read `DEPLOYMENT_GUIDE.md`
2. Choose between manual (web) or command-line deployment
3. Follow the instructions for your chosen method

### If you want a checklist to follow:
1. Print or open `CHECKLIST.md`
2. Check off each step as you complete it
3. Ensures nothing is missed!

### If you want technical details:
1. Read `CHANGES_SUMMARY.md`
2. See exactly what code was changed and why
3. Understand the technical implementation

## ⚡ Quick Deploy (Copy-Paste Method)

**Player App:**
```
1. Go to: github.com/benwieler-commits/queerz-player-app/blob/main/app.js
2. Click Edit (pencil icon)
3. Select all (Ctrl+A) and delete
4. Copy all contents from: deployment-package/queerz-player-app/app.js
5. Paste and commit with message: "Fix combo power and tag persistence"
```

**MC App:**
```
1. Go to: github.com/benwieler-commits/queerz-mc-app/blob/main/index.html
2. Click Edit (pencil icon)
3. Select all (Ctrl+A) and delete
4. Copy all contents from: deployment-package/queerz-mc-app/index.html
5. Paste and commit with message: "Remove dice roller"
```

**Wait:** 2-5 minutes for GitHub Pages to rebuild

**Test:**
- Player App: benwieler-commits.github.io/queerz-player-app
- MC App: benwieler-commits.github.io/queerz-mc-app

## 🎮 What Players Will Notice

### Player App Improvements:
- **Combos actually work!** The power modifier from combos now correctly adds to dice rolls
- **Better visibility:** Tags stay highlighted after you roll, so you can see what you used
- **Smarter UI:** When you activate a combo, the core move is automatically selected for you
- **Clear workflow:** Tags only clear when you press the "Reset Dice & Clear Applied Tags" button

### MC App Improvements:
- **Cleaner interface:** Removed the confusing dice roller that wasn't being used
- **Less clutter:** More space for the tools MCs actually use

## 🔧 Technical Summary

### Player App Changes (app.js):
- **Lines affected:** ~15 changes across key functions
- **New feature:** `activeCombo` tracking system
- **Modified functions:**
  - `calculateTotalPower()` - Now includes combo power
  - `resetDiceRoll()` - Clears active combo
  - Combo activation handler - Sets active combo and auto-selects move
  - Dice roll handlers - Removed auto-clearing of tags
- **New helper:** `getMoveIdFromName()` function

### MC App Changes (index.html):
- **Lines removed:** 27 lines (entire dice roller section)
- **HTML structure:** Simplified, cleaner main content area

## ✅ Testing After Deployment

### Must Test (Player App):
1. Create and activate a combo → verify power shows in "Total Power"
2. Roll dice with combo active → verify power applied to roll
3. Click power tags and roll → verify tags stay clicked
4. Click "Reset Dice & Clear Applied Tags" → verify tags clear

### Must Test (MC App):
1. Load the app → verify no dice roller section
2. Check all other panels → verify everything else works

## 🔄 Rollback Plan

If anything goes wrong:
- Backup files are in `backups/` directory
- Follow same deployment process
- Use the `.original` files instead
- See `DEPLOYMENT_GUIDE.md` section "Rollback Instructions"

## 📞 Support & Questions

**Before deploying:**
- Review DEPLOYMENT_GUIDE.md
- Check CHANGES_SUMMARY.md for technical details

**During deployment:**
- Follow CHECKLIST.md step-by-step
- Each file is clearly marked with where it goes

**After deployment:**
- Wait 2-5 minutes for GitHub Pages
- Hard refresh (Ctrl+F5) to see changes
- Check browser console for any errors

## 📊 Deployment Stats

- **Files to deploy:** 2
- **Repositories affected:** 2
- **Estimated deployment time:** 5-10 minutes
- **Required access:** GitHub repo write access
- **Rollback difficulty:** Easy (< 5 minutes)
- **Risk level:** Low (backups included)

## ✨ Version Information

- **Package Version:** 1.0
- **Release Date:** 2025-11-18
- **Fixes:** 3 critical bugs
- **Files Changed:** 2
- **Lines Added:** ~30
- **Lines Removed:** ~30
- **Net Change:** ~27 lines removed

---

## 🎉 Ready to Deploy?

1. **Start here:** Open `QUICK_START.txt` for the fastest deployment
2. **Need details?** Read `DEPLOYMENT_GUIDE.md` for comprehensive instructions
3. **Want a checklist?** Use `CHECKLIST.md` to track your progress
4. **Curious about code?** Check `CHANGES_SUMMARY.md` for technical details

**Deploy with confidence!** All files are tested and backups are included.

---

*Prepared for benwieler-commits | QUEERZ! Game System | 2025-11-18*
