# Al-Farmashiia E-Commerce Platform - Project Structure

## 📁 Directory Structure

```
pharma-test/
├── public/
│   └── assets/              # Static assets
├── src/
│   ├── assets/              # Images, logos, icons
│   │   └── logo.svg
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Shared components
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── BrandCard.jsx
│   │   │   ├── Button.jsx
│   │   │   └── Badge.jsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   └── sections/        # Page sections
│   │       ├── Hero.jsx
│   │       ├── CategoriesSection.jsx
│   │       ├── ProductsSection.jsx
│   │       └── BrandsSection.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Categories.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Offers.jsx
│   │   └── Pharmacies.jsx
│   ├── context/             # React Context for state
│   │   └── CartContext.jsx
│   ├── data/                # Mock data
│   │   ├── products.js
│   │   ├── categories.js
│   │   └── brands.js
│   ├── utils/               # Utility functions
│   │   └── helpers.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Design System

### Color Palette

- **Primary**: Teal/Emerald gradient (`from-primary-500 to-emerald-500`)
- **Secondary**: Cyan/Teal (`from-teal-400 to-cyan-500`)
- **Accent**: Pink/Rose for beauty products (`from-pink-400 to-rose-500`)
- **Neutral**: Grays for text and backgrounds
- **Success**: Green for offers/discounts
- **Warning**: Amber for low stock

### Typography

- **Headings**: Bold, tracking-tight
- **Body**: Regular, neutral-600
- **Links**: Hover transitions, primary-600

## 🧩 Component Architecture

### 1. **Common Components** (Reusable)

- `ProductCard`: Display product with image, price, discount, add-to-cart
- `CategoryCard`: Category tile with image and name
- `BrandCard`: Brand logo with hover effect
- `Button`: Customizable button component
- `Badge`: Discount/status badges

### 2. **Layout Components**

- `Navbar`: Navigation with search, cart, language toggle
- `Footer`: Links, contact info, app download buttons

### 3. **Section Components** (Home page sections)

- `Hero`: Main banner with animated categories
- `CategoriesSection`: Grid of category cards
- `ProductsSection`: Featured products grid
- `BrandsSection`: Brand logos grid

### 4. **Pages**

- `Home`: Landing page with all sections
- `Categories`: Filter products by category
- `ProductDetail`: Single product view
- `Cart`: Shopping cart management
- `Offers`: Special deals and discounts
- `Pharmacies`: Store locations

## 🔄 State Management

### CartContext

```javascript
{
  cartItems: [],           // Array of products in cart
  addToCart: (product),    // Add product to cart
  removeFromCart: (id),    // Remove product from cart
  updateQuantity: (id, qty), // Update product quantity
  clearCart: (),           // Empty cart
  totalItems: 0,           // Total number of items
  totalPrice: 0            // Total cart value
}
```

## 📊 Data Models

### Product

```javascript
{
  id: number,
  name: string,
  nameAr: string,
  description: string,
  descriptionAr: string,
  price: number,
  originalPrice: number,
  discount: number,
  image: string,
  category: string,
  brand: string,
  inStock: boolean,
  rating: number,
  reviews: number
}
```

### Category

```javascript
{
  id: number,
  name: string,
  nameAr: string,
  slug: string,
  image: string,
  description: string
}
```

### Brand

```javascript
{
  id: number,
  name: string,
  logo: string,
  slug: string
}
```

## 🚀 Features

### Phase 1 (Current)

- ✅ Navigation with language toggle
- ✅ Hero section with animations
- 🔄 Categories section
- 🔄 Products grid with cart
- 🔄 Brands showcase
- 🔄 Shopping cart functionality

### Phase 2 (Future)

- Product search & filtering
- User authentication
- Wishlist functionality
- Order history
- Checkout process
- Payment integration

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: React Icons (IoIcons5)
- **State**: React Context API
- **Build**: Vite

## 📝 Naming Conventions

- **Components**: PascalCase (e.g., `ProductCard.jsx`)
- **Files**: camelCase for utils (e.g., `helpers.js`)
- **CSS Classes**: Tailwind utilities
- **Functions**: camelCase (e.g., `addToCart`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_CART_ITEMS`)

## 🔧 Development Guidelines

1. **Component Structure**:
   - Imports first
   - Component definition
   - PropTypes (if needed)
   - Export default

2. **Styling**:
   - Use Tailwind utilities
   - Responsive: mobile-first approach
   - Hover states for interactive elements
   - Smooth transitions (duration-300)

3. **Accessibility**:
   - Semantic HTML
   - Alt texts for images
   - ARIA labels where needed
   - Keyboard navigation support

4. **Performance**:
   - Lazy load images
   - Code splitting for routes
   - Memoization for expensive computations
   - Optimized re-renders

## 📚 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 API Integration (Future)

When connecting to backend:

- Base URL configuration in `.env`
- API utility functions in `src/api/`
- Error handling middleware
- Loading states
- Data caching strategy

---

**Version**: 1.0.0
**Last Updated**: April 3, 2026
