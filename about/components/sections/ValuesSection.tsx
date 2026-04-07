import Reveal from "../Reveal";
import { VALUES } from "../../data/about.data";

export default function ValuesSection() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: "#0D1B14" }}>
      <div className="max-w-[1100px] mx-auto">
        <Reveal className="mb-12 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-end">
            <div>
              <p className="text-xs font-bold tracking-[3px] uppercase mb-4 m-0" style={{ color: "#00C07A" }}>✦ قيمنا</p>
              <h2 className="font-[Cairo] font-black text-white leading-[1.2] m-0" style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
                مبادئ<br /><span style={{ color: "#00C07A" }}>مش قابلة للتفاوض</span>
              </h2>
            </div>
            <p className="text-sm md:text-base leading-[2] m-0" style={{ color: "rgba(255,255,255,.5)" }}>
              في الفرماشيه، القيم مش شعارات على حيط — هي الطريقة اللي بنتعامل بيها مع كل طلب، كل مريض، كل صيدلية.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="bg-white/[0.04] backdrop-blur-[10px] border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.20),0_1px_0_rgba(255,255,255,0.06)_inset] transition-all duration-300 hover:bg-white/[0.08] hover:border-[rgba(0,192,122,0.30)] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.30)] rounded-2xl p-6 md:p-7 h-full">
                  <div className="bg-[rgba(0,135,90,0.18)] backdrop-blur-[18px] border border-[rgba(0,192,122,0.30)] shadow-[0_8px_32px_rgba(0,135,90,0.20),0_1px_0_rgba(0,192,122,0.25)_inset] w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-4 md:mb-5">
                    <Icon size={20} color="#00C07A" />
                  </div>
                  <h3 className="font-[Cairo] font-bold text-lg md:text-xl text-white mb-2 md:mb-3">{v.title}</h3>
                  <p className="text-sm leading-[1.95] m-0" style={{ color: "rgba(255,255,255,.55)" }}>{v.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
