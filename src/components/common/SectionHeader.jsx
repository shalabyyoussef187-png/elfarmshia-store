import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

/**
 * Reusable section header with light and dark theme variants.
 * Properly aligned for LTR (Title Left, ViewAll Right) & RTL (Title Right, ViewAll Left).
 */
const SectionHeader = ({
  title,
  subtitle,
  language = "en",
  viewAllLink,
  viewAllText,
  showViewAll = true,
  dark = false,
  lightTheme = false,
}) => {
  const isDark = dark || lightTheme;
  const isRtl = language === "ar";

  const defaultViewAll = isRtl ? "عرض الكل" : "View All";

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Main title area (Right-aligned in RTL, Left-aligned in LTR) */}
      <div className={isRtl ? "text-right" : "text-left"}>
        <h2
          className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className={`mt-2 text-sm sm:text-base font-normal leading-relaxed max-w-xl ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* View All Button */}
      {showViewAll && viewAllLink && (
        <Link
          to={viewAllLink}
          className={`group shrink-0 inline-flex items-center gap-2 text-sm font-bold transition-all duration-300 px-4 py-2 rounded-full border ${
            isDark
              ? "border-teal-500/30 text-teal-400 hover:bg-teal-500/10"
              : "border-teal-100 bg-teal-50/50 text-teal-700 hover:bg-teal-600 hover:text-white hover:border-teal-600 shadow-xs hover:shadow-md"
          }`}
        >
          {isRtl ? (
            <>
              <ArrowLeft
                size={16}
                strokeWidth={2.5}
                className="group-hover:-translate-x-1 transition-transform"
              />
              {viewAllText || defaultViewAll}
            </>
          ) : (
            <>
              {viewAllText || defaultViewAll}
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="group-hover:translate-x-1 transition-transform"
              />
            </>
          )}
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
