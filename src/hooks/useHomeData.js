import { useState, useEffect, useCallback } from "react";
import { fetchAllProducts } from "../services/api/products";

/**
 * Single unified hook that fetches ALL home-page data in ONE API request.
 *
 * Returns:
 *  - bestSellers : products where isBestSeller === true (falls back to first 8)
 *  - offers      : products where isOffer === true
 *  - categories  : unique category names derived from products
 *  - allProducts : full raw list
 *  - loading     : boolean
 *  - error       : string | null
 *  - retry       : () => void
 */
export const useHomeData = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // ── Single request for the entire home page ──────────────────────────
      const products = await fetchAllProducts(35);

      setAllProducts(products);
    } catch (err) {
      console.error("useHomeData: failed to load products", err);
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Derive slices client-side — zero extra network calls
  const bestSellers = (() => {
    const sellers = allProducts.filter((p) => p.isBestSeller);
    return sellers.length > 0 ? sellers.slice(0, 8) : allProducts.slice(0, 8);
  })();

  const offers = allProducts.filter((p) => p.isOffer).slice(0, 8);

  // Derive unique non-null categories from product data
  const categoryNames = [
    ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
  ];

  return {
    allProducts,
    bestSellers,
    offers,
    categoryNames,
    loading,
    error,
    retry: loadData,
  };
};
