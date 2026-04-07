import { useState } from "react";
import { MapPin } from "lucide-react";

interface FloatingBtnProps { onClick: () => void; }

export default function FloatingBtn({ onClick }: FloatingBtnProps) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[999] w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-300 backdrop-blur-[8px] shadow-[0_6px_24px_rgba(37,211,102,0.42),0_1px_0_rgba(255,255,255,0.3)_inset] hover:shadow-[0_14px_40px_rgba(37,211,102,0.62),0_1px_0_rgba(255,255,255,0.4)_inset]"
      style={{
        background: "linear-gradient(135deg,rgba(37,211,102,.85),rgba(18,140,126,.85))",
        transform: hov ? "scale(1.12) translateY(-3px)" : "scale(1)",
      }}
    >
      <span
        className="absolute inset-0 rounded-full border-2 border-green-400/50"
        style={{ animation: "waPing 2.2s cubic-bezier(.4,0,.6,1) infinite" }}
      />
      <span
        className="absolute inset-0 rounded-full border-2 border-green-400/25"
        style={{ animation: "waPing 2.2s cubic-bezier(.4,0,.6,1) .7s infinite" }}
      />
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 md:w-7 md:h-7 relative z-10">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L0 24l6.335-1.508A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.373l-.36-.214-3.727.977.994-3.634-.235-.374A9.818 9.818 0 1112 21.818z" />
      </svg>
      {/* tooltip */}
      <span
        className="hidden md:flex bg-white/80 backdrop-blur-[14px] border border-white/90 shadow-[0_8px_32px_rgba(0,135,90,0.12),0_1px_0_rgba(255,255,255,1)_inset] absolute whitespace-nowrap text-sm font-semibold px-4 py-2 rounded-full pointer-events-none transition-all duration-200 items-center gap-1.5"
        style={{ left: hov ? "76px" : "68px", bottom: "50%", transform: "translateY(50%)", color: "#0D1B14", opacity: hov ? 1 : 0 }}
      >
        <MapPin size={13} color="#00875A" /> موقعنا
      </span>
    </button>
  );
}
