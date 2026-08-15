import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

/**
 * Premium Light HealthNeedCard.
 */
const HealthNeedCard = ({ need, language = "en" }) => {
  const Icon = need.icon;
  const isRtl = language === "ar";

  return (
    <Link
      to={need.link}
      className="group relative flex items-start gap-4 p-5 rounded-2xl
        bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-teal-950/5
        hover:border-teal-200 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Icon */}
      <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
        bg-teal-50 border border-teal-100/80 group-hover:bg-teal-600 group-hover:border-teal-600
        transition-all duration-300 group-hover:scale-105 shadow-xs">
        {Icon && (
          <Icon
            size={22}
            className="text-teal-700 group-hover:text-white transition-colors"
            strokeWidth={1.75}
          />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors duration-300 leading-tight">
          {isRtl ? need.nameAr : need.name}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 font-normal">
          {isRtl ? need.descriptionAr : need.description}
        </p>
      </div>

      {/* Arrow indicator */}
      <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
        {isRtl ? (
          <ArrowLeft size={15} className="text-teal-600" strokeWidth={2.5} />
        ) : (
          <ArrowRight size={15} className="text-teal-600" strokeWidth={2.5} />
        )}
      </div>
    </Link>
  );
};

export default HealthNeedCard;
