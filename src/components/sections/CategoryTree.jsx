import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Pill, Bone, Leaf, Dumbbell, HeartPulse, Sparkles, Package, Baby, ChevronLeft, ChevronRight } from "lucide-react";
import { loadCatalog } from "../../services/api/products";

// Main groups built ONLY from the real store categories (the `category` value of each product).
const GROUPS = [
  { key: "vitamins", icon: Pill, ar: "الفيتامينات", en: "Vitamins",
    subs: ["فيتامينات متعددة", "فيتامينات ب وحمض الفوليك", "فيتامينات أ وC وE"] },
  { key: "bones", icon: Bone, ar: "المعادن والعظام والمفاصل", en: "Minerals, Bones & Joints",
    subs: ["المغنيسيوم والمعادن", "فيتامين د والكالسيوم والعظام", "المفاصل والكولاجين"] },
  { key: "herbs", icon: Leaf, ar: "أعشاب ومستخلصات", en: "Herbs & Extracts",
    subs: ["أعشاب ومستخلصات طبيعية"] },
  { key: "sport", icon: Dumbbell, ar: "التغذية الرياضية والطاقة", en: "Sports & Energy",
    subs: ["التغذية الرياضية", "صحة الرجال والطاقة"] },
  { key: "support", icon: HeartPulse, ar: "دعم صحي متخصص", en: "Targeted Health Support",
    subs: ["أوميغا 3 وصحة القلب", "الهضم والبروبيوتيك", "دعم الأيض", "أحماض أمينية ومركبات داعمة"] },
  { key: "beauty", icon: Sparkles, ar: "الشعر والبشرة والأظافر", en: "Hair, Skin & Nails",
    subs: ["الشعر والبشرة والأظافر"] },
  { key: "mother", icon: Baby, ar: "الأم والطفل", en: "Mother & Child",
    subs: ["العناية بشعر الأطفال", "استحمام الأطفال", "العناية ببشرة الأطفال", "عطور وكولونيا الأطفال", "مناديل الأطفال المبللة"] },
  { key: "general", icon: Package, ar: "مكملات عامة", en: "General Supplements",
    subs: ["مكملات غذائية"] },
];

const SUB_EN = {
  "العناية بشعر الأطفال": "Baby Hair Care",
  "استحمام الأطفال": "Baby Bath",
  "العناية ببشرة الأطفال": "Baby Skin Care",
  "عطور وكولونيا الأطفال": "Baby Cologne & Fragrance",
  "مناديل الأطفال المبللة": "Baby Wet Wipes",
  "فيتامينات متعددة": "Multivitamins",
  "فيتامينات ب وحمض الفوليك": "B Vitamins & Folic Acid",
  "فيتامينات أ وC وE": "Vitamins A, C & E",
  "المغنيسيوم والمعادن": "Magnesium & Minerals",
  "فيتامين د والكالسيوم والعظام": "Vitamin D, Calcium & Bones",
  "المفاصل والكولاجين": "Joints & Collagen",
  "أعشاب ومستخلصات طبيعية": "Herbs & Natural Extracts",
  "التغذية الرياضية": "Sports Nutrition",
  "صحة الرجال والطاقة": "Men's Health & Energy",
  "أوميغا 3 وصحة القلب": "Omega-3 & Heart Health",
  "الهضم والبروبيوتيك": "Digestion & Probiotics",
  "دعم الأيض": "Metabolism Support",
  "أحماض أمينية ومركبات داعمة": "Amino Acids & Support",
  "الشعر والبشرة والأظافر": "Hair, Skin & Nails",
  "مكملات غذائية": "Dietary Supplements",
};

const link = (cat) => "/products?category=" + encodeURIComponent(cat);

export default function CategoryTree({ language = "en" }) {
  const isRtl = language === "ar";
  // Show the last known counts at once (saved from the previous visit), refresh quietly after.
  const [counts, setCounts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("catCounts") || "null");
    } catch {
      return null;
    }
  });
  const [open, setOpen] = useState(null);

  useEffect(() => {
    let off = false;
    loadCatalog()
      .then((all) => {
        if (off) return;
        const c = {};
        for (const p of all) c[p.category] = (c[p.category] || 0) + 1;
        setCounts(c);
        try {
          localStorage.setItem("catCounts", JSON.stringify(c));
        } catch { /* storage full or blocked: ignore */ }
      })
      .catch(() => {});
    return () => {
      off = true;
    };
  }, []);

  // Hide empty nodes: only categories that have real products are shown.
  const groups = useMemo(() => {
    if (!counts) return [];
    return GROUPS.map((g) => {
      const subs = g.subs.filter((s) => counts[s] > 0).map((s) => ({ name: s, n: counts[s] }));
      return { ...g, subs, total: subs.reduce((a, s) => a + s.n, 0) };
    }).filter((g) => g.subs.length);
  }, [counts]);

  const Arrow = isRtl ? ChevronLeft : ChevronRight;
  const current = groups.find((g) => g.key === open);

  return (
    <section className="py-8 bg-white border-b border-gray-100" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-extrabold text-emerald-950 text-center mb-6">
          {isRtl ? "تسوق حسب الفئة" : "Shop By Category"}
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-y-5 gap-x-2">
          {!counts &&
            GROUPS.map((g) => (
              <div key={g.key} className="flex flex-col items-center animate-pulse">
                <span className="w-[72px] h-[72px] rounded-full bg-teal-50 border-2 border-teal-100" />
                <span className="mt-2 h-3 w-16 rounded bg-gray-100" />
              </div>
            ))}
          {groups.map((g) => {
            const Icon = g.icon;
            const single = g.subs.length === 1;
            const circle = (
              <>
                <span
                  className={`flex items-center justify-center w-[72px] h-[72px] rounded-full border-2 transition ${
                    open === g.key
                      ? "bg-teal-600 border-teal-600 text-white shadow-lg"
                      : "bg-teal-50 border-teal-100 text-teal-700"
                  }`}
                >
                  <Icon size={30} strokeWidth={1.7} />
                </span>
                <span className="mt-2 text-[12px] leading-tight font-bold text-gray-800 text-center">
                  {isRtl ? g.ar : g.en}
                </span>
                <span className="text-[11px] text-gray-400 font-semibold">{g.total}</span>
              </>
            );
            return single ? (
              <Link key={g.key} to={link(g.subs[0].name)} className="flex flex-col items-center">
                {circle}
              </Link>
            ) : (
              <button
                key={g.key}
                type="button"
                onClick={() => setOpen(open === g.key ? null : g.key)}
                aria-expanded={open === g.key}
                className="flex flex-col items-center"
              >
                {circle}
              </button>
            );
          })}
        </div>

        {current && (
          <div className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/50 p-2">
            <p className="px-3 pt-2 pb-1 text-xs font-extrabold text-teal-800">{isRtl ? current.ar : current.en}</p>
            {current.subs.map((s) => (
              <Link
                key={s.name}
                to={link(s.name)}
                className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white text-sm font-bold text-gray-800"
              >
                <span>{isRtl ? s.name : SUB_EN[s.name] || s.name}</span>
                <span className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
                  {s.n}
                  <Arrow size={16} />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
