import { useState, useEffect } from "react";
import {
  fetchCategories,
  getCategoryName,
  getCategoryDescription,
  getCategoryImage,
  generateSlug,
} from "../services/api/categories";

/**
 * Custom hook for fetching and managing categories data
 * @param {string} language - Current language ('en' or 'ar')
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Object} - Categories data, loading state, error state, and retry function
 */
export const useCategories = (language = "en", page = 1, limit = 20) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchCategories(page, limit);

      // Transform API data to match our component structure
      const transformedCategories = response.data.map((category) => ({
        id: category._id,
        name: getCategoryName(category.name, "en"), // English name
        nameAr: category.name, // Arabic name from API
        slug: generateSlug(category.name),
        image: getCategoryImage(category.name),
        description: getCategoryDescription(category.name, "en"),
        descriptionAr: getCategoryDescription(category.name, "ar"),
      }));

      setCategories(transformedCategories);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Failed to load categories:", err);
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [page, limit]);

  return {
    categories,
    loading,
    error,
    pagination,
    retry: loadCategories,
  };
};
