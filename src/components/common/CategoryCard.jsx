import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getCategoryImage } from "../../utils/categoryImages";

const CategoryCard = ({ category, language = "en" }) => {
  const imageUrl = getCategoryImage(category.slug, category.image);

  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      {/* Image Container with Zoom Effect */}
      <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-gray-50 to-gray-100">
        <img
          src={imageUrl}
          alt={language === "ar" ? category.nameAr : category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Content Area */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          {/* Category Title - Editorial Style */}
          <h3 className="text-white text-3xl font-bold mb-2 tracking-tight leading-tight">
            {language === "ar" ? category.nameAr : category.name}
          </h3>

          {/* Subtitle - Softer */}
          <p className="text-white/80 text-sm font-light mb-4 leading-relaxed">
            {language === "ar" ? category.descriptionAr : category.description}
          </p>

          {/* Elegant Arrow Indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <span>{language === "ar" ? "استكشف" : "Explore"}</span>
            {language === "ar" ? (
              <ArrowLeft size={16} strokeWidth={2.5} />
            ) : (
              <ArrowRight size={16} strokeWidth={2.5} />
            )}
          </div>
        </div>
      </div>

      {/* Subtle Lift Effect */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 group-hover:ring-teal-500/20 transition-all duration-500"></div>
    </Link>
  );
};

export default CategoryCard;
