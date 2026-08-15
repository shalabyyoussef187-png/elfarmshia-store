import { MessageCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

/**
 * Global Floating WhatsApp Button — Clean Circular Icon.
 * Number: 01028230225 (+201028230225)
 */
const WhatsAppButton = () => {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const whatsappNumber = "201028230225";
  const message = isRtl
    ? "مرحباً صيدلية الفرماشية، أود الاستفسار عن المنتجات المتاحة"
    : "Hello Al-Farmashia Pharmacy, I would like to inquire about products";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 ${isRtl ? "left-6" : "right-6"} z-50 w-13 h-13 rounded-full
        bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center
        shadow-[0_4px_25px_rgba(16,185,129,0.5)] hover:shadow-[0_6px_35px_rgba(16,185,129,0.7)]
        hover:scale-110 active:scale-90 transition-all duration-300 cursor-pointer`}
      aria-label="Chat on WhatsApp"
      title={isRtl ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
    >
      <div className="relative flex items-center justify-center">
        <MessageCircle size={26} strokeWidth={2.2} className="fill-white/20" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-75" />
      </div>
    </a>
  );
};

export default WhatsAppButton;
