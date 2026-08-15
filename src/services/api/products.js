import axios from "axios";

export const API_BASE_URL = "https://pharma-api-flame.vercel.app/api";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop";

/**
 * Compute the original (pre-discount) price for display purposes.
 */
const computeOriginalPrice = (product) => {
  const current = parseFloat(product.price) || 0;
  if (product.isOffer) {
    if (product.offerDiscountPercent > 0) {
      return Math.round(current / (1 - product.offerDiscountPercent / 100));
    }
    if (product.offerDiscountAmount > 0) {
      return current + product.offerDiscountAmount;
    }
  }
  return null;
};

/**
 * Transform a raw API product into the shape used throughout the app.
 * ⚠️  Field names corrected to match real API response:
 *   product.id          (not _id)
 *   product.imageUrl    (not image.url)
 *   product.imageThumbnailUrl (not image.thumbnailUrl)
 *   product.isAvailable (not inStock)
 */
export const transformProduct = (product) => ({
  id:             product.id,
  name:           product.name || "Unknown Product",
  category:       product.category || null,
  brand:          product.brand || null,
  price:          parseFloat(product.price) || 0,
  originalPrice:  computeOriginalPrice(product),
  image:          product.imageUrl || FALLBACK_IMAGE,
  thumbnailUrl:   product.imageThumbnailUrl || null,
  isAvailable:    product.isAvailable !== false,
  isBestSeller:   product.isBestSeller || false,
  isOffer:        product.isOffer || false,
  discount:       product.isOffer ? (product.offerDiscountPercent || 0) : 0,
  discountAmount: product.isOffer ? (product.offerDiscountAmount || 0) : 0,
});

/**
 * Fetch products from the API.
 * @param {Object} params - Query parameters
 * @param {number} params.page
 * @param {number} params.limit
 * @param {string} params.category
 * @param {string} params.brand
 * @param {string} params.search
 * @returns {Promise<{ data: Array, pagination: Object }>}
 */
export const fetchProducts = async ({
  page = 1,
  limit = 20,
  category = "",
  brand = "",
  search = "",
} = {}) => {
  const params = { page, limit };
  if (category) params.category = category;
  if (brand) params.brand = brand;
  if (search) params.search = search;

  const response = await axios.get(`${API_BASE_URL}/products`, { params });

  if (response.data?.success && Array.isArray(response.data.data)) {
    return {
      data: response.data.data,
      pagination: response.data.pagination || null,
    };
  }

  throw new Error("Invalid response structure from /api/products");
};

/**
 * Fetch ALL products (up to limit=35) for home page in one shot.
 * Caller can filter by isBestSeller / isOffer client-side.
 */
export const fetchAllProducts = async (limit = 35) => {
  const response = await fetchProducts({ page: 1, limit });
  return response.data.map(transformProduct);
};

/**
 * Fetch best-seller products (isBestSeller flag).
 * Reuses fetchAllProducts — no extra network call if used with useHomeData.
 */
export const fetchBestSellers = async () => {
  const all = await fetchAllProducts(35);
  const sellers = all.filter((p) => p.isBestSeller);
  return sellers.length > 0 ? sellers : all.slice(0, 8);
};

/**
 * Fetch discounted / offer products (isOffer flag).
 * Reuses fetchAllProducts — no extra network call if used with useHomeData.
 */
export const fetchDiscountProducts = async () => {
  const all = await fetchAllProducts(35);
  return all.filter((p) => p.isOffer).slice(0, 8);
};

/**
 * Fetch a single product by ID.
 */
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    if (response.data?.success && response.data.data) {
      return transformProduct(response.data.data);
    }
  } catch (err) {
    console.error("Failed to fetch product by ID, trying fallback list:", err);
  }
  // Fallback
  const all = await fetchAllProducts(50);
  return all.find((p) => String(p.id) === String(id) || String(p._id) === String(id)) || null;
};

