import { Truck, Clock, MessageCircle, Phone } from "lucide-react";
import { FREE_SHIPPING_MIN } from "../../utils/shipping";

const WA = "https://wa.me/201028230225?text=" + encodeURIComponent("عايز أطلب من الفرماشية");

/** Port Said delivery promise card for the home page. */
const PortSaidCard = ({ language }) => {
  const isRtl = language === "ar";
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" dir={isRtl ? "rtl" : "ltr"}>
      <div className="rounded-3xl bg-gradient-to-br from-emerald-900 to-emerald-700 p-5 text-white shadow-lg sm:p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <Truck size={26} />
          </div>
          <div>
            <h2 className="text-xl font-black leading-tight sm:text-2xl">
              {isRtl ? "في بورسعيد؟ التوصيل علينا" : "In Port Said? Delivery is on us"}
            </h2>
            <p className="text-sm font-semibold text-emerald-100">
              {isRtl
                ? `توصيل مجاني للطلبات فوق ${FREE_SHIPPING_MIN} ج`
                : `Free delivery on orders over ${FREE_SHIPPING_MIN} EGP`}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-bold">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
            <Clock size={15} /> {isRtl ? "توصيل نفس اليوم أو اليوم اللي بعده" : "Same-day or next-day"}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
            <Phone size={15} /> 01028230225
          </span>
        </div>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-sm font-black text-emerald-900 shadow-md active:scale-95 sm:inline-flex sm:w-auto sm:px-8"
        >
          <MessageCircle size={18} />
          {isRtl ? "اطلب على واتساب" : "Order on WhatsApp"}
        </a>
      </div>
    </section>
  );
};

export default PortSaidCard;
