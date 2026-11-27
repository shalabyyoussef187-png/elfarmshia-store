import { MessageCircle } from "lucide-react";

const PHONE = "201028230225";

export const sourceLink = (product = "") =>
  `https://wa.me/${PHONE}?text=` +
  encodeURIComponent(`مش لاقي منتج على الموقع${product ? `: ${product}` : ""}. ممكن توفروه لي؟`);

/**
 * "Can't find it? WhatsApp us and we will source it."
 * variant: "card" (no-results), "banner" (home), "inline" (search panel, footer)
 */
const SourceRequest = ({ language = "ar", product = "", variant = "banner" }) => {
  const isRtl = language === "ar";
  const title = isRtl ? "مش لاقي منتج؟" : "Can't find a product?";
  const text = isRtl
    ? "ابعتلنا اسمه على واتساب ونجيبهولك."
    : "WhatsApp us its name and we will get it for you.";
  const btn = isRtl ? "اطلبه على واتساب" : "Request on WhatsApp";
  const href = sourceLink(product);
  const link = (cls) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      <MessageCircle size={16} />
      {btn}
    </a>
  );

  if (variant === "inline") {
    return (
      <div className="flex flex-col gap-2 px-4 py-3 text-sm" dir={isRtl ? "rtl" : "ltr"}>
        <span className="font-bold text-gray-800">{title} <span className="font-medium text-gray-600">{text}</span></span>
        {link("inline-flex w-fit items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-black text-white")}
      </div>
    );
  }
  if (variant === "card") {
    return (
      <div className="mx-auto mt-6 max-w-md rounded-2xl bg-emerald-50 p-5 text-center" dir={isRtl ? "rtl" : "ltr"}>
        <p className="font-black text-emerald-950">{title}</p>
        <p className="mb-3 text-sm font-medium text-emerald-900/80">{text}</p>
        {link("inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-black text-white active:scale-95")}
      </div>
    );
  }
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-black text-emerald-950">{title}</p>
          <p className="text-sm font-medium text-emerald-900/80">{text}</p>
        </div>
        {link("inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-black text-white active:scale-95")}
      </div>
    </section>
  );
};

export default SourceRequest;
