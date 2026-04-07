import { ShieldCheck, BadgeCheck, Lock, Truck } from "lucide-react";

const TrustSection = ({ language = "en" }) => {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Licensed Pharmacies",
      titleAr: "صيدليات مرخصة",
      description: "All products from verified sources",
      descriptionAr: "جميع المنتجات من مصادر موثوقة",
    },
    {
      icon: BadgeCheck,
      title: "Authentic Products",
      titleAr: "منتجات أصلية",
      description: "100% genuine guarantee",
      descriptionAr: "ضمان 100% للأصالة",
    },
    {
      icon: Lock,
      title: "Secure Payment",
      titleAr: "دفع آمن",
      description: "Your data is protected",
      descriptionAr: "بياناتك محمية",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      titleAr: "توصيل سريع",
      description: "Quick and reliable shipping",
      descriptionAr: "شحن سريع وموثوق",
    },
  ];

  return (
    <section className="py-16 bg-linear-to-b from-teal-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon */}
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm group-hover:shadow-md transition-all duration-300">
                  <Icon size={32} className="text-teal-600" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {language === "ar" ? item.titleAr : item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600">
                  {language === "ar" ? item.descriptionAr : item.description}
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
