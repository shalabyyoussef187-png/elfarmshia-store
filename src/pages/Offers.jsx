import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/common/ProductCard";
import { Link } from "react-router-dom";
import { loadCatalog, transformProduct } from "../services/api/products";
import {
  Tag,
  Clock,
  Sparkles,
  Flame,
  Percent,
  Filter,
  ArrowUpDown,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const Offers = () => {
  const { language } = useLanguage();
  const isRtl = language === "ar";

  // Real offers only: API products flagged as an offer with an actual discount.
  const [all, setAll] = useState(null);
  const [error, setError] = useState(false);
  const load = () => {
    setError(false);
    loadCatalog().then((raw) => setAll(raw.map(transformProduct))).catch(() => setError(true));
  };
  useEffect(load, []);
  const allDiscounted = (all || []).filter(
    (p) => p.isOffer && (p.discount > 0 || p.discountAmount > 0 || (p.originalPrice && p.originalPrice > p.price))
  );

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("discount-high");

  /* Categories that really have offers */
  const topOf = (p) => (p.category || "").split(" - ")[0];
  const offerDepts = [...new Set(allDiscounted.map(topOf).filter(Boolean))];
  const categories = [
    { id: "all", nameEn: "All Offers", nameAr: "جميع العروض" },
    ...offerDepts.map((d) => ({ id: d, nameEn: d, nameAr: d })),
  ];

  /* Filter products by selected category */
  const filteredProducts = allDiscounted.filter((item) => {
    if (selectedCategory === "all") return true;
    return topOf(item) === selectedCategory;
  });

  /* Sort products */
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "discount-high") return (b.discount || 0) - (a.discount || 0);
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#f8faf9] py-8 sm:py-12" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ══ 1. FLASH SALE HERO BANNER ══ */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-900 via-emerald-800 to-teal-950 text-white p-6 sm:p-10 mb-10 shadow-xl border border-teal-700/40">
          {/* Ambient Glow background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Banner Left Info */}
            <div className="lg:col-span-12 space-y-3 text-center lg:text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-black uppercase tracking-wider">
                <Flame size={15} className="animate-pulse text-amber-400" />
                <span>{isRtl ? "عروض الصيدلية" : "PHARMACY OFFERS"}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                {isRtl ? "عروض الصيدلية الحصرية" : "Pharmacy Special Offers"}
              </h1>

              <p className="text-sm sm:text-base text-teal-100 font-light max-w-xl leading-relaxed">
                {isRtl
                  ? "استمتع بأفضل الخصومات على المستحضرات الطبية والفيتامينات والعناية الشخصية مع ضمان الجودة والتوصيل السريع."
                  : "Enjoy premier discounts on authentic skincare, vitamins, and medical supplies with guaranteed express delivery."}
              </p>

              {/* Promo Code Badge */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <span className="text-xs font-bold text-teal-200">{isRtl ? "كود خصم إضافي 10%:" : "Extra 10% Off Code:"}</span>
                <span className="px-3 py-1 bg-white/15 border border-white/30 rounded-xl font-mono text-xs font-black tracking-widest text-amber-300 shadow-xs">
                  PHARMA10
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ══ 2. INTERACTIVE FILTERS & SORT BAR ══ */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <Filter size={16} className="text-teal-600 shrink-0 mx-1 hidden sm:block" />
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                      : "bg-slate-100 text-gray-700 hover:bg-slate-200/80"
                  }`}
                >
                  {isRtl ? cat.nameAr : cat.nameEn}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
            <ArrowUpDown size={15} className="text-gray-400 shrink-0" />
            <span className="text-xs text-gray-500 font-medium shrink-0">{isRtl ? "ترتيب حسب:" : "Sort by:"}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-100 text-xs text-gray-800 font-bold px-3 py-2 rounded-xl outline-none border border-slate-200 focus:border-teal-500 cursor-pointer"
            >
              <option value="discount-high">{isRtl ? "الأعلى خصماً" : "Highest Discount %"}</option>
              <option value="price-low">{isRtl ? "الأقل سعراً" : "Lowest Price"}</option>
              <option value="price-high">{isRtl ? "الأعلى سعراً" : "Highest Price"}</option>
            </select>
          </div>

        </div>

        {/* ══ 3. PRODUCTS GRID ══ */}
        {error ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 my-8">
            <h3 className="text-lg font-bold text-gray-800">{isRtl ? "تعذر تحميل العروض" : "Could not load offers"}</h3>
            <button onClick={load} className="mt-4 px-5 py-2.5 bg-teal-600 text-white font-bold text-xs rounded-xl">
              {isRtl ? "إعادة المحاولة" : "Try Again"}
            </button>
          </div>
        ) : !all ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-72 rounded-3xl bg-white border border-gray-100" />)}
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 my-8">
            <Percent size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-bold text-gray-800">
              {isRtl ? "مفيش عروض متاحة حالياً" : "No offers right now"}
            </h3>
            <p className="text-xs text-gray-500 mt-2">
              {isRtl ? "هنضيف العروض هنا أول ما تنزل. تصفح المنتجات في الوقت الحالي." : "New offers will appear here. Meanwhile, browse the products."}
            </p>
            <Link to="/products" className="inline-block mt-4 px-5 py-2.5 bg-teal-600 text-white font-bold text-xs rounded-xl">
              {isRtl ? "تصفح المنتجات" : "Browse products"}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                language={language}
              />
            ))}
          </div>
        )}

        {/* ══ 4. TRUST & GUARANTEE STRIP ══ */}
        <div className="mt-14 p-6 sm:p-8 bg-white rounded-3xl border border-gray-100 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-gray-900">{isRtl ? "منتجات أصيلة 100%" : "100% Authentic Products"}</h4>
              <p className="text-xs text-gray-500">{isRtl ? "مستوردة ومضمونة من الصيدلية الرسمية" : "Direct from licensed pharmaceutical distributors"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <Tag size={24} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-gray-900">{isRtl ? "أفضل الأسعار التنافسية" : "Best Price Guarantee"}</h4>
              <p className="text-xs text-gray-500">{isRtl ? "خصومات يومية متجددة على أفضل الماركات" : "Daily updated deals on top skincare & vitamins"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-gray-900">{isRtl ? "شحن آمن وسريع" : "Express Pharmacy Shipping"}</h4>
              <p className="text-xs text-gray-500">{isRtl ? "تصلك جميع طلبياتك مع التغليف الآمن" : "Delivered safely with medical-grade packaging"}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Offers;
