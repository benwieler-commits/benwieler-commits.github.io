# Safe Area Insets Fix for Notches/Status Bars

## Issue
On devices with notches (like Pixel 6A), buttons in the header can be unclickable because they overlap with the system status bar.

## Solution
Add safe area insets to prevent content from being obscured by device UI elements.

---

## Changes for BOTH Apps

### 1. Update index.html viewport meta tag

**Find:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Replace with:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

---

### 2. Update styles.css - Add safe areas to body

**Find:**
```css
body {
    ...existing styles...
    overflow-x: hidden;
}
```

**Add this line BEFORE the closing brace:**
```css
    /* Add safe area padding for bottom nav bars and rounded corners */
    padding-bottom: env(safe-area-inset-bottom);
```

---

### 3. Update styles.css - Add safe areas to .app-header

#### For Player App:

**Find:**
```css
.app-header {
    background: rgba(0, 0, 0, 0.8);
    padding: 15px 20px;
    border-bottom: 3px solid var(--character-theme-color);
    ...
}
```

**Replace padding line and add safe area insets:**
```css
.app-header {
    background: rgba(0, 0, 0, 0.8);
    padding: 15px 20px;
    /* Add safe area padding for notches/status bars */
    padding-top: max(15px, env(safe-area-inset-top));
    padding-left: max(20px, env(safe-area-inset-left));
    padding-right: max(20px, env(safe-area-inset-right));
    border-bottom: 3px solid var(--character-theme-color);
    ...
}
```

#### For MC App:

**Find:**
```css
.app-header {
    background: rgba(30, 30, 50, 0.95);
    backdrop-filter: blur(15px);
    padding: 15px 30px;
    border-bottom: 3px solid #4A7C7E;
    ...
}
```

**Replace padding line and add safe area insets:**
```css
.app-header {
    background: rgba(30, 30, 50, 0.95);
    backdrop-filter: blur(15px);
    padding: 15px 30px;
    /* Add safe area padding for notches/status bars */
    padding-top: max(15px, env(safe-area-inset-top));
    padding-left: max(30px, env(safe-area-inset-left));
    padding-right: max(30px, env(safe-area-inset-right));
    border-bottom: 3px solid #4A7C7E;
    ...
}
```

---

## What This Does

- `viewport-fit=cover` - Allows the app to use the full screen
- `env(safe-area-inset-top)` - Adds padding equal to the status bar/notch height
- `env(safe-area-inset-left/right)` - Adds padding for curved edges
- `env(safe-area-inset-bottom)` - Adds padding for home indicators/nav bars
- `max()` - Uses whichever is larger: default padding OR safe area inset

This ensures buttons and content are always in the touchable area!

---

## Testing

After applying these changes:
1. Rebuild the APK (or sync Capacitor if using live reload)
2. Install on your device
3. The header buttons should now be fully clickable
4. Content at the bottom should not be cut off

---

## Browser Support

- ✅ iOS Safari 11+
- ✅ Chrome Android (Capacitor apps)
- ✅ All modern browsers
- ⚠️ Gracefully degrades on older browsers (uses default padding)
