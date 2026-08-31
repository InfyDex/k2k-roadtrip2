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
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ProgressIndicator from "@/components/ProgressIndicator";
import { REGIONS } from "@/lib/tripData";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export default function Home() {
  useEffect(() => {
    // Desktop mouse only. Android Chrome touch + Lenis snaps the first swipe back up.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(onTick);
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

      {/* Region chapters — full-width vertical timelines */}
      <div id="regions" className="relative z-10">
        {REGIONS.map((region, index) => (
          <RegionSection key={region.id} region={region} index={index} />
        ))}
      </div>

      {/* Route Map */}
      <RouteMap />

      {/* Team */}
      <TeamSection />

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
