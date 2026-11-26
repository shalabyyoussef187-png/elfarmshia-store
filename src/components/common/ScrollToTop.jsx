import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const KEY = "scroll-pos:";

/**
 * ScrollToTop Component
 * - New page (PUSH/REPLACE): scroll to the top.
 * - Back/Forward: return to where the visitor was on that page. Pages load
 *   their content asynchronously, so we wait until the page is tall enough.
 * - Product lists (/products, /category/*) restore their own page and scroll
 *   position (see Products.jsx), so they are left alone here.
 */
export default function ScrollToTop() {
  const location = useLocation();
  const { pathname } = location;
  const navType = useNavigationType();

  // Remember the scroll position of the current history entry.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const id = KEY + location.key;
    const save = () => {
      if (window.location.pathname !== pathname) return;
      try {
        sessionStorage.setItem(id, String(Math.round(window.scrollY)));
      } catch {
        /* storage unavailable: ignore */
      }
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, [location.key, pathname]);

  useEffect(() => {
    const isList = pathname === "/products" || pathname.startsWith("/category/");
    if (navType === "POP" && isList) return;

    let target = 0;
    if (navType === "POP") {
      try {
        target = Number(sessionStorage.getItem(KEY + location.key)) || 0;
      } catch {
        target = 0;
      }
    }

    if (target <= 0) {
      window.scrollTo(0, 0);
      return;
    }

    // Wait for the page content to load, then go back to the saved spot.
    let stopped = false;
    const stop = () => {
      stopped = true;
    };
    window.addEventListener("wheel", stop, { once: true, passive: true });
    window.addEventListener("touchstart", stop, { once: true, passive: true });
    const started = Date.now();
    const timer = setInterval(() => {
      if (stopped || Date.now() - started > 6000) {
        clearInterval(timer);
        return;
      }
      const tallEnough =
        document.documentElement.scrollHeight >= target + window.innerHeight;
      if (tallEnough) {
        window.scrollTo(0, target);
        if (Math.abs(window.scrollY - target) < 2) clearInterval(timer);
      }
    }, 60);
    return () => {
      clearInterval(timer);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
  }, [location.key, pathname, navType]);

  return null;
}
