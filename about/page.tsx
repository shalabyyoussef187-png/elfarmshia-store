import { useState } from "react";

// keyframes only (no utility classes)
import "./styles/about.css";

// shared components
import Ticker      from "./components/Ticker";
import FloatingBtn from "./components/FloatingBtn";
import MapModal    from "./components/MapModal";

// sections
import HeroSection     from "./components/sections/HeroSection";
import StorySection    from "./components/sections/StorySection";
import HowSection      from "./components/sections/HowSection";
import ValuesSection   from "./components/sections/ValuesSection";
import AudienceSection from "./components/sections/AudienceSection";
import FounderSection  from "./components/sections/FounderSection";
import StatsSection    from "./components/sections/StatsSection";
import CtaSection      from "./components/sections/CtaSection";
import FooterSection   from "./components/sections/FooterSection";

export default function AboutPage() {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <Ticker />
      <StorySection />
      <HowSection />
      <ValuesSection />
      <AudienceSection />
      <FounderSection />
      <StatsSection />
      <CtaSection />
      <FooterSection onMapOpen={() => setMapOpen(true)} />
      <FloatingBtn onClick={() => setMapOpen(true)} />
      <MapModal open={mapOpen} onClose={() => setMapOpen(false)} />
    </div>
  );
}
