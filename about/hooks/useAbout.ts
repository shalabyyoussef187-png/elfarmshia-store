import { useEffect, useRef, useState } from "react";

// ─── useReveal ─────────────────────────────────────────────────────────────
// Watches when an element enters the viewport and sets visible = true
export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── useCountUp ────────────────────────────────────────────────────────────
// Animates a number from 0 → target with easing, triggered by active flag
export function useCountUp(target: number, active: boolean, duration = 1400) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3); // cubic ease-out
      setVal(Math.floor(ease * target));
      if (t < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return val;
}

// ─── useScrolled ───────────────────────────────────────────────────────────
// Returns true once the user scrolls past 40px (used to style the nav)
export function useScrolled(offset = 40) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > offset);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [offset]);

  return scrolled;
}
