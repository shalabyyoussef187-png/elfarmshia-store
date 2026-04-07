import Reveal from "../Reveal";
import { Search, Phone } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-8 text-center relative overflow-hidden" style={{ background: "#FAFFFE" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 80% at 50% 110%,rgba(0,192,122,.09) 0%,transparent 70%)" }}
      />
      <Reveal className="relative z-10 max-w-[680px] mx-auto">
        <p className="text-xs font-bold tracking-[3px] uppercase mb-4 md:mb-5 m-0" style={{ color: "#00875A" }}>✦ جاهز؟</p>
        <h2
          className="font-[Cairo] font-black leading-[1.18] mb-4 md:mb-5 m-0"
          style={{ fontSize: "clamp(1.9rem,4.5vw,3.8rem)", color: "#0D1B14" }}
        >
          وقّف رحلة البحث المؤلمة.<br />
          <span style={{ color: "#00875A" }}>الدواء بيجيلك إنت.</span>
        </h2>
        <p className="text-base md:text-lg leading-[1.9] mb-8 md:mb-10 m-0" style={{ color: "#4A6358" }}>
          سواء كنت مريض بتدور، صيدلية عايزة تتوسع، أو موزّع بيدور على شريك موثوق — الفرماشيه هنا.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 text-white font-[Cairo] font-bold text-base px-8 py-4 rounded-full no-underline transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#00875A,#00C07A)", boxShadow: "0 8px 30px rgba(0,135,90,.38),0 1px 0 rgba(255,255,255,.2) inset" }}
          >
            <Search size={17} /> ابحث عن دوائك
          </a>
          <a
            href="#"
            className="bg-white/55 backdrop-blur-[18px] border border-white/65 shadow-[0_8px_32px_rgba(0,135,90,0.10)] inline-flex items-center justify-center gap-2 font-bold text-base px-7 py-4 rounded-full no-underline transition-all hover:text-[#00875A]"
            style={{ color: "#0D1B14" }}
          >
            <Phone size={17} /> تواصل معنا
          </a>
        </div>
      </Reveal>
    </section>
  );
}
