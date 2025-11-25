# 🚀 QUEERZ! Apps - Deployment Guide

## 📦 Package Contents

This deployment package contains fixes for three critical issues:
1. **Combo Power not applied to dice rolls** ✅
2. **Power Tags clearing too early** ✅
3. **Unnecessary dice roller in MC App** ✅

## 📁 Directory Structure

```
deployment-package/
├── DEPLOYMENT_GUIDE.md          ← You are here
├── CHANGES_SUMMARY.md            ← Detailed technical changes
├── queerz-player-app/
│   └── app.js                    ← FIXED Player App JavaScript
├── queerz-mc-app/
│   └── index.html                ← FIXED MC App HTML
└── backups/
    ├── app.js.original           ← Original Player App (backup)
    └── index.html.original       ← Original MC App (backup)
```

## 🎯 Quick Deployment Steps

### Option A: Manual Deployment via GitHub Web Interface

#### For Player App:
1. Go to: https://github.com/benwieler-commits/queerz-player-app
2. Navigate to `app.js` file
3. Click the pencil icon (Edit)
4. Delete all contents
5. Copy the contents from `deployment-package/queerz-player-app/app.js`
6. Paste into GitHub editor
7. Scroll down and commit:
   - Commit message: "Fix combo power application and tag clearing behavior"
   - Click "Commit changes"

#### For MC App:
1. Go to: https://github.com/benwieler-commits/queerz-mc-app
2. Navigate to `index.html` file
3. Click the pencil icon (Edit)
4. Delete all contents
5. Copy the contents from `deployment-package/queerz-mc-app/index.html`
6. Paste into GitHub editor
7. Scroll down and commit:
   - Commit message: "Remove unused dice roller section"
   - Click "Commit changes"

### Option B: Deployment via Git Command Line

#### For Player App:
```bash
# Navigate to your local queerz-player-app repository
cd /path/to/queerz-player-app

# Backup current file (optional)
cp app.js app.js.backup

# Copy the fixed file
cp /path/to/deployment-package/queerz-player-app/app.js .

# Commit and push
git add app.js
git commit -m "Fix combo power application and tag clearing behavior

- Combo power now correctly adds to dice rolls
- Power tags remain clicked until 'Clear Dice' button is pressed
- Auto-select core move when combo is activated
- Added activeCombo tracking to characterData"

git push origin main
```

#### For MC App:
```bash
# Navigate to your local queerz-mc-app repository
cd /path/to/queerz-mc-app

# Backup current file (optional)
cp index.html index.html.backup

# Copy the fixed file
cp /path/to/deployment-package/queerz-mc-app/index.html .

# Commit and push
git add index.html
git commit -m "Remove unused dice roller section from MC app"

git push origin main
```

## ✅ Post-Deployment Verification

### Test Player App:
1. Go to: https://benwieler-commits.github.io/queerz-player-app
2. Wait 2-5 minutes for GitHub Pages to update (hard refresh if needed: Ctrl+F5)
3. **Test Combo Power:**
   - Create a combo with Power 2-4
   - Activate the combo
   - Check that "Total Power" shows the combo power
   - Roll dice and verify the power is applied
4. **Test Tag Persistence:**
   - Click on power tags
   - Roll the dice
   - Verify tags remain clicked/highlighted
   - Click "Reset Dice & Clear Applied Tags"
   - Verify tags return to normal state

### Test MC App:
1. Go to: https://benwieler-commits.github.io/queerz-mc-app
2. Wait 2-5 minutes for GitHub Pages to update (hard refresh if needed: Ctrl+F5)
3. Verify the dice roller section is gone
4. Verify all other sections (Broadcast, Player Tags, etc.) still work

## 🔄 Rollback Instructions

If you need to rollback to the original versions:

### Player App Rollback:
```bash
cd /path/to/queerz-player-app
cp /path/to/deployment-package/backups/app.js.original app.js
git add app.js
git commit -m "Rollback to previous version"
git push origin main
```

### MC App Rollback:
```bash
cd /path/to/queerz-mc-app
cp /path/to/deployment-package/backups/index.html.original index.html
git add index.html
git commit -m "Rollback to previous version"
git push origin main
```

## 📋 What Changed?

### Player App (app.js):
- Added `activeCombo` field to track active combos
- Modified `calculateTotalPower()` to include combo power
- Added `getMoveIdFromName()` helper function
- Updated combo activation to set active combo and auto-select move
- Removed auto-clearing of tags after dice rolls
- Tags now only clear when "Reset Dice & Clear Applied Tags" is clicked

### MC App (index.html):
- Removed entire dice roller section (lines 172-198)

## 🆘 Troubleshooting

**Issue:** Changes not showing up after deployment
- **Solution:** Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
- **Solution:** Wait 5 minutes for GitHub Pages to rebuild
- **Solution:** Check browser developer console for errors

**Issue:** Combo power still not applying
- **Solution:** Make sure you clear your browser cache
- **Solution:** Verify the file was uploaded correctly by checking the GitHub repository

**Issue:** Tags not staying clicked
- **Solution:** Verify you deployed the correct app.js file
- **Solution:** Check that you're clicking "Reset Dice & Clear Applied Tags" not just refreshing

## 📞 Support

If you encounter any issues during deployment:
1. Check the CHANGES_SUMMARY.md for technical details
2. Verify the files were copied correctly
3. Check GitHub Pages is enabled for both repositories
4. Allow 5 minutes for changes to propagate

## ✨ What's New for Players?

After deployment, players will notice:
- **Combos work correctly**: Power modifiers now actually apply to rolls!
- **Better tag visibility**: Tags stay highlighted after rolling so you can see what you used
- **Auto move selection**: When you activate a combo, the associated core move is automatically selected
- **Cleaner MC app**: No more confusing unused dice roller

---

**Deployment Date:** 2025-11-18
**Package Version:** 1.0
**Fixes Applied:** 3 critical bugs
