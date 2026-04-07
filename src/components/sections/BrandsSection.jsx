import BrandCard from "../common/BrandCard";
import { brands } from "../../data/brands";

const BrandsSection = ({ language = "en" }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-neutral-900 mb-2">
            {language === "ar"
              ? "العلامات التجارية الموثوقة"
              : "Trusted Brands"}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            {language === "ar"
              ? "نتعاون مع أفضل العلامات التجارية العالمية لنقدم لك منتجات عالية الجودة"
              : "We partner with the world's best brands to bring you high-quality products"}
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg border border-neutral-100">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <div className="text-left">
              <p className="font-bold text-neutral-900">
                {language === "ar"
                  ? "منتجات أصلية 100%"
                  : "100% Authentic Products"}
              </p>
              <p className="text-sm text-neutral-600">
                {language === "ar"
                  ? "مضمونة من العلامات التجارية الأصلية"
                  : "Guaranteed from original brands"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
