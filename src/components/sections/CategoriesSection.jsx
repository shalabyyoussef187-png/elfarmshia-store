import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import CategoryCard from "../common/CategoryCard";
import SectionHeader from "../common/SectionHeader";
import { useCategories } from "../../hooks/useCategories";

const CategoriesSection = ({ language = "en" }) => {
  const { categories, loading, error, retry } = useCategories(language);

  // Loading state with premium skeleton cards
  if (loading) {
    return (
      <section className="py-20 bg-linear-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={language === "ar" ? "تسوق حسب الفئة" : "Shop By Category"}
            subtitle={
              language === "ar"
                ? "اختر من بين مجموعة واسعة من المنتجات المتميزة"
                : "Discover our curated collections of premium healthcare products"
            }
            language={language}
            viewAllLink="/categories"
          />

          {/* Premium Loading Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse"
              >
                <div className="aspect-4/3 bg-gray-200"></div>
              </div>
            ))}
          </div>

          {/* Loading indicator */}
          <div className="flex justify-center items-center gap-3 mt-12">
            <Loader2 className="animate-spin text-teal-600" size={24} />
            <span className="text-gray-600 font-medium">
              {language === "ar" ? "جاري التحميل..." : "Loading categories..."}
            </span>
          </div>
        </div>
      </section>
    );
  }

  // Error state with premium retry UI
  if (error) {
    return (
      <section className="py-20 bg-linear-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={language === "ar" ? "تسوق حسب الفئة" : "Shop By Category"}
            subtitle={
              language === "ar"
                ? "اختر من بين مجموعة واسعة من المنتجات المتميزة"
                : "Discover our curated collections of premium healthcare products"
            }
            language={language}
            viewAllLink="/categories"
          />

          {/* Premium Error State */}
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
              <AlertCircle className="text-red-500" size={32} strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {language === "ar"
                ? "فشل تحميل الفئات"
                : "Failed to Load Categories"}
            </h3>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              {language === "ar"
                ? "عذراً، حدث خطأ أثناء تحميل الفئات. يرجى المحاولة مرة أخرى."
                : "Sorry, we couldn't load the categories. Please try again."}
            </p>
            <button
              onClick={retry}
              className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer hover:scale-105 active:scale-95"
            >
              <RefreshCw size={18} strokeWidth={2.5} />
              <span>{language === "ar" ? "إعادة المحاولة" : "Try Again"}</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!categories || categories.length === 0) {
    return (
      <section className="py-20 bg-linear-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={language === "ar" ? "تسوق حسب الفئة" : "Shop By Category"}
            subtitle={
              language === "ar"
                ? "اختر من بين مجموعة واسعة من المنتجات المتميزة"
                : "Discover our curated collections of premium healthcare products"
            }
            language={language}
            viewAllLink="/categories"
          />

          {/* Premium Empty State */}
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
              <AlertCircle
                className="text-gray-400"
                size={32}
                strokeWidth={2}
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {language === "ar" ? "لا توجد فئات" : "No Categories Available"}
            </h3>
            <p className="text-gray-600 text-center max-w-md">
              {language === "ar"
                ? "لا توجد فئات متاحة في الوقت الحالي. يرجى التحقق مرة أخرى لاحقاً."
                : "No categories are available at the moment. Please check back later."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Success state - render premium category cards (limited to 5)
  const displayCategories = categories.slice(0, 5);

  return (
    <section className="py-20 bg-linear-to-b from-white to-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={language === "ar" ? "تسوق حسب الفئة" : "Shop By Category"}
          subtitle={
            language === "ar"
              ? "اختر من بين مجموعة واسعة من المنتجات المتميزة"
              : "Discover our curated collections of premium healthcare products"
          }
          language={language}
          viewAllLink="/categories"
        />

        {/* Categories Grid - More spacious, showing only first 5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {displayCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
