import CategoryCard from "../common/CategoryCard";
import iconVitB from "../../assets/icon_vit_b.png";
import iconHairVit from "../../assets/icon_hair_vit.png";
import iconVitC from "../../assets/icon_vit_c.png";
import iconMultiVit from "../../assets/icon_multi_vit.png";
import iconGeneralVit from "../../assets/icon_general_vit.png";
import { Leaf } from "lucide-react";

// Categories with premium green vector icons matching the reference screenshot:
const REFERENCE_CATEGORIES = [
  {
    slug: "vitamin-b",
    name: "Vitamin B",
    nameAr: "فيتامين ب",
    iconImg: iconVitB,
  },
  {
    slug: "hair-vitamins",
    name: "Hair Vitamins",
    nameAr: "فيتامينات الشعر",
    iconImg: iconHairVit,
  },
  {
    slug: "vitamin-c",
    name: "Vitamin C",
    nameAr: "فيتامين سي",
    iconImg: iconVitC,
  },
  {
    slug: "multivitamins",
    name: "Multivitamins",
    nameAr: "الفيتامينات المتعددة",
    iconImg: iconMultiVit,
  },
  {
    slug: "vitamins",
    name: "Vitamins",
    nameAr: "Vitamins - الفيتامينات",
    iconImg: iconGeneralVit,
  },
  {
    slug: "supplements",
    name: "Dietary Supplements",
    nameAr: "Supplements - المكملات الغذائية",
    icon: Leaf,
  },
];

/**
 * CategoriesSection — Clean Minimalist Icon Grid with Premium Green Line Icons & Almarai Font.
 */
const CategoriesSection = ({ language = "en" }) => {
  const isRtl = language === "ar";

  return (
    <section className="py-14 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Title using Almarai Arabic font */}
        <div className="text-center mb-9">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
            {isRtl ? "تسوق حسب الفئة" : "Shop By Category"}
          </h2>
        </div>

        {/* 6 Square Icon Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-5">
          {REFERENCE_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.slug}
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
