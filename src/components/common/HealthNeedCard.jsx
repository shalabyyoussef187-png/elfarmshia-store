import { Link } from "react-router-dom";

const HealthNeedCard = ({ need, language = "en" }) => {
  const Icon = need.icon;

  return (
    <Link
      to={need.link}
      className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-teal-200 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Icon Container */}
      <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors duration-300">
        <Icon size={28} className="text-teal-600" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
        {language === "ar" ? need.nameAr : need.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed">
        {language === "ar" ? need.descriptionAr : need.description}
      </p>
    </Link>
  );
};

export default HealthNeedCard;
