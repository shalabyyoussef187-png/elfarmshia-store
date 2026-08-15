import { ShieldCheck, BadgeCheck, Lock, Truck } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Licensed Pharmacies",
    titleAr: "صيدليات مرخصة",
    description: "All products from verified, licensed sources",
    descriptionAr: "جميع المنتجات من مصادر موثوقة ومرخصة",
  },
  {
    icon: BadgeCheck,
    title: "100% Authentic",
    titleAr: "منتجات 100% أصلية",
    description: "Genuine products, guaranteed quality",
    descriptionAr: "منتجات أصلية مضمونة الجودة",
  },
  {
    icon: Lock,
    title: "Secure Payment",
    titleAr: "دفع آمن",
    description: "Your data & payments are fully protected",
    descriptionAr: "بياناتك ومدفوعاتك محمية بالكامل",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    titleAr: "توصيل سريع",
    description: "Quick and reliable shipping to your door",
    descriptionAr: "شحن سريع وموثوق حتى بابك",
  },
];

const TrustSection = ({ language = "en" }) => {
  const isRtl = language === "ar";

  return (
    <section className="py-16 bg-slate-50/80 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center p-6 rounded-3xl
                  bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200
                  hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-4
                  group-hover:bg-teal-600 transition-colors duration-300 shadow-xs">
                  <Icon
                    size={26}
                    strokeWidth={1.75}
                    className="text-teal-700 group-hover:text-white transition-colors duration-300"
                  />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-teal-700 transition-colors">
                  {isRtl ? item.titleAr : item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  {isRtl ? item.descriptionAr : item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
