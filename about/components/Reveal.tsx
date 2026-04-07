import React from "react";
import { useReveal } from "../hooks/useAbout";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  from?: "bottom" | "left" | "right";
}

const transforms: Record<string, string> = {
  bottom: "translateY(36px)",
  left:   "translateX(-36px)",
  right:  "translateX(36px)",
};

export default function Reveal({
  children,
  className = "",
  style = {},
  delay = 0,
  from = "bottom",
}: RevealProps) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "none" : transforms[from],
        transition: `opacity .75s cubic-bezier(.4,0,.2,1) ${delay}ms, transform .75s cubic-bezier(.4,0,.2,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
