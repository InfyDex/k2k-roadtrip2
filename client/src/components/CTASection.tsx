import { useInView } from "@/hooks/useInView";
import { toast } from "sonner";
import { useWebConfig } from "../contexts/WebConfigContext";

const KANYAKUMARI_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/sIJZqxHALNnZD5CQIOXYMu/sandbox/7xSdxXFkScmM2aUGE7TtJ5-img-5_1770846731000_na1fn_c2VjdGlvbi1rYW55YWt1bWFyaQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc0lKWnF4SEFMTm5aRDVDUUlPWFlNdS9zYW5kYm94Lzd4U2R4WEZrU2NtTTJhVUdFN1R0SjUtaW1nLTVfMTc3MDg0NjczMTAwMF9uYTFmbl9jMlZqZEdsdmJpMXJZVzU1WVd0MWJXRnlhUS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cwAzmn6-JwhELCizU~ppEkOGI-gs61IXGS0IhtxB3imVO9z937t5f-IWV4uWahj8eQp5f8M2B~D6h7o93Jj1SgruMvh~plg26-Z5LoXINLHkHdnfcL41~heA6-JOtOLvlDC-FtMpGn5jWo-rpg~ZhX-uAwjFE5bM09K4aX3h1Pj8z1CzJoOjEdCPmKmi~woe2kaFziVo3r8xMV22nzLN9Cbh5MP5HIPZdb3cRCIvVocvlCUVCRnax1ZBA7cPFO5xP~tIgp6qutrWnkgkiMhtkaMmnLn~veHSny0iMuFLWIjN~92BtLt7QwDg9mnWL59WLJFyzlUd4AGgpxPmrkxH2A__";

export default function CTASection() {
  const { ref: sectionRef, isInView } = useInView(0.15);
  const { enableSupportJourney } = useWebConfig();

  return (
    <section id="cta" ref={sectionRef} className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={KANYAKUMARI_IMG}
          alt="Kanyakumari sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-8 py-20">
        <div className={`font-counter text-6xl sm:text-8xl text-[#FFB800]/20 mb-4 transition-all duration-700 ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          K2K
        </div>
        <h2 className={`font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight transition-all duration-700 delay-150 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Follow the Journey
        </h2>
        <p className={`font-body text-base sm:text-lg text-white/60 mb-10 max-w-lg mx-auto leading-relaxed transition-all duration-700 delay-300 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Be part of the adventure. Follow us on social media for daily updates,
          behind-the-scenes content, and the most stunning visuals from across India.
        </p>

        {/* Social Links */}
        <div className={`flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 transition-all duration-700 delay-[450ms] ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {[
            { name: "YouTube", icon: "▶", color: "#FF0000" },
            { name: "Instagram", icon: "◎", color: "#E1306C" },
            { name: "X / Twitter", icon: "𝕏", color: "#1DA1F2" },
          ].map((social) => (
            <button
              key={social.name}
              onClick={() => toast("Coming soon! Follow us when we launch.")}
              className="group flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/20"
            >
              <span className="text-lg" style={{ color: social.color }}>{social.icon}</span>
              <span className="font-body text-sm text-white/80 group-hover:text-white transition-colors">
                {social.name}
              </span>
            </button>
          ))}
        </div>

        {/* Sponsor CTA */}
        {enableSupportJourney && (
          <div className={`pt-6 border-t border-white/10 transition-all duration-700 delay-[600ms] ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="font-body text-sm text-white/40 mb-4">
              Want to sponsor this journey?
            </p>
            <button
              onClick={() => toast("Email us at hello@k2ktravel.in")}
              className="font-display font-bold text-base px-8 py-3.5 bg-gradient-to-r from-[#FFB800] to-[#E8712B] text-[#0A0A0A] rounded-full hover:scale-105 transition-transform shadow-lg shadow-[#FFB800]/20"
            >
              Become a Sponsor
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
