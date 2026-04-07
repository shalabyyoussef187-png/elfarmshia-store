# Al-Farmashiia - Pharmacy E-commerce Platform

A modern, responsive pharmacy e-commerce application built with React, Vite, and Tailwind CSS.

## 🚀 Features

- ✨ Modern, responsive design with Tailwind CSS
- 🎨 Customizable color scheme (see [COLORS.md](./COLORS.md))
- 🧭 React Router for navigation
- 📱 Mobile-first responsive design
- 🎯 Arabic language support (RTL ready)
- ⚡ Fast development with Vite
- 🎨 Beautiful UI with React Icons

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Icons** - Icon library
- **PostCSS & Autoprefixer** - CSS processing

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Customizing Colors

This project uses a flexible color system. See **[COLORS.md](./COLORS.md)** for detailed instructions on how to customize the color scheme.

Quick example:

```javascript
// tailwind.config.js
primary: {
  500: '#YOUR_COLOR_HERE',
}
```

## 📁 Project Structure

```
pharma-test/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, logos, etc.
│   ├── components/     # React components
│   │   ├── Navbar.jsx
│   │   └── Hero.jsx
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles & Tailwind directives
├── tailwind.config.js  # Tailwind configuration & color variables
├── postcss.config.js   # PostCSS configuration
├── vite.config.js      # Vite configuration
└── COLORS.md          # Color customization guide
```

## 🧭 Current Routes

- `/` - Home page with hero section
- `/categories` - Product categories (placeholder)
- `/offers` - Special offers (placeholder)
- `/pharmacies` - Pharmacy locations (placeholder)

## 🔧 Development

The navbar currently includes:

- Logo (center)
- Navigation links (Arabic, RTL)
- Mobile responsive menu
- Reserved space for future features (search, cart, user menu)

## 📝 Next Steps

- [ ] Add search functionality
- [ ] Implement shopping cart
- [ ] Add user authentication
- [ ] Create product listing pages
- [ ] Add product detail pages
- [ ] Implement checkout flow

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for Al-Farmashiia
