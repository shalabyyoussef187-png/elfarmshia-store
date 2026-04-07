import Reveal from "../Reveal";
import { NAV_LINKS, TRUST } from "../../data/about.data";
import { useScrolled } from "../../hooks/useAbout";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

export default function HeroSection() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── NAV ── */}
      <nav
        className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
        style={{ padding: scrolled ? "12px 24px" : "20px 24px" }}
      >
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background:           scrolled ? "rgba(250,255,254,.75)" : "transparent",
            backdropFilter:       scrolled ? "blur(20px) saturate(160%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
            borderBottom:         scrolled ? "1px solid rgba(200,230,218,.55)" : "1px solid transparent",
            boxShadow:            scrolled ? "0 1px 0 rgba(255,255,255,.85) inset,0 4px 24px rgba(0,135,90,.06)" : "none",
          }}
        />

        <div className="max-w-[1200px] mx-auto flex items-center justify-between relative z-10">
          {/* Logo */}
          <div className="font-[Cairo] font-black tracking-tight" style={{ fontSize: "1.5rem", color: "#00875A" }}>
            الفرما<span style={{ color: "#0D1B14" }}>شيه</span>
            <sup className="text-xs font-normal text-[#4A6358] ml-0.5" style={{ verticalAlign: "super" }}>®</sup>
          </div>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8 list-none m-0 p-0">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="relative text-[#4A6358] text-sm font-semibold no-underline hover:text-[#00875A] transition-colors after:content-[''] after:absolute after:bottom-[-2px] after:right-0 after:w-0 after:h-0.5 after:bg-[#00875A] after:transition-[width] after:duration-300 hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-2 font-[Cairo] font-bold text-sm text-white px-5 py-2.5 rounded-full no-underline"
            style={{ background: "linear-gradient(135deg,#00875A,#00C07A)", boxShadow: "0 4px 16px rgba(0,135,90,.3)" }}
          >
            <Search size={15} /> ابحث عن دوائك
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden bg-white/55 backdrop-blur-[18px] border border-white/65 shadow-[0_8px_32px_rgba(0,135,90,0.10)] w-10 h-10 rounded-xl flex items-center justify-center border-solid cursor-pointer text-[#0D1B14]"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[rgba(250,255,254,0.72)] backdrop-blur-[28px] border border-white/75 shadow-[0_20px_60px_rgba(0,135,90,0.14)] absolute top-full right-0 left-0 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[#4A6358] text-base font-semibold no-underline py-2 border-b border-[#C8E6DA]/40 last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 font-[Cairo] font-bold text-sm text-white px-5 py-3 rounded-full no-underline mt-2"
              style={{ background: "linear-gradient(135deg,#00875A,#00C07A)" }}
            >
              <Search size={15} /> ابحث عن دوائك
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "linear-gradient(155deg,#FAFFFE 0%,#eef9f4 55%,#FAFFFE 100%)" }}
      >
        {/* blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full" style={{ width: 600, height: 600, top: -150, right: -100, background: "radial-gradient(circle,rgba(0,192,122,.14) 0%,transparent 65%)" }} />
          <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: -80, left: -60, background: "radial-gradient(circle,rgba(0,135,90,.1) 0%,transparent 65%)" }} />
        </div>

        {/* pill decos */}
        <div className="hidden lg:block absolute left-[7%] top-[28%] pointer-events-none" style={{ animation: "floatY 6s ease-in-out infinite" }}>
          <div className="w-20 h-8 rounded-full bg-white/55 backdrop-blur-[18px] border border-white/65 shadow-[0_8px_32px_rgba(0,135,90,0.10)]" />
        </div>
        <div className="hidden lg:block absolute right-[9%] bottom-[30%] pointer-events-none" style={{ animation: "floatY 8s ease-in-out 1.5s infinite" }}>
          <div className="w-12 h-5 rounded-full bg-[rgba(0,135,90,0.18)] backdrop-blur-[18px] border border-[rgba(0,192,122,0.30)]" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 pt-28 pb-16">

          {/* LEFT — copy */}
          <div>
            <Reveal>
              <div className="bg-white/55 backdrop-blur-[18px] border border-white/65 shadow-[0_8px_32px_rgba(0,135,90,0.10)] inline-flex items-center gap-2 text-xs font-bold tracking-[2px] uppercase px-4 py-2 rounded-full mb-6" style={{ color: "#00875A" }}>
                <span className="w-2 h-2 rounded-full bg-[#00C07A]" style={{ animation: "pulse2 2s ease infinite" }} />
                منصة دوائية موثوقة — بورسعيد
              </div>
            </Reveal>

            <Reveal delay={70}>
              <h1
                className="font-[Cairo] font-black leading-[1.13] mb-5 m-0"
                style={{ fontSize: "clamp(2.2rem,5vw,4.6rem)", color: "#0D1B14", letterSpacing: "-.5px" }}
              >
                لما بتدور على دواء<br />
                <span style={{
                  background: "linear-gradient(90deg,#005c3a 0%,#00875A 25%,#00C07A 50%,#00875A 75%,#005c3a 100%)",
                  backgroundSize: "250% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmerTx 3.5s linear infinite",
                }}>لازم تلاقيه.</span>
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="text-lg leading-[2] mb-8 m-0" style={{ color: "#4A6358", maxWidth: 500 }}>
                الفرماشيه مش مجرد دليل أدوية — هي المنصة اللي بتوقّف رحلة البحث المؤلمة، وبتربط المريض بالصيدلية بالموّرد في خط واحد مباشر وشفاف.
              </p>
            </Reveal>

            <Reveal delay={230}>
              <div className="flex flex-wrap gap-3 mb-10">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-white font-[Cairo] font-bold text-sm md:text-base px-7 py-3.5 rounded-full no-underline transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#00875A,#00C07A)", boxShadow: "0 6px 24px rgba(0,135,90,.38)" }}
                >
                  <Search size={16} /> ابحث عن دوائك الآن
                </a>
                <a
                  href="#"
                  className="bg-white/55 backdrop-blur-[18px] border border-white/65 shadow-[0_8px_32px_rgba(0,135,90,0.10)] inline-flex items-center gap-2 font-medium text-sm md:text-base px-6 py-3.5 rounded-full no-underline transition-all hover:text-[#00875A]"
                  style={{ color: "#0D1B14" }}
                >
                  اعرف أكتر ←
                </a>
              </div>
            </Reveal>

            <Reveal delay={310}>
              <div className="flex flex-wrap gap-3">
                {TRUST.map((t) => {
                  const Icon = t.icon;
                  return (
                    <div key={t.text} className="bg-white/80 backdrop-blur-[14px] border border-white/90 shadow-[0_8px_32px_rgba(0,135,90,0.12),0_1px_0_rgba(255,255,255,1)_inset] flex items-center gap-2 px-3 py-2 rounded-xl">
                      <Icon size={14} color="#00875A" />
                      <span className="text-xs md:text-sm font-medium" style={{ color: "#4A6358" }}>{t.text}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* RIGHT — visual */}
          <Reveal delay={180} from="right" className="hidden lg:flex justify-center">
            <div
              className="relative w-[380px] h-[380px] xl:w-[420px] xl:h-[420px] rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg,rgba(223,245,235,.8),rgba(195,237,215,.8))",
                backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                border: "1.5px solid rgba(255,255,255,.7)",
                boxShadow: "0 0 80px rgba(0,192,122,.22),0 20px 60px rgba(0,135,90,.18),0 2px 0 rgba(255,255,255,.8) inset",
              }}
            >
              <div className="absolute w-[320px] h-[320px] xl:w-[360px] xl:h-[360px] rounded-full" style={{ border: "1.5px solid rgba(0,192,122,.25)" }} />
              <div className="absolute w-[250px] h-[250px] xl:w-[290px] xl:h-[290px] rounded-full" style={{ border: "1px solid rgba(0,135,90,.15)" }} />
              <div style={{ animation: "floatY 5.5s ease-in-out infinite", filter: "drop-shadow(0 8px 18px rgba(0,135,90,.28))" }}>
                <svg width="110" height="110" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="8" width="20" height="8" rx="4" fill="#00875A" opacity=".15"/>
                  <rect x="2" y="8" width="10" height="8" rx="4" fill="#00875A"/>
                  <rect x="12" y="8" width="10" height="8" rx="4" fill="#00C07A"/>
                </svg>
              </div>
              {[
                { Icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00875A" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, num: "+500", lbl: "دواء متاح",   cls: "top-6 -right-10" },
                { Icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00875A" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>, num: "24h", lbl: "توصيل سريع", cls: "bottom-8 -left-12" },
                { Icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00875A" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>, num: "100%", lbl: "موثوق", cls: "-left-14 top-1/2 -translate-y-1/2" },
              ].map((b) => (
                <div key={b.lbl} className={`absolute ${b.cls} bg-white/80 backdrop-blur-[14px] border border-white/90 shadow-[0_8px_32px_rgba(0,135,90,0.12),0_1px_0_rgba(255,255,255,1)_inset] rounded-2xl px-3 py-2.5 flex items-center gap-2.5 whitespace-nowrap`}>
                  <b.Icon />
                  <div>
                    <div className="font-[Cairo] font-black leading-none text-lg" style={{ color: "#00875A" }}>{b.num}</div>
                    <div className="text-xs" style={{ color: "#4A6358" }}>{b.lbl}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
