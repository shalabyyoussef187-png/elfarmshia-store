# Categories API Integration

## Overview

The homepage categories section now fetches real data from the Pharma API instead of using hardcoded mock data.

## API Endpoint

```
GET https://pharma-api-flame.vercel.app/api/categories
```

## Response Structure

```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "name": "string (Arabic)",
      "__v": 0,
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "pagination": {
    "total": 12,
    "page": 1,
    "pages": 1,
    "limit": 20,
    "next": null,
    "prev": null
  }
}
```

## Implementation Structure

### 1. Service Layer (`src/services/api/categories.js`)

- **`fetchCategories(page, limit)`** - Fetches categories from API
- **`categoryTranslations`** - Maps Arabic category names to English
- **`generateSlug(text)`** - Creates URL-friendly slugs
- **`getCategoryName(arabicName, language)`** - Returns translated name
- **`getCategoryDescription(arabicName, language)`** - Returns category description
- **`getCategoryImage(arabicName)`** - Returns placeholder images (until API provides them)

### 2. Custom Hook (`src/hooks/useCategories.js`)

- **`useCategories(language, page, limit)`** - React hook for fetching and managing categories
- Returns: `{ categories, loading, error, pagination, retry }`
- Transforms API data to match component structure
- Handles loading, error, and empty states

### 3. Component (`src/components/sections/CategoriesSection.jsx`)

- Uses `useCategories` hook
- Renders premium UI for all states:
  - **Loading**: Skeleton cards with spinner
  - **Error**: Retry button with error message
  - **Empty**: Polished empty state message
  - **Success**: Premium category cards

## Language Handling

- API returns Arabic category names
- Arabic (ar): Shows API names directly
- English (en): Uses translation map with fallback to Arabic if no translation exists

## Known Categories Translation Map

| Arabic                | English                |
| --------------------- | ---------------------- |
| الأدوية               | Medicine               |
| العناية بالبشرة       | Skin Care              |
| العناية بالشعر        | Hair Care              |
| الأم والطفل           | Mom & Baby             |
| الفيتامينات والمكملات | Vitamins & Supplements |
| العناية الشخصية       | Personal Care          |
| المكملات الغذائية     | Dietary Supplements    |
| الرعاية الصحية        | Healthcare             |
| مستحضرات التجميل      | Cosmetics              |
| العناية بالأسنان      | Dental Care            |
| الأجهزة الطبية        | Medical Devices        |
| التغذية الرياضية      | Sports Nutrition       |

## Features

✅ Real-time data fetching from API  
✅ Premium loading skeleton cards  
✅ Error handling with retry functionality  
✅ Empty state handling  
✅ Bilingual support (Arabic/English)  
✅ URL-friendly slug generation  
✅ Pagination support (prepared for future scaling)  
✅ Modular and production-ready code structure

## Future Enhancements

- Implement pagination controls for viewing more categories
- Add category images from API when available
- Add search/filter functionality
- Cache categories data to reduce API calls
- Add category click analytics

## Usage Example

```jsx
import CategoriesSection from "./components/sections/CategoriesSection";

function HomePage() {
  const [language, setLanguage] = useState("en");

  return (
    <div>
      <CategoriesSection language={language} />
    </div>
  );
}
```

## Testing

To test the API integration:

1. Run the development server: `npm run dev`
2. Navigate to the homepage
3. Observe the categories section loading states
4. Check browser console for any API errors
5. Test language switching between Arabic and English
6. Test error state by temporarily breaking the API URL
7. Test retry functionality in error state
