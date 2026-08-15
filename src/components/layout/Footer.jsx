import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useToast } from "../../context/ToastContext";
import {
  Mail,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import logoImg from "../../assets/logo.svg";

const Footer = () => {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const { success } = useToast();
  const currentYear = new Date().getFullYear();
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    success(isRtl ? "تم الاشتراك في النشرة البريدية بنجاح!" : "Subscribed to newsletter successfully!");
    setEmailInput("");
  };

  const footerLinks = {
    company: {
      title: isRtl ? "عن الفرماشية" : "Company",
      links: [
        { name: isRtl ? "من نحن" : "About Us", path: "/about" },
        { name: isRtl ? "تواصل معنا" : "Contact Us", path: "/contact" },
        { name: isRtl ? "فروع الصيدلية" : "Pharmacies & Branches", path: "/pharmacies" },
        { name: isRtl ? "الوظائف" : "Careers", path: "/careers" },
        { name: isRtl ? "مدونة الصحة" : "Health Blog", path: "/blog" },
      ],
    },
    help: {
      title: isRtl ? "خدمة العملاء" : "Customer Care",
      links: [
        { name: isRtl ? "الأسئلة الشائعة" : "FAQ", path: "/faq" },
        { name: isRtl ? "سياسة الشحن والتوصيل" : "Shipping & Delivery", path: "/shipping" },
        { name: isRtl ? "الإرجاع والاستبدال" : "Returns & Refund", path: "/returns" },
        { name: isRtl ? "سياسة الخصوصية" : "Privacy Policy", path: "/privacy" },
      ],
    },
    categories: {
      title: isRtl ? "أقسام المشتريات" : "Popular Categories",
      links: [
        { name: isRtl ? "الفيتامينات والمكملات" : "Vitamins & Supplements", path: "/category/vitamins" },
        { name: isRtl ? "العناية بالبشرة" : "Skincare", path: "/category/skincare" },
        { name: isRtl ? "العناية بالطفل" : "Baby Care", path: "/category/babycare" },
        { name: isRtl ? "العناية الشخصية" : "Personal Care", path: "/category/personalcare" },
      ],
    },
  };

  return (
    <footer className="bg-[#f4f7f6] text-gray-800 pt-14 pb-8 border-t border-gray-200/80 relative" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── 1. STANDALONE NEWSLETTER SECTION (No outer box) ── */}
        <div className="mb-14 pb-12 border-b border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-6 space-y-2">
              <span className="inline-block text-[11px] font-extrabold tracking-wider uppercase text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60">
                {isRtl ? "النشرة الطبية والعروض" : "HEALTH & OFFERS NEWSLETTER"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {isRtl ? "احصل على خصم 10% على أول طلب لك" : "Get 10% Off Your First Order"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                {isRtl
                  ? "اشترك في نشرتنا البريدية لتصلك أحدث نصائح الأطباء والعروض الحصرية."
                  : "Subscribe for expert health guidance and exclusive discount codes directly in your inbox."}
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder={isRtl ? "أدخل بريدك الإلكتروني..." : "Enter your email address..."}
                    className="w-full h-12 pl-4 pr-11 py-3 text-xs sm:text-sm text-gray-900 bg-white border border-gray-300 rounded-2xl outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all placeholder-gray-400 shadow-xs font-medium"
                  />
                  <Mail size={18} className={`absolute ${isRtl ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-gray-400`} />
                </div>

                <button
                  type="submit"
                  className="h-12 px-7 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md shadow-teal-600/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <span>{subscribed ? (isRtl ? "تم الاشتراك ✓" : "Subscribed ✓") : (isRtl ? "اشترك الآن" : "Subscribe")}</span>
                  {!subscribed && (isRtl ? <ArrowLeft size={16} strokeWidth={2.5} /> : <ArrowRight size={16} strokeWidth={2.5} />)}
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* ── 2. TRUST BADGES STRIP ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 pb-10 border-b border-gray-200">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-gray-200/70 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
              <Truck size={20} strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-gray-900">{isRtl ? "توصيل سريع" : "Fast Shipping"}</h4>
              <p className="text-[11px] text-gray-500">{isRtl ? "خلال 24-48 ساعة" : "Within 24-48 hours"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-gray-200/70 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
              <ShieldCheck size={20} strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-gray-900">{isRtl ? "منتجات أصلية 100%" : "100% Authentic"}</h4>
              <p className="text-[11px] text-gray-500">{isRtl ? "من صيدليات معتمدة" : "Certified Pharmacies"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-gray-200/70 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
              <RotateCcw size={20} strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-gray-900">{isRtl ? "إرجاع واستبدال سهلا" : "Easy Returns"}</h4>
              <p className="text-[11px] text-gray-500">{isRtl ? "خلال 14 يوماً" : "Within 14 days"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-gray-200/70 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
              <Headphones size={20} strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-gray-900">{isRtl ? "دعم صيدلي متواصل" : "Pharmacist Support"}</h4>
              <p className="text-[11px] text-gray-500">{isRtl ? "طوال أيام الأسبوع" : "7 Days a week"}</p>
            </div>
          </div>
        </div>

        {/* ── 3. MAIN FOOTER LINKS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img src={logoImg} alt="Al-Farmashia" className="h-14 w-auto object-contain filter drop-shadow-xs" />
            </Link>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm font-medium">
              {isRtl
                ? "صيدلية الفرماشية هي وجهتك الموثوقة للحصول على جميع الأدوية والمكملات الغذائية ومستحضرات التجميل الأصلية بأسعار متميزة وتوصيل سريع."
                : "Al-Farmashia is your premier online destination for certified medications, premium vitamins, and skincare products delivered straight to your door."}
            </p>

            {/* Direct WhatsApp Contact Button */}
            <div className="pt-1">
              <a
                href="https://wa.me/201028230225"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-700 font-extrabold text-xs rounded-xl transition-all"
              >
                <FaWhatsapp size={16} />
                <span>{isRtl ? "خدمة العملاء: 01028230225" : "Support: +20 102 823 0225"}</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-gray-200 hover:border-teal-500 hover:bg-teal-50 flex items-center justify-center text-gray-600 hover:text-teal-600 transition-all shadow-xs"
              >
                <FaFacebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-gray-200 hover:border-teal-500 hover:bg-teal-50 flex items-center justify-center text-gray-600 hover:text-teal-600 transition-all shadow-xs"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-gray-200 hover:border-teal-500 hover:bg-teal-50 flex items-center justify-center text-gray-600 hover:text-teal-600 transition-all shadow-xs"
              >
                <FaTiktok size={16} />
              </a>
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {Object.values(footerLinks).map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-2">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      to={link.path}
                      className="text-xs text-gray-600 hover:text-teal-700 transition-colors font-medium flex items-center gap-1.5"
                    >
                      <span className="text-teal-600/40">›</span>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* ── 4. BOTTOM COPYRIGHT & PAYMENT BADGES ── */}
        <div className="pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="text-center sm:text-left font-medium">
            © {currentYear} {isRtl ? "صيدلية الفرماشية +. جميع الحقوق محفوظة." : "Al-Farmashia Pharmacy +. All rights reserved."}
          </p>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-gray-400">{isRtl ? "وسائل الدفع المقبولة:" : "Accepted Payments:"}</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-white border border-gray-200 rounded-md text-[10px] font-bold text-gray-700 shadow-xs">VISA</span>
              <span className="px-2 py-1 bg-white border border-gray-200 rounded-md text-[10px] font-bold text-gray-700 shadow-xs">Mastercard</span>
              <span className="px-2 py-1 bg-teal-50 border border-teal-200 text-teal-700 rounded-md text-[10px] font-bold shadow-xs">Vodafone Cash</span>
              <span className="px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-md text-[10px] font-bold shadow-xs">الدفع عند الاستلام</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
