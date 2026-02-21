import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWebConfig } from "../contexts/WebConfigContext";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { preTripDate, journeyDate, postTripDate } = useWebConfig();

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
            { phase: "Pre-Trip", date: preTripDate || "Dates TBD", desc: "Planning, sponsorship outreach, gear prep, content strategy", icon: "📋" },
            { phase: "The Journey", date: journeyDate || "Dates TBD", desc: "41 days on the road, daily content creation, living the dream", icon: "🚗" },
            { phase: "Post-Trip", date: postTripDate || "Dates TBD", desc: "Documentary edit, sponsor deliverables, community building", icon: "🎬" },
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
      </div>
    </section>
  );
}
