import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import {
  Search,
  SlidersHorizontal,
  Loader2,
  AlertCircle,
  RefreshCw,
  X,
} from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/common/ProductCard";
import CustomSelect from "../components/common/CustomSelect";
import { fetchProducts } from "../services/api/products";

const Products = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const { products, loading, error, pagination, retry } = useProducts({
    page,
    limit: 16,
    search,
    category,
    brand,
  });

  // Extract unique categories and brands from products
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetchProducts({ page: 1, limit: 100 });
        const uniqueCategories = [
          ...new Set(response.data.map((p) => p.category).filter(Boolean)),
        ];
        const uniqueBrands = [
          ...new Set(response.data.map((p) => p.brand).filter(Boolean)),
        ];
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      } catch (err) {
        console.error("Failed to load filters:", err);
      }
    };
    fetchFilters();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleBrandChange = (value) => {
    setBrand(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setSearchInput("");
    setCategory("");
    setBrand("");
    setPage(1);
  };

  const hasActiveFilters = search || category || brand;

  // Prepare options for custom selects
  const categoryOptions = [
    { value: "", label: t("common.allCategories") },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  const brandOptions = [
    { value: "", label: t("common.allBrands") },
    ...brands.map((b) => ({ value: b, label: b })),
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-teal-600 via-teal-700 to-teal-800 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t("products.title")}
          </h1>
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl">
            {t("products.subtitle")}
          </p>
        </div>
      </section>

      {/* Filters & Search Bar */}
      <section className="sticky top-24 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={t("common.searchProducts")}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl text-gray-700 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all"
                />
              </div>
            </form>

            {/* Category Filter */}
            <CustomSelect
              value={category}
              onChange={handleCategoryChange}
              options={categoryOptions}
              placeholder={t("common.category")}
              className="min-w-50"
            />

            {/* Brand Filter */}
            <CustomSelect
              value={brand}
              onChange={handleBrandChange}
              options={brandOptions}
              placeholder={t("common.brand")}
              className="min-w-50"
            />

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold transition-all duration-200 cursor-pointer active:scale-95"
              >
                <X size={18} />
                <span>{t("common.clearFilters")}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          {!loading && !error && pagination && (
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <p className="text-gray-600 text-lg">
                {t("common.showing")}{" "}
                <span className="font-bold text-teal-600">
                  {products.length}
                </span>{" "}
                {t("common.of")}{" "}
                <span className="font-bold text-gray-900">
                  {pagination.total}
                </span>{" "}
                {t("common.products")}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse"
                  >
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center gap-3">
                <Loader2 className="animate-spin text-teal-600" size={24} />
                <span className="text-gray-600 font-medium">
                  {t("common.loading")}
                </span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
                <AlertCircle
                  className="text-red-500"
                  size={32}
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t("common.error")}
              </h3>
              <p className="text-gray-600 mb-8 text-center max-w-md">
                {language === "ar"
                  ? "عذراً، حدث خطأ أثناء تحميل المنتجات. يرجى المحاولة مرة أخرى."
                  : "Sorry, we couldn't load the products. Please try again."}
              </p>
              <button
                onClick={retry}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer hover:scale-105 active:scale-95"
              >
                <RefreshCw size={18} strokeWidth={2.5} />
                <span>{t("common.retry")}</span>
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
                <SlidersHorizontal
                  className="text-gray-400"
                  size={32}
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === "ar" ? "لا توجد منتجات" : "No Products Found"}
              </h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                {language === "ar"
                  ? "لم نتمكن من العثور على أي منتجات تطابق معايير البحث. جرب تعديل الفلاتر."
                  : "We couldn't find any products matching your criteria. Try adjusting the filters."}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
                >
                  {language === "ar" ? "مسح الفلاتر" : "Clear All Filters"}
                </button>
              )}
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && products.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {products.map((product) => (
                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                    language={language}
                  />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={!pagination.prev}
                    className="px-5 py-2.5 rounded-xl font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer active:scale-95"
                  >
                    {language === "ar" ? "السابق" : "Previous"}
                  </button>

                  <div className="flex items-center gap-2">
                    {[...Array(pagination.pages)].map((_, i) => {
                      const pageNum = i + 1;
                      // Show first page, last page, current page, and adjacent pages
                      if (
                        pageNum === 1 ||
                        pageNum === pagination.pages ||
                        (pageNum >= page - 1 && pageNum <= page + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 cursor-pointer active:scale-90 ${
                              pageNum === page
                                ? "bg-teal-600 text-white shadow-lg hover:bg-teal-700"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (pageNum === page - 2 || pageNum === page + 2) {
                        return (
                          <span key={pageNum} className="text-gray-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={!pagination.next}
                    className="px-5 py-2.5 rounded-xl font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer active:scale-95"
                  >
                    {language === "ar" ? "التالي" : "Next"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
