# ImageKit.io Integration Guide

## Overview

This project uses ImageKit.io for image optimization and transformation. The API returns image objects with the following structure:

```json
{
  "image": {
    "url": "https://ik.imagekit.io/meg0s3zhy/pharmacy/OIP__11__sVx9mEQ1f.webp",
    "fileId": "69cece915c7cd75eb89e5af0",
    "thumbnailUrl": "https://ik.imagekit.io/meg0s3zhy/tr:n-ik_ml_thumbnail/pharmacy/OIP__11__sVx9mE..."
  }
}
```

## Image Object Properties

- **url**: Full-size image URL
- **fileId**: Unique identifier for the file in ImageKit
- **thumbnailUrl**: Pre-generated thumbnail URL (optimized)

## Utility Functions

See `src/utils/imagekit.js` for helper functions:

### `getImageUrl(image)`

Safely extracts the image URL from various formats:

- ImageKit object with `url` property
- Direct URL string
- Returns fallback image if null/undefined

```javascript
import { getImageUrl } from "../utils/imagekit";

const imageUrl = getImageUrl(product.image);
```

### `getThumbnailUrl(image)`

Gets the optimized thumbnail URL:

```javascript
import { getThumbnailUrl } from "../utils/imagekit";

const thumbUrl = getThumbnailUrl(product.image);
```

### `getTransformedImageUrl(url, options)`

Applies ImageKit transformations to any ImageKit URL:

```javascript
import { getTransformedImageUrl } from "../utils/imagekit";

const optimizedUrl = getTransformedImageUrl(product.image.url, {
  width: 400,
  height: 400,
  quality: 80,
  format: "webp",
});
```

## Image Presets

Pre-configured sizes for common use cases:

```javascript
import { IMAGE_PRESETS, getTransformedImageUrl } from "../utils/imagekit";

// Thumbnail (150x150, quality 70)
const thumb = getTransformedImageUrl(url, IMAGE_PRESETS.thumbnail);

// Card (400x400, quality 80)
const card = getTransformedImageUrl(url, IMAGE_PRESETS.card);

// Detail page (800x800, quality 90)
const detail = getTransformedImageUrl(url, IMAGE_PRESETS.detail);

// Hero banner (1200x600, quality 85)
const hero = getTransformedImageUrl(url, IMAGE_PRESETS.hero);
```

## API Product Transformation

The `transformProduct` function in `src/services/api/products.js` automatically handles the image object:

```javascript
export const transformProduct = (product) => {
  return {
    id: product._id,
    name: product.name || "Unknown Product",
    image: product.image?.url || product.image || fallbackUrl,
    thumbnailUrl: product.image?.thumbnailUrl || product.image?.url || null,
    // ... other fields
  };
};
```

## Usage in Components

Products fetched from the API are automatically transformed, so you can use them directly:

```jsx
// ProductCard.jsx
<img
  src={product.image} // Already extracted from image.url
  alt={product.name}
  loading="lazy"
/>
```

## Manual Transformation

For custom transformations:

```jsx
import { getTransformedImageUrl } from "../utils/imagekit";

function ProductImage({ product }) {
  const imageUrl = getTransformedImageUrl(product.image, {
    width: 600,
    height: 600,
    quality: 85,
    format: "webp",
  });

  return <img src={imageUrl} alt={product.name} />;
}
```

## ImageKit Transformation Syntax

ImageKit uses the following URL format:

```
https://ik.imagekit.io/{account}/tr:{transformations}/{path}
```

Common transformations:

- `w-400` - Width 400px
- `h-400` - Height 400px
- `q-80` - Quality 80%
- `f-webp` - Format WebP
- `ar-1-1` - Aspect ratio 1:1

Example:

```
https://ik.imagekit.io/meg0s3zhy/tr:w-400,h-400,q-80,f-webp/pharmacy/product.jpg
```

## Best Practices

1. **Use thumbnailUrl for lists**: Use the pre-generated `thumbnailUrl` for product grids
2. **Lazy loading**: Always use `loading="lazy"` for images
3. **Responsive images**: Use different sizes for different screen sizes
4. **WebP format**: Prefer WebP for better compression
5. **Quality settings**:
   - Thumbnails: 70
   - Cards: 80
   - Detail pages: 90

## Fallback Images

The system automatically provides fallback images from Unsplash if:

- Product has no image
- ImageKit URL fails to load
- Image object is malformed

Default fallback:

```
https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop
```
