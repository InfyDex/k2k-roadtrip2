import { useInView } from "@/hooks/useInView";

const PLATFORMS = [
  {
    name: "YouTube",
    icon: "▶",
    color: "#FF0000",
    content: "Weekly 15-min cinematic vlogs + daily shorts",
    target: "50K+ subscribers",
    format: "4K Cinematic",
  },
  {
    name: "Instagram",
    icon: "◎",
    color: "#E1306C",
    content: "Daily reels, stories, carousel posts",
    target: "100K+ reach per reel",
    format: "Vertical 9:16",
  },
  {
    name: "X / Twitter",
    icon: "𝕏",
    color: "#1DA1F2",
    content: "Real-time updates, threads, polls",
    target: "Viral threads",
    format: "Text + Photo",
  },
  {
    name: "Blog",
    icon: "✍",
    color: "#FFB800",
    content: "In-depth travel guides, budget breakdowns",
    target: "SEO-optimized",
    format: "Long-form",
  },
];

const CONTENT_TYPES = [
  { type: "Cinematic Vlogs", freq: "Weekly", desc: "15-min episodes with storytelling arcs" },
  { type: "Daily Shorts", freq: "Daily", desc: "60-sec highlights from each day" },
  { type: "Instagram Reels", freq: "2x Daily", desc: "Trending audio + stunning visuals" },
  { type: "Behind the Scenes", freq: "Daily", desc: "Raw, unfiltered moments" },
  { type: "Sponsor Features", freq: "Per deal", desc: "Authentic product integration" },
  { type: "Travel Guides", freq: "Weekly", desc: "Budget tips, route guides, reviews" },
];

export default function ContentStrategy() {
  const { ref: sectionRef, isInView } = useInView(0.05);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-32 overflow-hidden bg-[#0A0A0A]"
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,184,0,0.8) 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className={`text-center mb-14 sm:mb-20 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-[#FFB800]" />
            <span className="font-mono-custom text-xs text-[#FFB800] tracking-[0.2em] uppercase">
              Content Strategy
            </span>
            <div className="w-10 h-[2px] bg-[#FFB800]" />
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white mb-4">
            Multi-Platform Storytelling
          </h2>
          <p className="font-body text-base sm:text-lg text-white/50 max-w-2xl mx-auto">
            A comprehensive content engine designed to maximize reach, engagement, and sponsor ROI
            across every major platform.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14 sm:mb-20">
          {PLATFORMS.map((p, i) => (
            <div
              key={p.name}
              className={`group p-5 sm:p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-600 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${p.color}20`, color: p.color }}
                >
                  {p.icon}
                </div>
                <div>
                  <div className="font-display font-bold text-base text-white">{p.name}</div>
                  <div className="font-mono-custom text-[10px] uppercase tracking-wider" style={{ color: p.color }}>
                    {p.format}
                  </div>
                </div>
              </div>
              <p className="font-body text-sm text-white/60 mb-3 leading-relaxed">{p.content}</p>
              <div className="font-counter text-lg" style={{ color: p.color }}>
                {p.target}
              </div>
            </div>
          ))}
        </div>

        {/* Content Calendar Table */}
        <div className={`transition-all duration-700 delay-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="font-mono-custom text-xs text-[#FFB800] tracking-[0.2em] uppercase mb-6">
            Content Calendar
          </div>
          <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-3 gap-4 px-5 sm:px-6 py-3 bg-white/[0.04] border-b border-white/[0.08]">
              <div className="font-mono-custom text-[10px] text-white/50 uppercase tracking-wider">Type</div>
              <div className="font-mono-custom text-[10px] text-white/50 uppercase tracking-wider">Frequency</div>
              <div className="font-mono-custom text-[10px] text-white/50 uppercase tracking-wider">Description</div>
            </div>
            {CONTENT_TYPES.map((item, i) => (
              <div
                key={item.type}
                className={`grid grid-cols-3 gap-4 px-5 sm:px-6 py-4 ${
                  i < CONTENT_TYPES.length - 1 ? "border-b border-white/[0.05]" : ""
                } hover:bg-white/[0.03] transition-all duration-500 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
                style={{ transitionDelay: `${600 + i * 80}ms` }}
              >
                <div className="font-display font-bold text-sm text-white/90">{item.type}</div>
                <div className="font-counter text-base text-[#FFB800]">{item.freq}</div>
                <div className="font-body text-sm text-white/60">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Stats */}
        <div className="mt-14 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: "18-35", label: "Age Group", sub: "Primary" },
            { value: "Tech", label: "Audience", sub: "Savvy" },
            { value: "Pan-India", label: "Reach", sub: "+ Global" },
            { value: "High", label: "Engagement", sub: "Intent" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center p-4 sm:p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-600 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${900 + i * 100}ms` }}
            >
              <div className="font-counter text-2xl sm:text-3xl text-[#FFB800]">{stat.value}</div>
              <div className="font-body text-sm text-white/70 mt-1">{stat.label}</div>
              <div className="font-mono-custom text-[10px] text-white/40 uppercase">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
