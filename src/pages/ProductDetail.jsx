import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";
import {
  IoCart,
  IoCheckmark,
  IoHeart,
  IoHeartOutline,
  IoStar,
  IoArrowBack,
  IoArrowForward,
} from "react-icons/io5";
import Button from "../components/common/Button";

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart, isInCart } = useCart();
  const [language, setLanguage] = useState("en");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            {language === "ar" ? "المنتج غير موجود" : "Product Not Found"}
          </h1>
          <Link
            to="/"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            {language === "ar" ? "العودة للرئيسية" : "Back to Home"}
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowAddedAnimation(true);
    setTimeout(() => setShowAddedAnimation(false), 2000);
  };

  const inCart = isInCart(product.id);

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-neutral-600">
          <Link to="/" className="hover:text-primary-600">
            {language === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <span>/</span>
          <Link
            to={`/category/${product.category}`}
            className="hover:text-primary-600"
          >
            {language === "ar" ? product.categoryNameAr : product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-semibold">
            {language === "ar" ? product.nameAr : product.name}
          </span>
        </div>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl p-8 shadow-lg">
          {/* Image Section */}
          <div className="relative">
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 z-10 bg-linear-to-r from-red-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                {product.discount}% OFF
              </div>
            )}
            <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-100">
              <img
                src={product.image}
                alt={language === "ar" ? product.nameAr : product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            {/* Category Tag */}
            <span className="inline-block text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-4 self-start">
              {language === "ar"
                ? product.categoryNameAr
                : product.categoryName}
            </span>

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">
              {language === "ar" ? product.nameAr : product.name}
            </h1>

            {/* Brand */}
            <p className="text-lg text-neutral-600 mb-4">
              {language === "ar" ? "العلامة التجارية:" : "Brand:"}{" "}
              <span className="font-semibold text-neutral-900">
                {product.brand}
              </span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <IoStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-neutral-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-neutral-600">
                {product.rating} ({product.reviews}{" "}
                {language === "ar" ? "تقييم" : "reviews"})
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-primary-600">
                  {product.price}{" "}
                  <span className="text-xl">
                    {language === "ar" ? "ج.م" : "EGP"}
                  </span>
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-2xl text-neutral-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              {product.originalPrice > product.price && (
                <p className="text-emerald-600 font-semibold mt-2">
                  {language === "ar" ? "وفّر" : "Save"}{" "}
                  {product.originalPrice - product.price}{" "}
                  {language === "ar" ? "ج.م" : "EGP"}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold text-lg text-neutral-900 mb-2">
                {language === "ar" ? "الوصف" : "Description"}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {language === "ar"
                  ? product.descriptionAr
                  : product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="inline-flex items-center gap-2 text-emerald-600 font-semibold">
                  <IoCheckmark className="w-5 h-5" />
                  {language === "ar" ? "متوفر في المخزون" : "In Stock"}
                </span>
              ) : (
                <span className="text-red-600 font-semibold">
                  {language === "ar" ? "غير متوفر" : "Out of Stock"}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block font-semibold text-neutral-900 mb-2">
                {language === "ar" ? "الكمية" : "Quantity"}
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center font-bold text-xl transition-colors"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-neutral-900 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center font-bold text-xl transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1"
                icon={
                  showAddedAnimation ? (
                    <IoCheckmark className="w-5 h-5" />
                  ) : (
                    <IoCart className="w-5 h-5" />
                  )
                }
              >
                {showAddedAnimation
                  ? language === "ar"
                    ? "تمت الإضافة!"
                    : "Added!"
                  : inCart
                    ? language === "ar"
                      ? "أضف المزيد"
                      : "Add More"
                    : language === "ar"
                      ? "أضف للسلة"
                      : "Add to Cart"}
              </Button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-14 h-14 rounded-xl bg-neutral-100 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer active:scale-90 hover:scale-110"
              >
                {isWishlisted ? (
                  <IoHeart className="w-6 h-6 text-red-500" />
                ) : (
                  <IoHeartOutline className="w-6 h-6 text-neutral-600" />
                )}
              </button>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-6 border-t border-neutral-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                  <IoCheckmark className="w-5 h-5 text-primary-600" />
                </div>
                <span className="text-neutral-700">
                  {language === "ar"
                    ? "منتج أصلي 100%"
                    : "100% Authentic Product"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                  <IoCheckmark className="w-5 h-5 text-primary-600" />
                </div>
                <span className="text-neutral-700">
                  {language === "ar"
                    ? "توصيل سريع خلال 24 ساعة"
                    : "Fast Delivery Within 24 Hours"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                  <IoCheckmark className="w-5 h-5 text-primary-600" />
                </div>
                <span className="text-neutral-700">
                  {language === "ar"
                    ? "إرجاع مجاني خلال 14 يوم"
                    : "Free Returns Within 14 Days"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
