import PaymentLogos from "../common/PaymentLogos";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useToast } from "../../context/ToastContext";
import { Mail, Truck, ShieldCheck, RotateCcw, Headphones, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import logoImg from "../../assets/logo-transparent.png";
import { sourceLink } from "../common/SourceRequest";
import { FREE_SHIPPING_MIN } from "../../utils/shipping";

// Social links: add real URLs here and the icons appear. Empty = hidden.
const SOCIAL = { facebook: "", instagram: "", tiktok: "" };

const FooterSource = ({ isRtl }) => (
  <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p className="font-black text-white">{isRtl ? "مش لاقي منتج؟" : "Can't find a product?"}</p>
      <p className="text-sm font-medium text-emerald-100/80">
        {isRtl ? "ابعتلنا اسمه على واتساب ونجيبهولك." : "WhatsApp us its name and we will get it for you."}
      </p>
    </div>
    <a
      href={sourceLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-emerald-950 active:scale-95"
    >
      <FaWhatsapp size={16} />
      {isRtl ? "اطلبه على واتساب" : "Request on WhatsApp"}
    </a>
  </div>
);

const Footer = () => {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const { success } = useToast();
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    success(isRtl ? "تم الاشتراك بنجاح!" : "Subscribed successfully!");
    setEmailInput("");
  };

  const cols = [
    {
      title: isRtl ? "تسوق" : "Shop",
      links: [
        { name: isRtl ? "كل الأقسام" : "All categories", path: "/browse" },
        { name: isRtl ? "العروض" : "Offers", path: "/offers" },
        { name: isRtl ? "المفضلة" : "Wishlist", path: "/wishlist" },
        { name: isRtl ? "السلة" : "Cart", path: "/cart" },
      ],
    },
    {
      title: isRtl ? "خدمة العملاء" : "Customer care",
      links: [
        { name: isRtl ? "سياسة الشحن والتوصيل" : "Shipping & delivery", path: "/shipping" },
        { name: isRtl ? "الإرجاع والاستبدال" : "Returns & refunds", path: "/returns" },
        { name: isRtl ? "الأسئلة الشائعة" : "FAQ", path: "/faq" },
        { name: isRtl ? "تواصل معنا" : "Contact us", path: "/contact" },
      ],
    },
    {
      title: isRtl ? "الفرماشية" : "Al-Farmashia",
      links: [
        { name: isRtl ? "من نحن" : "About us", path: "/about" },
        { name: isRtl ? "فروع الصيدلية" : "Branches", path: "/pharmacies" },
        { name: isRtl ? "مدونة الصحة" : "Health blog", path: "/blog" },
        { name: isRtl ? "سياسة الخصوصية" : "Privacy policy", path: "/privacy" },
      ],
    },
  ];

  const perks = [
    { icon: Truck, t: isRtl ? `مجاني فوق ${FREE_SHIPPING_MIN} ج في بورسعيد` : `Free over ${FREE_SHIPPING_MIN} EGP in Port Said` },
    { icon: ShieldCheck, t: isRtl ? "منتجات أصلية 100%" : "100% authentic" },
    { icon: RotateCcw, t: isRtl ? "إرجاع واستبدال" : "Easy returns" },
    { icon: Headphones, t: isRtl ? "دعم صيدلي" : "Pharmacist support" },
  ];

  return (
    <footer className="bg-emerald-950 text-emerald-50" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        {/* Perks */}
        <div className="mb-8 grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {perks.map(({ icon: Icon, t }) => (
            <div key={t} className="flex items-center gap-2.5 rounded-2xl bg-white/8 px-3 py-3 ring-1 ring-white/10">
              <Icon size={20} className="shrink-0 text-emerald-300" />
              <span className="text-xs font-extrabold leading-snug">{t}</span>
            </div>
          ))}
        </div>

        {/* Brand + contact */}
        <div className="mb-8 grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="inline-block rounded-2xl bg-white px-3 py-2">
              <img src={logoImg} alt="Al-Farmashia" className="h-11 w-auto object-contain" />
            </Link>
            <p className="max-w-sm text-sm font-medium leading-relaxed text-emerald-100/80">
              {isRtl
                ? "صيدلية الفرماشية. أدوية ومكملات ومستحضرات أصلية، وتوصيل سريع لباب بيتك في بورسعيد."
                : "Al-Farmashia pharmacy. Genuine medicines, supplements and care products, delivered fast in Port Said."}
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/201028230225"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-black text-emerald-950 active:scale-95"
              >
                <FaWhatsapp size={18} />
                {isRtl ? "كلمنا على واتساب" : "Chat on WhatsApp"}
              </a>
              <a href="tel:+201028230225" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-100">
                <Phone size={15} /> 01028230225
              </a>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-100/80">
                <MapPin size={15} /> {isRtl ? "بورسعيد، مصر" : "Port Said, Egypt"}
              </span>
            </div>
            {(SOCIAL.facebook || SOCIAL.instagram || SOCIAL.tiktok) && (
              <div className="flex gap-2.5 pt-1">
                {Object.entries(SOCIAL).filter(([, u]) => u).map(([k, u]) => (
                  <a key={k} href={u} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white/10 px-3 py-2 text-xs font-black capitalize">
                    {k}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-3">
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="mb-3 text-sm font-black text-white">{c.title}</h3>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.path}>
                      <Link to={l.path} className="text-sm font-medium text-emerald-100/80 hover:text-white">
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Product sourcing request */}
        <div className="mb-8 rounded-2xl bg-white/8 ring-1 ring-white/10 text-emerald-50">
          <FooterSource isRtl={isRtl} />
        </div>

        {/* Newsletter */}
        <form onSubmit={handleSubscribe} className="mb-8 flex flex-col gap-2.5 rounded-2xl bg-white/8 p-4 ring-1 ring-white/10 sm:flex-row sm:items-center">
          <span className="text-sm font-extrabold sm:flex-1">
            {isRtl ? "اشترك لتصلك العروض ونصائح الصيادلة" : "Get offers and pharmacist tips"}
          </span>
          <div className="relative sm:w-80">
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder={isRtl ? "بريدك الإلكتروني" : "Your email"}
              className="h-12 w-full rounded-xl bg-white px-4 text-sm font-medium text-gray-900 outline-none"
            />
          </div>
          <button type="submit" className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-black text-emerald-950 active:scale-95">
            <Mail size={16} />
            {subscribed ? (isRtl ? "تم ✓" : "Done ✓") : isRtl ? "اشترك" : "Subscribe"}
          </button>
        </form>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs sm:flex-row">
          <p className="font-medium text-emerald-100/70">
            © {new Date().getFullYear()} {isRtl ? "صيدلية الفرماشية. جميع الحقوق محفوظة." : "Al-Farmashia Pharmacy. All rights reserved."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <PaymentLogos />
            <span className="rounded-md bg-white px-2 py-1 text-[10px] font-bold text-emerald-900">Vodafone Cash</span>
            <span className="rounded-md bg-white px-2 py-1 text-[10px] font-bold text-emerald-900">{isRtl ? "الدفع عند الاستلام" : "Cash on delivery"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
