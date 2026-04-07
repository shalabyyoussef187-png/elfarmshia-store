import { Link } from "react-router-dom";

const BrandCard = ({ brand }) => {
  return (
    <Link
      to={`/brand/${brand.slug}`}
      className="group relative bg-white rounded-xl shadow-md hover:shadow-xl border border-neutral-100 hover:border-primary-200 transition-all duration-300 overflow-hidden p-6 flex items-center justify-center aspect-square"
    >
      {/* Brand Logo */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <img
          src={brand.logo}
          alt={brand.name}
          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0"
          loading="lazy"
        />
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-linear-to-br from-primary-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Hover Border */}
      <div className="absolute inset-0 border-2 border-primary-500 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 pointer-events-none"></div>
    </Link>
  );
};

export default BrandCard;
