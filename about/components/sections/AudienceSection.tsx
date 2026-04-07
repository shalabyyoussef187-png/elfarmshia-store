import Reveal from "../Reveal";
import { AUDIENCE } from "../../data/about.data";
import { ChevronLeft } from "lucide-react";

export default function AudienceSection() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: "linear-gradient(180deg,#FAFFFE 0%,#E6F7F1 100%)" }}>
      <div className="max-w-[1100px] mx-auto">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="text-xs font-bold tracking-[3px] uppercase mb-4 m-0" style={{ color: "#00875A" }}>✦ بنخدم مين</p>
          <h2 className="font-[Cairo] font-black leading-[1.2] m-0" style={{ fontSize: "clamp(1.9rem,4vw,3rem)", color: "#0D1B14" }}>
            كل واحد له مكانه عندنا
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {AUDIENCE.map((a, i) => {
            const Icon = a.icon;
            return (
              <Reveal key={i} delay={i * 120}>
                <div className="bg-white/50 backdrop-blur-[10px] border border-white/60 shadow-[0_4px_24px_rgba(0,135,90,0.08),0_1px_0_rgba(255,255,255,0.8)_inset] transition-all duration-300 hover:bg-white/70 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,135,90,0.14),0_1px_0_rgba(255,255,255,0.9)_inset] rounded-3xl overflow-hidden h-full">
                  <div className="px-6 md:px-8 pt-6 md:pt-8 pb-5 md:pb-6" style={{ borderBottom: "1px solid rgba(0,135,90,.1)" }}>
                    <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-7">
                      <div className="bg-[rgba(0,135,90,0.18)] backdrop-blur-[18px] border border-[rgba(0,192,122,0.30)] shadow-[0_8px_32px_rgba(0,135,90,0.20)] w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0">
                        <Icon size={24} color="#00875A" />
                      </div>
                      <h3 className="font-[Cairo] font-black text-xl md:text-2xl m-0" style={{ color: "#0D1B14" }}>{a.title}</h3>
                    </div>
                    <ul className="list-none m-0 p-0 space-y-2.5 md:space-y-3">
                      {a.lines.map((line, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm md:text-base" style={{ color: "#4A6358" }}>
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#00875A" }} />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-6 md:px-8 py-4 md:py-5">
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 font-[Cairo] font-bold text-sm no-underline transition-colors hover:text-[#005c3a]"
                      style={{ color: "#00875A" }}
                    >
                      {a.cta}<ChevronLeft size={16} />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
