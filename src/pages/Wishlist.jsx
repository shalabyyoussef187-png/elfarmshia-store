import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useWishlist } from "../utils/wishlist";
import ProductCard from "../components/common/ProductCard";

const Wishlist = () => {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const { items } = useWishlist();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[60vh]" dir={isRtl ? "rtl" : "ltr"}>
      <h1 className="mb-6 flex items-center gap-2 text-2xl font-black text-gray-900">
        <Heart className="fill-emerald-600 text-emerald-600" size={24} />
        {isRtl ? "المفضلة" : "Wishlist"}
      </h1>
      {items.length === 0 ? (
        <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center">
          <p className="mb-4 font-bold text-gray-600">
            {isRtl ? "لسه مفيش منتجات في المفضلة. دوس على القلب في أي منتج." : "No saved products yet. Tap the heart on any product."}
          </p>
          <Link to="/products" className="inline-block rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-black text-white">
            {isRtl ? "تصفح المنتجات" : "Browse products"}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} language={language} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
