import { useReveal, useCountUp } from "../hooks/useAbout";

interface StatCardProps { num: number; suffix: string; label: string; sub: string; }

export default function StatCard({ num, suffix, label, sub }: StatCardProps) {
  const { ref, visible } = useReveal();
  const val = useCountUp(num, visible);
  return (
    <div ref={ref} className="text-center py-6 md:py-8 px-4 md:px-6 relative">
      <div className="absolute inset-0 rounded-2xl bg-white/[0.04]" />
      <div className="relative">
        <div
          className="font-[Cairo] font-black text-white leading-none mb-1"
          style={{ fontSize: "clamp(2rem,5vw,4rem)" }}
        >
          {val}<span style={{ color: "#00C07A" }}>{suffix}</span>
        </div>
        <div className="font-[Cairo] font-bold text-white text-sm md:text-lg mt-1 md:mt-2">{label}</div>
        <div className="text-white/50 text-xs mt-1 hidden sm:block">{sub}</div>
      </div>
    </div>
  );
}
