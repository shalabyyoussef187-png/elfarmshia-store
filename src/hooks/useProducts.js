import { useState, useEffect } from "react";

// Lists already loaded in this visit, so Back shows them instantly (then refreshes quietly).
const listCache = new Map();
import { fetchProducts, transformProduct } from "../services/api/products";

/**
 * Custom hook for fetching and managing products data
 * @param {Object} options - Hook options
 * @param {number} options.page - Page number
 * @param {number} options.limit - Items per page
 * @param {string} options.category - Filter by category
 * @param {string} options.brand - Filter by brand
 * @param {string} options.search - Search query
 * @param {boolean} options.autoFetch - Auto-fetch on mount (default: true)
 * @returns {Object} - Products data, loading state, error state, and utility functions
 */
export const useProducts = ({
  page = 1,
  limit = 20,
  category = "",
  brand = "",
  search = "",
  autoFetch = true,
} = {}) => {
  const cacheKey = JSON.stringify({ page, limit, category, brand, search });
  const cached = listCache.get(cacheKey);
  const [products, setProducts] = useState(cached ? cached.products : []);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(cached ? cached.pagination : null);

  const loadProducts = async () => {
    try {
      const hit = listCache.get(cacheKey);
      if (hit) {
        setProducts(hit.products);
        setPagination(hit.pagination);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await fetchProducts({
        page,
        limit,
        category,
        brand,
        search,
      });

      // Transform products for consistent use
      const transformedProducts = response.data.map(transformProduct);

      listCache.set(cacheKey, { products: transformedProducts, pagination: response.pagination });
      setProducts(transformedProducts);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Failed to load products:", err);
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      loadProducts();
    }
  }, [page, limit, category, brand, search, autoFetch]);

  return {
    products,
    loading,
    error,
    pagination,
    retry: loadProducts,
    refresh: loadProducts,
  };
};
