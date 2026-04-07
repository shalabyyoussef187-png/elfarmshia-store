# Developer Guide - Al-Farmashiia E-Commerce Platform

**Version:** 1.0.0  
**Last Updated:** April 3, 2026  
**Author:** Development Team

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Architecture Overview](#architecture-overview)
4. [Component Library](#component-library)
5. [State Management](#state-management)
6. [Data Flow](#data-flow)
7. [Routing](#routing)
8. [Styling Guide](#styling-guide)
9. [Best Practices](#best-practices)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)

---

## Introduction

Al-Farmashiia is a modern, full-featured pharmacy e-commerce platform built to provide a seamless shopping experience for medical products, cosmetics, and health supplements. The application is designed with scalability, maintainability, and user experience as top priorities.

### Key Features

- ✅ Complete shopping cart system with persistence
- ✅ Product catalog with filtering and search
- ✅ Bilingual support (Arabic & English)
- ✅ Responsive design for all devices
- ✅ Professional UI with smooth animations
- ✅ Category-based navigation
- ✅ Product detail pages with ratings
- ✅ Special offers and discounts

---

## Getting Started

### Prerequisites

```bash
Node.js >= 16.0.0
npm >= 8.0.0
```

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser at http://localhost:5173
```

### Environment Setup

No environment variables required for local development. All configuration is in code.

---

## Architecture Overview

### Technology Stack

| Technology   | Version  | Purpose          |
| ------------ | -------- | ---------------- |
| React        | 18.3.x   | UI Framework     |
| Vite         | 5.x      | Build Tool       |
| Tailwind CSS | 3.x      | Styling          |
| React Router | 6.x      | Routing          |
| React Icons  | 5.x      | Icons            |
| Context API  | Built-in | State Management |

### Folder Structure Philosophy

```
src/
├── components/          # All React components
│   ├── common/         # Reusable UI components (atomic design)
│   ├── layout/         # App-wide layout components
│   └── sections/       # Page-specific sections
├── pages/              # Route-level components
├── context/            # Global state management
├── data/               # Mock data & helpers
└── assets/             # Static files (images, logos)
```

**Design Pattern:** We follow the **Atomic Design** principle:

- **Atoms:** Button, Badge (in `common/`)
- **Molecules:** ProductCard, CategoryCard (in `common/`)
- **Organisms:** ProductsSection, CategoriesSection (in `sections/`)
- **Templates:** Navbar, Footer (in `layout/`)
- **Pages:** Home, ProductDetail (in `pages/`)

---

## Component Library

### Common Components

#### 1. ProductCard

**Location:** `src/components/common/ProductCard.jsx`

Displays a product with all necessary information and actions.

```jsx
import ProductCard from "./components/common/ProductCard";

<ProductCard product={productObject} language="en" />;
```

**Props:**

- `product` (Object, required): Product data
- `language` (String): "en" or "ar"

**Features:**

- Discount badge
- Wishlist toggle
- Add to cart with animation
- Rating display
- Image hover effect
- Responsive design

**State:**

- `isWishlisted`: Boolean
- `showAddedAnimation`: Boolean (2s timeout)

---

#### 2. CategoryCard

**Location:** `src/components/common/CategoryCard.jsx`

Shows a category with image overlay and description.

```jsx
import CategoryCard from "./components/common/CategoryCard";

<CategoryCard category={categoryObject} language="en" />;
```

**Features:**

- Image with gradient overlay
- Hover animation (scale effect)
- Arrow icon on hover
- Bilingual text support

---

#### 3. Button

**Location:** `src/components/common/Button.jsx`

Reusable button component with multiple variants.

```jsx
import Button from "./components/common/Button";

<Button
  variant="primary"
  size="md"
  icon={<IoCart />}
  onClick={handleClick}
  disabled={false}
>
  Button Text
</Button>;
```

**Props:**
| Prop | Type | Default | Options |
|------|------|---------|---------|
| variant | String | "primary" | primary, secondary, outline, danger, success |
| size | String | "md" | sm, md, lg |
| icon | ReactNode | null | Any icon component |
| onClick | Function | null | Event handler |
| disabled | Boolean | false | - |
| type | String | "button" | button, submit, reset |
| className | String | "" | Additional Tailwind classes |

---

### Layout Components

#### 1. Navbar

**Location:** `src/components/layout/Navbar.jsx`

Main navigation bar with cart, search, and language toggle.

**Features:**

- Shopping cart icon with badge (shows total items)
- Search bar with RTL support
- Language switcher (AR/EN)
- Mobile hamburger menu
- Sticky positioning
- Backdrop blur effect

**State:**

- `isMenuOpen`: Boolean (mobile menu)
- `language`: String ("ar" or "en")
- `searchQuery`: String
- Uses `useCart()` hook for cart data

**Integration:**

```jsx
import { useCart } from "../context/CartContext";

const { totalItems } = useCart();
```

---

#### 2. Footer

**Location:** `src/components/layout/Footer.jsx`

Comprehensive footer with links, contact info, and app downloads.

**Sections:**

1. Brand info with logo
2. Hotline (19199)
3. Social media links
4. Quick links (Company, Help, Categories)
5. App download buttons (iOS & Android)
6. Contact information (Phone, Email, Location)
7. Copyright and legal links

---

### Section Components

#### 1. Hero

**Location:** `src/components/sections/Hero.jsx`

Animated hero section with rotating categories.

**Features:**

- Auto-rotating category display (5s interval)
- Animated background elements
- Glass-morphism design
- Category indicators (dots)
- Manual category selection

**State:**

- `shuffleIndex`: Number (current category)
- `isShuffling`: Boolean (animation state)

---

#### 2. ProductsSection

**Location:** `src/components/sections/ProductsSection.jsx`

Grid of product cards with optional custom title.

```jsx
<ProductsSection
  language="en"
  title="Featured Products"
  products={customArray} // Optional
/>
```

**Props:**

- `language`: String
- `title`: String (optional, default: "Featured Products")
- `products`: Array (optional, uses `getFeaturedProducts()` by default)

---

#### 3. CategoriesSection

**Location:** `src/components/sections/CategoriesSection.jsx`

Grid of category cards with "View All" button.

**Grid Layout:**

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 4 columns

---

#### 4. BrandsSection

**Location:** `src/components/sections/BrandsSection.jsx`

Grid of brand logos with trust badge.

**Features:**

- Grayscale logos (color on hover)
- Trust badge with shield icon
- 2-6 columns responsive grid

---

## State Management

### CartContext

**Location:** `src/context/CartContext.jsx`

Global shopping cart state management using React Context API.

#### Setup

```jsx
// In App.jsx
import { CartProvider } from "./context/CartContext";

<CartProvider>
  <YourApp />
</CartProvider>;
```

#### Usage in Components

```jsx
import { useCart } from "./context/CartContext";

function MyComponent() {
  const {
    cartItems, // Array of products in cart
    addToCart, // (product, quantity=1) => void
    removeFromCart, // (productId) => void
    updateQuantity, // (productId, quantity) => void
    clearCart, // () => void
    totalItems, // Number: sum of all quantities
    totalPrice, // Number: sum of all prices
    isInCart, // (productId) => Boolean
    getItemQuantity, // (productId) => Number
  } = useCart();
}
```

#### Implementation Details

**Persistence:**

- Cart data is saved to `localStorage` automatically
- Key: `"pharma-cart"`
- Format: JSON string

**Data Flow:**

1. User adds item → `addToCart()` called
2. State updates → Cart re-renders
3. `useEffect` triggers → Saves to localStorage
4. Page refresh → Cart loads from localStorage

**Cart Item Structure:**

```javascript
{
  ...product,      // All product properties
  quantity: 2      // Added quantity field
}
```

---

## Data Flow

### Mock Data Location

All mock data is in `src/data/`:

- `products.js` - 18 products with full details
- `categories.js` - 8 categories
- `brands.js` - 12 brand logos

### Helper Functions

**products.js exports:**

```javascript
// Get featured products only
getFeaturedProducts() → Array

// Get products by category slug
getProductsByCategory(slug) → Array

// Get single product by ID
getProductById(id) → Object

// Get products with discounts
getDiscountedProducts() → Array
```

### Data Models

#### Product Schema

```javascript
{
  id: Number,
  name: String,
  nameAr: String,
  description: String,
  descriptionAr: String,
  price: Number,                    // Current price
  originalPrice: Number,            // Before discount
  discount: Number,                 // Percentage (0-100)
  image: String,                    // Image URL
  category: String,                 // Category slug
  categoryName: String,
  categoryNameAr: String,
  brand: String,
  inStock: Boolean,
  rating: Number,                   // 0-5
  reviews: Number,                  // Review count
  featured: Boolean,                // Show on home page
  prescriptionRequired: Boolean     // Optional
}
```

#### Category Schema

```javascript
{
  id: Number,
  name: String,
  nameAr: String,
  slug: String,                     // URL-friendly
  image: String,                    // Category image URL
  description: String,
  descriptionAr: String,
  icon: String,                     // Icon name (unused currently)
  color: String                     // Tailwind gradient class
}
```

---

## Routing

### Route Configuration

**File:** `src/App.jsx`

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/category/:slug" element={<CategoryPage />} />
  <Route path="/product/:id" element={<ProductDetail />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/offers" element={<Offers />} />
  <Route path="/pharmacies" element={<Pharmacies />} />
</Routes>
```

### Route Parameters

#### Dynamic Category

```jsx
// URL: /category/skin-care
const { slug } = useParams();
const category = categories.find((cat) => cat.slug === slug);
```

#### Dynamic Product

```jsx
// URL: /product/5
const { id } = useParams();
const product = getProductById(id);
```

### Navigation

**Using Link:**

```jsx
import { Link } from 'react-router-dom';

<Link to="/cart">Go to Cart</Link>
<Link to={`/product/${product.id}`}>View Product</Link>
```

**Programmatic:**

```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("/cart");
```

---

## Styling Guide

### Tailwind CSS Configuration

**File:** `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0fdfa',
        500: '#14b8a6',   // Main brand color: Teal
        600: '#0d9488',
      }
    }
  }
}
```

### Design Tokens

**Spacing:**

- Padding: `p-4`, `p-6`, `p-8` (16px, 24px, 32px)
- Margins: `mb-4`, `mt-8`, `mx-auto`
- Gaps: `gap-4`, `gap-6` in grid/flex

**Border Radius:**

- Cards: `rounded-2xl` (16px)
- Buttons: `rounded-xl` (12px)
- Badges: `rounded-full` (pill shape)

**Shadows:**

- Cards: `shadow-lg`
- Hover: `hover:shadow-2xl`
- Buttons: `shadow-xl`

**Transitions:**

- Duration: `duration-300` (standard)
- Properties: `transition-all`, `transition-colors`, `transition-transform`

### Color Usage

**Primary Actions:**

```jsx
className = "bg-primary-500 hover:bg-primary-600";
```

**Gradients:**

```jsx
className = "bg-linear-to-r from-primary-500 to-teal-500";
```

**Discount Badge:**

```jsx
className = "bg-linear-to-r from-red-500 to-rose-500";
```

**Neutral Grays:**

- Text: `text-neutral-600` (body), `text-neutral-900` (headings)
- Backgrounds: `bg-neutral-50` (light), `bg-neutral-800` (dark)
- Borders: `border-neutral-200`

### Responsive Design

**Breakpoints:**

- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

**Example:**

```jsx
className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
// 1 column mobile, 2 tablet, 4 desktop
```

### Custom Animations

**File:** `tailwind.config.js`

```javascript
animation: {
  'float': 'float 6s ease-in-out infinite',
  'float-delayed': 'float 8s ease-in-out infinite 2s',
  'float-slow': 'float 10s ease-in-out infinite',
}
```

Used in Hero section for floating pills.

---

## Best Practices

### Component Guidelines

1. **Single Responsibility:** Each component should do one thing well
2. **Prop Types:** Document all props with comments
3. **Default Props:** Provide sensible defaults
4. **Error Handling:** Check for null/undefined data

**Example:**

```jsx
const ProductCard = ({ product, language = "en" }) => {
  if (!product) return null; // Guard clause

  // Component logic
};
```

### State Management

1. **Local State First:** Use `useState` for component-specific data
2. **Context for Global:** Only lift state when truly needed
3. **Avoid Prop Drilling:** Use Context for deeply nested data

### Performance

1. **Lazy Load Images:**

```jsx
<img loading="lazy" src={product.image} />
```

2. **Memoization (Future):**

```jsx
const MemoizedProductCard = React.memo(ProductCard);
```

3. **Code Splitting (Future):**

```jsx
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
```

### Naming Conventions

**Components:** PascalCase

```javascript
ProductCard.jsx;
CategoriesSection.jsx;
```

**Functions:** camelCase

```javascript
addToCart();
getFeaturedProducts();
```

**Constants:** UPPER_SNAKE_CASE

```javascript
const MAX_CART_ITEMS = 99;
```

**CSS Classes:** Tailwind utilities only

### Code Organization

**Import Order:**

1. React imports
2. Third-party libraries
3. Internal components
4. Context/hooks
5. Data/constants
6. Assets (images, icons)

**Example:**

```jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import ProductCard from "../common/ProductCard";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";
import logoImg from "../../assets/logo.svg";
```

---

## Testing

### Unit Testing (Future Setup)

**Framework:** Vitest + React Testing Library

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

**Example Test:**

```jsx
// ProductCard.test.jsx
import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";

test("renders product name", () => {
  const product = { name: "Test Product" /* ... */ };
  render(<ProductCard product={product} />);
  expect(screen.getByText("Test Product")).toBeInTheDocument();
});
```

### Testing Checklist

- [ ] Component renders without crashing
- [ ] Props are correctly passed and used
- [ ] User interactions trigger correct events
- [ ] Context data updates properly
- [ ] Navigation links work
- [ ] Form submissions work
- [ ] Error states display correctly

---

## Deployment

### Build for Production

```bash
npm run build
```

Output: `dist/` folder

### Optimization Checklist

- [x] Image optimization (using CDN URLs)
- [ ] Code splitting (future)
- [ ] Tree shaking (Vite handles automatically)
- [ ] Minification (Vite handles automatically)
- [ ] Gzip compression (server config)

### Hosting Options

**Recommended:**

1. **Vercel** (Easiest)

   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Connect GitHub repo
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **GitHub Pages**
   ```bash
   npm run build
   # Deploy dist/ folder
   ```

### Environment Variables

For production, create `.env.production`:

```env
VITE_API_URL=https://api.yoursite.com
VITE_ANALYTICS_ID=your-id
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Troubleshooting

### Common Issues

#### 1. Cart Not Persisting

**Problem:** Cart items disappear on page refresh

**Solution:** Check localStorage in DevTools

```javascript
// Console
localStorage.getItem("pharma-cart");
```

If empty, check:

- CartProvider wraps entire app
- No errors in CartContext.jsx

---

#### 2. Images Not Loading

**Problem:** Product images show broken

**Solution:** Check image URLs in `data/products.js`

- Must be absolute URLs (https://)
- Test URLs in browser first

---

#### 3. Routes Not Working

**Problem:** 404 on page refresh

**Solution:** Server must redirect all routes to index.html

**Vercel:** Add `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify:** Add `_redirects`:

```
/*  /index.html  200
```

---

#### 4. Tailwind Classes Not Working

**Problem:** Styles not applying

**Solutions:**

1. Check `tailwind.config.js` content paths
2. Restart dev server
3. Clear browser cache
4. Check for typos in class names

---

#### 5. Build Errors

**Problem:** Production build fails

**Common Causes:**

- Unused imports
- Console.log statements
- Missing dependencies

**Solution:**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Advanced Topics

### Adding Backend API

**When ready for real data:**

1. Create `src/api/` folder:

```javascript
// src/api/products.js
export async function fetchProducts() {
  const response = await fetch("/api/products");
  return response.json();
}
```

2. Replace mock data in pages:

```jsx
const [products, setProducts] = useState([]);

useEffect(() => {
  fetchProducts().then(setProducts);
}, []);
```

3. Add loading states:

```jsx
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

---

### Adding Authentication

**Future Implementation:**

1. **Choose Auth Provider:**
   - Firebase Auth
   - Auth0
   - JWT with backend

2. **Create AuthContext:**

```jsx
// src/context/AuthContext.jsx
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Login, logout, register functions
};
```

3. **Protected Routes:**

```jsx
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
```

---

### Performance Monitoring

**Add Analytics:**

1. **Google Analytics:**

```jsx
// In App.jsx
import ReactGA from "react-ga4";

ReactGA.initialize("G-XXXXXXXXXX");

// Track page views
useEffect(() => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
}, [location]);
```

2. **Error Tracking (Sentry):**

```bash
npm install @sentry/react
```

```jsx
import * as Sentry from "@sentry/react";

Sentry.init({ dsn: "your-dsn" });
```

---

## Conclusion

This guide covers the complete development workflow for Al-Farmashiia. For additional help:

1. Check **PROJECT_STRUCTURE.md** for architecture details
2. Review **COLORS.md** for color customization
3. See **README.md** for quick start guide

### Quick Links

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
- [React Icons Library](https://react-icons.github.io/react-icons/)
- [Vite Documentation](https://vitejs.dev)

---

**Happy Coding! 💊🚀**
