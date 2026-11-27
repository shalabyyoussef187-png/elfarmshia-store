import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useSearchParams, useLocation, useNavigationType } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  Search,
  AlertCircle,
  X,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import SourceRequest from "../components/common/SourceRequest";
import ProductCard from "../components/common/ProductCard";
import CategoryTiles from "../components/common/CategoryTiles";
import { useCategoryTree } from "../hooks/useCategoryTree";
import { loadCatalog, transformProduct } from "../services/api/products";
import { buildEntry, searchIndex } from "../utils/catalogSearch";
import { findNode } from "../utils/categoryTree";

const SEP = " - ";
const PAGE_SIZE = 12;
const catHref = (path) => "/products?category=" + encodeURIComponent(path.join(SEP));

const Products = () => {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navType = useNavigationType();

  const q = searchParams.get("search") || searchParams.get("q") || "";
  const catParam = searchParams.get("category") || searchParams.get("cat") || "";
  const showAll = searchParams.get("all") === "1";

  const [searchInput, setSearchInput] = useState(q);
  const [brand, setBrand] = useState("");
  const [availability, setAvailability] = useState("all");
  const [offersOnly, setOffersOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(null); // null = no limit
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const [all, setAll] = useState(null);
  const [error, setError] = useState(false);
  const { tree } = useCategoryTree();

  const load = () => {
    setError(false);
    loadCatalog()
      .then((raw) => setAll(raw))
      .catch(() => setError(true));
  };
  useEffect(load, []);

  useEffect(() => {
    setSearchInput(q);
    setPage(1);
  }, [q, catParam]);

  const entries = useMemo(
    () => (all ? all.map((p) => ({ ...buildEntry(p), raw: p })) : []),
    [all]
  );

  // Only accept a category that exists in the catalog.
  const cat = useMemo(() => {
    if (!catParam || !all) return "";
    const ok = all.some((p) => p.category === catParam || (p.category || "").startsWith(catParam + SEP));
    return ok ? catParam : "";
  }, [catParam, all]);
  const catPath = cat ? cat.split(SEP) : [];
  const catNode = tree && catPath.length ? findNode(tree, catPath) : null;

  // Step 1: search + category (the base set, used for the filter option counts).
  const base = useMemo(() => {
    if (!all) return [];
    let list = q ? searchIndex(entries, q, Infinity).items.map((e) => e.raw) : all;
    if (cat) list = list.filter((p) => p.category === cat || (p.category || "").startsWith(cat + SEP));
    return list.map(transformProduct);
  }, [all, entries, q, cat]);

  const brands = useMemo(() => {
    const m = new Map();
    base.forEach((p) => p.brand && m.set(p.brand, (m.get(p.brand) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [base]);

  const priceCap = useMemo(() => {
    const top = base.reduce((m, p) => Math.max(m, p.price || 0), 0);
    return Math.max(100, Math.ceil(top / 50) * 50);
  }, [base]);
  const effMax = maxPrice == null ? priceCap : Math.min(maxPrice, priceCap);

  const offersCount = base.filter((p) => p.discount > 0 || (p.originalPrice && p.originalPrice > p.price)).length;
  const inStockOf = (p) => p.isAvailable !== false && p.quantity !== 0;

  const filtered = useMemo(() => {
    let list = base.filter((p) => {
      if (brand && p.brand !== brand) return false;
      if (availability === "instock" && !inStockOf(p)) return false;
      if (availability === "outofstock" && inStockOf(p)) return false;
      if (offersOnly && !(p.discount > 0 || (p.originalPrice && p.originalPrice > p.price))) return false;
      if (p.price > effMax) return false;
      return true;
    });
    const pct = (p) =>
      p.discount > 0 ? p.discount : p.originalPrice > p.price ? (1 - p.price / p.originalPrice) * 100 : 0;
    list = [...list];
    if (sortBy === "price-low") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "discount") list.sort((a, b) => pct(b) - pct(a));
    else if (sortBy === "available") list.sort((a, b) => inStockOf(b) - inStockOf(a));
    return list;
  }, [base, brand, availability, offersOnly, effMax, sortBy]);

  const filtersActive = !!brand || availability !== "all" || offersOnly || maxPrice != null;
  const resetFilters = () => {
    setBrand("");
    setAvailability("all");
    setOffersOnly(false);
    setMaxPrice(null);
    setPage(1);
  };
  const clearAll = () => {
    resetFilters();
    setSearchParams({ all: "1" });
  };

  useEffect(() => setPage(1), [brand, availability, offersOnly, maxPrice, sortBy]);
  useEffect(() => {
    resetFilters();
    // eslint-disable-next-line
  }, [catParam]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const shown = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Back from a product: same page, same scroll.
  const listKey = "products2:" + location.pathname + location.search;
  const restored = useRef(false);
  useEffect(() => {
    if (restored.current || !all || navType !== "POP") return;
    restored.current = true;
    try {
      const raw = JSON.parse(sessionStorage.getItem(listKey) || "null");
      if (raw) {
        setPage(raw.page || 1);
        setTimeout(() => window.scrollTo(0, raw.y || 0), 60);
      }
    } catch { /* ignore */ }
  }, [all, navType, listKey]);
  useEffect(() => {
    const save = () => {
      if (window.location.pathname !== location.pathname) return;
      try {
        sessionStorage.setItem(listKey, JSON.stringify({ page, y: Math.round(window.scrollY) }));
      } catch { /* ignore */ }
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, [listKey, page]);

  const onSearch = (e) => {
    e.preventDefault();
    const v = searchInput.trim();
    const next = {};
    if (v) next.search = v;
    if (cat) next.category = cat;
    if (!v && !cat) next.all = "1";
    setSearchParams(next);
  };

  const goPage = (n) => {
    if (n < 1 || n > totalPages || n === page) return;
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const pageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const out = [1];
    if (page > 3) out.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) out.push(i);
    if (page < totalPages - 2) out.push("...");
    out.push(totalPages);
    return out;
  };

  const departmentView = !q && !cat && !showAll;
  const countLabel = (n) => (isRtl ? `${n} منتج` : `${n} items`);
  const money = isRtl ? "ج.م" : "EGP";

  const Radio = ({ name, checked, onChange, label, count }) => (
    <label className="flex items-center gap-2.5 text-xs text-gray-700 font-medium cursor-pointer hover:text-teal-700 py-0.5">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="accent-teal-600" />
      <span className="flex-1">{label}</span>
      {count != null && <span className="text-[10px] text-gray-400 font-bold">{count}</span>}
    </label>
  );

  const FilterPanel = (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2 text-emerald-950 font-black text-base">
          <Filter size={18} className="text-teal-600" />
          <span>{isRtl ? "الفلاتر" : "Filters"}</span>
        </div>
        {filtersActive && (
          <button onClick={resetFilters} className="text-xs font-bold text-red-600 hover:underline cursor-pointer">
            {isRtl ? "مسح الفلاتر" : "Reset"}
          </button>
        )}
      </div>

      {/* Category / sub-category */}
      <div>
        <h3 className="text-xs font-extrabold text-gray-900 mb-2">{isRtl ? "القسم" : "Category"}</h3>
        <div className="flex flex-wrap gap-1.5">
          <Link
            to="/products"
            className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-gray-200 bg-white text-gray-600 hover:border-teal-400"
          >
            {isRtl ? "كل الأقسام" : "All departments"}
          </Link>
          {catPath.slice(0, -1).map((name, i) => (
            <Link
              key={i}
              to={catHref(catPath.slice(0, i + 1))}
              className="px-2.5 py-1 rounded-full text-[11px] font-bold border border-teal-200 bg-teal-50 text-teal-800"
            >
              {name}
            </Link>
          ))}
          {catPath.length > 0 && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-teal-600 text-white">
              {catPath[catPath.length - 1]}
            </span>
          )}
        </div>
        {catNode?.children?.length > 0 && (
          <div className="mt-2 space-y-0.5 max-h-52 overflow-y-auto">
            <p className="text-[10px] font-bold text-gray-400 mb-1">{isRtl ? "الأقسام الفرعية" : "Sub-categories"}</p>
            {catNode.children.map((c) => (
              <Link
                key={c.name}
                to={catHref(c.path)}
                className="flex items-center justify-between text-xs text-gray-700 font-medium hover:text-teal-700 py-0.5"
              >
                <span>{c.name}</span>
                <span className="text-[10px] text-gray-400 font-bold">{c.count}</span>
              </Link>
            ))}
          </div>
        )}
        {!catPath.length && tree && (
          <div className="mt-2 space-y-0.5 max-h-52 overflow-y-auto">
            {tree.children.map((c) => (
              <Link
                key={c.name}
                to={catHref(c.path)}
                className="flex items-center justify-between text-xs text-gray-700 font-medium hover:text-teal-700 py-0.5"
              >
                <span>{c.name}</span>
                <span className="text-[10px] text-gray-400 font-bold">{c.count}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Offers */}
      <div className="pt-4 border-t border-gray-100">
        <label className="flex items-center gap-2.5 text-xs font-extrabold text-gray-900 cursor-pointer">
          <input
            type="checkbox"
            checked={offersOnly}
            onChange={(e) => setOffersOnly(e.target.checked)}
            className="accent-red-500 w-4 h-4"
          />
          <span className="flex-1">{isRtl ? "العروض والخصومات فقط" : "Offers & discounts only"}</span>
          <span className="text-[10px] text-gray-400 font-bold">{offersCount}</span>
        </label>
      </div>

      {/* Availability */}
      <div className="pt-4 border-t border-gray-100">
        <h3 className="text-xs font-extrabold text-gray-900 mb-2">{isRtl ? "التوفر" : "Availability"}</h3>
        <Radio name="avail" checked={availability === "all"} onChange={() => setAvailability("all")} label={isRtl ? "الكل" : "All"} />
        <Radio name="avail" checked={availability === "instock"} onChange={() => setAvailability("instock")} label={isRtl ? "متوفر" : "In stock"} />
        <Radio name="avail" checked={availability === "outofstock"} onChange={() => setAvailability("outofstock")} label={isRtl ? "غير متوفر" : "Out of stock"} />
      </div>

      {/* Brand */}
      {brands.length > 0 && (
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-xs font-extrabold text-gray-900 mb-2">{isRtl ? "الماركة" : "Brand"}</h3>
          <div className="max-h-48 overflow-y-auto space-y-0.5">
            <Radio name="brand" checked={brand === ""} onChange={() => setBrand("")} label={isRtl ? "كل الماركات" : "All brands"} />
            {brands.map(([b, n]) => (
              <Radio key={b} name="brand" checked={brand === b} onChange={() => setBrand(b)} label={b} count={n} />
            ))}
          </div>
        </div>
      )}

      {/* Price */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-extrabold text-gray-900">{isRtl ? "السعر (حتى)" : "Price (up to)"}</h3>
          <span className="text-xs font-black text-teal-700">{effMax} {money}</span>
        </div>
        <input
          type="range"
          min={0}
          max={priceCap}
          step={10}
          value={effMax}
          onChange={(e) => setMaxPrice(Number(e.target.value) >= priceCap ? null : Number(e.target.value))}
          className="w-full accent-teal-600"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-bold">
          <span>0</span>
          <span>{priceCap} {money}</span>
        </div>
      </div>
    </div>
  );

  const title = cat ? catPath[catPath.length - 1] : q ? (isRtl ? `نتائج البحث: ${q}` : `Results for: ${q}`) : isRtl ? "كل المنتجات" : "All products";

  return (
    <div className="min-h-screen bg-[#f8faf9] py-8" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 pb-4 border-b border-gray-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 flex-wrap">
              <Link to="/" className="hover:text-teal-700">{isRtl ? "الرئيسية" : "Home"}</Link>
              <span>/</span>
              {departmentView ? (
                <span className="font-extrabold text-gray-900">{isRtl ? "المنتجات" : "Products"}</span>
              ) : (
                <>
                  <Link to="/products" className="hover:text-teal-700">{isRtl ? "المنتجات" : "Products"}</Link>
                  <span>/</span>
                  <span className="font-extrabold text-gray-900">{title}</span>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-emerald-950 tracking-tight">
              {departmentView ? (isRtl ? "تسوق حسب القسم" : "Shop by department") : title}
            </h1>
            {departmentView && (
              <p className="text-xs text-gray-500 mt-1">
                {isRtl ? "اختار القسم الأول وهتلاقي منتجاته" : "Pick a department to see its products"}
              </p>
            )}
          </div>
          <form onSubmit={onSearch} className="w-full md:w-80">
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={isRtl ? "ابحث عن المنتجات..." : "Search products..."}
                className="w-full pr-10 pl-4 py-2.5 bg-white rounded-2xl text-xs text-gray-800 placeholder-gray-400 border border-gray-200 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              />
              <Search size={16} className={`absolute ${isRtl ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 text-gray-400`} />
            </div>
          </form>
        </div>

        {error && (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
            <AlertCircle size={32} className="text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">{isRtl ? "فشل تحميل المنتجات" : "Error Loading Products"}</h3>
            <button onClick={load} className="mt-4 px-6 py-2.5 bg-teal-600 text-white font-bold text-xs rounded-full">
              {isRtl ? "إعادة المحاولة" : "Try Again"}
            </button>
          </div>
        )}

        {/* ── Department view ── */}
        {!error && departmentView && (
          <div>
            {!tree ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 animate-pulse">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="aspect-square rounded-2xl bg-teal-50" />
                ))}
              </div>
            ) : (
              <CategoryTiles nodes={tree.children} isRtl={isRtl} countLabel={countLabel} hrefFor={catHref} />
            )}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link
                to="/products?all=1"
                className="px-6 py-3 rounded-full bg-white border border-teal-200 text-teal-800 font-extrabold text-xs hover:bg-teal-50"
              >
                {isRtl ? "عرض كل المنتجات" : "View all products"}
              </Link>
              <Link
                to="/products?all=1"
                onClick={() => setOffersOnly(true)}
                className="px-6 py-3 rounded-full bg-red-50 border border-red-200 text-red-600 font-extrabold text-xs hover:bg-red-100"
              >
                {isRtl ? "العروض والخصومات" : "Offers & discounts"}
              </Link>
            </div>
          </div>
        )}

        {/* ── Products view ── */}
        {!error && !departmentView && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="hidden lg:block lg:col-span-3">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs sticky top-28">{FilterPanel}</div>
            </aside>

            <main className="lg:col-span-9 space-y-5 min-w-0">
              <div className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl text-xs font-bold text-gray-700"
                  >
                    <Filter size={15} />
                    <span>{isRtl ? "الفلاتر" : "Filters"}</span>
                    {filtersActive && <span className="w-2 h-2 rounded-full bg-teal-600" />}
                  </button>
                  <p className="text-xs text-gray-500 font-bold">
                    {all ? (
                      <>
                        <span className="font-black text-teal-700">{filtered.length}</span> {isRtl ? "منتج" : "products"}
                      </>
                    ) : (
                      isRtl ? "جاري التحميل..." : "Loading..."
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="sort"
                    className="px-2 sm:px-3 py-1.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 outline-none focus:border-teal-400 cursor-pointer max-w-[9.5rem] sm:max-w-none"
                  >
                    <option value="featured">{isRtl ? "الأبرز" : "Featured"}</option>
                    <option value="price-low">{isRtl ? "السعر: الأقل أولاً" : "Price: Low to High"}</option>
                    <option value="price-high">{isRtl ? "السعر: الأعلى أولاً" : "Price: High to Low"}</option>
                    <option value="discount">{isRtl ? "الأكثر خصماً" : "Biggest discount"}</option>
                    <option value="available">{isRtl ? "المتوفر أولاً" : "In stock first"}</option>
                  </select>
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-gray-200">
                    <button
                      onClick={() => setViewMode("grid")}
                      aria-label="grid view"
                      aria-pressed={viewMode === "grid"}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === "grid" ? "bg-white text-teal-700 shadow-xs" : "text-gray-400"}`}
                    >
                      <LayoutGrid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      aria-label="list view"
                      aria-pressed={viewMode === "list"}
                      className={`p-1.5 rounded-lg transition-all cursor-pointer ${viewMode === "list" ? "bg-white text-teal-700 shadow-xs" : "text-gray-400"}`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sub-category chips */}
              {catNode?.children?.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {catNode.children.map((c) => (
                    <Link
                      key={c.name}
                      to={catHref(c.path)}
                      className="shrink-0 px-3.5 py-2 rounded-full bg-white border border-teal-200 text-teal-800 text-xs font-extrabold hover:bg-teal-50"
                    >
                      {c.name} <span className="text-gray-400 font-bold">({c.count})</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Active filter chips */}
              {filtersActive && (
                <div className="flex flex-wrap gap-2">
                  {brand && <Chip label={brand} onClear={() => setBrand("")} />}
                  {offersOnly && <Chip label={isRtl ? "عروض" : "Offers"} onClear={() => setOffersOnly(false)} />}
                  {availability !== "all" && (
                    <Chip
                      label={availability === "instock" ? (isRtl ? "متوفر" : "In stock") : isRtl ? "غير متوفر" : "Out of stock"}
                      onClear={() => setAvailability("all")}
                    />
                  )}
                  {maxPrice != null && <Chip label={`≤ ${effMax} ${money}`} onClear={() => setMaxPrice(null)} />}
                </div>
              )}

              {!all && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-96 rounded-3xl bg-white border border-gray-100 animate-pulse" />
                  ))}
                </div>
              )}

              {all && filtered.length === 0 && (
                <div className="bg-white rounded-3xl p-10 text-center border border-gray-100">
                  <h3 className="text-lg font-black text-emerald-950 mb-2">
                    {isRtl ? "لا توجد منتجات تطابق اختيارك" : "No matching products found"}
                  </h3>
                  <p className="text-xs text-gray-500 mb-6">
                    {isRtl ? "جرب مسح الفلاتر أو البحث بكلمات أخرى" : "Try clearing your filters or searching for another item"}
                  </p>
                  <button onClick={filtersActive ? resetFilters : clearAll} className="px-6 py-2.5 bg-teal-600 text-white font-bold text-xs rounded-full">
                    {isRtl ? "مسح الفلاتر" : "Clear filters"}
                  </button>
                  <SourceRequest language={language} product={q} variant="card" />
                </div>
              )}

              {all && shown.length > 0 && (
                <>
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                        : "grid grid-cols-1 gap-3"
                    }
                  >
                    {shown.map((product) => (
                      <ProductCard key={product.id} product={product} language={language} layout={viewMode} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200/80">
                      <p className="text-xs font-bold text-gray-500">
                        {isRtl ? `صفحة ${page} من ${totalPages}` : `Page ${page} of ${totalPages}`}
                      </p>
                      <div className="flex items-center justify-center flex-wrap gap-1.5" dir="ltr">
                        <button
                          onClick={() => goPage(page - 1)}
                          disabled={page === 1}
                          aria-label="Previous Page"
                          className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 disabled:opacity-40 cursor-pointer"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        {pageNumbers().map((n, i) =>
                          n === "..." ? (
                            <span key={"e" + i} className="px-1.5 text-xs font-bold text-gray-400">...</span>
                          ) : (
                            <button
                              key={n}
                              onClick={() => goPage(n)}
                              className={`w-9 h-9 rounded-full text-xs font-black cursor-pointer ${
                                page === n ? "bg-teal-600 text-white shadow-md" : "bg-white text-gray-700 border border-gray-200"
                              }`}
                            >
                              {n}
                            </button>
                          )
                        )}
                        <button
                          onClick={() => goPage(page + 1)}
                          disabled={page === totalPages}
                          aria-label="Next Page"
                          className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 disabled:opacity-40 cursor-pointer"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        )}
      </div>

      {/* Mobile filter sheet */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden" dir={isRtl ? "rtl" : "ltr"}>
          <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-white rounded-t-3xl p-5 shadow-2xl">
            <button
              onClick={() => setFiltersOpen(false)}
              aria-label="close"
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              <X size={16} />
            </button>
            {FilterPanel}
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-5 w-full py-3 rounded-2xl bg-teal-600 text-white font-black text-sm"
            >
              {isRtl ? `عرض ${filtered.length} منتج` : `Show ${filtered.length} products`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function Chip({ label, onClear }) {
  return (
    <button
      onClick={onClear}
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold cursor-pointer"
    >
      {label} <X size={12} />
    </button>
  );
}

export default Products;
