import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/common/ProductCard";
import { products as ALL_PRODUCTS } from "../data/products";
import { SlidersHorizontal, ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Filter } from "lucide-react";

/**
 * CategoryPage — Comprehensive category viewer mapping all category slugs,
 * displaying real products from products data, with full Arabic & English i18n.
 */
const CategoryPage = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const isRtl = language === "ar";

  const [selectedSubcat, setSelectedSubcat] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Comprehensive Category Meta Mapping for ALL slugs
  const CATEGORY_MAP = {
    "vitamin-b": {
      title: "Vitamin B Complex",
      titleAr: "فيتامين ب المركب",
      description: "Essential B-complex vitamins for nerve health, energy, and metabolism boost.",
      descriptionAr: "مجموعة فيتامينات ب المركبة لدعم صحة الأعصاب والنشاط اليومي وتعزيز الطاقة.",
      mainCategory: "vitamins-supplements",
      subcategories: [
        { id: "all", nameEn: "All B-Vitamins", nameAr: "جميع فيتامينات ب" },
        { id: "b12", nameEn: "Vitamin B12", nameAr: "فيتامين ب12" },
        { id: "complex", nameEn: "B-Complex", nameAr: "مركب فيتامين ب" },
      ],
    },
    "hair-vitamins": {
      title: "Hair & Nails Vitamins",
      titleAr: "فيتامينات الشعر والأظافر",
      description: "Specialized formulas with Biotin, Zinc, and Collagen for thick, radiant hair.",
      descriptionAr: "تركيبات مخصصة تحتوي على البيوتين والزنك والكولاجين لتعزيز كثافة الشعر وصحة الأظافر.",
      mainCategory: "vitamins-supplements",
      subcategories: [
        { id: "all", nameEn: "All Hair Care", nameAr: "جميع عناية الشعر" },
        { id: "biotin", nameEn: "Biotin", nameAr: "البيوتين" },
        { id: "collagen", nameEn: "Collagen", nameAr: "الكولاجين" },
      ],
    },
    "vitamin-c": {
      title: "Vitamin C & Immunity",
      titleAr: "فيتامين سي والمناعة",
      description: "Potent antioxidant vitamin C supplements for immune support and glowing skin.",
      descriptionAr: "مكملات فيتامين سي المضادة للأكسدة لدعم الجهاز المناعي ونضارة البشرة.",
      mainCategory: "vitamins-supplements",
      subcategories: [
        { id: "all", nameEn: "All Immunity", nameAr: "جميع المناعة" },
        { id: "effervescent", nameEn: "Effervescent", nameAr: "فوار" },
        { id: "capsules", nameEn: "Capsules", nameAr: "كبسولات" },
      ],
    },
    multivitamins: {
      title: "Daily Multivitamins",
      titleAr: "الفيتامينات المتعددة",
      description: "Complete daily multivitamin formulas tailored for men, women, and seniors.",
      descriptionAr: "تركيبات فيتامين متعدد يومية كاملة مصممة خصيصاً للرجال والنساء وكبار السن.",
      mainCategory: "vitamins-supplements",
      subcategories: [
        { id: "all", nameEn: "All Multivitamins", nameAr: "جميع الفيتامينات المتعددة" },
        { id: "adults", nameEn: "Adult Daily", nameAr: "للبالغين" },
      ],
    },
    vitamins: {
      title: "Vitamins & Supplements",
      titleAr: "الفيتامينات والمكملات",
      description: "Comprehensive daily nutrition, minerals, and dietary health supplements.",
      descriptionAr: "تغذية يومية شاملة وفيتامينات أساسية ومكملات غذائية لدعم الصحة العامة.",
      mainCategory: "vitamins-supplements",
      subcategories: [
        { id: "all", nameEn: "All Vitamins", nameAr: "جميع الفيتامينات" },
        { id: "multivitamins", nameEn: "Multivitamins", nameAr: "فيتامينات متعددة" },
        { id: "vitamin-d", nameEn: "Vitamin D", nameAr: "فيتامين د" },
        { id: "omega", nameEn: "Omega-3", nameAr: "أوميجا-3" },
      ],
    },
    supplements: {
      title: "Dietary Supplements",
      titleAr: "المكملات الغذائية",
      description: "Science-backed nutritional formulas for stamina, recovery, and wellness.",
      descriptionAr: "مكملات غذائية مدعومة علمياً لتعزيز النشاط والحيوية واللياقة البدنية.",
      mainCategory: "vitamins-supplements",
      subcategories: [
        { id: "all", nameEn: "All Supplements", nameAr: "جميع المكملات" },
        { id: "protein", nameEn: "Proteins", nameAr: "بروتينات" },
        { id: "minerals", nameEn: "Minerals", nameAr: "معادن" },
      ],
    },
    "skin-care": {
      title: "Skin Care & Beauty",
      titleAr: "العناية بالبشرة والجمال",
      description: "Expert dermatological solutions, cleansers, serums, and hydrating creams.",
      descriptionAr: "حلول طبية متخصصة للعناية بالبشرة، المنظفات، السيروم، وكريمات الترطيب الفائقة.",
      mainCategory: "skin-care",
      subcategories: [
        { id: "all", nameEn: "All Skincare", nameAr: "جميع العناية بالبشرة" },
        { id: "cleanser", nameEn: "Cleansers", nameAr: "الغسول والمنظفات" },
        { id: "serum", nameEn: "Serums", nameAr: "السيروم" },
        { id: "moisturizer", nameEn: "Moisturizers", nameAr: "المرطبات" },
      ],
    },
    "hair-care": {
      title: "Hair Care Solutions",
      titleAr: "العناية بالشعر",
      description: "Therapeutic shampoos, scalp conditioners, and anti-dandruff treatments.",
      descriptionAr: "شامبوهات علاجية، بلسم لفروة الرأس، وعلاجات مضادة للقشرة والتساقط.",
      mainCategory: "hair-care",
      subcategories: [
        { id: "all", nameEn: "All Hair Care", nameAr: "جميع العناية بالشعر" },
        { id: "shampoo", nameEn: "Shampoos", nameAr: "الشامبو" },
      ],
    },
    "mom-baby": {
      title: "Mom & Baby Care",
      titleAr: "الأم والطفل",
      description: "Safe, pediatrician-trusted care products for mothers and newborns.",
      descriptionAr: "منتجات رعاية آمنة وموثوقة من أطباء الأطفال للأمهات والمواليد الجدد.",
      mainCategory: "mom-baby",
      subcategories: [
        { id: "all", nameEn: "All Baby Products", nameAr: "جميع منتجات الأطفال" },
        { id: "lotion", nameEn: "Baby Lotions", nameAr: "لوشن وزيوت" },
      ],
    },
    medicine: {
      title: "Medications & Healthcare",
      titleAr: "الأدوية والحلول العلاجية",
      description: "Certified pain relievers, cold treatments, and daily prescriptions.",
      descriptionAr: "مسكنات معتمدة، علاجات البرد، والأدوية اليومية من صيدليات مرخصة.",
      mainCategory: "medicine",
      subcategories: [
        { id: "all", nameEn: "All Medications", nameAr: "جميع الأدوية" },
      ],
    },
    "medical-equipment": {
      title: "Medical Equipment",
      titleAr: "الأجهزة الطبية",
      description: "Digital blood pressure monitors, thermometers, and clinical devices.",
      descriptionAr: "أجهزة قياس ضغط الدم الرقمية، الترمومترات، والمستلزمات الطبية المنزلية.",
      mainCategory: "medical-equipment",
      subcategories: [
        { id: "all", nameEn: "All Equipment", nameAr: "جميع الأجهزة" },
      ],
    },
    cosmetics: {
      title: "Cosmetics & Beauty",
      titleAr: "مستحضرات التجميل",
      description: "Anti-aging creams, hydration gels, and premium dermatological cosmetics.",
      descriptionAr: "كريمات مقاومة الشيخوخة، جل الترطيب، ومستحضرات التجميل الطبية.",
      mainCategory: "cosmetics",
      subcategories: [
        { id: "all", nameEn: "All Cosmetics", nameAr: "جميع التجميل" },
      ],
    },
  };

  // Get matching category details or fallback smoothly
  const currentCategory = CATEGORY_MAP[slug] || {
    title: isRtl ? "المنتجات الطبية والصحية" : "Medical & Health Products",
    titleAr: "المنتجات الطبية والصحية",
    description: isRtl
      ? "تصفح أحدث الأدوية والمكملات ومستحضرات التجميل المعتمدة"
      : "Browse certified medications, vitamins, and healthcare essentials",
    mainCategory: slug,
    subcategories: [{ id: "all", nameEn: "All Products", nameAr: "جميع المنتجات" }],
  };

  const pageTitle = isRtl ? currentCategory.titleAr : currentCategory.title;
  const pageDesc = isRtl ? currentCategory.descriptionAr : currentCategory.description;

  // Filter actual products matching this category slug or main category
  const filteredCategoryProducts = ALL_PRODUCTS.filter((product) => {
    if (!slug) return true;
    if (product.category === slug) return true;
    if (currentCategory.mainCategory && product.category === currentCategory.mainCategory) return true;
    // Fallback search match by category slug keywords
    if (slug.includes("vitam") || slug.includes("supple")) {
      return product.category === "vitamins-supplements" || product.category === "vitamins";
    }
    return true;
  });

  // Sort logic
  const sortedProducts = [...filteredCategoryProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return (b.reviews || 0) - (a.reviews || 0); // popular
  });

  return (
    <div className="min-h-screen bg-[#f8faf9] py-8 sm:py-12" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs font-bold text-gray-500">
          <Link to="/" className="hover:text-teal-700">{isRtl ? "الرئيسية" : "Home"}</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-teal-700">{isRtl ? "التصنيفات" : "Categories"}</Link>
          <span>/</span>
          <span className="text-teal-700 font-extrabold">{pageTitle}</span>
        </div>

        {/* Category Header Hero */}
        <div className="relative rounded-3xl p-6 sm:p-10 mb-8 bg-gradient-to-r from-emerald-950 via-teal-900 to-teal-950 text-white overflow-hidden shadow-lg border border-teal-700/40">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-teal-200 text-xs font-black uppercase">
              <Sparkles size={14} className="text-amber-400" />
              <span>{isRtl ? "قسم معتمد من الصيدلية" : "Certified Category"}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {pageTitle}
            </h1>

            <p className="text-xs sm:text-sm text-teal-100/90 font-light leading-relaxed">
              {pageDesc}
            </p>
          </div>
        </div>

        {/* Subcategories & Sort Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Subcategories Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {currentCategory.subcategories.map((subcat) => (
              <button
                key={subcat.id}
                onClick={() => setSelectedSubcat(subcat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedSubcat === subcat.id
                    ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                    : "bg-slate-100 text-gray-700 hover:bg-slate-200/80"
                }`}
              >
                {isRtl ? subcat.nameAr : subcat.nameEn}
              </button>
            ))}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 justify-end">
            <span className="text-xs font-extrabold text-gray-500 shrink-0">
              {isRtl ? "ترتيب حسب:" : "Sort by:"}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 text-xs font-bold text-gray-800 px-3 py-2 rounded-xl outline-none border border-gray-200 focus:border-teal-400 cursor-pointer"
            >
              <option value="popular">{isRtl ? "الأكثر شعبية" : "Most Popular"}</option>
              <option value="price-low">{isRtl ? "السعر: من الأقل للأعلى" : "Price: Low to High"}</option>
              <option value="price-high">{isRtl ? "السعر: من الأعلى للأقل" : "Price: High to Low"}</option>
              <option value="rating">{isRtl ? "الأعلى تقييماً" : "Top Rated"}</option>
            </select>
          </div>

        </div>

        {/* Products Grid */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-gray-500 font-bold">
            {isRtl ? "عرض" : "Showing"}{" "}
            <span className="font-black text-teal-700">{sortedProducts.length}</span>{" "}
            {isRtl ? "منتج متاح" : "available products"}
          </p>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 my-8">
            <h3 className="text-lg font-black text-emerald-950 mb-2">
              {isRtl ? "لا توجد منتجات متوفرة حالياً في هذا القسم" : "No products available in this category currently"}
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              {isRtl ? "تصفح جميع المنتجات المتاحة في صيدليتنا" : "Browse all available products in our store"}
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-extrabold text-xs rounded-full shadow-md hover:scale-105 transition-all"
            >
              <span>{isRtl ? "عرض جميع المنتجات" : "View All Products"}</span>
              {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                language={language}
              />
            ))}
          </div>
        )}

        {/* Trust Guarantee Section */}
        <div className="mt-16 p-6 sm:p-8 bg-white rounded-3xl border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-gray-900">{isRtl ? "منتجات أصلية 100% ورعاية موثوقة" : "100% Authentic & Certified Care"}</h4>
              <p className="text-xs text-gray-500">{isRtl ? "جميع المنتجات مفحوصة ومطابقة لمواصفات صيدليات مصر الرسمية" : "All items strictly MOH compliant from licensed pharmacies"}</p>
            </div>
          </div>

          <Link
            to="/products"
            className="px-6 py-2.5 bg-slate-100 hover:bg-teal-50 text-teal-800 font-extrabold text-xs rounded-xl border border-slate-200 hover:border-teal-200 transition-all shrink-0"
          >
            {isRtl ? "تصفح بقية الكتالوج" : "Explore Catalog"}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CategoryPage;
