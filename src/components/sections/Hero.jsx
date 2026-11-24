import { useState, useEffect, useRef } from "react";
import {
  Pill,
  Sparkles,
  Heart,
  Baby,
  Droplets,
  Package,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import heroImage from "../../assets/hero2.png";
import catVitamins from "../../assets/cat_vitamins.png";
import catSupplements from "../../assets/cat_supplements.png";
import catSkincare from "../../assets/cat_skincare.png";
import catBabycare from "../../assets/cat_babycare.png";
import catPersonalcare from "../../assets/cat_personalcare.png";

/* ── Count-Up Hook ── */
function useCountUp(target, duration = 1400, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0 = null;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, start]);
  return count;
}

/* ── Stat Item ── */
function StatItem({ countTarget, suffix, label, countStarted }) {
  const count = useCountUp(countTarget, 1200, countStarted);
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-baseline gap-0.5 leading-none">
        <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {countStarted ? count : 0}
        </span>
        <span className="text-xl sm:text-2xl font-black text-teal-400">
          {suffix}
        </span>
      </div>
      <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}

/* ═══════════════════════ HERO COMPONENT ═══════════════════════ */
const Hero = ({ language = "en" }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [countStarted, setCountStarted] = useState(false);
  const sectionRef = useRef(null);

  /* Mouse parallax - active on desktop (>1024px) */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 40, damping: 25 });
  const springY = useSpring(rawY, { stiffness: 40, damping: 25 });

  const imgX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const imgY = useTransform(springY, [-0.5, 0.5], [-5, 5]);
  const textX = useTransform(springX, [-0.5, 0.5], [6, -6]);
  const textY = useTransform(springY, [-0.5, 0.5], [3, -3]);

  const handleMouseMove = (e) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    if (!sectionRef.current) return;
    const { width, height, left, top } = sectionRef.current.getBoundingClientRect();
    rawX.set((e.clientX - left) / width - 0.5);
    rawY.set((e.clientY - top) / height - 0.5);
  };

  useEffect(() => {
    const t = setTimeout(() => setCountStarted(true), 500);
    return () => clearTimeout(t);
  }, []);

  const categories = [
    {
      id: "skincare",
      icon: Droplets,
      name_en: "Skincare",
      name_ar: "العناية بالبشرة",
      word_en: "SKINCARE",
      word_ar: "العناية بالبشرة",
      headline_en: "Radiant Beauty",
      headline_ar: "جمال مشرق",
      subtitle_en: "Expert formulations for glowing, healthy skin",
      subtitle_ar: "تركيبات متخصصة ومضمونة لبشرة متألقة",
      targetSectionId: "skincare-section",
      accentText: "text-pink-400",
      btnBg: "bg-teal-500 hover:bg-teal-400 text-gray-950 font-extrabold shadow-lg shadow-teal-500/40",
      thumbImage: catSkincare,
    },
    {
      id: "vitamins",
      icon: Pill,
      name_en: "Vitamins",
      name_ar: "الفيتامينات",
      word_en: "VITAMINS",
      word_ar: "الفيتامينات",
      headline_en: "Daily Strength",
      headline_ar: "قوة يومية",
      subtitle_en: "Essential nutrients for vibrant daily health",
      subtitle_ar: "عناصر أساسية لصحة نابضة بالحياة يومياً",
      targetSectionId: "vitamins-section",
      accentText: "text-amber-400",
      btnBg: "bg-teal-500 hover:bg-teal-400 text-gray-950 font-extrabold shadow-lg shadow-teal-500/40",
      thumbImage: catVitamins,
    },
    {
      id: "supplements",
      icon: Sparkles,
      name_en: "Supplements",
      name_ar: "المكملات الغذائية",
      word_en: "SUPPLEMENTS",
      word_ar: "المكملات الغذائية",
      headline_en: "Peak Performance",
      headline_ar: "أداء مثالي",
      subtitle_en: "Science-backed nutrition for your active goals",
      subtitle_ar: "تغذية مدعومة علمياً لتحقيق أهدافك",
      targetSectionId: "supplements-section",
      accentText: "text-teal-400",
      btnBg: "bg-teal-500 hover:bg-teal-400 text-gray-950 font-extrabold shadow-lg shadow-teal-500/40",
      thumbImage: catSupplements,
    },
    {
      id: "babycare",
      icon: Baby,
      name_en: "Baby Care",
      name_ar: "العناية بالطفل",
      word_en: "BABY CARE",
      word_ar: "العناية بالطفل",
      headline_en: "Gentle Touch",
      headline_ar: "لمسة حنونة",
      subtitle_en: "Safe, trusted care for your little ones",
      subtitle_ar: "رعاية آمنة وموثوقة لأطفالك",
      targetSectionId: "babycare-section",
      accentText: "text-blue-400",
      btnBg: "bg-teal-500 hover:bg-teal-400 text-gray-950 font-extrabold shadow-lg shadow-teal-500/40",
      thumbImage: catBabycare,
    },
    {
      id: "personalcare",
      icon: Heart,
      name_en: "Personal Care",
      name_ar: "العناية الشخصية",
      word_en: "PERSONAL CARE",
      word_ar: "العناية الشخصية",
      headline_en: "Self Care Rituals",
      headline_ar: "طقوس العناية",
      subtitle_en: "Elevate your daily wellness routine",
      subtitle_ar: "ارتقِ بروتينك الصحي والعناية اليومية",
      targetSectionId: "personalcare-section",
      accentText: "text-purple-400",
      btnBg: "bg-teal-500 hover:bg-teal-400 text-gray-950 font-extrabold shadow-lg shadow-teal-500/40",
      thumbImage: catPersonalcare,
    },
  ];

  const cat = categories[activeCategory];

  /* Auto-rotate */
  useEffect(() => {
    const id = setInterval(() => handleNext(), 7000);
    return () => clearInterval(id);
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
    setActiveCategory((prev) => (prev - 1 + categories.length) % categories.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleScrollToSection = () => {
    const el = document.getElementById(cat.targetSectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("highlight-flash");
      setTimeout(() => el.classList.remove("highlight-flash"), 2000);
    }
  };

  // Helper to scale font size based on word length for responsiveness
  const getDynamicFontSize = (word, lang) => {
    const len = word.length;
    if (lang === "ar") {
      if (len > 12) return "clamp(28px, 7vw, 100px)";
      if (len > 8)  return "clamp(36px, 9vw, 125px)";
      return "clamp(44px, 11vw, 150px)";
    }
    // English scaling
    if (len >= 11) return "clamp(36px, 8.5vw, 130px)";
    if (len >= 8)  return "clamp(44px, 10.5vw, 150px)";
    return "clamp(52px, 13vw, 170px)";
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[660px] overflow-hidden bg-[#070b15]"
      onMouseMove={handleMouseMove}
    >
      {/* ══ 1. PHARMACY BACKGROUND IMAGE (hero2.png) ══ */}
      <motion.div
        style={{ x: imgX, y: imgY }}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <motion.img
          src={heroImage}
          alt="Pharmacy Background"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="w-full h-full object-cover object-center brightness-[0.90] contrast-105"
        />
      </motion.div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b15] via-[#070b15]/35 to-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070b15]/40 via-transparent to-[#070b15]/40 pointer-events-none" />

      {/* ══ 2. GIANT CATEGORY BACKGROUND FONT (BEHIND THE IMAGE) ══ */}
      <motion.div
        style={{ x: textX, y: textY }}
        className="absolute top-[26%] sm:top-[20%] lg:top-[18%] inset-x-0 flex justify-center pointer-events-none z-10 px-4 max-w-full"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + "-word"}
            initial={{ opacity: 0, scale: 1.04, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.4 }}
            className="select-none text-center leading-normal font-black uppercase max-w-full px-2 pt-2 sm:pt-0"
            style={{
              fontSize: getDynamicFontSize(language === "en" ? cat.word_en : cat.word_ar, language),
              fontFamily:
                language === "ar"
                  ? "'Almarai', 'Changa', 'Readex Pro', sans-serif"
                  : "'Bebas Neue', 'Oswald', sans-serif",
              fontWeight: 800,
              color: "#e6fffb",
              transform: language === "ar" ? "scaleY(1)" : "scaleY(1.2)",
              letterSpacing: language === "ar" ? "0.02em" : "0.06em",
              filter: "drop-shadow(0 6px 18px rgba(0, 0, 0, 0.5))",
            }}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {language === "en" ? cat.word_en : cat.word_ar}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ══ 3. CENTER SHOWCASE PRODUCT CARD (FLOATING IN FRONT OF LOWER PORTION OF TEXT) ══ */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15 pt-18 sm:pt-22 pb-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 75 }}
          className={`${
            language === "ar"
              ? "w-[180px] sm:w-[220px] md:w-[260px] mt-14 sm:mt-18"
              : "w-[200px] sm:w-[240px] md:w-[280px] mt-12 sm:mt-16"
          } aspect-[16/10] rounded-2xl overflow-hidden border-2 border-white/40 shadow-[0_0_50px_rgba(20,184,166,0.35)] backdrop-blur-2xl relative pointer-events-auto group cursor-pointer`}
          onClick={handleScrollToSection}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={cat.id + "-hero-card"}
              src={cat.thumbImage}
              alt={cat.name_en}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </AnimatePresence>

          {/* Inner Card Glow & Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" />
        </motion.div>
      </div>

      {/* ══ 4. BOTTOM FOREGROUND UI ══ */}
      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-end pb-16 sm:pb-20 lg:pb-14 z-20">
        <div className="grid grid-cols-12 items-end gap-4 sm:gap-6">

          {/* Bottom Left: Stacked Stats */}
          <div className="col-span-12 sm:col-span-3 flex flex-row sm:flex-col gap-4 sm:gap-3 justify-between sm:justify-start">
            <StatItem countTarget={500} suffix="+" label={language === "ar" ? "منتج متاح" : "PRODUCTS"} countStarted={countStarted} />
            <StatItem countTarget={24} suffix="/7" label={language === "ar" ? "توصيل سريع" : "AVAILABLE"} countStarted={countStarted} />
            <StatItem countTarget={100} suffix="%" label={language === "ar" ? "منتجات أصلية" : "AUTHENTIC"} countStarted={countStarted} />
          </div>

          {/* Bottom Center: Headline + Subtitle + Glowing Shop Now Button with OUTWARD Arrows */}
          <div className="col-span-12 sm:col-span-6 flex flex-col items-center text-center px-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + "-center-text"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-md"
              >
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-tight drop-shadow-md">
                  {language === "en" ? cat.headline_en : cat.headline_ar}
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-4 line-clamp-2">
                  {language === "en" ? cat.subtitle_en : cat.subtitle_ar}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Glowing CTA Button & OUTWARD Facing Arrow Buttons (LTR Fixed Order) */}
            <div className="flex items-center gap-3" dir="ltr">
              {/* Left Arrow Button */}
              <button
                onClick={handlePrev}
                disabled={isTransitioning}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/15 hover:bg-white/25 text-white transition-all duration-200 hover:scale-110 active:scale-90 disabled:opacity-30 border border-white/20 cursor-pointer shadow-md"
                aria-label="Previous"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>

              {/* Main CTA Button */}
              <button
                onClick={handleScrollToSection}
                className={`group flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full text-xs sm:text-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${cat.btnBg}`}
              >
                <span>{language === "en" ? "Shop Now" : "تسوق الآن"}</span>
                <ArrowUpRight size={15} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={handleNext}
                disabled={isTransitioning}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/15 hover:bg-white/25 text-white transition-all duration-200 hover:scale-110 active:scale-90 disabled:opacity-30 border border-white/20 cursor-pointer shadow-md"
                aria-label="Next"
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Bottom Right: Thumbnail Card Preview */}
          <div className="hidden sm:flex col-span-3 justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 90 }}
              className="flex flex-col items-center gap-2 shrink-0"
            >
              <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-xl overflow-hidden relative border-2 border-white/40 shadow-xl bg-white/15 backdrop-blur-xl p-0.5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={cat.id + "-thumb"}
                    src={cat.thumbImage}
                    alt={cat.name_en}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-cover rounded-lg shadow-inner"
                  />
                </AnimatePresence>
              </div>

              {/* Dots */}
              <div className="flex gap-1.5">
                {categories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (!isTransitioning && i !== activeCategory) {
                        setIsTransitioning(true);
                        setActiveCategory(i);
                        setTimeout(() => setIsTransitioning(false), 500);
                      }
                    }}
                    className={`rounded-full transition-all duration-400 cursor-pointer ${
                      i === activeCategory
                        ? "w-5 h-1.5 bg-teal-400 shadow-xs"
                        : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* CSS Flash Animation */}
      <style>{`
        @keyframes highlight-flash {
          0%, 100% { background-color: transparent; }
          50% { background-color: rgba(20, 184, 166, 0.2); }
        }
        .highlight-flash {
          animation: highlight-flash 2s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;
