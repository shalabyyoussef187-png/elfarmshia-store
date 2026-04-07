// Category image mappings
// You can replace these URLs with your own local images or custom URLs
export const categoryImages = {
  // Common category slugs and their image URLs
  "vitamins-supplements":
    "https://images.unsplash.com/photo-1550572017-4846b5319c7f?w=800&q=80",
  "pain-relief":
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
  skincare:
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80",
  "personal-care":
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
  "baby-care":
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80",
  "cold-flu":
    "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80",
  "digestive-health":
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
  "heart-health":
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
  "oral-care":
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
  "first-aid":
    "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=80",
  "eye-care":
    "https://images.unsplash.com/photo-1574096079513-d8259312b785?w=800&q=80",
  "diabetes-care":
    "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800&q=80",
  immunity:
    "https://images.unsplash.com/photo-1610074886735-5163939e5b56?w=800&q=80",
  "women-health":
    "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&q=80",
  "men-health":
    "https://images.unsplash.com/photo-1609086461842-e222b72a4efe?w=800&q=80",

  // Fallback/default image
  default:
    "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=80",
};

/**
 * Get image URL for a category
 * @param {string} slug - Category slug
 * @param {string} apiImage - Image from API (if available)
 * @returns {string} - Image URL
 */
export const getCategoryImage = (slug, apiImage = null) => {
  // If API provides an image, use it
  if (apiImage && apiImage.trim()) {
    return apiImage;
  }

  // Try to find by slug
  const normalizedSlug = slug?.toLowerCase().replace(/\s+/g, "-") || "";

  if (categoryImages[normalizedSlug]) {
    return categoryImages[normalizedSlug];
  }

  // Try partial matches
  for (const [key, value] of Object.entries(categoryImages)) {
    if (normalizedSlug.includes(key) || key.includes(normalizedSlug)) {
      return value;
    }
  }

  // Return default fallback
  return categoryImages.default;
};
