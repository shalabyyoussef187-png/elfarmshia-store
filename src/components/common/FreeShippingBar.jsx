import { Truck } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { FREE_SHIPPING_MIN } from "../../utils/shipping";

// Thin fixed strip at the very top of every page.
export default function FreeShippingBar() {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  return (
    <div
      className="fixed top-0 inset-x-0 z-[45] h-7 bg-emerald-900 text-white flex items-center justify-center gap-2 px-3 text-[11px] sm:text-xs font-bold"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <Truck size={14} className="shrink-0 text-emerald-300" />
      <span className="truncate">
        {isRtl
          ? `توصيل مجاني داخل بورسعيد للطلبات فوق ${FREE_SHIPPING_MIN} ج`
          : `Free delivery in Port Said on orders over ${FREE_SHIPPING_MIN} EGP`}
      </span>
    </div>
  );
}
