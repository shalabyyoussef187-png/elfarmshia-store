import { useCategoryTree } from "../../hooks/useCategoryTree";
import CategoryTiles from "../common/CategoryTiles";

export default function CategoryHome({ language = "en" }) {
  const isRtl = language === "ar";
  const { tree } = useCategoryTree();
  const countLabel = (n) => (isRtl ? `${n} منتج` : `${n} items`);
  return (
    <section className="pt-28 pb-8 bg-[#f8faf9]" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-extrabold text-emerald-950 mb-4">
          {isRtl ? "تسوق حسب القسم" : "Shop by category"}
        </h2>
        {!tree ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 animate-pulse">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-square rounded-2xl bg-teal-50" />
            ))}
          </div>
        ) : (
          <CategoryTiles nodes={tree.children} isRtl={isRtl} countLabel={countLabel} />
        )}
      </div>
    </section>
  );
}
