# 🚀 Quick Start Guide - Al-Farmashiia

## Get Running in 60 Seconds

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open Your Browser

Navigate to: `http://localhost:5173`

---

## What You'll See

✅ **Home Page** with:

- Animated hero section
- Categories grid (8 categories)
- Featured products (18 products)
- Trusted brands (12 brands)

✅ **Fully Working Features:**

- Shopping cart (click any "Add to Cart")
- Product details (click any product)
- Category filtering
- Cart page with checkout UI
- Responsive mobile design
- Arabic/English toggle

---

## Quick Navigation

| URL                   | Page                   |
| --------------------- | ---------------------- |
| `/`                   | Home Page              |
| `/cart`               | Shopping Cart          |
| `/category/skin-care` | Skin Care Products     |
| `/product/1`          | Product Detail Example |
| `/offers`             | Special Offers         |
| `/pharmacies`         | Store Locations        |

---

## Testing the Cart

1. **Add Items:** Click "Add to Cart" on any product
2. **View Cart:** Click cart icon in navbar (shows badge count)
3. **Manage Cart:**
   - Change quantities with +/- buttons
   - Remove items with trash icon
   - See total price calculation

**Note:** Cart persists in localStorage - items stay even after page refresh!

---

## Project Structure at a Glance

```
src/
├── components/
│   ├── common/          # ProductCard, CategoryCard, Button
│   ├── layout/          # Navbar, Footer
│   └── sections/        # Hero, ProductsSection, etc.
├── pages/               # Home, Cart, ProductDetail
├── context/             # CartContext (shopping cart state)
├── data/                # Mock products, categories, brands
└── App.jsx              # Main app with routing
```

---

## Key Files to Know

| File                                    | Purpose                             |
| --------------------------------------- | ----------------------------------- |
| `src/data/products.js`                  | 18 mock products - edit to add more |
| `src/data/categories.js`                | 8 categories - add your own         |
| `src/context/CartContext.jsx`           | Shopping cart logic                 |
| `src/components/common/ProductCard.jsx` | Product display component           |
| `tailwind.config.js`                    | Colors and theme customization      |

---

## Common Tasks

### Add a New Product

Edit `src/data/products.js`:

```javascript
{
  id: 19,
  name: "Your Product",
  nameAr: "منتجك",
  price: 299,
  originalPrice: 350,
  discount: 15,
  image: "https://your-image-url.jpg",
  category: "skin-care",
  // ... etc
}
```

### Change Brand Colors

Edit `tailwind.config.js`:

```javascript
primary: {
  500: '#YOUR_COLOR',  // Main brand color
  600: '#DARKER_SHADE',
}
```

Then restart dev server: `Ctrl+C` and `npm run dev`

### Add a New Page

1. Create file: `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`:

```jsx
<Route path="/your-page" element={<YourPage />} />
```

---

## Troubleshooting

### Port 5173 Already in Use?

```bash
npm run dev -- --port 3000
```

### Styles Not Updating?

1. Stop server (Ctrl+C)
2. Clear cache: `rm -rf node_modules/.vite`
3. Restart: `npm run dev`

### Cart Not Working?

Check browser console (F12) for errors. Make sure `CartProvider` wraps your app in `App.jsx`.

---

## Next Steps

1. ✅ Run the project
2. 📖 Read **DEVELOPER_GUIDE.md** for detailed docs
3. 🎨 Check **COLORS.md** for color customization
4. 📁 Review **PROJECT_STRUCTURE.md** for architecture
5. 🔨 Start building your features!

---

## Need Help?

- **Project Structure:** See `PROJECT_STRUCTURE.md`
- **Full Documentation:** See `DEVELOPER_GUIDE.md`
- **Colors Guide:** See `COLORS.md`
- **Main README:** See `README.md`

---

**Built with ❤️ using React + Vite + Tailwind CSS**
