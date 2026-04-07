import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

const FeaturedCollection = ({ language = "en" }) => {
  const collection = {
    title: "Winter Wellness Essentials",
    titleAr: "أساسيات صحة الشتاء",
    subtitle: "Curated by our pharmacists",
    subtitleAr: "مختارة من قبل الصيادلة",
    description:
      "Stay healthy and protected this winter season with our carefully selected collection of immunity boosters, vitamins, and cold care products.",
    descriptionAr:
      "حافظ على صحتك وحمايتك في فصل الشتاء مع مجموعتنا المختارة بعناية من معززات المناعة والفيتامينات ومنتجات العناية بالبرد.",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80",
    link: "/collection/winter-essentials",
  };

  return (
    <section className="py-20 bg-linear-to-b from-white to-teal-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-teal-500/10 rounded-3xl blur-2xl group-hover:bg-teal-500/20 transition-all duration-500"></div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={collection.image}
                alt={language === "ar" ? collection.titleAr : collection.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100">
              <Sparkles size={16} className="text-teal-600" />
              <span className="text-sm font-medium text-teal-700">
                {language === "ar"
                  ? collection.subtitleAr
                  : collection.subtitle}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {language === "ar" ? collection.titleAr : collection.title}
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {language === "ar"
                ? collection.descriptionAr
                : collection.description}
            </p>

            {/* CTA Button */}
            <Link
              to={collection.link}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group/btn cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>
                {language === "ar" ? "استكشف المجموعة" : "Explore Collection"}
              </span>
              {language === "ar" ? (
                <ArrowLeft
                  size={20}
                  strokeWidth={2.5}
                  className="group-hover/btn:-translate-x-1 transition-transform"
                />
              ) : (
                <ArrowRight
                  size={20}
                  strokeWidth={2.5}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              )}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
