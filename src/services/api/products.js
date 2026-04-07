import axios from "axios";

const API_BASE_URL = "https://pharma-api-flame.vercel.app/api";

/**
 * Fetch products from the API
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 20)
 * @param {string} params.category - Filter by category
 * @param {string} params.brand - Filter by brand
 * @param {string} params.search - Search query
 * @param {boolean} params.transform - Apply transformation (default: false)
 * @returns {Promise<{data: Array, pagination: Object}>}
 */
export const fetchProducts = async ({
  page = 1,
  limit = 20,
  category = "",
  brand = "",
  search = "",
  transform = false,
} = {}) => {
  try {
    const params = { page, limit };
    if (category) params.category = category;
    if (brand) params.brand = brand;
    if (search) params.search = search;

    const response = await axios.get(`${API_BASE_URL}/products`, { params });

    // Validate response structure
    if (response.data?.success && Array.isArray(response.data.data)) {
      return {
        data: transform
          ? response.data.data.map(transformProduct)
          : response.data.data,
        pagination: response.data.pagination || null,
      };
    }

    throw new Error("Invalid response structure");
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Fetch best seller products (top 8 products)
 * @returns {Promise<Array>}
 */
export const fetchBestSellers = async () => {
  try {
    const response = await fetchProducts({ page: 1, limit: 8 });
    return response.data.map(transformProduct);
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    throw error;
  }
};

/**
 * Fetch products with discounts (filter by isOffer flag)
 * @returns {Promise<Array>}
 */
export const fetchDiscountProducts = async () => {
  try {
    const response = await fetchProducts({ page: 1, limit: 8 });
    // Filter products that have offers
    const discountedProducts = response.data.filter(
      (product) => product.isOffer === true,
    );
    return discountedProducts.slice(0, 8).map(transformProduct);
  } catch (error) {
    console.error("Error fetching discount products:", error);
    throw error;
  }
};

/**
 * Transform product data for consistent use across the app
 * @param {Object} product - Raw product from API
 * @returns {Object} - Transformed product
 */
export const transformProduct = (product) => {
  // Extract image URL properly
  const imageUrl =
    product.image?.url ||
    product.image ||
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop";

  // Debug: Log image transformation
  console.log("Transforming product:", {
    id: product._id,
    name: product.name,
    originalImage: product.image,
    extractedUrl: imageUrl,
    isOffer: product.isOffer,
    offerDiscountPercent: product.offerDiscountPercent,
    offerDiscountAmount: product.offerDiscountAmount,
  });

  // All products in database are available (no stock check needed)
  // Use API's isOffer flag and discount values
  const discountPercent = product.isOffer
    ? product.offerDiscountPercent || 0
    : 0;
  const discountAmount = product.isOffer ? product.offerDiscountAmount || 0 : 0;
  const currentPrice = parseFloat(product.price) || 0;

  // Calculate original price from discount
  const originalPrice =
    discountPercent > 0
      ? Math.round(currentPrice / (1 - discountPercent / 100))
      : discountAmount > 0
        ? currentPrice + discountAmount
        : null;

  return {
    id: product._id,
    name: product.name || "Unknown Product",
    category: product.category || "Uncategorized",
    brand: product.brand || "Generic",
    price: currentPrice,
    originalPrice: originalPrice,
    image: imageUrl,
    thumbnailUrl: product.image?.thumbnailUrl || product.image?.url || null,
    productUrl: product.productUrl || "#",
    // Offer/Discount info from API
    isOffer: product.isOffer || false,
    discount: discountPercent,
    discountAmount: discountAmount,
    // All products in DB are available by default
    inStock: true,
  };
};
