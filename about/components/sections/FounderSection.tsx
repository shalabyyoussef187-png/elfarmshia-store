import Reveal from "../Reveal";
import { FOUNDER_STATS } from "../../data/about.data";
import { UserRound } from "lucide-react";

export default function FounderSection() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8" style={{ background: "#FAFFFE" }}>
      <div className="max-w-[1100px] mx-auto">
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg,#0D1B14,#0a1f17)", border: "1px solid rgba(0,192,122,.15)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Quote */}
            <Reveal className="p-8 md:p-12" style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
              <p className="text-xs font-bold tracking-[3px] uppercase mb-6 md:mb-8 m-0" style={{ color: "#00C07A" }}>✦ الفكرة من وراه</p>
              <div className="text-6xl md:text-8xl leading-none mb-4 select-none" style={{ color: "rgba(0,135,90,.25)", fontFamily: "serif" }}>❝</div>
              <blockquote className="text-white text-base md:text-xl leading-[2] italic mb-8 md:mb-10 m-0 font-medium">
                شفت بعيني ناس بتتعب وهي بتدور على دواء موجود في السوق — المشكلة مش في الدواء، المشكلة في المعلومة. الفرماشيه هي إجابتي على السؤال ده.
              </blockquote>
              <div className="flex items-center gap-4">
                <div
                  className="bg-[rgba(0,135,90,0.18)] backdrop-blur-[18px] border border-[rgba(0,192,122,0.30)] w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,rgba(0,135,90,.6),rgba(0,192,122,.6))" }}
                >
                  <UserRound size={24} color="white" />
                </div>
                <div>
                  <div className="font-[Cairo] font-black text-white text-base md:text-lg">صاحب الفرماشيه</div>
                  <div className="text-sm" style={{ color: "#00C07A" }}>مؤسس ومدير المنصة</div>
                </div>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal
              delay={150}
              from="right"
              className="p-8 md:p-12 flex flex-col justify-center gap-5 md:gap-7"
              style={{ borderRight: "1px solid rgba(255,255,255,.05)" }}
            >
              <p className="text-xs font-bold tracking-[3px] uppercase m-0" style={{ color: "#00C07A" }}>✦ بالأرقام</p>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-0 md:flex md:flex-col md:gap-y-7">
                {FOUNDER_STATS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <div className="bg-[rgba(0,135,90,0.18)] backdrop-blur-[18px] border border-[rgba(0,192,122,0.30)] shadow-[0_8px_32px_rgba(0,135,90,0.20)] w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0">
                        <Icon size={20} color="#00C07A" />
                      </div>
                      <div>
                        <div className="font-[Cairo] font-black text-xl md:text-2xl leading-none" style={{ color: "#00C07A" }}>{s.val}</div>
                        <div className="text-xs md:text-sm mt-0.5" style={{ color: "rgba(255,255,255,.52)" }}>{s.txt}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
}
