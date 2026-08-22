import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { aboutContent } from "../data/aboutContent";
import {
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  PhoneCall,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heritageImg from "../assets/portsaid_pharmacy_heritage.png";

const About = () => {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const content = aboutContent[language] || aboutContent.ar;

  const [activeValueCard, setActiveValueCard] = useState(0);

  const iconMap = {
    ShieldCheck: ShieldCheck,
    Clock: Clock,
    Sparkles: Sparkles,
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7] text-gray-900 font-sans -mt-24" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* ══ 1. HERO BANNER: GENERATED HERITAGE ARTWORK AS FULL BACKGROUND FROM TOP OF SCREEN ══ */}
      <section className="relative w-full h-screen min-h-[660px] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-emerald-950 text-white">
        
        {/* Full Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heritageImg}
            alt="Port Said Heritage & Digital Pharmacy Background"
            className="w-full h-full object-cover object-center filter brightness-[0.80] contrast-105"
          />
        </div>

        {/* Dark Vignette & Gradient Overlay for Maximum Text Contrast */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-emerald-950/90 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-emerald-950 via-transparent to-black/70 pointer-events-none" />

        {/* Hero Content Overlay */}
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 relative z-20 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.25] text-white drop-shadow-lg">
              {content.hero.title}
            </h1>

            {/* Story Text Narrative */}
            <p className="text-base sm:text-xl text-teal-100/95 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              {content.hero.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/201028230225"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-gray-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg shadow-teal-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall size={18} />
                <span>{content.cta.pharmacistBtn}</span>
              </a>

              <Link
                to="/products"
                className="px-8 py-3.5 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-black text-xs sm:text-sm rounded-full backdrop-blur-md hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{content.cta.browseBtn}</span>
                {isRtl ? <ArrowLeft size={18} strokeWidth={2.5} /> : <ArrowRight size={18} strokeWidth={2.5} />}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. CORE VALUES GRID (3 INTERACTIVE CARDS - CLEAN & CLUTTER FREE) ══ */}
      <section className="py-20 bg-[#fcfbf7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Title */}
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-emerald-950 tracking-tight">
              {isRtl ? "روح «الفرمشية» القديمة بأسلوب عصري" : "Heritage Values, Modern Care"}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto font-medium">
              {isRtl
                ? "ثلاثة أركان أساسية تضمن لك ولعائلتك أعلى مستويات الأمان والجودة الدوائية"
                : "Three core pillars ensuring uncompromised medical safety and fast digital care"}
            </p>
          </div>

          {/* 3 Interactive Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.values.map((card, idx) => {
              const IconComp = iconMap[card.icon] || ShieldCheck;
              const isSelected = activeValueCard === idx;

              return (
                <motion.div
                  key={card.id}
                  whileHover={{ y: -8 }}
                  onClick={() => setActiveValueCard(idx)}
                  className={`group relative rounded-3xl p-8 transition-all duration-400 cursor-pointer flex flex-col justify-between overflow-hidden border ${
                    isSelected
                      ? "bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/50 border-emerald-600 shadow-xl shadow-emerald-950/10 scale-[1.02]"
                      : "bg-white border-gray-200/80 shadow-xs hover:shadow-lg hover:border-emerald-300"
                  }`}
                >
                  {/* Decorative Background Accent Line */}
                  <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${card.accent}`} />

                  <div>
                    {/* Circle Gradient Icon Badge */}
                    <div className="mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.accent} text-white flex items-center justify-center shadow-md shadow-emerald-900/20 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComp size={30} strokeWidth={2} />
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-2xl font-black text-emerald-950 mb-2 group-hover:text-emerald-700 transition-colors">
                      {card.title}
                    </h3>

                    {/* Card Subtitle */}
                    <h4 className="text-xs font-extrabold text-amber-700 mb-4 tracking-wide uppercase">
                      {card.subtitle}
                    </h4>

                    {/* Card Body Description */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium mb-6">
                      {card.description}
                    </p>
                  </div>

                  {/* Interactive Indicator Footer */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                    <span>{isRtl ? "التفاصيل الصيدلانية" : "Clinical Details"}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? "bg-emerald-600 text-white" : "bg-slate-100 text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-800"
                    }`}>
                      {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══ 3. STATS / IMPACT BAR ══ */}
      <section className="py-14 bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white relative overflow-hidden border-y border-amber-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-teal-800/60">
            {content.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-4">
                <div className="text-4xl sm:text-5xl font-black text-amber-300 tracking-tight mb-2 drop-shadow-md">
                  {stat.number}
                </div>
                <div className="text-base sm:text-lg font-black text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-teal-200 font-medium max-w-xs">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. CALL TO ACTION (CTA) SECTION ══ */}
      <section className="py-20 bg-gradient-to-b from-[#fcfbf7] to-teal-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <h2 className="text-3xl sm:text-5xl font-black text-emerald-950 tracking-tight leading-tight">
            {content.cta.title}
          </h2>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            {content.cta.subtitle}
          </p>

          {/* Action Buttons Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <a
              href="https://wa.me/201028230225"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-xl shadow-teal-600/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <PhoneCall size={18} />
              <span>{content.cta.pharmacistBtn}</span>
            </a>

            <Link
              to="/products"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-900 border-2 border-emerald-800/20 font-black text-xs sm:text-sm rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{content.cta.browseBtn}</span>
              {isRtl ? <ArrowLeft size={18} strokeWidth={2.5} /> : <ArrowRight size={18} strokeWidth={2.5} />}
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
