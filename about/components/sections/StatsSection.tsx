import Reveal from "../Reveal";
import StatCard from "../StatCard";
import { STATS } from "../../data/about.data";

export default function StatsSection() {
  return (
    <section
      className="py-16 md:py-20 px-6 md:px-8 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#00875A,#005c3a)" }}
    >
      {/* dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,.12) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* 2 col mobile → 4 col desktop */}
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 relative">
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="bg-[rgba(13,27,20,0.55)] backdrop-blur-[18px] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.06)_inset] rounded-2xl">
              <StatCard {...s} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
