import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home as HomeIcon } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useCategoryTree } from "../hooks/useCategoryTree";
import { findNode, pathToUrl } from "../utils/categoryTree";
import { transformProduct } from "../services/api/products";
import CategoryTiles from "../components/common/CategoryTiles";
import ProductCard from "../components/common/ProductCard";

const PAGE = 24;

export default function Browse() {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const params = useParams();
  const path = useMemo(
    () =>
      (params["*"] || "")
        .split("/")
        .filter(Boolean)
        .map((s) => {
          try {
            return decodeURIComponent(s);
          } catch {
            return s;
          }
        }),
    [params]
  );
  const { tree, products } = useCategoryTree();
  const [shown, setShown] = useState(PAGE);
  const key = path.join(" - ");
  const [lastKey, setLastKey] = useState(key);
  if (lastKey !== key) {
    setLastKey(key);
    setShown(PAGE);
  }

  const node = tree ? findNode(tree, path) : null;
  const direct = useMemo(
    () => (products ? products.filter((p) => p.category === key).map(transformProduct) : null),
    [products, key]
  );

  const countLabel = (n) => (isRtl ? `${n} منتج` : `${n} items`);
  const Sep = isRtl ? ChevronLeft : ChevronRight;
  const hasKids = !!node?.children?.length;

  return (
    <div className="min-h-screen bg-[#f8faf9] py-5" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex flex-wrap items-center gap-1 text-[12px] font-semibold text-gray-500 mb-3">
          <Link to="/" className="flex items-center gap-1 text-teal-700">
            <HomeIcon size={14} />
            {isRtl ? "الرئيسية" : "Home"}
          </Link>
          {path.map((name, i) => (
            <span key={i} className="flex items-center gap-1">
              <Sep size={13} className="text-gray-300" />
              {i < path.length - 1 ? (
                <Link to={pathToUrl(path.slice(0, i + 1))} className="text-teal-700">
                  {name}
                </Link>
              ) : (
                <span className="text-gray-700">{name}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="text-xl font-extrabold text-emerald-950 mb-4">{path[path.length - 1] || ""}</h1>

        {!tree && (
          <div className="grid grid-cols-2 gap-3 animate-pulse">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="aspect-square rounded-2xl bg-teal-50" />
            ))}
          </div>
        )}

        {tree && !node && (
          <p className="text-center text-gray-500 py-16">
            {isRtl ? "القسم ده مش موجود." : "Category not found."}
          </p>
        )}

        {node && hasKids && <CategoryTiles nodes={node.children} isRtl={isRtl} countLabel={countLabel} />}

        {node && (!hasKids || direct?.length > 0) && (
          <div className={hasKids ? "mt-8" : ""}>
            {hasKids && (
              <h2 className="text-base font-extrabold text-emerald-950 mb-3">
                {isRtl ? "منتجات أخرى في القسم" : "More in this category"}
              </h2>
            )}
            {!direct && (
              <div className="grid grid-cols-2 gap-3 animate-pulse">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-64 rounded-2xl bg-white" />
                ))}
              </div>
            )}
            {direct && (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                  {direct.slice(0, shown).map((p) => (
                    <ProductCard key={p.id} product={p} language={language} />
                  ))}
                </div>
                {shown < direct.length && (
                  <div className="text-center mt-6">
                    <button
                      type="button"
                      onClick={() => setShown((s) => s + PAGE)}
                      className="px-6 py-3 rounded-full bg-teal-600 text-white font-bold text-sm"
                    >
                      {isRtl ? `عرض المزيد (${direct.length - shown})` : `Show more (${direct.length - shown})`}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
