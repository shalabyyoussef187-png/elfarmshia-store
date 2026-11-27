import { Link } from "react-router-dom";
import { pathToUrl } from "../../utils/categoryTree";

// Tile with a 2x2 collage of real products from the category (like a basket of items).
function Collage({ pics, name }) {
  const list = pics.slice(0, 4);
  if (!list.length) {
    return <div className="w-full h-full bg-teal-50" />;
  }
  if (list.length < 4) {
    return (
      <img
        src={list[0]}
        alt={name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-contain p-3"
      />
    );
  }
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-1 p-2">
      {list.map((src, i) => (
        <div key={i} className="rounded-xl bg-white overflow-hidden flex items-center justify-center">
          <img src={src} alt="" loading="lazy" decoding="async" className="w-full h-full object-contain" />
        </div>
      ))}
    </div>
  );
}

export default function CategoryTiles({ nodes, isRtl, countLabel, hrefFor }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {nodes.map((n) => (
        <Link
          key={n.path.join("/")}
          to={hrefFor ? hrefFor(n.path) : pathToUrl(n.path)}
          className="group block rounded-2xl bg-white border border-teal-100 shadow-sm active:scale-[0.98] transition overflow-hidden"
        >
          <div className="aspect-square w-full bg-gradient-to-br from-teal-50 to-emerald-50">
            <Collage pics={n.pics} name={n.name} />
          </div>
          <div className="px-3 py-2.5 text-center" dir={isRtl ? "rtl" : "ltr"}>
            <p className="text-[13px] sm:text-sm font-extrabold text-emerald-950 leading-snug line-clamp-2 min-h-[2.4em]">
              {n.name}
            </p>
            <p className="mt-0.5 text-[11px] font-semibold text-teal-700">{countLabel(n.count)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
