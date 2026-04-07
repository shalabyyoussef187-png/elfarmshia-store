import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import Hero from "../components/sections/Hero";
import CategoriesSection from "../components/sections/CategoriesSection";
import ProductsSection from "../components/sections/ProductsSection";
import HealthNeedsSection from "../components/sections/HealthNeedsSection";
import FeaturedCollection from "../components/sections/FeaturedCollection";
import TrustSection from "../components/sections/TrustSection";
import BlogSection from "../components/sections/BlogSection";

const Home = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <Hero language={language} />

      {/* 2. Shop by Category */}
      <CategoriesSection language={language} />

      {/* 3. Best Sellers */}
      <ProductsSection
        language={language}
        type="bestsellers"
        title={t("home.bestSellers.title")}
        subtitle={t("home.bestSellers.subtitle")}
      />

      {/* 4. Shop by Health Needs */}
      <HealthNeedsSection language={language} />

      {/* 5. Offers / Deals */}
      <ProductsSection
        language={language}
        type="discounts"
        bgGradient={true}
        title={t("home.offers.title")}
        subtitle={t("home.offers.subtitle")}
      />

      {/* 6. Featured Collection */}
      <FeaturedCollection language={language} />

      {/* 7. Trust Section */}
      <TrustSection language={language} />

      {/* 8. Blog / Tips */}
      <BlogSection language={language} />
    </div>
  );
};

export default Home;
