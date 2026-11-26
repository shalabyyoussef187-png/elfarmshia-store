import { buildEntry, searchIndex } from "../../utils/catalogSearch";
import axios from "axios";
import { products as localProducts } from "../../data/products";

export const API_BASE_URL = "https://elfarmshia-backend.vercel.app/api";

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
  id:                   product.id,
  name:                 product.name || "Unknown Product",
  description:          product.description || "",
  features:             product.features || "",
  usageInstructions:    product.usageInstructions || "",
  warnings:             product.warnings || "",
  productInfo:          product.productInfo || "",
  category:             product.category || null,
  brand:                product.brand || null,
  price:                parseFloat(product.price) || 0,
  originalPrice:        computeOriginalPrice(product),
  quantity:             product.quantity ?? null,
  // images – support up to 3 slots from API
  image:                product.imageUrl  || product.image  || FALLBACK_IMAGE,
  thumbnailUrl:         product.imageThumbnailUrl  || null,
  image2:               product.imageUrl2 || null,
  thumbnailUrl2:        product.imageThumbnailUrl2 || null,
  image3:               product.imageUrl3 || null,
  thumbnailUrl3:        product.imageThumbnailUrl3 || null,
  isAvailable:          product.isAvailable !== false,
  isBestSeller:         product.isBestSeller || false,
  isOffer:              product.isOffer || false,
  discount:             product.isOffer ? (product.offerDiscountPercent || 0) : 0,
  discountAmount:       product.isOffer ? (product.offerDiscountAmount  || 0) : 0,
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
let catalogPromise = null;
export const loadCatalog = () => {
  if (!catalogPromise) {
    catalogPromise = (async () => {
      // One big request (the API accepts limit=400: ~0.5s instead of 7 sequential pages ~2.5s).
      // If the catalog ever outgrows it, the remaining pages are fetched after.
      const LIMIT = 400;
      const first = await axios.get(`${API_BASE_URL}/products`, { params: { page: 1, limit: LIMIT } });
      const out = [...(first.data?.data || [])];
      const pages = first.data?.pagination?.pages || 1;
      for (let page = 2; page <= pages; page += 1) {
        const res = await axios.get(`${API_BASE_URL}/products`, { params: { page, limit: LIMIT } });
        out.push(...(res.data?.data || []));
      }
      return out;
    })().catch((e) => {
      catalogPromise = null;
      throw e;
    });
  }
  return catalogPromise;
};

export const fetchProducts = async ({
  page = 1,
  limit = 20,
  category = "",
  brand = "",
  search = "",
} = {}) => {
  // Text search: match on the full catalog (Arabic, digits, typos), same as the header suggestions.
  if (search) {
    try {
      const all = await loadCatalog();
      const entries = all.map((p) => ({ ...buildEntry(p), raw: p }));
      let found = searchIndex(entries, search, Infinity).items.map((e) => e.raw);
      if (category) found = found.filter((p) => p.category === category);
      if (brand) found = found.filter((p) => p.brand === brand);
      const total = found.length;
      const pages = Math.max(1, Math.ceil(total / limit));
      const start = (page - 1) * limit;
      return {
        data: found.slice(start, start + limit),
        pagination: { total, page, pages, limit, next: page < pages ? page + 1 : null, prev: page > 1 ? page - 1 : null },
      };
    } catch (err) {
      console.warn("Catalog search failed, using server search:", err.message);
    }
  }

  const params = { page, limit };
  if (category) params.category = category;
  if (brand) params.brand = brand;
  if (search) params.search = search;

  try {
    const response = await axios.get(`${API_BASE_URL}/products`, { params });

    if (response.data?.success && Array.isArray(response.data.data)) {
      // ✅ If API returns products → use them
      if (response.data.data.length > 0) {
        return {
          data: response.data.data,
          pagination: response.data.pagination || null,
        };
      }

      // ⚠️ API returned empty → fallback to local data
      console.warn("API returned 0 products — falling back to local data.");
      return buildLocalFallback({ page, limit, category, brand, search });
    }
  } catch (err) {
    console.warn("API fetch failed — falling back to local data:", err.message);
  }

  return buildLocalFallback({ page, limit, category, brand, search });
};

/**
 * Filter & paginate local products as a fallback when API is empty.
 */
const buildLocalFallback = ({ page, limit, category, brand, search }) => {
  let filtered = localProducts;
  if (category) filtered = filtered.filter((p) => p.category === category);
  if (brand) filtered = filtered.filter((p) => p.brand === brand);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.nameAr?.includes(search) ||
        p.description?.toLowerCase().includes(q)
    );
  }
  const total = filtered.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit).map((p) => ({
    ...p,
    // Normalise local fields to match API shape
    imageUrl: p.image,
    isAvailable: p.inStock !== false,
  }));
  return {
    data,
    pagination: {
      total,
      page,
      pages,
      limit,
      next: page < pages ? page + 1 : null,
      prev: page > 1 ? page - 1 : null,
    },
  };
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
    // The API returns the product object directly (older versions wrapped it
    // in { success, data }), so accept both shapes.
    const body = response.data;
    const item = body?.data && body?.success ? body.data : body;
    if (item && item.id && item.name) {
      return transformProduct(item);
    }
  } catch (err) {
    console.error("Failed to fetch product by ID, trying fallback list:", err);
  }
  // Fallback
  const all = await fetchAllProducts(50);
  return all.find((p) => String(p.id) === String(id) || String(p._id) === String(id)) || null;
};
