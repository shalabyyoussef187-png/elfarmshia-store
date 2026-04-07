import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Pill,
  Sparkles,
  Heart,
  Baby,
  Droplets,
} from "lucide-react";
import heroImage from "../../assets/hero.png";

const Hero = ({ language = "en" }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const categories = [
    {
      id: "vitamins",
      icon: Pill,
      name_en: "Vitamins",
      name_ar: "الفيتامينات",
      headline_en: "Daily Strength",
      headline_ar: "قوة يومية",
      subtitle_en: "Essential nutrients for vibrant health",
      subtitle_ar: "عناصر أساسية لصحة نابضة بالحياة",
      targetSectionId: "vitamins-section",
      gradient: "from-amber-500/20 to-orange-500/20",
      accentColor: "text-amber-600",
      bgGlow: "bg-amber-500/10",
    },
    {
      id: "supplements",
      icon: Sparkles,
      name_en: "Supplements",
      name_ar: "المكملات الغذائية",
      headline_en: "Peak Performance",
      headline_ar: "أداء مثالي",
      subtitle_en: "Science-backed nutrition for your goals",
      subtitle_ar: "تغذية مدعومة علمياً لتحقيق أهدافك",
      targetSectionId: "supplements-section",
      gradient: "from-teal-500/20 to-emerald-500/20",
      accentColor: "text-teal-600",
      bgGlow: "bg-teal-500/10",
    },
    {
      id: "skincare",
      icon: Droplets,
      name_en: "Skincare",
      name_ar: "العناية بالبشرة",
      headline_en: "Radiant Beauty",
      headline_ar: "جمال مشرق",
      subtitle_en: "Expert formulations for glowing skin",
      subtitle_ar: "تركيبات متخصصة لبشرة متألقة",
      targetSectionId: "skincare-section",
      gradient: "from-pink-500/20 to-rose-500/20",
      accentColor: "text-pink-600",
      bgGlow: "bg-pink-500/10",
    },
    {
      id: "babycare",
      icon: Baby,
      name_en: "Baby Care",
      name_ar: "العناية بالطفل",
      headline_en: "Gentle Touch",
      headline_ar: "لمسة حنونة",
      subtitle_en: "Safe, trusted care for your little ones",
      subtitle_ar: "رعاية آمنة وموثوقة لأطفالك",
      targetSectionId: "babycare-section",
      gradient: "from-blue-500/20 to-cyan-500/20",
      accentColor: "text-blue-600",
      bgGlow: "bg-blue-500/10",
    },
    {
      id: "personalcare",
      icon: Heart,
      name_en: "Personal Care",
      name_ar: "العناية الشخصية",
      headline_en: "Self Care Rituals",
      headline_ar: "طقوس العناية الذاتية",
      subtitle_en: "Elevate your wellness routine",
      subtitle_ar: "ارتقِ بروتينك الصحي",
      targetSectionId: "personalcare-section",
      gradient: "from-purple-500/20 to-violet-500/20",
      accentColor: "text-purple-600",
      bgGlow: "bg-purple-500/10",
    },
  ];

  const currentCategory = categories[activeCategory];
  const CategoryIcon = currentCategory.icon;

  // Auto-rotate categories (gentle, optional)
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [activeCategory]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveCategory((prev) => (prev + 1) % categories.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveCategory(
      (prev) => (prev - 1 + categories.length) % categories.length,
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleScrollToSection = () => {
    const targetSection = document.getElementById(
      currentCategory.targetSectionId,
    );
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Add highlight effect
      targetSection.classList.add("highlight-flash");
      setTimeout(() => {
        targetSection.classList.remove("highlight-flash");
      }, 2000);
    }
  };

  return (
    <section className="relative w-full min-h-screen sm:h-screen overflow-hidden">
      {/* Background Image with Darker Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Pharmacy Interior"
          className="w-full h-full object-cover"
        />
        {/* Darker multi-layer overlay for better contrast */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-linear-to-br from-gray-900/40 via-gray-900/30 to-teal-900/20" />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center pt-12 sm:pt-16 pb-16 sm:pb-24">
        {/* Premium Category Spotlight Selector */}
        <div className="mb-8 sm:mb-12 md:mb-16 w-full max-w-xs sm:max-w-md md:max-w-xl px-2 sm:px-0">
          {/* Unified Capsule with Everything Inside */}
          <div className="relative">
            {/* Subtle outer glow */}
            <div className="absolute -inset-1 bg-white/20 rounded-full blur-md"></div>

            {/* Main Glassmorphism Capsule */}
            <div className="relative backdrop-blur-xl bg-white/70 border border-white/40 rounded-full px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 shadow-lg shadow-black/10">
              {/* Arrows + Category + Indicators Layout */}
              <div className="flex flex-col items-center gap-2 sm:gap-3">
                {/* Top Row: Arrows + Category */}
                <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 w-full">
                  {/* Left Arrow in Circle */}
                  <button
                    onClick={handlePrev}
                    disabled={isTransitioning}
                    className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/70 text-gray-600 hover:text-teal-600 transition-all duration-300 disabled:opacity-30 shadow-sm"
                    aria-label={language === "en" ? "Previous" : "السابق"}
                  >
                    <ChevronRight
                      size={18}
                      className="sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]"
                      strokeWidth={2.5}
                    />
                  </button>

                  {/* Center: Icon + Category Name */}
                  <div
                    className={`flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 flex-1 transition-all duration-500 ${
                      isTransitioning
                        ? "opacity-0 scale-95"
                        : "opacity-100 scale-100"
                    }`}
                    dir={language === "ar" ? "rtl" : "ltr"}
                  >
                    <CategoryIcon
                      size={24}
                      className={`sm:w-7 sm:h-7 md:w-8 md:h-8 ${currentCategory.accentColor}`}
                      strokeWidth={2}
                    />
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 line-clamp-1">
                      {language === "en"
                        ? currentCategory.name_en
                        : currentCategory.name_ar}
                    </h3>
                  </div>

                  {/* Right Arrow in Circle */}
                  <button
                    onClick={handleNext}
                    disabled={isTransitioning}
                    className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/70 text-gray-600 hover:text-teal-600 transition-all duration-300 disabled:opacity-30 shadow-sm"
                    aria-label={language === "en" ? "Next" : "التالي"}
                  >
                    <ChevronLeft
                      size={18}
                      className="sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]"
                      strokeWidth={2.5}
                    />
                  </button>
                </div>

                {/* Bottom Row: Premium Pill Indicators */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  {categories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (!isTransitioning && index !== activeCategory) {
                          setIsTransitioning(true);
                          setActiveCategory(index);
                          setTimeout(() => setIsTransitioning(false), 500);
                        }
                      }}
                      className={`rounded-full transition-all duration-500 ease-out ${
                        index === activeCategory
                          ? "w-8 sm:w-10 md:w-12 h-1.5 sm:h-2 bg-linear-to-r from-teal-500 to-teal-600"
                          : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-400/50 hover:bg-gray-500/60"
                      }`}
                      aria-label={`${language === "en" ? "Category" : "الفئة"} ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Creative Editorial Headline Area */}
        <div
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4 sm:px-0"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <div
            className={`transition-all duration-500 ${
              isTransitioning
                ? "opacity-0 translate-y-6"
                : "opacity-100 translate-y-0"
            }`}
          >
            {/* Eyebrow text */}
            <p className="text-xs sm:text-sm font-medium text-teal-300 uppercase tracking-wider mb-3 sm:mb-4">
              {language === "en" ? "Premium Healthcare" : "رعاية صحية متميزة"}
            </p>

            {/* Main headline - editorial style */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 leading-tight px-2">
              {language === "en"
                ? currentCategory.headline_en
                : currentCategory.headline_ar}
            </h1>

            {/* Supporting subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-gray-200 font-light leading-relaxed max-w-2xl mx-auto px-2">
              {language === "en"
                ? currentCategory.subtitle_en
                : currentCategory.subtitle_ar}
            </p>
          </div>
        </div>

        {/* CTA Area with Subtle Arrow */}
        <div className="flex flex-col items-center gap-4 sm:gap-5">
          {/* Subtle bouncing arrow */}
          <div className="animate-bounce opacity-60">
            <ChevronDown
              size={18}
              className="sm:w-5 sm:h-5 text-white"
              strokeWidth={2}
            />
          </div>

          {/* Premium Glassy CTA Button */}
          <button
            onClick={handleScrollToSection}
            className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 backdrop-blur-xl bg-white/80 hover:bg-white/90 border border-white/60 text-gray-900 font-semibold text-base sm:text-lg rounded-full shadow-2xl shadow-black/30 hover:shadow-black/40 transition-all duration-300 overflow-hidden cursor-pointer hover:scale-105 active:scale-95"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <span className="relative flex items-center gap-2.5 whitespace-nowrap">
              {language === "en" ? "Explore Collection" : "استكشف المجموعة"}
            </span>
          </button>
        </div>
      </div>

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] pointer-events-none" />

      {/* CSS for highlight flash animation */}
      <style>{`
        @keyframes highlight-flash {
          0%, 100% {
            background-color: transparent;
          }
          50% {
            background-color: rgba(20, 184, 166, 0.1);
          }
        }

        .highlight-flash {
          animation: highlight-flash 2s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;
