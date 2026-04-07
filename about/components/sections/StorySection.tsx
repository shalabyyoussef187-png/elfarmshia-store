import Reveal from "../Reveal";
import { TIMELINE } from "../../data/about.data";

export default function StorySection() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8 relative overflow-hidden" style={{ background: "#0D1B14", color: "white" }}>
      <div className="absolute rounded-full pointer-events-none" style={{ width: 600, height: 600, top: -200, left: -150, background: "radial-gradient(circle,rgba(0,192,122,.07) 0%,transparent 65%)" }} />
      <div className="max-w-[1100px] mx-auto">
        <Reveal className="text-center mb-14 md:mb-20">
          <p className="text-xs font-bold tracking-[3px] uppercase mb-4 m-0" style={{ color: "#00C07A" }}>✦ رحلتنا</p>
          <h2 className="font-[Cairo] font-black leading-[1.2] mb-5 m-0" style={{ fontSize: "clamp(1.9rem,4vw,3.4rem)" }}>من المشكلة للحل</h2>
          <p className="text-base md:text-lg max-w-[480px] mx-auto m-0" style={{ color: "rgba(255,255,255,.55)" }}>
            كل خطوة في رحلة الفرماشيه كانت ردّ فعل على واقع بيعيشه ناس حقيقيين كل يوم
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
          {TIMELINE.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={i} delay={i * 100} className="h-full">
                <div className="bg-white/[0.04] backdrop-blur-[10px] border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.20),0_1px_0_rgba(255,255,255,0.06)_inset] transition-all duration-300 hover:bg-white/[0.08] hover:border-[rgba(0,192,122,0.30)] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.30)] rounded-2xl p-6 md:p-7 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-[rgba(0,135,90,0.18)] backdrop-blur-[18px] border border-[rgba(0,192,122,0.30)] shadow-[0_8px_32px_rgba(0,135,90,0.20),0_1px_0_rgba(0,192,122,0.25)_inset]">
                      <Icon size={20} color="#00C07A" />
                    </div>
                    <span className="text-xs font-bold tracking-[2px] uppercase px-3 py-1 rounded-full" style={{ color: "#00C07A", border: "1px solid rgba(0,192,122,.3)" }}>
                      {t.tag}
                    </span>
                  </div>
                  <h3 className="font-[Cairo] font-bold text-lg md:text-xl text-white mb-3">{t.title}</h3>
                  <p className="text-sm leading-[2] m-0" style={{ color: "rgba(255,255,255,.58)" }}>{t.body}</p>
                  <div className="mt-5 font-[Cairo] font-black select-none" style={{ fontSize: "3.5rem", color: "rgba(255,255,255,.04)", lineHeight: 1 }}>0{i + 1}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
