import { useState } from "react";
import { IoLocation, IoCall, IoTime } from "react-icons/io5";

const Pharmacies = () => {
  const [language, setLanguage] = useState("en");

  const pharmacies = [
    {
      id: 1,
      name:
        language === "ar"
          ? "صيدلية الفرمشيته - المعادي"
          : "Al-Farmashiia - Maadi",
      address:
        language === "ar"
          ? "شارع 9، المعادي، القاهرة"
          : "Street 9, Maadi, Cairo",
      phone: "02-2345-6789",
      hours: language === "ar" ? "9 صباحاً - 11 مساءً" : "9 AM - 11 PM",
    },
    {
      id: 2,
      name:
        language === "ar"
          ? "صيدلية الفرمشيته - مدينة نصر"
          : "Al-Farmashiia - Nasr City",
      address:
        language === "ar"
          ? "شارع عباس العقاد، مدينة نصر، القاهرة"
          : "Abbas El Akkad St, Nasr City, Cairo",
      phone: "02-2345-6790",
      hours: language === "ar" ? "9 صباحاً - 11 مساءً" : "9 AM - 11 PM",
    },
    {
      id: 3,
      name:
        language === "ar"
          ? "صيدلية الفرمشيته - الزمالك"
          : "Al-Farmashiia - Zamalek",
      address:
        language === "ar"
          ? "شارع 26 يوليو، الزمالك، القاهرة"
          : "26th July St, Zamalek, Cairo",
      phone: "02-2345-6791",
      hours: language === "ar" ? "9 صباحاً - 11 مساءً" : "9 AM - 11 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-neutral-900 mb-4">
            {language === "ar" ? "فروعنا" : "Our Pharmacies"}
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {language === "ar"
              ? "زر أحد فروعنا للحصول على استشارة صيدلانية مجانية"
              : "Visit one of our branches for free pharmaceutical consultation"}
          </p>
        </div>

        {/* Pharmacies List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pharmacies.map((pharmacy) => (
            <div
              key={pharmacy.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-100 hover:border-primary-200 transition-all hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                {pharmacy.name}
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <IoLocation className="w-6 h-6 text-primary-600 shrink-0 mt-1" />
                  <p className="text-neutral-600">{pharmacy.address}</p>
                </div>

                <div className="flex items-center gap-3">
                  <IoCall className="w-6 h-6 text-primary-600 shrink-0" />
                  <p className="text-neutral-600 font-semibold">
                    {pharmacy.phone}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <IoTime className="w-6 h-6 text-primary-600 shrink-0" />
                  <p className="text-neutral-600">{pharmacy.hours}</p>
                </div>
              </div>

              <button className="mt-6 w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer active:scale-95">
                {language === "ar" ? "اتصل الآن" : "Call Now"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pharmacies;
