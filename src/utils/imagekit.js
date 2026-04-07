/**
 * ImageKit.io Image Transformation Utilities
 * Documentation: https://docs.imagekit.io/features/image-transformations
 */

/**
 * Extract image URL from various formats
 * @param {string|Object} image - Image URL string or ImageKit object
 * @returns {string} - Image URL
 */
export const getImageUrl = (image) => {
  if (!image) {
    return "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop";
  }

  // If image is an object with url property
  if (typeof image === "object" && image.url) {
    return image.url;
  }

  // If image is already a string
  if (typeof image === "string") {
    return image;
  }

  // Fallback
  return "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop";
};

/**
 * Get thumbnail URL from ImageKit image object
 * @param {Object} image - ImageKit image object
 * @returns {string} - Thumbnail URL
 */
export const getThumbnailUrl = (image) => {
  if (!image) return null;

  // Return thumbnailUrl if available
  if (typeof image === "object" && image.thumbnailUrl) {
    return image.thumbnailUrl;
  }

  // Return url as fallback
  if (typeof image === "object" && image.url) {
    return image.url;
  }

  // If it's a string, return it
  if (typeof image === "string") {
    return image;
  }

  return null;
};

/**
 * Generate ImageKit transformation URL
 * @param {string} url - Base ImageKit URL
 * @param {Object} options - Transformation options
 * @param {number} options.width - Width in pixels
 * @param {number} options.height - Height in pixels
 * @param {string} options.quality - Quality (0-100)
 * @param {string} options.format - Format (webp, jpg, png)
 * @param {boolean} options.aspectRatio - Maintain aspect ratio
 * @returns {string} - Transformed URL
 */
export const getTransformedImageUrl = (url, options = {}) => {
  if (!url || typeof url !== "string") {
    return getImageUrl(url);
  }

  // Check if it's an ImageKit URL
  if (!url.includes("imagekit.io")) {
    return url;
  }

  const transformations = [];

  if (options.width) transformations.push(`w-${options.width}`);
  if (options.height) transformations.push(`h-${options.height}`);
  if (options.quality) transformations.push(`q-${options.quality}`);
  if (options.format) transformations.push(`f-${options.format}`);
  if (options.aspectRatio !== false) transformations.push("ar-1-1");

  if (transformations.length === 0) {
    return url;
  }

  // Insert transformations into ImageKit URL
  // Format: https://ik.imagekit.io/account/tr:transformations/path
  const trString = `tr:${transformations.join(",")}`;

  // Check if URL already has transformations
  if (url.includes("/tr:")) {
    return url.replace(/\/tr:[^/]+/, `/${trString}`);
  }

  // Insert transformations after /account/
  const parts = url.split("/");
  const accountIndex = parts.findIndex((part) => part.includes("imagekit.io"));

  if (accountIndex !== -1 && accountIndex + 2 < parts.length) {
    parts.splice(accountIndex + 2, 0, trString);
    return parts.join("/");
  }

  return url;
};

/**
 * Presets for common image sizes
 */
export const IMAGE_PRESETS = {
  thumbnail: { width: 150, height: 150, quality: 70 },
  card: { width: 400, height: 400, quality: 80 },
  detail: { width: 800, height: 800, quality: 90 },
  hero: { width: 1200, height: 600, quality: 85, aspectRatio: false },
};
