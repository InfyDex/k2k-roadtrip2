import { useInView } from "@/hooks/useInView";
import { TEAM_MEMBERS } from "@/lib/tripData";

const ROLE_COLORS: Record<string, string> = {
  "Lead Navigator & Vlogger": "#FFB800",
  "Cinematographer": "#E94560",
  "Driver & Mechanic": "#66BB6A",
  "Sound & Music": "#7EB8DA",
};

export default function TeamSection() {
  const { ref: sectionRef, isInView } = useInView(0.1);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-20 sm:py-32 overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,184,0,0.5) 1px, transparent 0)`,
        backgroundSize: "24px 24px",
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-[#FFB800]" />
            <span className="font-mono-custom text-xs text-[#FFB800] tracking-[0.2em] uppercase">
              The Crew
            </span>
            <div className="w-10 h-[2px] bg-[#FFB800]" />
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white mb-4">
            4 Engineers, 1 Mission
          </h2>
          <p className="font-body text-base sm:text-lg text-white/50 max-w-xl mx-auto">
            Software engineers by day, road warriors by passion. We write code and chase sunsets.
          </p>
        </div>

        {/* Team Grid — staggered 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {TEAM_MEMBERS.map((member, i) => {
            const roleColor = ROLE_COLORS[member.role] || "#FFB800";
            return (
              <div
                key={member.name}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-700 hover:border-white/12 ${
                  i % 2 === 1 ? "sm:mt-8" : ""
                } ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                {/* Colored top accent */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${roleColor}, transparent)` }} />

                <div className="p-6 sm:p-8">
                  {/* Number */}
                  <div className="absolute top-6 right-6 font-counter text-5xl sm:text-6xl text-white/[0.04] group-hover:text-white/[0.08] transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Emoji Avatar */}
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mb-5 group-hover:scale-110 transition-transform duration-500"
                    style={{ background: `linear-gradient(135deg, ${roleColor}25, ${roleColor}10)` }}
                  >
                    {member.emoji}
                  </div>

                  {/* Info */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="font-body text-sm mb-2" style={{ color: roleColor }}>
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="font-body text-sm text-white/50 mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                  )}

                  {/* Gear Tag */}
                  {member.gear && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1]">
                      <span className="font-mono-custom text-[10px] text-white/50 uppercase">Gear:</span>
                      <span className="font-mono-custom text-xs text-white/80">{member.gear}</span>
                    </div>
                  )}

                  {/* Decorative corner */}
                  <div
                    className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(circle at bottom right, ${roleColor}10, transparent 70%)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
