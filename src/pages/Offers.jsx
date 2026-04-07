import { useState } from "react";
import ProductCard from "../components/common/ProductCard";
import { getDiscountedProducts } from "../data/products";

const Offers = () => {
  const [language, setLanguage] = useState("en");
  const discountedProducts = getDiscountedProducts();

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-neutral-900 mb-4">
            {language === "ar" ? "العروض الخاصة" : "Special Offers"}
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {language === "ar"
              ? "اكتشف أفضل العروض والخصومات على منتجاتنا"
              : "Discover the best deals and discounts on our products"}
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {discountedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              language={language}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
