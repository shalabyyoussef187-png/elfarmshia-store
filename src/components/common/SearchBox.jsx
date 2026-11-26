import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react";
import { API_BASE_URL } from "../../services/api/products";
import { buildEntry, searchIndex } from "../../utils/catalogSearch";

const FALLBACK_IMG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='80' height='80' fill='%23f1f5f4'/></svg>";

// ---- Catalog index (loaded once, kept in memory and in sessionStorage) ----
const INDEX_KEY = "search-index-v3";
let indexPromise = null;

function loadIndex() {
  if (indexPromise) return indexPromise;
  indexPromise = (async () => {
    try {
      const cached = sessionStorage.getItem(INDEX_KEY);
      if (cached) return JSON.parse(cached);
    } catch {
      /* ignore */
    }
    const out = [];
    let page = 1;
    let pages = 1;
    do {
      const res = await axios.get(`${API_BASE_URL}/products`, { params: { page, limit: 400 } });
      pages = res.data?.pagination?.pages || 1;
      for (const p of res.data?.data || []) {
        out.push(buildEntry(p));
      }
      page += 1;
    } while (page <= pages);
    try {
      sessionStorage.setItem(INDEX_KEY, JSON.stringify(out));
    } catch {
      /* storage full or unavailable: keep in memory only */
    }
    return out;
  })().catch((e) => {
    indexPromise = null;
    throw e;
  });
  return indexPromise;
}

/**
 * Search box with live suggestions.
 * - Suggestions come from the product catalog (loaded once on first use):
 *   partial words, brand, category and Arabic description text all match.
 * - If nothing matches, close spellings are tried so small typos still work.
 * - Enter opens the full results page, tapping a suggestion opens the product.
 * Text direction follows the typed text (dir="auto") so Arabic and English
 * both display correctly.
 */
export default function SearchBox({
  language = "en",
  autoFocus = false,
  onDone,
  className = "",
  inputClassName = "",
  inline = false,
}) {
  const navigate = useNavigate();
  const isRtl = language === "ar";
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [approx, setApprox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef(null);
  const panelRef = useRef(null);
  const [maxH, setMaxH] = useState(null);

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setItems([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const index = await loadIndex();
        if (cancelled) return;
        const res = searchIndex(index, term, 30);
        setItems(res.items);
        setApprox(res.approx);
        setActive(-1);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 150);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [q]);

  useEffect(() => {
    const onDown = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  const finish = () => {
    setOpen(false);
    if (onDone) onDone();
  };
  const goResults = () => {
    const term = q.trim();
    if (!term) return;
    navigate("/products?search=" + encodeURIComponent(term));
    finish();
  };
  const goProduct = (id) => {
    navigate("/product/" + id);
    finish();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (active >= 0 && items[active]) goProduct(items[active].id);
    else goResults();
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowDown" && items.length) {
      e.preventDefault();
      setActive((a) => (a + 1) % items.length);
    } else if (e.key === "ArrowUp" && items.length) {
      e.preventDefault();
      setActive((a) => (a <= 0 ? items.length - 1 : a - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showPanel = open && q.trim().length >= 2;

  // Keep the panel inside the visible screen (phone keyboards shrink it) and let the list scroll inside.
  useEffect(() => {
    if (!showPanel) return undefined;
    const fit = () => {
      const el = panelRef.current;
      if (!el) return;
      const vv = window.visualViewport;
      const vh = vv ? vv.height : window.innerHeight;
      const top = el.getBoundingClientRect().top - (vv ? vv.offsetTop : 0);
      setMaxH(Math.max(180, Math.floor(vh - top - 12)));
    };
    fit();
    const vv = window.visualViewport;
    window.addEventListener("resize", fit);
    if (vv) vv.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      if (vv) vv.removeEventListener("resize", fit);
    };
  }, [showPanel, items.length]);
  const L = isRtl
    ? {
        ph: "ابحث عن المنتجات...",
        none: "لا توجد نتائج مطابقة",
        all: "عرض كل النتائج عن",
        close: "نتائج قريبة من بحثك",
        out: "غير متوفر",
        egp: "ج.م",
        loading: "جاري البحث...",
      }
    : {
        ph: "Search products...",
        none: "No matching products",
        all: "See all results for",
        close: "Closest matches",
        out: "Out of stock",
        egp: "EGP",
        loading: "Searching...",
      };

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      <form onSubmit={onSubmit} role="search" className="relative">
        <button
          type="submit"
          aria-label="Search"
          className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRtl ? "right-3.5" : "left-3.5"}`}
        >
          <Search size={17} strokeWidth={2} />
        </button>
        <input
          type="search"
          enterKeyHint="search"
          autoComplete="off"
          autoFocus={autoFocus}
          dir="auto"
          value={q}
          placeholder={L.ph}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            loadIndex().catch(() => {});
          }}
          onKeyDown={onKeyDown}
          className={`w-full h-11 text-sm text-gray-800 bg-gray-100/80 border border-gray-200/60 rounded-full outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/30 placeholder-gray-400 ${
            isRtl ? "pr-10 pl-4" : "pl-10 pr-4"
          } ${inputClassName}`}
        />
      </form>

      {showPanel && (
        <div
          ref={panelRef}
          dir={isRtl ? "rtl" : "ltr"}
          style={maxH ? { maxHeight: maxH } : undefined}
          className={`${
            inline ? "mt-2" : "absolute z-[60] mt-2 left-0 right-0"
          } bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden flex flex-col`}
        >
          {items.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500">{loading ? L.loading : L.none}</p>
          ) : (
            <>
              {approx && <p className="px-4 pt-3 text-xs text-gray-400">{L.close}</p>}
              <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                {items.map((p, i) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => goProduct(p.id)}
                      onMouseEnter={() => setActive(i)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-start ${
                        i === active ? "bg-teal-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <img
                        src={p.img || FALLBACK_IMG}
                        alt=""
                        loading="lazy"
                        className="w-11 h-11 rounded-lg object-contain bg-gray-50 border border-gray-100 shrink-0"
                      />
                      <span className="min-w-0 flex-1">
                        <span dir="auto" className="block text-sm font-bold text-gray-900 truncate">
                          {p.name}
                        </span>
                        <span className="block text-xs text-gray-500">
                          {p.out ? (
                            <span className="text-gray-400">{L.out}</span>
                          ) : (
                            <span className="font-semibold text-teal-700">
                              {p.price} {L.egp}
                            </span>
                          )}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={goResults}
                className="w-full shrink-0 px-4 py-2.5 text-xs font-bold text-teal-700 bg-gray-50 border-t border-gray-100 text-start"
              >
                {L.all} “<bdi>{q.trim()}</bdi>”
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
