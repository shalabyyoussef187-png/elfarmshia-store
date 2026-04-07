# Color Customization Guide

This project uses a dual approach for color management: **Tailwind CSS color palette** and **CSS custom properties**.

## Quick Color Change

### Method 1: Tailwind Config (Recommended)

Edit `tailwind.config.js` to change the entire color scheme:

```javascript
colors: {
  primary: {
    // Change these hex values to your brand color
    500: '#0ea5e9', // Main primary color
    600: '#0284c7', // Darker shade
    // ... other shades
  },
}
```

### Method 2: CSS Variables (Quick Tweaks)

Edit `src/index.css` for quick RGB color adjustments:

```css
:root {
  --color-primary: 14 165 233; /* RGB values */
  --color-secondary: 217 70 239;
  --color-accent: 16 185 129;
}
```

## Current Color Scheme

### Primary Colors (Blue)

- **Primary 500** (#0ea5e9) - Main brand color
- Used for: Links, buttons, accents
- RGB: `14 165 233`

### Secondary Colors (Purple)

- **Secondary 500** (#d946ef) - Accent color
- Used for: Special highlights, badges
- RGB: `217 70 239`

### Accent Colors (Green)

- **Accent 500** (#10b981) - Success/wellness color
- Used for: Success states, wellness features
- RGB: `16 185 129`

### Neutral Colors (Gray)

- **Neutral 900** (#171717) - Text
- **Neutral 700** (#404040) - Secondary text
- **Neutral 200** (#e5e5e5) - Borders

## Where Colors Are Used

### Primary Color

- Navigation links hover state
- CTA buttons background
- Category carousel navigation buttons
- Active indicators

### Secondary Color

- Future special promotions
- Premium badges
- Decorative elements

### Accent Color

- Success messages
- Wellness/health related features
- Feature card accents

### Neutral Colors

- All text content
- Borders and dividers
- Background shades

## Changing Colors Globally

1. **For complete rebrand**: Update `tailwind.config.js`
2. **For quick tweaks**: Update CSS variables in `src/index.css`
3. **Both files work together**, CSS variables use RGB format for Tailwind compatibility

## Example: Pharmacy Green Theme

```javascript
// tailwind.config.js
primary: {
  500: '#10b981', // Green instead of blue
}
```

```css
/* src/index.css */
:root {
  --color-primary: 16 185 129; /* Green RGB */
}
```

## Tips

- Use a color palette generator (coolors.co, tailwindshades.com)
- Maintain color contrast for accessibility (AA standard minimum)
- Test colors in both light and dark environments
- Keep consistent color meaning (e.g., red for errors, green for success)
