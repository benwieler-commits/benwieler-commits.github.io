# QUEERZ! Player App & MC App - Bug Fixes Summary

## Issues Fixed

### 1. Player App: Combo Power Modifier Not Applied to Dice Rolls ✅
**Problem:** When using a Tag Combo, the Power modifier was displayed in an alert but not actually added to the dice roll calculation.

**Solution:**
- Added `activeCombo` field to `characterData` to track when a combo is active
- Modified `calculateTotalPower()` function to include combo power in the calculation
- Updated combo activation code to store the combo details in `activeCombo`
- Added auto-selection of the combo's Core Move when a combo is activated
- Modified `resetDiceRoll()` to clear the active combo when the player clicks "Reset Dice & Clear Applied Tags"
- Added helper function `getMoveIdFromName()` to convert move display names to internal IDs

**Files Modified:**
- `app.js`

**Changes Made:**
1. Line 45: Added `activeCombo: null` to characterData
2. Lines 542-554: Added `getMoveIdFromName()` helper function
3. Lines 1635-1640: Added combo power to `calculateTotalPower()` function
4. Line 1679: Added `characterData.activeCombo = null;` to reset function
5. Lines 2015-2039: Updated combo activation to set activeCombo and auto-select move
6. Updated alert message to inform players about combo power being applied

### 2. Player App: Power Tags Clear Too Early ✅
**Problem:** Power Tags were being cleared immediately after rolling dice, making them unavailable even though they were burnt. The tags should remain clicked/unavailable until the player presses "Reset Dice & Clear Applied Tags".

**Solution:**
- Removed `clearAppliedTags()` calls from both the normal dice roll handler and the "Burn for Guaranteed Hit" handler
- Tags now remain in their clicked state after rolling, so players can see which tags they used
- Tags are only cleared when the player explicitly clicks the "Reset Dice & Clear Applied Tags" button

**Files Modified:**
- `app.js`

**Changes Made:**
1. Line 768: Removed `clearAppliedTags()` from normal roll handler
2. Line 901: Removed `clearAppliedTags()` from burn for guaranteed hit handler
3. Added comments explaining that tags remain clicked until reset

### 3. MC App: Remove Dice Roller ✅
**Problem:** The MC App had a dice roller section that was redundant and not being used.

**Solution:**
- Completely removed the dice roller section (lines 172-198)

**Files Modified:**
- `index.html`

**Changes Made:**
1. Removed the entire "DICE ROLLER" section including:
   - Move name input
   - Power modifier input
   - Roll 2d6 button
   - Dice display formula
   - Roll result display

## Testing Recommendations

### Player App Testing:
1. **Test Combo Power Application:**
   - Create a tag combo with a specific power value (e.g., 2-4)
   - Activate the combo
   - Verify the combo power is added to the "Total Power" display
   - Roll the dice and verify the combo power is included in the calculation
   - Check that the combo's Core Move is auto-selected

2. **Test Tags Remaining Clicked:**
   - Click on power tags to apply them to a roll
   - Roll the dice
   - Verify the tags remain in their "clicked/applied" state (visually highlighted)
   - Click "Reset Dice & Clear Applied Tags" button
   - Verify tags return to their normal state

3. **Test Tag Burning with Combos:**
   - Activate a combo
   - Verify both tags are marked as burnt
   - Try to use the same combo again - should see error message
   - Use "Recover All Burnt Tags" button
   - Verify the combo can be used again

### MC App Testing:
1. **Verify Dice Roller Removed:**
   - Load the MC App
   - Confirm there is no dice roller section visible
   - Verify all other functionality remains intact

## Deployment Instructions

1. **For Player App (queerz-player-app repository):**
   - Replace `app.js` with the fixed version from `/home/user/fixes/player-app/app.js`
   - Commit and push changes
   - Deploy to GitHub Pages

2. **For MC App (queerz-mc-app repository):**
   - Replace `index.html` with the fixed version from `/home/user/fixes/mc-app/index.html`
   - Commit and push changes
   - Deploy to GitHub Pages

## Technical Details

### New Data Structure:
```javascript
characterData.activeCombo = {
    name: "Combo Name",
    power: 3,
    coreMove: "Strike a Pose"
}
```

### Power Calculation Flow:
1. Count clicked power tags (+1 each)
2. Count clicked weakness tags (-1 each)
3. Add MC-assigned status tags (ongoing or clicked temporary)
4. Add MC-assigned story tags (ongoing or clicked temporary)
5. **NEW:** Add active combo power (if combo is active)
6. Display total and breakdown

### Tag Lifecycle:
1. Player clicks tag → tag marked as "applied" (added to clickedTags array)
2. Player rolls dice → tags remain applied/clicked
3. Player clicks "Reset Dice & Clear Applied Tags" → tags cleared from clickedTags array
4. **Burnt tags** are separate and persist until recovered

## Known Considerations

- The combo power remains active until the player clicks "Reset Dice & Clear Applied Tags"
- Players can still click additional tags even after activating a combo
- The combo's core move is auto-selected but can be manually changed
- Burnt tags from combos must be recovered before the combo can be used again
