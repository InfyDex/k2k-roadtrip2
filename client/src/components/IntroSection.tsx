import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] opacity-[0.06]" style={{
        background: "repeating-linear-gradient(to bottom, #FFB800 0px, #FFB800 16px, transparent 16px, transparent 32px)",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8">
        <p className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug text-white/90">
          {words.map((word, i) => (
            <span key={i} className="reveal-word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
