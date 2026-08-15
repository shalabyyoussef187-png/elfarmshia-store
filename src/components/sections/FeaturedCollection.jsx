import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Sparkles, Star } from "lucide-react";

const FeaturedCollection = ({ language = "en" }) => {
  const isRtl = language === "ar";

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
    highlights: [
      { en: "Immunity boosters", ar: "معززات المناعة" },
      { en: "Essential vitamins", ar: "فيتامينات أساسية" },
      { en: "Cold care products", ar: "منتجات البرد" },
    ],
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRtl ? "lg:grid-flow-col-dense" : ""}`}>

          {/* ── Image Side ── */}
          <div className="relative group">
            {/* Soft decorative glow */}
            <div className="absolute -inset-4 bg-teal-500/10 rounded-3xl blur-2xl group-hover:bg-teal-500/15 transition-all duration-500 pointer-events-none" />

            {/* Image container */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <img
                src={collection.image}
                alt={isRtl ? collection.titleAr : collection.title}
                className="w-full aspect-4/3 sm:aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Floating badge */}
              <div className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/90 border border-gray-200/80 shadow-md">
                <Sparkles size={15} className="text-teal-600" />
                <span className="text-xs font-bold text-gray-800">
                  {isRtl ? collection.subtitleAr : collection.subtitle}
                </span>
              </div>
            </div>
          </div>

          {/* ── Content Side ── */}
          <div className={`space-y-6 ${isRtl ? "text-right" : ""}`}>
            {/* Accent */}
            <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
              <div className="w-6 h-1 bg-teal-600 rounded-full" />
              <span className="text-xs font-extrabold tracking-wider uppercase text-teal-700">
                {isRtl ? "مجموعة مميزة" : "Featured Collection"}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
              {isRtl ? collection.titleAr : collection.title}
            </h2>

            {/* Description */}
            <p className="text-base text-gray-600 leading-relaxed font-normal">
              {isRtl ? collection.descriptionAr : collection.description}
            </p>

            {/* Highlights */}
            <div className="space-y-2.5 pt-1">
              {collection.highlights.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-5 h-5 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center shrink-0">
                    <Star size={10} className="text-teal-700" fill="currentColor" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{isRtl ? item.ar : item.en}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link
                to={collection.link}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-extrabold
                  shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <span>{isRtl ? "استكشف المجموعة" : "Explore Collection"}</span>
                {isRtl ? (
                  <ArrowLeft size={18} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                )}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
