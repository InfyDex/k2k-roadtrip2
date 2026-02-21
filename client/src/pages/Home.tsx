/*
 * DESIGN: "Scroll Highway" — Immersive Road-Trip Kinetic Experience
 * - Dark theme (#0A0A0A base) with highway yellow (#FFB800) accent
 * - Fonts: Syne (display), Outfit (body), Bebas Neue (counters), JetBrains Mono (data)
 * - Scroll-driven animations via GSAP ScrollTrigger
 * - Region color transitions as you "drive" through India
 * - Full-bleed imagery with parallax and pinned sections
 */

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import RegionSection from "@/components/RegionSection";
import RouteMap from "@/components/RouteMap";
import TeamSection from "@/components/TeamSection";
import ContentStrategy from "@/components/ContentStrategy";
import SponsorSection from "@/components/SponsorSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ProgressIndicator from "@/components/ProgressIndicator";
import { REGIONS } from "@/lib/tripData";
import { useWebConfig } from "@/contexts/WebConfigContext";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { enableSupportJourney } = useWebConfig();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      <ProgressIndicator />

      {/* Hero */}
      <HeroSection />

      {/* Intro / Journey Overview */}
      <IntroSection />

      {/* Region Sections — paired half-page layout */}
      <div id="regions">
        {/* Pair 1: North + West Coast — each takes half the viewport */}
        <div className="lg:h-screen lg:flex lg:flex-col lg:snap-start">
          <div className="lg:flex-1 lg:min-h-0">
            <RegionSection region={REGIONS[0]} index={0} variant="half" />
          </div>
          <div className="lg:flex-1 lg:min-h-0">
            <RegionSection region={REGIONS[1]} index={1} variant="half" />
          </div>
        </div>

        {/* Pair 2: Deep South + East Coast */}
        <div className="lg:h-screen lg:flex lg:flex-col lg:snap-start">
          <div className="lg:flex-1 lg:min-h-0">
            <RegionSection region={REGIONS[2]} index={2} variant="half" />
          </div>
          <div className="lg:flex-1 lg:min-h-0">
            <RegionSection region={REGIONS[3]} index={3} variant="half" />
          </div>
        </div>

        {/* Solo: The Return — compact card like the others */}
        <RegionSection region={REGIONS[4]} index={4} variant="half" />
      </div>

      {/* Route Map */}
      <RouteMap />

      {/* Team */}
      <TeamSection />

      {/* Content Strategy */}
      <ContentStrategy />

      {/* Sponsors */}
      {enableSupportJourney && <SponsorSection />}

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
