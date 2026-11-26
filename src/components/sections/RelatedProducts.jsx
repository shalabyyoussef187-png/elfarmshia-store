import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../common/ProductCard";
import { fetchProducts, transformProduct } from "../../services/api/products";

const MAX_ITEMS = 10;

/** Same-category (then same-brand) products shown under a product page. */
const RelatedProducts = ({ product, isRtl }) => {
  const [items, setItems] = useState([]);
  const scroller = useRef(null);
  const currentId = product._id || product.id;

  useEffect(() => {
    let alive = true;
    const load = async () => {
      const seen = new Set([String(currentId)]);
      const out = [];
      const add = (list) => {
        for (const p of list) {
          const pid = String(p._id || p.id);
          if (seen.has(pid) || p.price == null) continue;
          seen.add(pid);
          out.push(p);
        }
      };
      try {
        if (product.category) {
          const r = await fetchProducts({ page: 1, limit: 24, category: product.category });
          add(r.data.map(transformProduct));
        }
        if (out.length < MAX_ITEMS && product.brand) {
          const r = await fetchProducts({ page: 1, limit: 24, brand: product.brand });
          add(r.data.map(transformProduct));
        }
      } catch (e) {
        console.error("Failed to load related products:", e);
      }
      if (alive) setItems(out.slice(0, MAX_ITEMS));
    };
    load();
    return () => { alive = false; };
  }, [currentId, product.category, product.brand]);

  if (items.length === 0) return null;

  const scrollBy = (dir) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  const Prev = isRtl ? ChevronRight : ChevronLeft;
  const Next = isRtl ? ChevronLeft : ChevronRight;

  return (
    <section className="mt-10" aria-label={isRtl ? "منتجات ذات صلة" : "Related products"}>
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xl sm:text-2xl font-black text-emerald-900">
          {isRtl ? "منتجات ذات صلة" : "Related Products"}
        </h2>
        <div className="hidden sm:flex gap-2">
          <button onClick={() => scrollBy(-1)} aria-label="Previous"
            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-teal-400 cursor-pointer">
            <Prev size={18} />
          </button>
          <button onClick={() => scrollBy(1)} aria-label="Next"
            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-teal-400 cursor-pointer">
            <Next size={18} />
          </button>
        </div>
      </div>
      <div ref={scroller}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:thin]">
        {items.map((p) => (
          <div key={p._id || p.id} className="snap-start shrink-0 w-[70%] sm:w-[44%] md:w-[31%] lg:w-[23.5%]">
            <ProductCard product={p} language={isRtl ? "ar" : "en"} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
