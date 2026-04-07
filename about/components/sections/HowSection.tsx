import { useState } from "react";
import Reveal from "../Reveal";
import { PILLARS } from "../../data/about.data";

export default function HowSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [tabKey, setTabKey] = useState(0);
  const switchTab = (i: number) => { setActiveTab(i); setTabKey((k) => k + 1); };
  const ActiveIcon = PILLARS[activeTab].icon;

  return (
    <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: "#FAFFFE" }}>
      <div className="max-w-[1100px] mx-auto">
        <Reveal className="text-center mb-10 md:mb-14">
          <p className="text-xs font-bold tracking-[3px] uppercase mb-4 m-0" style={{ color: "#00875A" }}>✦ كيف بنشتغل</p>
          <h2 className="font-[Cairo] font-black leading-[1.2] mb-4 m-0" style={{ fontSize: "clamp(1.9rem,4vw,3rem)", color: "#0D1B14" }}>خطوة واحدة بس</h2>
          <p className="text-base md:text-lg m-0" style={{ color: "#4A6358" }}>اختار إنت مين — وإحنا نعرف نخدمك صح</p>
        </Reveal>

        {/* Tabs */}
        <Reveal className="flex justify-center mb-10">
          <div className="bg-[rgba(230,247,241,0.70)] backdrop-blur-[12px] border border-[rgba(200,230,218,0.60)] shadow-[0_2px_12px_rgba(0,135,90,0.06),0_1px_0_rgba(255,255,255,0.8)_inset] inline-flex gap-1.5 md:gap-2 p-1.5 rounded-2xl w-full max-w-sm md:max-w-none md:w-auto">
            {PILLARS.map((p, i) => {
              const TabIcon = p.icon;
              const isActive = activeTab === i;
              return (
                <button
                  key={i}
                  onClick={() => switchTab(i)}
                  className={`flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 md:gap-2 font-[Cairo] font-bold text-xs md:text-sm px-6 py-2.5 rounded-[14px] border-0 cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-[#00875A] text-white shadow-[0_4px_14px_rgba(0,135,90,0.3)]"
                      : "bg-transparent text-[#4A6358] hover:bg-[#E6F7F1] hover:text-[#00875A]"
                  }`}
                >
                  <TabIcon size={14} />
                  {p.tag}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Content */}
        <div
          key={tabKey}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center"
          style={{ animation: "tabFade .35s ease" }}
        >
          <div>
            <div className="font-[Cairo] font-black mb-3 select-none leading-none hidden md:block" style={{ fontSize: "6rem", color: "#E6F7F1" }}>
              {PILLARS[activeTab].num}
            </div>
            <div className="bg-white/55 backdrop-blur-[18px] border border-white/65 shadow-[0_8px_32px_rgba(0,135,90,0.10)] w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-5">
              <ActiveIcon size={28} color="#00875A" />
            </div>
            <h3 className="font-[Cairo] font-black mb-4 m-0" style={{ fontSize: "clamp(1.5rem,3vw,2.5rem)", color: "#0D1B14" }}>
              {PILLARS[activeTab].title}
            </h3>
            <p className="text-base md:text-lg leading-[2] m-0" style={{ color: "#4A6358" }}>{PILLARS[activeTab].body}</p>
            <a href="#" className="inline-flex items-center gap-2 mt-6 font-[Cairo] font-bold text-base no-underline" style={{ color: "#00875A" }}>ابدأ دلوقتي ←</a>
          </div>

          {/* visual box */}
          <div className="relative flex justify-center">
            <div
              className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-3xl flex items-center justify-center"
              style={{
                background: "rgba(223,245,235,.6)",
                backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                border: "1.5px solid rgba(255,255,255,.7)",
                boxShadow: "0 16px 60px rgba(0,135,90,.14),0 2px 0 rgba(255,255,255,.8) inset",
              }}
            >
              <ActiveIcon size={90} color="#00875A" strokeWidth={1.2} opacity={0.35} />
            </div>
            <div
              className="absolute -bottom-4 -right-4 text-white font-[Cairo] font-black text-lg w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#00875A,#00C07A)", boxShadow: "0 6px 20px rgba(0,135,90,.4),0 1px 0 rgba(255,255,255,.25) inset" }}
            >
              {PILLARS[activeTab].num}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
