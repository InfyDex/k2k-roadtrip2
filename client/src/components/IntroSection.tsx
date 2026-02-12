import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each word of the big statement
      const words = sectionRef.current?.querySelectorAll(".reveal-word");
      if (words) {
        words.forEach((word, i) => {
          gsap.from(word, {
            opacity: 0.08,
            y: 10,
            duration: 0.5,
            scrollTrigger: {
              trigger: word,
              start: `top ${85 - i * 1.5}%`,
              end: `top ${65 - i * 1.5}%`,
              scrub: 1,
            },
          });
        });
      }

      // Animate the timeline items
      gsap.from(".intro-timeline-item", {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".intro-timeline",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate budget card
      gsap.from(".budget-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".budget-card",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statement = "We are four software engineers who decided to trade our keyboards for the open road. 41 days. One car. Every corner of India.";
  const words = statement.split(" ");

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-24 sm:py-40 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Decorative highway line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] opacity-[0.06]" style={{
        background: "repeating-linear-gradient(to bottom, #FFB800 0px, #FFB800 16px, transparent 16px, transparent 32px)",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8">
        {/* Big Statement */}
        <div className="mb-20 sm:mb-28">
          <p className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug text-white/90">
            {words.map((word, i) => (
              <span key={i} className="reveal-word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Timeline */}
        <div className="intro-timeline space-y-0">
          {[
            { phase: "Pre-Trip", date: "Feb — Mar 2026", desc: "Planning, sponsorship outreach, gear prep, content strategy", icon: "📋" },
            { phase: "The Journey", date: "Mar 23 — Apr 28", desc: "41 days on the road, daily content creation, living the dream", icon: "🚗" },
            { phase: "Post-Trip", date: "May 2026+", desc: "Documentary edit, sponsor deliverables, community building", icon: "🎬" },
          ].map((item, i) => (
            <div key={item.phase} className="intro-timeline-item flex gap-4 sm:gap-6 py-6 sm:py-8 border-t border-white/[0.06]">
              <div className="shrink-0 w-20 sm:w-28">
                <div className="font-counter text-xl sm:text-2xl text-[#FFB800]">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-display font-bold text-lg sm:text-xl text-white">
                    {item.phase}
                  </span>
                </div>
                <div className="font-mono-custom text-xs text-[#FFB800]/60 mb-2">
                  {item.date}
                </div>
                <p className="font-body text-sm sm:text-base text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Budget — Breakdown + Self vs Sponsored Slider */}
        <div className="budget-card mt-16 sm:mt-20 p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <div className="font-mono-custom text-xs text-[#FFB800] tracking-[0.2em] uppercase mb-6">
            Budget Breakdown
          </div>

          {/* Category breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "Fuel", value: "₹80K", pct: "15%" },
              { label: "Rooms", value: "₹1.6L", pct: "30%" },
              { label: "Food", value: "₹2.4L", pct: "45%" },
              { label: "Misc", value: "₹50K", pct: "10%" },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-counter text-xl sm:text-2xl text-white/90">{item.value}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-body text-xs text-white/40">{item.label}</span>
                  <span className="font-mono-custom text-[10px] text-[#FFB800]/40">{item.pct}</span>
                </div>
                {/* Mini bar */}
                <div className="w-full h-1 bg-white/[0.04] rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FFB800] to-[#E8712B] rounded-full"
                    style={{ width: item.pct }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-baseline justify-between">
            <span className="font-body text-sm text-white/40">Total Budget</span>
            <span className="font-counter text-2xl sm:text-3xl text-[#FFB800]">₹5,30,200</span>
          </div>

          {/* Self vs Sponsored Slider */}
          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            <div className="font-mono-custom text-[10px] text-white/40 tracking-[0.15em] uppercase mb-3">
              Funding Source
            </div>
            <div className="relative mb-4">
              <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FFB800] to-[#E8712B]"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <div>
                  <span className="font-counter text-sm text-[#FFB800]">₹5,30,200</span>
                  <span className="font-mono-custom text-[9px] text-white/30 ml-1.5">Self</span>
                </div>
                <div>
                  <span className="font-counter text-sm text-white/20">₹0</span>
                  <span className="font-mono-custom text-[9px] text-white/20 ml-1.5">Sponsored</span>
                </div>
              </div>
            </div>

            {/* Sponsor CTA */}
            <a
              href="#sponsors"
              className="group flex items-center justify-between p-3 sm:p-4 rounded-xl border border-[#FFB800]/20 bg-gradient-to-r from-[#FFB800]/[0.06] to-transparent hover:from-[#FFB800]/[0.12] transition-all duration-300"
            >
              <div>
                <div className="font-display font-bold text-sm sm:text-base text-white/90">
                  Want to increase brand visibility?
                </div>
                <div className="font-body text-[11px] sm:text-xs text-[#FFB800]/70 mt-0.5">
                  Reach 50K+ engaged viewers across India
                </div>
              </div>
              <div className="shrink-0 ml-3 sm:ml-4 px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-[#FFB800] to-[#E8712B] font-mono-custom text-[10px] sm:text-xs font-bold text-[#0A0A0A] uppercase tracking-wider group-hover:scale-105 transition-transform whitespace-nowrap">
                Become a Sponsor →
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
