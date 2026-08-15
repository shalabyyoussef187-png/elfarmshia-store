import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { useHomeData } from "../hooks/useHomeData";
import Hero from "../components/sections/Hero";
import CategoriesSection from "../components/sections/CategoriesSection";
import ProductsSection from "../components/sections/ProductsSection";
import HealthNeedsSection from "../components/sections/HealthNeedsSection";
import TrustSection from "../components/sections/TrustSection";
import BlogSection from "../components/sections/BlogSection";

/**
 * Home page — Single API request strategy & light theme aesthetic.
 */
const Home = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isRtl = language === "ar";

  // Single API request for the entire home page
  const { bestSellers, offers, categoryNames, allProducts, loading, error, retry } =
    useHomeData();

  return (
    <div className="min-h-screen bg-white -mt-24">
      {/* 1. Hero Section */}
      <Hero language={language} />

      {/* 2. Categories Section */}
      <CategoriesSection
        categoryNames={categoryNames}
        allProducts={allProducts}
        language={language}
        loading={loading}
        error={error}
        retry={retry}
      />

      {/* 3. Best Sellers Section */}
      <ProductsSection
        products={bestSellers}
        loading={loading}
        error={error}
        retry={retry}
        language={language}
        type="bestsellers"
        title={t("home.bestSellers.title")}
        subtitle={t("home.bestSellers.subtitle")}
      />

      {/* 4. Shop by Health Needs Section */}
      <HealthNeedsSection language={language} />

      {/* 5. Offers & Deals Section */}
      {offers && offers.length > 0 && (
        <ProductsSection
          products={offers}
          loading={loading}
          error={error}
          retry={retry}
          language={language}
          type="discounts"
          bgGradient={true}
          title={t("home.offers.title")}
          subtitle={t("home.offers.subtitle")}
        />
      )}

      {/* 6. All Products Section (جميع المنتجات) with Pagination */}
      <ProductsSection
        sectionId="all-products-section"
        products={allProducts}
        loading={loading}
        error={error}
        retry={retry}
        language={language}
        type="all"
        title={isRtl ? "جميع المنتجات" : "All Products"}
        subtitle={
          isRtl
            ? "تصفح جميع المنتجات والحلول الصحية المتاحة لدينا"
            : "Browse all available health products and solutions"
        }
        showPagination={true}
        itemsPerPage={8}
      />

      {/* 7. Trust Section */}
      <TrustSection language={language} />

      {/* 8. Blog / Tips Section */}
      <BlogSection language={language} />
    </div>
  );
};

export default Home;
