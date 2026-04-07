import { useEffect, useState, useCallback } from "react";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import ProductCard from "../common/ProductCard";
import SectionHeader from "../common/SectionHeader";
import {
  fetchBestSellers,
  fetchDiscountProducts,
} from "../../services/api/products";

const ProductsSection = ({
  language = "en",
  title,
  subtitle,
  sectionId,
  type = "featured", // 'featured' | 'bestsellers' | 'discounts'
  bgGradient = false,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultSubtitle =
    language === "ar"
      ? "منتجات عالية الجودة مختارة بعناية من أجلك"
      : "Premium quality products carefully selected for you";

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let data;
      if (type === "bestsellers") {
        data = await fetchBestSellers();
      } else if (type === "discounts") {
        data = await fetchDiscountProducts();
      } else {
        data = await fetchBestSellers();
      }

      setProducts(data);
      console.log(`Loaded ${data.length} products for type: ${type}`, data);
    } catch (err) {
      console.error("Failed to load products:", err);
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Loading state
  if (loading) {
    return (
      <section
        id={sectionId}
        className={`py-20 scroll-mt-20 ${bgGradient ? "bg-linear-to-b from-teal-600 to-teal-700" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={
              title ||
              (language === "ar" ? "منتجات مميزة" : "Featured Products")
            }
            subtitle={subtitle || defaultSubtitle}
            language={language}
            viewAllLink="/products"
            lightTheme={bgGradient}
          />

          {/* Loading Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
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

          <div className="flex justify-center items-center gap-3 mt-12">
            <Loader2
              className={`animate-spin ${bgGradient ? "text-white" : "text-teal-600"}`}
              size={24}
            />
            <span
              className={`font-medium ${bgGradient ? "text-white" : "text-gray-600"}`}
            >
              {language === "ar" ? "جاري التحميل..." : "Loading products..."}
            </span>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        id={sectionId}
        className={`py-20 scroll-mt-20 ${bgGradient ? "bg-linear-to-b from-teal-600 to-teal-700" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={
              title ||
              (language === "ar" ? "منتجات مميزة" : "Featured Products")
            }
            subtitle={subtitle || defaultSubtitle}
            language={language}
            viewAllLink="/products"
            lightTheme={bgGradient}
          />

          <div className="flex flex-col items-center justify-center py-16">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${bgGradient ? "bg-white/20" : "bg-red-50"}`}
            >
              <AlertCircle
                className={bgGradient ? "text-white" : "text-red-500"}
                size={32}
                strokeWidth={2}
              />
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${bgGradient ? "text-white" : "text-gray-900"}`}
            >
              {language === "ar"
                ? "فشل تحميل المنتجات"
                : "Failed to Load Products"}
            </h3>
            <p
              className={`mb-8 text-center max-w-md ${bgGradient ? "text-white/80" : "text-gray-600"}`}
            >
              {language === "ar"
                ? "عذراً، حدث خطأ أثناء تحميل المنتجات. يرجى المحاولة مرة أخرى."
                : "Sorry, we couldn't load the products. Please try again."}
            </p>
            <button
              onClick={loadProducts}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer hover:scale-105 active:scale-95 ${
                bgGradient
                  ? "bg-white text-teal-600 hover:bg-gray-100"
                  : "bg-teal-600 text-white hover:bg-teal-700"
              }`}
            >
              <RefreshCw size={18} strokeWidth={2.5} />
              <span>{language === "ar" ? "إعادة المحاولة" : "Try Again"}</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Success state
  return (
    <section
      id={sectionId}
      className={`py-24 scroll-mt-20 relative overflow-hidden ${
        bgGradient
          ? "bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800"
          : "bg-white"
      }`}
    >
      {/* Premium Background Pattern for Offers */}
      {bgGradient && (
        <>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-5"></div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title={
            title || (language === "ar" ? "منتجات مميزة" : "Featured Products")
          }
          subtitle={subtitle || defaultSubtitle}
          language={language}
          viewAllLink="/products"
          lightTheme={bgGradient}
        />

        {/* Products Grid - Premium spacing with enhanced offers styling */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ${
            bgGradient ? "mb-8" : ""
          }`}
        >
          {products.map((product) => (
            <div
              key={product._id || product.id}
              className={
                bgGradient
                  ? "transform hover:scale-105 transition-transform duration-300"
                  : ""
              }
            >
              <ProductCard product={product} language={language} />
            </div>
          ))}
        </div>

        {/* Premium CTA for Offers Section */}
        {bgGradient && (
          <div className="text-center mt-12">
            <a
              href="/products?filter=discounts"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-700 font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {language === "ar" ? "تصفح جميع العروض" : "Browse All Offers"}
              <span className="text-xl">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
