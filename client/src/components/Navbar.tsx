import { useState, useEffect } from "react";
import { useWebConfig } from "../contexts/WebConfigContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { enableSupportJourney } = useWebConfig();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#FFB800] to-[#E8712B] flex items-center justify-center font-counter text-lg sm:text-xl text-[#0A0A0A] group-hover:scale-110 transition-transform">
              K2K
            </div>
            <span className="font-display font-bold text-sm sm:text-base text-white/90 hidden sm:block">
              The Great Indian Road Trip
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {["journey", "route", "team", ...(enableSupportJourney ? ["sponsors"] : [])].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="font-body text-sm text-white/60 hover:text-[#FFB800] transition-colors uppercase tracking-wider"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollTo("cta")}
              className="font-display font-bold text-sm px-5 py-2 bg-gradient-to-r from-[#FFB800] to-[#E8712B] text-[#0A0A0A] rounded-full hover:scale-105 transition-transform"
            >
              Follow Us
            </button>
          </div>

          {/* Mobile — key links always visible */}
          <div className="flex md:hidden items-center gap-1">
            {["journey", "route", "team", ...(enableSupportJourney ? ["sponsors"] : [])].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="font-mono-custom text-[10px] text-white/60 hover:text-[#FFB800] transition-colors uppercase tracking-wider px-2 py-1"
              >
                {item}
              </button>
            ))}

            {/* Hamburger — only for Team + Follow Us */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 ml-1"
            >
              <span className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — remaining items */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/5 px-6 py-6">
          <button
            onClick={() => scrollTo("cta")}
            className="font-display font-bold text-base px-6 py-3 bg-gradient-to-r from-[#FFB800] to-[#E8712B] text-[#0A0A0A] rounded-full w-full"
          >
            Follow Us
          </button>
        </div>
      )}
    </nav>
  );
}
