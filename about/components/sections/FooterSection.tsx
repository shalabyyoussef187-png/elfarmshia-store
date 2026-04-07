import { NAV_LINKS } from "../../data/about.data";
import { MapPin, Phone } from "lucide-react";

interface FooterSectionProps { onMapOpen: () => void; }

export default function FooterSection({ onMapOpen }: FooterSectionProps) {
  return (
    <footer className="px-6 md:px-8 pt-12 md:pt-14 pb-8" style={{ background: "#0D1B14" }}>
      <div className="max-w-[1100px] mx-auto">

        {/* 1 col mobile → 3 col desktop */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-12 pb-10 md:pb-12"
          style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}
        >
          <div className="sm:col-span-2 md:col-span-1">
            <div className="font-[Cairo] text-2xl font-black mb-3" style={{ color: "#00875A" }}>
              الفرما<span style={{ color: "white" }}>شيه</span>
            </div>
            <p className="text-sm leading-[2] m-0" style={{ color: "rgba(255,255,255,.45)" }}>
              منصة دوائية موثوقة تربط المريض بالصيدلية بالموّرد في خط واحد مباشر وشفاف.
            </p>
          </div>

          <div>
            <div className="font-[Cairo] font-bold text-white mb-4">روابط سريعة</div>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm no-underline transition-colors hover:text-[#00C07A]"
                  style={{ color: "rgba(255,255,255,.45)" }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-[Cairo] font-bold text-white mb-4">تواصل معنا</div>
            <div className="flex flex-col gap-3">
              <span className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,.45)" }}>
                <MapPin size={14} color="#00C07A" /> بورسعيد، مصر
              </span>
              <span className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,.45)" }}>
                <Phone size={14} color="#00C07A" /> اتصل بينا
              </span>
              <button
                onClick={onMapOpen}
                className="bg-[rgba(0,135,90,0.18)] backdrop-blur-[18px] border border-[rgba(0,192,122,0.30)] shadow-[0_8px_32px_rgba(0,135,90,0.20)] hover:bg-[rgba(0,135,90,0.26)] hover:border-[rgba(0,192,122,0.45)] inline-flex items-center gap-2 text-sm font-semibold cursor-pointer p-2.5 px-4 rounded-xl w-fit transition-all"
                style={{ color: "#00C07A" }}
              >
                <MapPin size={14} /> شوف موقعنا على الخريطة
              </button>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 text-xs text-center" style={{ color: "rgba(255,255,255,.28)" }}>
          <span>© 2025 <span style={{ color: "#00C07A" }}>الفرماشيه</span> — جميع الحقوق محفوظة</span>
          <span>صُنع بـ ❤ في بورسعيد</span>
        </div>
      </div>
    </footer>
  );
}
