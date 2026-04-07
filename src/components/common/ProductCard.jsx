import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { ShoppingCart, Check, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, language = "en" }) => {
  const { addToCart, isInCart } = useCart();
  const { success } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setShowAddedAnimation(true);
    success(
      language === "ar"
        ? `تمت إضافة ${product.name} إلى السلة`
        : `${product.name} added to cart`,
    );
    setTimeout(() => setShowAddedAnimation(false), 2000);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  // Handle both _id and id
  const productId = product._id || product.id;
  const inCart = isInCart(productId);
  // All products in database are available
  const inStock = product.inStock !== false;

  return (
    <Link
      to={`/product/${productId}`}
      className="group relative bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100/50 hover:border-teal-200/50 transition-all duration-500 overflow-hidden flex flex-col h-full"
    >
      {/* Discount Badge - Refined */}
      {product.discount > 0 && (
        <div className="absolute top-4 left-4 z-10 backdrop-blur-md bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          -{product.discount}%
        </div>
      )}

      {/* Wishlist Button - Softer */}
      <button
        onClick={toggleWishlist}
        className="absolute top-4 right-4 z-10 p-2.5 backdrop-blur-md bg-white/80 rounded-full hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer active:scale-90 hover:scale-110"
      >
        <Heart
          size={18}
          strokeWidth={2}
          className={`transition-colors ${
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* Premium Image Container */}
      <div className="relative aspect-square bg-linear-to-br from-gray-50 to-gray-100/50 overflow-hidden rounded-t-3xl">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </div>

        {!inStock && (
          <div className="absolute inset-0 backdrop-blur-sm bg-white/60 flex items-center justify-center">
            <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium">
              {language === "ar" ? "غير متوفر" : "Out of Stock"}
            </span>
          </div>
        )}
      </div>

      {/* Content Area - Refined Spacing */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category Tag - Subtle */}
        <div className="mb-3">
          <span className="inline-block text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1.5 rounded-full">
            {product.category || (language === "ar" ? "عام" : "General")}
          </span>
        </div>

        {/* Product Name - Strong Typography */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-teal-600 transition-colors">
          {product.name}
        </h3>

        {/* Brand - New */}
        {product.brand && (
          <p className="text-sm text-gray-500 mb-4">
            {language === "ar" ? "العلامة التجارية:" : "Brand:"}{" "}
            <span className="font-medium text-gray-700">{product.brand}</span>
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Price - Excellent Hierarchy */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-teal-600">
              {product.price != null ? product.price.toFixed(2) : "N/A"}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {language === "ar" ? "ج.م" : "EGP"}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through font-light ml-1">
                {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Elegant CTA Button */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md ${
            inCart
              ? "bg-emerald-500 text-white hover:bg-emerald-600"
              : inStock
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {showAddedAnimation ? (
            <>
              <Check size={18} strokeWidth={2.5} />
              {language === "ar" ? "تمت الإضافة" : "Added"}
            </>
          ) : inCart ? (
            <>
              <Check size={18} strokeWidth={2.5} />
              {language === "ar" ? "في السلة" : "In Cart"}
            </>
          ) : (
            <>
              <ShoppingCart size={18} strokeWidth={2} />
              {language === "ar" ? "أضف للسلة" : "Add to Cart"}
            </>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
