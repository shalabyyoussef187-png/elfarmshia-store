import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

const SectionHeader = ({
  title,
  subtitle,
  language = "en",
  showViewAll = true,
  viewAllLink = "/offers",
  lightTheme = false,
}) => {
  return (
    <div className="flex items-end justify-between mb-12">
      <div className="max-w-2xl">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-3 tracking-tight ${lightTheme ? "text-white" : "text-gray-900"}`}
        >
          {title}
        </h2>
        <p
          className={`text-lg font-light ${lightTheme ? "text-white/80" : "text-gray-500"}`}
        >
          {subtitle}
        </p>
      </div>

      {showViewAll && (
        <Link
          to={viewAllLink}
          className={`hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full border font-medium transition-all duration-300 hover:shadow-md group cursor-pointer active:scale-95 ${
            lightTheme
              ? "bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
              : "bg-white border-gray-200 hover:border-teal-300 text-gray-700 hover:text-teal-600"
          }`}
        >
          <span>{language === "ar" ? "عرض الكل" : "View All"}</span>
          {language === "ar" ? (
            <ArrowLeft
              size={18}
              strokeWidth={2.5}
              className="group-hover:-translate-x-1 transition-transform"
            />
          ) : (
            <ArrowRight
              size={18}
              strokeWidth={2.5}
              className="group-hover:translate-x-1 transition-transform"
            />
          )}
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
