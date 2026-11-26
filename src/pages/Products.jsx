import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useSearchParams, useLocation, useNavigationType } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";
import {
  Search,
  SlidersHorizontal,
  Loader2,
  AlertCircle,
  RefreshCw,
  X,
  Grid,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/common/ProductCard";
import { fetchProducts } from "../services/api/products";

const Products = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const [searchParams] = useSearchParams();

  const initialCat = searchParams.get("category") || searchParams.get("cat") || "";
  const initialSearch = searchParams.get("search") || searchParams.get("q") || "";

  // Remember page + scroll so Back from a product returns to the same place in the list.
  const location = useLocation();
  const navType = useNavigationType();
  const listKey = "products-list:" + location.pathname + location.search;
  const saved = useRef(null);
  if (saved.current === null) {
    saved.current = { page: 1, y: 0 };
    if (navType === "POP") {
      try {
        const raw = sessionStorage.getItem(listKey);
        if (raw) saved.current = JSON.parse(raw);
      } catch {
        /* ignore */
      }
    }
  }
  const pendingY = useRef(saved.current.y || 0);
  // Coming back to a list: start at the top while it loads, so a short loading
  // page never shows the footer.
  useLayoutEffect(() => {
    if (pendingY.current > 0) window.scrollTo(0, 0);
  }, []);
  const skipPageReset = useRef(saved.current.page > 1);

  const [page, setPage] = useState(saved.current.page || 1);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCat);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [availability, setAvailability] = useState("all"); // all | instock | outofstock
  const [priceRange, setPriceRange] = useState(4500);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Keep state synced if URL searchParams change
  useEffect(() => {
    const cat = searchParams.get("category") || searchParams.get("cat") || "";
    const q = searchParams.get("search") || searchParams.get("q") || "";
    setCategory(cat);
    setSearch(q);
    setSearchInput(q);
    if (skipPageReset.current) {
      skipPageReset.current = false;
    } else {
      setPage(1);
    }
  }, [searchParams]);

  const { products, loading, error, pagination, retry } = useProducts({
    page,
    limit: 8,
    search,
    category,
    brand: selectedBrand,
  });

  // Save the scroll position while browsing the list.
  useEffect(() => {
    const save = () => {
      // Once the URL has moved on (e.g. to a product page) the scroll reset
      // of the new page must not overwrite the saved list position.
      if (window.location.pathname !== location.pathname) return;
      // Not restored yet: keep the saved position instead of overwriting it.
      if (pendingY.current > 0) return;
      try {
        sessionStorage.setItem(
          listKey,
          JSON.stringify({ page, y: Math.round(window.scrollY) })
        );
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => {
      window.removeEventListener("scroll", save);
    };
  }, [listKey, page]);

  // After the list has loaded, put the scroll back where it was (once).
  useEffect(() => {
    if (loading || pendingY.current <= 0) return;
    const y = pendingY.current;
    pendingY.current = 0;
    requestAnimationFrame(() => window.scrollTo(0, y));
  }, [loading, products]);

  // Extract unique categories & brands from backend
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetchProducts({ page: 1, limit: 100 });
        const uniqueCategories = [
          ...new Set(response.data.map((p) => p.category).filter(Boolean)),
        ];
        const uniqueBrands = [
          ...new Set(response.data.map((p) => p.brand).filter(Boolean)),
        ];
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      } catch (err) {
        console.error("Failed to load filters:", err);
      }
    };
    fetchFilters();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setSearchInput("");
    setCategory("");
    setSelectedBrand("");
    setAvailability("all");
    setPriceRange(4500);
    setPage(1);
  };

  const hasActiveFilters = search || category || selectedBrand || availability !== "all";

  // Filter & sort products client-side for price, availability & sort
  const filteredProducts = products
    .filter((p) => {
      if (priceRange && p.price > priceRange) return false;
      if (availability === "instock" && (p.isAvailable === false || p.inStock === false)) return false;
      if (availability === "outofstock" && (p.isAvailable !== false && p.inStock !== false)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
      return 0;
    });

  const totalPages = pagination?.pages || 1;
  const totalProducts = pagination?.total ?? filteredProducts.length;

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [1];
    if (page > 3) pages.push("...");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] py-8" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Breadcrumb & Header */}
        <div className="mb-6 pb-4 border-b border-gray-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <a href="/" className="hover:text-teal-700">{isRtl ? "الرئيسية" : "Home"}</a>
              <span>/</span>
              <span className="font-extrabold text-gray-900">{isRtl ? "المنتجات" : "Products"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight">
              {isRtl ? "متجر المنتجات الطبية" : "Medical Products Store"}
            </h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full md:w-80">
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={isRtl ? "ابحث عن المنتجات..." : "Search products..."}
                className="w-full pr-10 pl-4 py-2.5 bg-white rounded-2xl text-xs text-gray-800 placeholder-gray-400 border border-gray-200 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition-all shadow-xs"
              />
              <Search
                size={16}
                className={`absolute ${isRtl ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 text-gray-400`}
              />
            </div>
          </form>
        </div>

        {/* Main Layout Grid: Right Sidebar Filters + Left Product Content (RTL) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ── FILTER SIDEBAR (4 Cols - Appears on Right in RTL) ── */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs sticky top-28 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-emerald-950 font-black text-base">
                  <Filter size={18} className="text-teal-600" />
                  <span>{isRtl ? "الفلاتر والتصفية" : "Filter Products"}</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    {isRtl ? "مسح الكل" : "Reset All"}
                  </button>
                )}
              </div>

              {/* Brand Checkboxes Filter ("العلامة التجارية") */}
              <div>
                <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-3">
                  {isRtl ? "العلامة التجارية" : "Brands"}
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  <label className="flex items-center gap-2.5 text-xs text-gray-700 font-medium cursor-pointer hover:text-teal-700">
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === ""}
                      onChange={() => {
                        setSelectedBrand("");
                        setPage(1);
                      }}
                      className="accent-teal-600"
                    />
                    <span>{isRtl ? "جميع العلامات" : "All Brands"}</span>
                  </label>

                  {brands.map((b) => (
                    <label key={b} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium cursor-pointer hover:text-teal-700">
                      <input
                        type="radio"
                        name="brand"
                        checked={selectedBrand === b}
                        onChange={() => {
                          setSelectedBrand(b);
                          setPage(1);
                        }}
                        className="accent-teal-600"
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter ("حالة التوفر") */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-3">
                  {isRtl ? "حالة التوفر (Availability)" : "Availability"}
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 text-xs text-gray-700 font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="avail"
                      checked={availability === "all"}
                      onChange={() => setAvailability("all")}
                      className="accent-teal-600"
                    />
                    <span>{isRtl ? "الكل" : "All"}</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-gray-700 font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="avail"
                      checked={availability === "instock"}
                      onChange={() => setAvailability("instock")}
                      className="accent-teal-600"
                    />
                    <span>{isRtl ? "متوفر في المخزن" : "In Stock"}</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-gray-700 font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="avail"
                      checked={availability === "outofstock"}
                      onChange={() => setAvailability("outofstock")}
                      className="accent-teal-600"
                    />
                    <span>{isRtl ? "غير متوفر" : "Out of Stock"}</span>
                  </label>
                </div>
              </div>

              {/* Price Slider Filter ("السعر") */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                    {isRtl ? "السعر (Price)" : "Price Range"}
                  </h3>
                  <span className="text-xs font-black text-teal-700">
                    {priceRange} {isRtl ? "ج.م" : "EGP"}
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={5000}
                  step={50}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-teal-600 bg-gray-200 rounded-lg h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-bold">
                  <span>100 {isRtl ? "ج.م" : "EGP"}</span>
                  <span>5000 {isRtl ? "ج.م" : "EGP"}</span>
                </div>
              </div>

            </div>
          </aside>

          {/* ── MAIN PRODUCT CONTENT AREA (9 Cols) ── */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar: Sort Dropdown + View Toggle (Grid / List) */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex items-center gap-2">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl text-xs font-bold text-gray-700"
                >
                  <Filter size={15} />
                  <span>{isRtl ? "الفلاتر" : "Filters"}</span>
                </button>

                {loading ? (
                  <p className="text-xs text-gray-400 font-bold">
                    {isRtl ? "جاري التحميل..." : "Loading..."}
                  </p>
                ) : (
                <p className="text-xs text-gray-500 font-bold">
                  {isRtl ? "عرض" : "Showing"}{" "}
                  <span className="font-black text-teal-700">{filteredProducts.length}</span>{" "}
                  {pagination?.total ? (
                    <>
                      {isRtl ? "من أصل" : "of"}{" "}
                      <span className="font-black text-gray-800">{totalProducts}</span>{" "}
                    </>
                  ) : null}
                  {isRtl ? "منتج" : "products"}
                </p>
                )}
              </div>

              {/* Sort By & View Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-gray-500 hidden sm:inline">
                    {isRtl ? "ترتيب حسب:" : "Sort by:"}
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-teal-400 cursor-pointer"
                  >
                    <option value="featured">{isRtl ? "الأبرز" : "Featured"}</option>
                    <option value="price-low">{isRtl ? "السعر: من الأقل للأعلى" : "Price: Low to High"}</option>
                    <option value="price-high">{isRtl ? "السعر: من الأعلى للأقل" : "Price: High to Low"}</option>
                  </select>
                </div>

                {/* View Mode Icons */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-gray-200">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      viewMode === "grid" ? "bg-white text-teal-700 shadow-xs" : "text-gray-400"
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      viewMode === "list" ? "bg-white text-teal-700 shadow-xs" : "text-gray-400"
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>

            </div>

            {/* Loading */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 rounded-3xl bg-white border border-gray-100 shadow-xs animate-pulse" />
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                <AlertCircle size={32} className="text-red-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{isRtl ? "فشل تحميل المنتجات" : "Error Loading Products"}</h3>
                <button onClick={retry} className="mt-4 px-6 py-2.5 bg-teal-600 text-white font-bold text-xs rounded-full shadow-md">
                  {isRtl ? "إعادة المحاولة" : "Try Again"}
                </button>
              </div>
            )}

            {/* Empty Result */}
            {!loading && !error && filteredProducts.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                <h3 className="text-lg font-black text-emerald-950 mb-2">
                  {isRtl ? "لا توجد منتجات تطابق البحث" : "No matching products found"}
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  {isRtl ? "جرب مسح الفلاتر أو البحث بكلمات أخرى" : "Try clearing your filters or searching for another item"}
                </p>
                <button onClick={clearFilters} className="px-6 py-2.5 bg-teal-600 text-white font-bold text-xs rounded-full">
                  {isRtl ? "مسح جميع الفلاتر" : "Clear All Filters"}
                </button>
              </div>
            )}

            {/* Product Grid / List */}
            {!loading && !error && filteredProducts.length > 0 && (
              <>
                <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                      language={language}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-gray-200/80">
                    <p className="text-xs font-bold text-gray-500">
                      {isRtl
                        ? `صفحة ${page} من ${totalPages}`
                        : `Page ${page} of ${totalPages}`}
                    </p>

                    <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2" dir="ltr">
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all cursor-pointer shadow-xs"
                        aria-label="Previous Page"
                      >
                        <ChevronLeft size={18} strokeWidth={2.5} />
                      </button>

                      {getPageNumbers().map((p, idx) =>
                        p === "..." ? (
                          <span
                            key={`ellipsis-${idx}`}
                            className="px-1.5 text-xs font-bold text-gray-400 select-none"
                          >
                            ...
                          </span>
                        ) : (
                          <button
                            key={p}
                            onClick={() => handlePageChange(p)}
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full text-xs font-black transition-all cursor-pointer ${
                              page === p
                                ? "bg-teal-600 text-white shadow-md shadow-teal-600/25 scale-105"
                                : "bg-white text-gray-700 border border-gray-200 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700"
                            }`}
                          >
                            {p}
                          </button>
                        )
                      )}

                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all cursor-pointer shadow-xs"
                        aria-label="Next Page"
                      >
                        <ChevronRight size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};

export default Products;
