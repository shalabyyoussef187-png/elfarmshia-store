import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { ShoppingCart, Check, Heart, Minus, Plus } from "lucide-react";
import { toggleWishlist as toggleSaved, useWishlist } from "../../utils/wishlist";
import { useState } from "react";
import { Link } from "react-router-dom";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop";

/**
 * Pristine Light Luxury Glass Product Card
 * Exact layout from the reference image, rendered in a crisp, ultra-clean light aesthetic!
 */
const ProductCard = ({ product, language = "en", layout = "grid" }) => {
  const { addToCart, isInCart, getItemQuantity, updateQuantity } = useCart();
  const { success } = useToast();
  const wishlist = useWishlist();
  const isWishlisted = wishlist.has(product);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);

  const productId = product._id || product.id;
  const inCart = isInCart(productId);
  const inStock = product.isAvailable !== false && product.inStock !== false;
  const imageUrl = product.image || FALLBACK_IMAGE;

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
    e.stopPropagation();
    toggleSaved(product);
    success(
      language === "ar"
        ? isWishlisted ? "اتشالت من المفضلة" : "اتضافت للمفضلة"
        : isWishlisted ? "Removed from wishlist" : "Saved to wishlist",
    );
  };

  const isList = layout === "list";
  return (
    <Link
      to={`/product/${productId}`}
      className={`group relative flex ${isList ? "flex-row gap-3 items-stretch" : "flex-col h-full"} rounded-3xl p-4
        bg-white border border-gray-100/90
        shadow-sm hover:shadow-xl hover:shadow-teal-950/8
        hover:border-teal-300 hover:-translate-y-1.5 transition-all duration-400 overflow-hidden cursor-pointer`}
    >
      {/* ── Inner Light Viewport for Product Image ── */}
      <div className={`relative aspect-square ${isList ? "w-28 sm:w-40 shrink-0 self-start" : "w-full"} rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50/90 via-teal-50/20 to-slate-50 ${isList ? "p-2" : "p-5"} flex items-center justify-center border border-slate-100`}>
        {/* Wishlist Heart Button */}
        <button
          onClick={toggleWishlist}
          aria-label="wishlist"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-teal-100 flex items-center justify-center shadow-xs hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <Heart
            size={17}
            className={`transition-colors ${
              isWishlisted
                ? "fill-teal-600 text-teal-600"
                : "text-teal-600/70 hover:text-teal-700"
            }`}
          />
        </button>

        {/* Discount badge */}
        {(() => {
          const pct = product.discount > 0
            ? Math.round(product.discount)
            : product.originalPrice && product.originalPrice > product.price
              ? Math.round((1 - product.price / product.originalPrice) * 100)
              : 0;
          return pct > 0 ? (
            <span dir="ltr" className="absolute top-3 left-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-black text-white shadow-sm">
              -{pct}%
            </span>
          ) : null;
        })()}

        {/* Product Image */}
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
          onError={(e) => {
            e.target.src = FALLBACK_IMAGE;
          }}
        />

        {!inStock && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-gray-800 text-white px-4 py-1.5 rounded-full text-xs font-bold border border-gray-200">
              {language === "ar" ? "غير متوفر" : "Out of Stock"}
            </span>
          </div>
        )}
      </div>

      {/* ── Card Content Area ── */}
      <div className={`flex flex-col flex-1 min-w-0 ${isList ? "pt-0" : "pt-4"} px-1 pb-1`}>
        {inStock && (
          <span className="mb-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {language === "ar" ? "متوفر" : "In stock"}
          </span>
        )}

        {/* Product Title in Almarai Font */}
        <h3 className={`text-lg font-extrabold text-gray-900 mb-1 ${isList ? "line-clamp-2 text-base" : "line-clamp-1"} leading-snug tracking-tight group-hover:text-teal-700 transition-colors`}>
          {product.name}
        </h3>

        {/* Short Subtitle / Description */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2.5 font-normal">
          {language === "ar"
            ? product.descriptionAr || product.description || (product.brand ? `العلامة التجارية: ${product.brand}` : "تركيبة متطورة عالية الجودة لصحتك اليومية")
            : product.description || product.descriptionAr || (product.brand ? `Brand: ${product.brand}` : "A powerful daily complex for health and vitality")}
        </p>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mb-3.5">
          <span className="text-2xl font-black text-teal-700 tracking-tight">
            {product.price != null ? product.price.toFixed(0) : "N/A"}
          </span>
          <span className="text-xs font-extrabold text-teal-700 uppercase">
            {language === "ar" ? "ج.م" : "EGP"}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through font-normal">
              {product.originalPrice.toFixed(0)}
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* ── Glowing Teal CTA Button ── */}
        {inCart && inStock ? (
          <div
            className="flex w-full items-center justify-between rounded-2xl bg-emerald-600 px-2 py-1.5 text-white shadow-md shadow-teal-600/20"
            onClick={(e) => e.preventDefault()}
          >
            <button
              aria-label="decrease"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateQuantity(productId, getItemQuantity(productId) - 1); }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 active:scale-95 cursor-pointer"
            >
              <Minus size={16} strokeWidth={3} />
            </button>
            <span className="text-sm font-black">
              {getItemQuantity(productId)} {language === "ar" ? "في السلة" : "in cart"}
            </span>
            <button
              aria-label="increase"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateQuantity(productId, getItemQuantity(productId) + 1); }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 active:scale-95 cursor-pointer"
            >
              <Plus size={16} strokeWidth={3} />
            </button>
          </div>
        ) : (
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-teal-600/20 ${
            inCart
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : inStock
                ? "bg-teal-600 hover:bg-teal-700 text-white hover:shadow-lg hover:shadow-teal-600/30 active:scale-95"
                : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
          }`}
        >
          {showAddedAnimation ? (
            <>
              <Check size={18} strokeWidth={2.5} />
              {language === "ar" ? "تمت الإضافة ✓" : "Added ✓"}
            </>
          ) : inCart ? (
            <>
              <Check size={18} strokeWidth={2.5} />
              {language === "ar" ? "في السلة" : "In Cart"}
            </>
          ) : (
            <>
              <span>{language === "ar" ? "أضف للسلة" : "Add to Cart"}</span>
              <ShoppingCart size={16} strokeWidth={2.5} />
            </>
          )}
        </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
