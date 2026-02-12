import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const KASHMIR_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/sIJZqxHALNnZD5CQIOXYMu/sandbox/7xSdxXFkScmM2aUGE7TtJ5-img-1_1770846737000_na1fn_aGVyby1rYXNobWly.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc0lKWnF4SEFMTm5aRDVDUUlPWFlNdS9zYW5kYm94Lzd4U2R4WEZrU2NtTTJhVUdFN1R0SjUtaW1nLTFfMTc3MDg0NjczNzAwMF9uYTFmbl9hR1Z5YnkxcllYTm9iV2x5LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VGkApkDpJAKQB4UxnnJhsi2TVW7glzzBu7XC7UFnbLMMbsJtVFNGKu2TRmWxQ7EMUP9eDmhkjuo9Qv5zIeBaFrnSOjuV1IFMHAZmhn1m3m~llLtTNabdfUhA8WBLdsmpA6jOPeT4HzDrGXYruNebPQ8g~BUHf9p0rdSXYqtnX9s77vQtVq0kTHxu1BLIQEfL11-Culysu~6On6GNXJkFMlvtap7rFrAhBbHLQ2SCNLiJ-6WTcVB0Gu0ZuJGTyX6y04mIuIXT~vftAC43jDtT8qKN4R0nJLlGkdRQrL-7gNYInJ0la4uZid31A-B9LmaPF3KivrHUBhRiJlCviAINVA__";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
      });
      gsap.from(statsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.9,
      });
      gsap.from(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 0.6,
        delay: 1.3,
      });

      // Parallax on scroll
      gsap.to(".hero-image", {
        yPercent: 30,
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Fade out content on scroll
      gsap.to(".hero-content", {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% top",
          end: "60% top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[100dvh] min-h-[600px] overflow-hidden"
    >
      {/* Background Image */}
      <div className="hero-image absolute inset-0">
        <img
          src={KASHMIR_IMG}
          alt="Kashmir mountain highway"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-[#0A0A0A]/20 to-[#0A0A0A]" />
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 h-full flex flex-col justify-end pb-24 sm:pb-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl">
          {/* Tag */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-12 h-[2px] bg-[#FFB800]" />
            <span className="font-mono-custom text-xs sm:text-sm text-[#FFB800] tracking-[0.2em] uppercase">
              March 23 — May 2, 2026
            </span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-4 sm:mb-6"
          >
            Kashmir
            <br />
            <span className="text-gradient-highway">to Kanyakumari</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-body text-base sm:text-lg md:text-xl text-white/70 max-w-xl mb-8 sm:mb-10 leading-relaxed"
          >
            Four software engineers. One car. 41 days. 8,000+ kilometers across
            15+ states. The ultimate Indian road trip.
          </p>

          {/* Stats Bar */}
          <div
            ref={statsRef}
            className="flex flex-wrap gap-6 sm:gap-10"
          >
            {[
              { value: "41", label: "Days" },
              { value: "15+", label: "States" },
              { value: "8K+", label: "Kilometers" },
              { value: "4", label: "Travelers" },
            ].map((stat) => (
              <div key={stat.label} className="text-left">
                <div className="font-counter text-3xl sm:text-4xl md:text-5xl text-[#FFB800] leading-none">
                  {stat.value}
                </div>
                <div className="font-mono-custom text-[10px] sm:text-xs text-white/40 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator — outside hero-content to avoid overlap */}
      <div
        ref={scrollIndicatorRef}
        className="absolute z-20 bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono-custom text-[10px] text-white/30 tracking-[0.3em] uppercase">
          Scroll to drive
        </span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-[#FFB800] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
