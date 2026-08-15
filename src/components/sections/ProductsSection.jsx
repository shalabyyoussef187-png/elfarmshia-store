import { useState } from "react";
import { AlertCircle, RefreshCw, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../common/ProductCard";
import SectionHeader from "../common/SectionHeader";

/**
 * ProductsSection — Pristine Light Theme Container with optional Pagination.
 */
const ProductsSection = ({
  products = [],
  loading = false,
  error = null,
  retry,
  language = "en",
  title,
  subtitle,
  sectionId,
  bgGradient = false,
  showPagination = false,
  itemsPerPage = 8,
}) => {
  const isRtl = language === "ar";
  const isOffers = bgGradient;

  const [currentPage, setCurrentPage] = useState(1);

  const defaultTitle = isRtl ? "منتجات مميزة" : "Featured Products";
  const defaultSubtitle = isRtl
    ? "منتجات عالية الجودة مختارة بعناية من أجلك"
    : "Premium quality products carefully selected for you";

  // ── Pagination Calculation ────────────────────────────────────────────────
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const displayProducts = showPagination
    ? products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : products;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll smoothly to top of section
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ── Skeleton ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <section
        id={sectionId}
        className={`py-20 scroll-mt-20 ${
          isOffers
            ? "bg-gradient-to-b from-teal-50/50 via-teal-100/30 to-white"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={title || defaultTitle}
            subtitle={subtitle || defaultSubtitle}
            language={language}
            viewAllLink="/products"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-96 rounded-3xl bg-white border border-gray-100 shadow-xs animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <section
        id={sectionId}
        className={`py-20 scroll-mt-20 ${isOffers ? "bg-teal-50/40" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={title || defaultTitle}
            subtitle={subtitle || defaultSubtitle}
            language={language}
            viewAllLink="/products"
          />
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
              <AlertCircle className="text-red-500" size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {isRtl ? "فشل تحميل المنتجات" : "Failed to Load Products"}
            </h3>
            <button
              onClick={retry}
              className="mt-3 flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full transition-all duration-300 shadow-md cursor-pointer"
            >
              <RefreshCw size={16} strokeWidth={2.5} />
              {isRtl ? "إعادة المحاولة" : "Try Again"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── Success ───────────────────────────────────────────────────────────────
  return (
    <section
      id={sectionId}
      className={`py-20 scroll-mt-20 relative overflow-hidden ${
        isOffers
          ? "bg-gradient-to-b from-teal-50/70 via-emerald-50/30 to-white border-y border-teal-100/60"
          : "bg-white"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={title || defaultTitle}
          subtitle={subtitle || defaultSubtitle}
          language={language}
          viewAllLink="/products"
        />

        {displayProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-base">
              {isRtl ? "لا توجد منتجات متاحة" : "No products available"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard
                key={product._id || product.id}
                product={product}
                language={language}
              />
            ))}
          </div>
        )}

        {/* ── PAGINATION CONTROLS ── */}
        {showPagination && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-gray-100" dir="ltr">
            {/* Prev Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all cursor-pointer shadow-xs"
              aria-label="Previous Page"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full text-xs font-black transition-all cursor-pointer ${
                  currentPage === page
                    ? "bg-teal-600 text-white shadow-md shadow-teal-600/25 scale-105"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all cursor-pointer shadow-xs"
              aria-label="Next Page"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* Offers CTA */}
        {isOffers && products.length > 0 && (
          <div className="text-center mt-12">
            <a
              href="/products?filter=discounts"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-full
                shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 hover:scale-105 transition-all duration-300 active:scale-95"
            >
              {isRtl ? "تصفح جميع العروض" : "Browse All Offers"}
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
