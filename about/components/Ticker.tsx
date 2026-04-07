import { Pill } from "lucide-react";
import { TICKER_ITEMS } from "../data/about.data";

export default function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden py-2.5 md:py-3 bg-[rgba(0,135,90,0.82)] backdrop-blur-[10px] border-t border-t-[rgba(0,192,122,0.35)] border-b border-b-[rgba(0,192,122,0.35)]">
      <div className="flex" style={{ animation: "ticker 24s linear infinite" }}>
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 md:px-8 font-[Cairo] font-semibold text-xs md:text-sm whitespace-nowrap"
            style={{ color: "rgba(255,255,255,.88)" }}
          >
            <Pill size={12} color="rgba(255,255,255,.55)" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
