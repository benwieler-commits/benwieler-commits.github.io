# 📋 Deployment Checklist

Use this checklist to ensure a smooth deployment process.

## Pre-Deployment

- [ ] Read QUICK_START.txt
- [ ] Review CHANGES_SUMMARY.md to understand what's being fixed
- [ ] Ensure you have access to both GitHub repositories
- [ ] Note current time (for tracking GitHub Pages rebuild)

## Player App Deployment

- [ ] Navigate to https://github.com/benwieler-commits/queerz-player-app
- [ ] Click on `app.js` file
- [ ] Click the pencil icon (Edit this file)
- [ ] Select all content (Ctrl+A / Cmd+A)
- [ ] Delete selected content
- [ ] Open `deployment-package/queerz-player-app/app.js` in a text editor
- [ ] Copy entire contents
- [ ] Paste into GitHub editor
- [ ] Scroll to bottom of page
- [ ] Add commit message: "Fix combo power application and tag clearing behavior"
- [ ] Click "Commit changes"
- [ ] Wait for commit to complete
- [ ] Verify commit appears in repository history

## MC App Deployment

- [ ] Navigate to https://github.com/benwieler-commits/queerz-mc-app
- [ ] Click on `index.html` file
- [ ] Click the pencil icon (Edit this file)
- [ ] Select all content (Ctrl+A / Cmd+A)
- [ ] Delete selected content
- [ ] Open `deployment-package/queerz-mc-app/index.html` in a text editor
- [ ] Copy entire contents
- [ ] Paste into GitHub editor
- [ ] Scroll to bottom of page
- [ ] Add commit message: "Remove unused dice roller section"
- [ ] Click "Commit changes"
- [ ] Wait for commit to complete
- [ ] Verify commit appears in repository history

## Post-Deployment Wait

- [ ] Note deployment completion time
- [ ] Wait 2-5 minutes for GitHub Pages to rebuild
- [ ] Get a coffee ☕ or stretch 🧘

## Testing - Player App

- [ ] Navigate to https://benwieler-commits.github.io/queerz-player-app
- [ ] Hard refresh page (Ctrl+F5 or Cmd+Shift+R)
- [ ] Create a character (or load existing)
- [ ] Create a tag combo with Power value 2-4
- [ ] Activate the combo
- [ ] Check "Total Power" field shows combo power
- [ ] Verify combo's core move is auto-selected
- [ ] Click on 2-3 power tags
- [ ] Roll the dice
- [ ] Verify power calculation includes combo + clicked tags
- [ ] Verify tags remain highlighted/clicked after roll
- [ ] Click "Reset Dice & Clear Applied Tags"
- [ ] Verify tags return to normal state
- [ ] Verify combo power is cleared

## Testing - MC App

- [ ] Navigate to https://benwieler-commits.github.io/queerz-mc-app
- [ ] Hard refresh page (Ctrl+F5 or Cmd+Shift+R)
- [ ] Verify NO dice roller section is visible
- [ ] Verify Broadcast panel works
- [ ] Verify Player Tags panel works
- [ ] Verify Campaign Progress panel works
- [ ] Verify Encounter Counters work

## Final Verification

- [ ] Player App: All 3 combo tests passed
- [ ] Player App: Tag persistence test passed
- [ ] MC App: Dice roller removed
- [ ] MC App: All other features work
- [ ] No console errors in browser developer tools
- [ ] No broken layout or missing elements

## Completion

- [ ] Document deployment date and time
- [ ] Notify players of fixes
- [ ] Archive deployment package for records
- [ ] Celebrate! 🎉

---

## Rollback (If Needed)

If something goes wrong:

- [ ] Locate backups in `deployment-package/backups/`
- [ ] Follow same deployment process above
- [ ] Use `app.js.original` for Player App
- [ ] Use `index.html.original` for MC App
- [ ] Test to ensure rollback successful
- [ ] Investigate what went wrong before re-attempting

---

**Deployment Date:** ____________

**Deployed By:** ____________

**Status:** ☐ Success  ☐ Rollback Required  ☐ Issues (see notes)

**Notes:**
_____________________________________________________________
_____________________________________________________________
_____________________________________________________________
