import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * ScrollToTop Component
 * Scrolls to the top when moving to a new page. On Back/Forward to a product
 * list the list page restores its own scroll position, so we leave it alone.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // The browser must not restore scroll on its own: the list is loaded
    // asynchronously, so its height is wrong at that moment.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const isList = pathname === "/products" || pathname.startsWith("/category/");
    if (navType === "POP" && isList) return;

    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [pathname, navType]);

  return null;
}
