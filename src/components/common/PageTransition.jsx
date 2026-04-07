import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

/**
 * PageTransition Component
 * Shows loading spinner during page navigation with smooth fade
 */
export default function PageTransition({ children }) {
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loading spinner with fade in
    setLoading(true);
    setFadeOut(false);

    // Start fade out animation after delay
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 250);

    // Hide spinner completely
    const hideTimer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  if (loading) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-200 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Animated spinner with glow effect */}
          <div className="relative">
            <div className="absolute inset-0 blur-lg bg-teal-500/30 rounded-full animate-pulse" />
            <Loader2
              className="relative animate-spin text-teal-600"
              size={48}
              strokeWidth={2.5}
            />
          </div>
          {/* Loading text */}
          <p className="text-gray-600 font-medium animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return <div className="animate-fadeIn">{children}</div>;
}
