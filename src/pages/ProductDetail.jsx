import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useLanguage } from "../context/LanguageContext";
import { getProductById } from "../services/api/products";
import {
  ShoppingCart,
  Check,
  Heart,
  Star,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  RotateCcw,
  Leaf,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80";

const ProductDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const { addToCart, isInCart } = useCart();
  const { success } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const item = await getProductById(id);
        setProduct(item);
      } catch (err) {
        console.error("Failed to load product detail:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-md max-w-md">
          <h1 className="text-2xl font-black text-emerald-950 mb-3">
            {isRtl ? "المنتج غير موجود" : "Product Not Found"}
          </h1>
          <p className="text-xs text-gray-500 mb-6">
            {isRtl ? "عذراً، لم نتمكن من العثور على هذا المنتج" : "Sorry, we could not find this product"}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-extrabold text-xs rounded-full shadow-md"
          >
            {isRtl ? "العودة للمتجر" : "Back to Store"}
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowAddedAnimation(true);
    success(
      isRtl
        ? `تمت إضافة ${quantity} من ${product.name} إلى السلة`
        : `Added ${quantity} of ${product.name} to cart`,
    );
    setTimeout(() => setShowAddedAnimation(false), 2000);
  };

  const inCart = isInCart(product._id || product.id);
  const inStock = product.isAvailable !== false && product.inStock !== false;
  const imageUrl = product.image || FALLBACK_IMAGE;

  return (
    <div className="min-h-screen bg-[#f8faf9] py-12" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link to="/" className="hover:text-teal-700">{isRtl ? "الرئيسية" : "Home"}</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-teal-700">{isRtl ? "المنتجات" : "Products"}</Link>
          <span>/</span>
          <span className="text-gray-900 font-extrabold line-clamp-1">{product.name}</span>
        </div>

        {/* Product Detail Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Image Section (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full aspect-square rounded-3xl bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-50 border border-slate-100 p-8 flex items-center justify-center overflow-hidden">
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-black shadow-xs">
                  -{product.discount}% OFF
                </div>
              )}

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-teal-100 flex items-center justify-center shadow-xs hover:scale-110 transition-transform cursor-pointer"
              >
                <Heart size={18} className={isWishlisted ? "fill-teal-600 text-teal-600" : "text-teal-600/70"} />
              </button>

              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-lg"
                onError={(e) => {
                  e.target.src = FALLBACK_IMAGE;
                }}
              />
            </div>
          </div>

          {/* Details Section (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Category Tag */}
            {product.category && (
              <span className="inline-block text-xs font-extrabold text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full mb-3 self-start">
                {product.category}
              </span>
            )}

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-2 tracking-tight">
              {product.name}
            </h1>

            {/* Brand */}
            {product.brand && (
              <p className="text-xs text-gray-500 mb-4 font-medium">
                {isRtl ? "العلامة التجارية: " : "Brand: "}
                <span className="font-extrabold text-gray-800">{product.brand}</span>
              </p>
            )}

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5 text-amber-400">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span className="text-xs font-extrabold text-gray-900">4.9</span>
              <span className="text-xs text-gray-400 font-normal">
                (120 {isRtl ? "تقييم معتمد" : "verified reviews"})
              </span>
            </div>

            {/* Price Row */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-gray-100 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-teal-700">
                  {product.price != null ? product.price.toFixed(0) : "N/A"}
                </span>
                <span className="text-sm font-extrabold text-teal-700 uppercase">
                  {isRtl ? "ج.م" : "EGP"}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base text-gray-400 line-through font-normal">
                    {product.originalPrice.toFixed(0)}
                  </span>
                )}
              </div>
            </div>

            {/* Stock Status Badge */}
            <div className="mb-6">
              {inStock ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  <Check size={14} strokeWidth={3} />
                  {isRtl ? "متوفر في المخزن" : "In Stock - Ready to Ship"}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                  {isRtl ? "غير متوفر حالياً" : "Currently Out of Stock"}
                </span>
              )}
            </div>

            {/* Stepper Quantity Selector ([-] quantity [+]) */}
            <div className="mb-6">
              <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2">
                {isRtl ? "حدد الكمية:" : "Select Quantity:"}
              </label>

              <div className="inline-flex items-center bg-slate-100 border border-slate-200/80 rounded-2xl p-1.5 shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-800 font-bold hover:bg-gray-50 disabled:opacity-40 transition-all cursor-pointer"
                >
                  <Minus size={16} strokeWidth={2.5} />
                </button>

                <span className="w-14 text-center font-black text-lg text-gray-900">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold hover:bg-teal-700 transition-all cursor-pointer shadow-xs"
                >
                  <Plus size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Action Button */}
            <div className="mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-600/20 active:scale-95 ${
                  showAddedAnimation
                    ? "bg-emerald-600 text-white"
                    : inCart
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : inStock
                        ? "bg-teal-600 hover:bg-teal-700 text-white hover:shadow-xl hover:shadow-teal-600/30"
                        : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                }`}
              >
                {showAddedAnimation ? (
                  <>
                    <Check size={18} strokeWidth={2.5} />
                    {isRtl ? "تمت الإضافة بنجاح ✓" : "Added Successfully ✓"}
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} strokeWidth={2.5} />
                    {isRtl ? "أضف للسلة الآن" : "Add to Cart"}
                  </>
                )}
              </button>
            </div>

            {/* Authentic Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-100 text-xs">
              <div className="flex items-center gap-2 text-gray-700 font-bold">
                <ShieldCheck size={18} className="text-teal-600 shrink-0" />
                <span>{isRtl ? "منتج أصلي 100%" : "100% Authentic"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-bold">
                <Truck size={18} className="text-teal-600 shrink-0" />
                <span>{isRtl ? "شحن سريع حتى بابك" : "Fast Delivery"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-bold">
                <RotateCcw size={18} className="text-teal-600 shrink-0" />
                <span>{isRtl ? "إرجاع مجاني وسهل" : "Easy Returns"}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
