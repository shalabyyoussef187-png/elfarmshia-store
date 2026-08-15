# Alfarmashia Backend API Specification

> **Base URL:** `https://pharma-api-flame.vercel.app/api`
> **Docs UI:** `https://pharma-api-flame.vercel.app/api-docs/`
> **Auth:** Bearer token (JWT) for protected routes

---

## Authentication

### POST `/auth/register`
Register a new user.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "success": true,
  "token": "jwt_token_string",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

---

### POST `/auth/login`
Login and get JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "success": true,
  "token": "jwt_token_string",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

---

## Products

### GET `/products`
Fetch paginated list of products.

**Query Parameters:**
| Param | Type | Default | Description |
|---|---|---|---|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page |
| `category` | string | — | Filter by category name |
| `brand` | string | — | Filter by brand |
| `search` | string | — | Search in product name |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "645f37d1-3f14-4cb7-9da4-f38a4a8417c9",
      "name": "نيكوريت 2mg",
      "category": "Gh",
      "brand": "nola",
      "price": 1600,
      "productUrl": null,
      "priceStatus": null,
      "notes": null,
      "isOffer": false,
      "offerDiscountPercent": null,
      "offerDiscountAmount": null,
      "isBestSeller": true,
      "imageUrl": "https://ik.imagekit.io/meg0s3zhy/pharmacy/cropped_nPlj1Mk9U.jpg",
      "imageFileId": "6a7c6afb5c7cd75eb88e8f8b",
      "imageThumbnailUrl": "https://ik.imagekit.io/meg0s3zhy/tr:n-ik_ml_thumbnail/pharmacy/cropped_nPlj1Mk9U.jpg",
      "isAvailable": true,
      "quantity": 0,
      "createdAt": "2026-08-12T11:58:53.040Z",
      "updatedAt": "2026-08-12T13:01:39.344Z"
    }
  ],
  "pagination": {
    "total": 35,
    "page": 1,
    "pages": 2,
    "limit": 20,
    "next": 2,
    "prev": null
  }
}
```

> **⚠️ IMPORTANT Field Notes:**
> - Use `product.id` (NOT `product._id`)
> - Use `product.imageUrl` (NOT `product.image.url`)
> - Use `product.imageThumbnailUrl` (NOT `product.image.thumbnailUrl`)
> - Use `product.isAvailable` (NOT `product.inStock`)
> - `isBestSeller: true` marks best sellers — filter client-side
> - `isOffer: true` marks discounted products — filter client-side
> - `offerDiscountPercent` is a number (0-100) or null
> - `offerDiscountAmount` is an absolute EGP amount or null
> - `category` and `brand` can be null for many products

---

### GET `/products/:id`
Fetch a single product by ID.

**Response:** Same product object as above (wrapped in `data` key).

---

## Categories

### GET `/categories`
Fetch all categories.

**Query Parameters:**
| Param | Type | Default | Description |
|---|---|---|---|
| `page` | number | 1 | Page number |
| `limit` | number | 8 | Items per page |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1a2ccacc-7ec8-4a6b-a6cf-453001e92e94",
      "name": "Gh",
      "createdAt": "2026-08-09T13:21:41.034Z",
      "updatedAt": "2026-08-09T13:21:41.034Z"
    },
    {
      "id": "5a30401a-cb40-4ee8-948d-7c4696afa19c",
      "name": "طيبات",
      "createdAt": "2026-07-30T17:57:07.713Z",
      "updatedAt": "2026-08-02T11:02:49.734Z"
    }
  ],
  "pagination": {
    "total": 2,
    "page": 1,
    "pages": 1,
    "limit": 8,
    "next": null,
    "prev": null
  }
}
```

> **Note:** As of 2026-08-15 there are only **2 categories** in the database. Categories are raw names (may be Arabic or English). The rich category hierarchy (medicine, skincare, etc.) is derived client-side from product data.

---

## Orders

### POST `/orders`
Create a new order. **Requires authentication.**

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "items": [
    { "productId": "string", "quantity": 1 }
  ],
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "phone": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "string",
    "status": "pending",
    "total": 1600,
    "items": [...],
    "createdAt": "..."
  }
}
```

---

### GET `/orders`
Get user's orders. **Requires authentication.**

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": { ... }
}
```

---

## Frontend Usage Patterns

### Single Request Home Page Strategy
Fetch all 35 products in one call, then derive slices client-side:

```js
// One request for entire home page
const res = await axios.get(`${BASE_URL}/products?limit=35&page=1`);
const all = res.data.data;

const bestSellers = all.filter(p => p.isBestSeller);
const offers      = all.filter(p => p.isOffer);
const categories  = [...new Set(all.map(p => p.category).filter(Boolean))];
```

### Correct Product Transformation
```js
const transformProduct = (p) => ({
  id:               p.id,                    // ✅ NOT p._id
  name:             p.name || "Unknown",
  category:         p.category || null,
  brand:            p.brand || null,
  price:            parseFloat(p.price) || 0,
  image:            p.imageUrl || FALLBACK_IMAGE,     // ✅ NOT p.image.url
  thumbnailUrl:     p.imageThumbnailUrl || null,       // ✅ NOT p.image.thumbnailUrl
  isAvailable:      p.isAvailable !== false,           // ✅ NOT p.inStock
  isBestSeller:     p.isBestSeller || false,
  isOffer:          p.isOffer || false,
  discount:         p.isOffer ? (p.offerDiscountPercent || 0) : 0,
  discountAmount:   p.isOffer ? (p.offerDiscountAmount || 0) : 0,
  originalPrice:    computeOriginalPrice(p),
});
```
