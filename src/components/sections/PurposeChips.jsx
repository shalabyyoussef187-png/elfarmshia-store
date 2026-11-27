import { Link } from "react-router-dom";
import { Baby, Sparkles, Pill, Percent, Heart, FileText, Dumbbell } from "lucide-react";
import { useWishlist } from "../../utils/wishlist";

const WA = "https://wa.me/201028230225?text=" + encodeURIComponent("عندي روشتة وعايز أطلب منها");

/** Quick "shop by need" shortcuts shown right under the category tiles. */
const PurposeChips = ({ language }) => {
  const isRtl = language === "ar";
  const { count } = useWishlist();
  const chips = [
    { icon: Percent, label: isRtl ? "عروض النهاردة" : "Today's offers", to: "/offers" },
    { icon: Baby, label: isRtl ? "للأطفال" : "For kids", to: "/products?category=" + encodeURIComponent("الأم والطفل") },
    { icon: Sparkles, label: isRtl ? "للبشرة الحساسة" : "Sensitive skin", to: "/products?category=" + encodeURIComponent("العناية بالبشرة") + "&search=" + encodeURIComponent("حساسة") },
    { icon: Pill, label: isRtl ? "فيتامينات" : "Vitamins", to: "/products?category=" + encodeURIComponent("الفيتامينات والمكملات") },
    { icon: Dumbbell, label: isRtl ? "تغذية رياضية" : "Sports nutrition", to: "/products?category=" + encodeURIComponent("التغذية الرياضية") },
    { icon: FileText, label: isRtl ? "عندي روشتة" : "I have a prescription", href: WA },
    { icon: Heart, label: (isRtl ? "المفضلة" : "Wishlist") + (count ? ` (${count})` : ""), to: "/wishlist" },
  ];
  const cls =
    "shrink-0 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2.5 text-sm font-extrabold text-emerald-900 shadow-sm active:scale-95 hover:bg-emerald-50 transition";
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2" dir={isRtl ? "rtl" : "ltr"}>
      <h2 className="mb-3 text-lg font-black text-gray-900">
        {isRtl ? "تسوق حسب الغرض" : "Shop by need"}
      </h2>
      <div className="-mx-4 flex gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" style={{ scrollbarWidth: "none" }}>
        {chips.map((c) => {
          const Icon = c.icon;
          const inner = (
            <>
              <Icon size={16} className="text-emerald-700" />
              <span>{c.label}</span>
            </>
          );
          return c.href ? (
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
          ) : (
            <Link key={c.label} to={c.to} className={cls}>{inner}</Link>
          );
        })}
      </div>
    </section>
  );
};

export default PurposeChips;
