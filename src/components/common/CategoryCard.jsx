import { Link } from "react-router-dom";

/**
 * Minimalist Icon Category Card matching reference image:
 * Uses crisp green line vector icons inside elevated white circular containers.
 */
const CategoryCard = ({ category, language = "en" }) => {
  const isRtl = language === "ar";
  const name = isRtl ? category.nameAr : category.name;

  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative flex flex-col items-center justify-center p-5 rounded-2xl
        bg-[#f8faf9] border border-emerald-900/5 hover:border-emerald-500/30 hover:bg-white
        hover:shadow-xl hover:shadow-emerald-900/8 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center aspect-square"
    >
      {/* White Circular Container with Custom Green Icon */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white shadow-xs border border-emerald-100/70 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-300 group-hover:shadow-md overflow-hidden p-4">
        {category.iconImg ? (
          <img
            src={category.iconImg}
            alt={name}
            className="w-full h-full object-contain filter contrast-125 group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          category.icon && <category.icon size={44} strokeWidth={1.5} className="text-emerald-700" />
        )}
      </div>

      {/* Category Title in Almarai Font */}
      <h3 className="text-xs sm:text-sm font-extrabold text-emerald-900 group-hover:text-emerald-600 transition-colors leading-tight px-1 line-clamp-2">
        {name}
      </h3>
    </Link>
  );
};

export default CategoryCard;
