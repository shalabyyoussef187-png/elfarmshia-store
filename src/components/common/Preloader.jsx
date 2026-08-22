import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, Activity, ShieldCheck } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const Preloader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const isRtl = language === "ar";

  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();
    const minWaitMs = 600; // Minimum time for smooth animation feel

    const checkReady = async () => {
      try {
        if ("fonts" in document) {
          await document.fonts.ready;
        }
      } catch (e) {
        // Fallback if fonts API fails
      }

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minWaitMs - elapsed);

      setTimeout(() => {
        if (isMounted) {
          setIsLoading(false);
          // Remove static inline loader from DOM if present
          const staticLoader = document.getElementById("initial-loader");
          if (staticLoader) {
            staticLoader.style.opacity = "0";
            staticLoader.style.visibility = "hidden";
            setTimeout(() => staticLoader.remove(), 400);
          }
        }
      }, remaining);
    };

    checkReady();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="page-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#f8faf9] flex flex-col items-center justify-center text-gray-800 px-4"
            dir={isRtl ? "rtl" : "ltr"}
          >
            {/* Glowing Capsule Pharmacy Animation - Light Mode */}
            <div className="relative flex flex-col items-center">
              {/* Outer Soft Mint Ambient Glow */}
              <div className="absolute -inset-10 bg-teal-500/15 rounded-full blur-3xl animate-pulse" />

              {/* Pulsing Pill Container */}
              <motion.div
                initial={{ scale: 0.85 }}
                animate={{ scale: [0.95, 1.08, 0.95] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-28 h-14 rounded-full bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-700 p-0.5 shadow-[0_10px_35px_rgba(13,148,136,0.3)] border border-white flex items-center justify-between overflow-hidden"
              >
                {/* Left Half (Light Teal) */}
                <div className="w-1/2 h-full bg-teal-400/90 flex items-center justify-center relative">
                  <Pill size={18} className="text-teal-950 animate-bounce" />
                </div>

                {/* Center Divide Line */}
                <div className="w-0.5 h-full bg-white/40 shadow-xs z-10" />

                {/* Right Half (Deep Teal/Emerald) */}
                <div className="w-1/2 h-full bg-emerald-800/90 flex items-center justify-center relative">
                  <Activity size={18} className="text-white animate-pulse" />
                </div>
              </motion.div>

              {/* Brand Title */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-xl sm:text-2xl font-black tracking-wider flex items-center gap-2"
              >
                <span className="text-teal-800 font-black">
                  {isRtl ? "الفرماشية +" : "Al-Farmashia +"}
                </span>
              </motion.h1>

              {/* Subtext - Clean & Simple */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-1.5 text-xs text-gray-400 font-bold tracking-wide flex items-center gap-1.5"
              >
                <span>{isRtl ? "جاري التحميل..." : "Loading..."}</span>
              </motion.p>

              {/* Progress Line */}
              <div className="mt-5 w-36 h-1 bg-teal-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-teal-500 to-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render app contents */}
      {children}
    </>
  );
};

export default Preloader;
