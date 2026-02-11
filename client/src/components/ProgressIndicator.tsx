import { useEffect, useState } from "react";

export default function ProgressIndicator() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(scrollTop / docHeight, 1);
      setProgress(pct);
      setVisible(scrollTop > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const km = Math.round(progress * 8000);

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl px-4 py-3 shadow-2xl">
        <div className="font-counter text-2xl text-[#FFB800] leading-none">
          {km.toLocaleString()}
        </div>
        <div className="font-mono-custom text-[9px] text-white/30 uppercase tracking-wider mt-0.5">
          km traveled
        </div>
        {/* Progress bar */}
        <div className="w-full h-[2px] bg-white/[0.06] rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FFB800] to-[#E8712B] rounded-full transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
