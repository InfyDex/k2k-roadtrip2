import { useInView } from "@/hooks/useInView";
import { toast } from "sonner";

const SPONSOR_CATEGORIES = [
  {
    title: "Title Sponsor",
    tier: "Presenting Partner",
    color: "#FFB800",
    description: "Your brand at the forefront of India's most epic road trip. Logo on the car, in every video, and across all content.",
    benefits: ["Car branding & all content", "Dedicated video features", "Social media takeovers", "Website hero placement"],
    value: "₹5L+",
    highlight: true,
  },
  {
    title: "Gold Sponsors",
    tier: "Journey Partners",
    color: "#E8712B",
    description: "Regular visibility across our content with product integration and authentic storytelling around your brand.",
    benefits: ["Regular mentions in vlogs", "Product placement", "Logo on apparel", "Instagram stories"],
    value: "₹2-5L",
    highlight: false,
  },
  {
    title: "Product Sponsors",
    tier: "Gear Partners",
    color: "#7EB8DA",
    description: "Provide gear, equipment, or supplies and get honest, authentic reviews and features throughout the journey.",
    benefits: ["Product reviews on camera", "Gear showcase reels", "Honest testimonials", "Social media features"],
    value: "In-Kind",
    highlight: false,
  },
];

const targetBrands = [
  "Mahindra", "MakeMyTrip", "GoPro", "Decathlon", "Red Bull",
  "boAt", "DJI", "OYO", "Zostel", "Indian Oil",
  "CRED", "Wildcraft", "Paper Boat", "Samsung", "Castrol",
];

const deliverables = [
  { icon: "🎬", title: "Video Content", desc: "40+ vlogs & 200+ shorts" },
  { icon: "📸", title: "Photo Content", desc: "5,000+ high-res photos" },
  { icon: "📱", title: "Social Posts", desc: "300+ posts across platforms" },
  { icon: "🌐", title: "Website Feature", desc: "Permanent brand placement" },
  { icon: "📊", title: "Analytics Report", desc: "Detailed reach & ROI data" },
  { icon: "🤝", title: "Brand Events", desc: "Meet & greet opportunities" },
];

export default function SponsorSection() {
  const { ref: sectionRef, isInView } = useInView(0.05);

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="relative py-20 sm:py-32 overflow-hidden bg-[#0A0A0A]"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-[#FFB800]" />
            <span className="font-mono-custom text-xs text-[#FFB800] tracking-[0.2em] uppercase">
              Partner With Us
            </span>
            <div className="w-10 h-[2px] bg-[#FFB800]" />
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white mb-4">
            Sponsor the Journey
          </h2>
          <p className="font-body text-base sm:text-lg text-white/50 max-w-2xl mx-auto">
            Align your brand with adventure, authenticity, and the spirit of young India.
            Reach a tech-savvy audience of 18-35 year olds across every major platform.
          </p>
        </div>

        {/* Sponsor Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-14 sm:mb-20">
          {SPONSOR_CATEGORIES.map((cat, i) => (
            <div
              key={cat.title}
              className={`group relative overflow-visible p-6 sm:p-8 rounded-2xl border transition-all duration-700 ${cat.highlight
                ? "border-[#FFB800]/30 bg-[#FFB800]/[0.05] hover:bg-[#FFB800]/[0.08]"
                : "border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06]"
                } ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Popular badge for title sponsor */}
              {cat.highlight && (
                <div className="absolute -top-3 left-6 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-[#FFB800] to-[#E8712B] text-[#0A0A0A] font-mono-custom text-[10px] font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              {/* Colored top bar */}
              <div className="h-[3px] absolute top-0 left-0 right-0 rounded-t-2xl" style={{ backgroundColor: cat.color }} />

              {/* Value Badge */}
              <div
                className="absolute top-6 right-6 px-3 py-1.5 rounded-full text-xs font-mono-custom font-bold"
                style={{ backgroundColor: `${cat.color}25`, color: cat.color }}
              >
                {cat.value}
              </div>

              <div className="font-mono-custom text-[10px] uppercase tracking-wider mb-2 mt-2" style={{ color: cat.color }}>
                {cat.tier}
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3">
                {cat.title}
              </h3>
              <p className="font-body text-sm text-white/60 mb-6 leading-relaxed">
                {cat.description}
              </p>

              <div className="space-y-3">
                {cat.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="font-body text-sm text-white/80">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => toast("Email us at hello@k2ktravel.in for sponsorship details!")}
                className="mt-8 w-full py-3 rounded-xl font-display font-bold text-sm transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
                style={{
                  backgroundColor: `${cat.color}20`,
                  color: cat.color,
                  border: `1px solid ${cat.color}40`,
                }}
              >
                Get in Touch
              </button>
            </div>
          ))}
        </div>

        {/* Deliverables Grid */}
        <div className={`mb-14 sm:mb-20 transition-all duration-700 delay-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="font-mono-custom text-xs text-[#FFB800] tracking-[0.2em] uppercase mb-6 text-center">
            What Sponsors Get
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {deliverables.map((d, i) => (
              <div
                key={d.title}
                className={`p-4 sm:p-5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${600 + i * 80}ms` }}
              >
                <div className="text-2xl mb-2">{d.icon}</div>
                <div className="font-display font-bold text-sm text-white/90">{d.title}</div>
                <div className="font-body text-xs text-white/50 mt-1">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Brands Cloud */}
        <div className={`text-center transition-all duration-700 delay-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="font-mono-custom text-xs text-white/40 uppercase tracking-[0.2em] mb-6">
            Brands we'd love to work with
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
            {targetBrands.map((brand, i) => (
              <div
                key={brand}
                className={`px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.03] hover:border-[#FFB800]/40 hover:bg-[#FFB800]/5 transition-all duration-500 cursor-default ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                style={{ transitionDelay: `${800 + i * 40}ms` }}
              >
                <span className="font-body text-sm text-white/70">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
