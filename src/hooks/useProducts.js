import { useState, useEffect } from "react";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
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
