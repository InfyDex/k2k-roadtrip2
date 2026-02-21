import { useWebConfig } from "../contexts/WebConfigContext";

export default function Footer() {
  const { footerDateRange, enableSupportJourney } = useWebConfig();
  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.04] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFB800] to-[#E8712B] flex items-center justify-center font-counter text-sm text-[#0A0A0A]">
              K2K
            </div>
            <div>
              <div className="font-display font-bold text-sm text-white/80">
                The Great Indian Road Trip
              </div>
              <div className="font-mono-custom text-[10px] text-white/30">
                Kashmir to Kanyakumari · 2026
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {["Journey", "Route", "Team", ...(enableSupportJourney ? ["Sponsors"] : [])].map((link) => (
              <button
                key={link}
                onClick={() =>
                  document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-body text-xs text-white/30 hover:text-[#FFB800] transition-colors uppercase tracking-wider"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Credits */}
          <div className="font-mono-custom text-[10px] text-white/20 text-center sm:text-right">
            <div>Built with passion by 4 engineers</div>
            <div className="mt-0.5">{footerDateRange || "Coming Soon"}</div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-mono-custom text-[10px] text-white/15">
            41 days · 15+ states · 8,000+ km · ∞ memories
          </div>
          <div className="font-mono-custom text-[10px] text-white/15">
            Made in India 🇮🇳
          </div>
        </div>
      </div>
    </footer>
  );
}
