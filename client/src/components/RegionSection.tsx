import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TripRegion } from "@/lib/tripData";

gsap.registerPlugin(ScrollTrigger);

const REGION_IMAGES: Record<string, string> = {
  north: "https://private-us-east-1.manuscdn.com/sessionFile/sIJZqxHALNnZD5CQIOXYMu/sandbox/7xSdxXFkScmM2aUGE7TtJ5-img-1_1770846737000_na1fn_aGVyby1rYXNobWly.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc0lKWnF4SEFMTm5aRDVDUUlPWFlNdS9zYW5kYm94Lzd4U2R4WEZrU2NtTTJhVUdFN1R0SjUtaW1nLTFfMTc3MDg0NjczNzAwMF9uYTFmbl9hR1Z5YnkxcllYTm9iV2x5LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VGkApkDpJAKQB4UxnnJhsi2TVW7glzzBu7XC7UFnbLMMbsJtVFNGKu2TRmWxQ7EMUP9eDmhkjuo9Qv5zIeBaFrnSOjuV1IFMHAZmhn1m3m~llLtTNabdfUhA8WBLdsmpA6jOPeT4HzDrGXYruNebPQ8g~BUHf9p0rdSXYqtnX9s77vQtVq0kTHxu1BLIQEfL11-Culysu~6On6GNXJkFMlvtap7rFrAhBbHLQ2SCNLiJ-6WTcVB0Gu0ZuJGTyX6y04mIuIXT~vftAC43jDtT8qKN4R0nJLlGkdRQrL-7gNYInJ0la4uZid31A-B9LmaPF3KivrHUBhRiJlCviAINVA__",
  west: "https://private-us-east-1.manuscdn.com/sessionFile/sIJZqxHALNnZD5CQIOXYMu/sandbox/7xSdxXFkScmM2aUGE7TtJ5-img-2_1770846732000_na1fn_c2VjdGlvbi1yYWphc3RoYW4.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc0lKWnF4SEFMTm5aRDVDUUlPWFlNdS9zYW5kYm94Lzd4U2R4WEZrU2NtTTJhVUdFN1R0SjUtaW1nLTJfMTc3MDg0NjczMjAwMF9uYTFmbl9jMlZqZEdsdmJpMXlZV3BoYzNSb1lXNC5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=UJXCYi5OxRg1zGOSQRRJUWCsNlorzswKg27CpEJW~TBtMpLan8FfrzExLxQFLIjDDT6gvxMck0H8ou90ebKcNvRLppguiZjaJi7UkSDXzjy6ngUFhaF8iC4qyiD~kqQo-q5-1gzaWFV4aLxpw20RGO~gUD5eaENslGOsfGDgfk3Ra4dVenXu6-crSy61igEHNFVP5BVtJvhkElR-ph-CbOc75wRrpZSrB2rDdgdaQJUIjWHiv5Zu8qMNJ8Z~oZoIBocPhcl2y3ScypBFHolAAZ8RZIcUPFGDAwd~89bn5IEyicwGmscvUGl7cxeodHxsMqeTtxhBRH-DGgRYnyHRVw__",
  south: "https://private-us-east-1.manuscdn.com/sessionFile/sIJZqxHALNnZD5CQIOXYMu/sandbox/7xSdxXFkScmM2aUGE7TtJ5-img-4_1770846731000_na1fn_c2VjdGlvbi1rZXJhbGE.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc0lKWnF4SEFMTm5aRDVDUUlPWFlNdS9zYW5kYm94Lzd4U2R4WEZrU2NtTTJhVUdFN1R0SjUtaW1nLTRfMTc3MDg0NjczMTAwMF9uYTFmbl9jMlZqZEdsdmJpMXJaWEpoYkdFLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=CKfioRoiyfqQJBZblII02WOxJT2yeoGLXiFtadJBT0jHPbToITEppIa8iI9fkbOLJFbB8QCun-DqGJQ~Jbph803o7UMDYQ6qGcXRKnnDf8hnAqdYTfInaib5ejYCyQXAGwnsIcfdTOHD3N1S4JagbfuE5K7wnDtcWLm8NvBdvOcZyOPUPv3Wt8yiBN3MdfRuEhdLyb2RvJz3NR6o4iUt6IodfF~WwIxr29CPJvPTQ98Gol0dQyh6EelQlq7LYXVEffhRqme8htHJwENZw6g9EtTY4vek39io9SMfouY3E52gr1Nva0Hw2cCiJgV-FREq4YQ0E~yUE89if2Gmu7sIYw__",
  east: "https://private-us-east-1.manuscdn.com/sessionFile/sIJZqxHALNnZD5CQIOXYMu/sandbox/7xSdxXFkScmM2aUGE7TtJ5-img-3_1770846736000_na1fn_c2VjdGlvbi1nb2EtY29hc3Q.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc0lKWnF4SEFMTm5aRDVDUUlPWFlNdS9zYW5kYm94Lzd4U2R4WEZrU2NtTTJhVUdFN1R0SjUtaW1nLTNfMTc3MDg0NjczNjAwMF9uYTFmbl9jMlZqZEdsdmJpMW5iMkV0WTI5aGMzUS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=IQu0vfmz5F1Tea5uTlpeo2NM2vaXZaeGIj~BO0mxlsvnTUXyJDavB0LcuqW7gJPkY5vinPW1k6gpOfNuUm0H-LEn8~CPKMVz55rnRnYP3vYnznDT~dxZj-Pt3skvm~fZCmedShvl2q13FVNxSSRJn79H2RF3ZXkHgN7YwC82KAcXebYt-O9HYKN~zZMZtpIjZrKAKbejZNB~y45q1E3ca9zhUZOuWw2Agy68luzpSSeJu9kJvWzXh1bpGks0H5T3A9-UcoUnTQXyQKG3cfZb1MaUjNP2s4xntCB2zDMp0~X0bKL6LbjEFvVWo~yoxyPV1gHD0-Bonx-9vSbD4Ytbxw__",
  return: "https://private-us-east-1.manuscdn.com/sessionFile/sIJZqxHALNnZD5CQIOXYMu/sandbox/7xSdxXFkScmM2aUGE7TtJ5-img-5_1770846731000_na1fn_c2VjdGlvbi1rYW55YWt1bWFyaQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc0lKWnF4SEFMTm5aRDVDUUlPWFlNdS9zYW5kYm94Lzd4U2R4WEZrU2NtTTJhVUdFN1R0SjUtaW1nLTVfMTc3MDg0NjczMTAwMF9uYTFmbl9jMlZqZEdsdmJpMXJZVzU1WVd0MWJXRnlhUS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=cwAzmn6-JwhELCizU~ppEkOGI-gs61IXGS0IhtxB3imVO9z937t5f-IWV4uWahj8eQp5f8M2B~D6h7o93Jj1SgruMvh~plg26-Z5LoXINLHkHdnfcL41~heA6-JOtOLvlDC-FtMpGn5jWo-rpg~ZhX-uAwjFE5bM09K4aX3h1Pj8z1CzJoOjEdCPmKmi~woe2kaFziVo3r8xMV22nzLN9Cbh5MP5HIPZdb3cRCIvVocvlCUVCRnax1ZBA7cPFO5xP~tIgp6qutrWnkgkiMhtkaMmnLn~veHSny0iMuFLWIjN~92BtLt7QwDg9mnWL59WLJFyzlUd4AGgpxPmrkxH2A__",
};

interface RegionSectionProps {
  region: TripRegion;
  index: number;
}

export default function RegionSection({ region, index }: RegionSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only pin on large screens
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        // Pin the image while content scrolls over it
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: imageRef.current,
          pinSpacing: false,
        });

        // Parallax on the image
        gsap.to(`.region-img-${region.id}`, {
          scale: 1.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    // Animate content elements on all screen sizes
    const ctx2 = gsap.context(() => {
      const items = contentRef.current?.querySelectorAll(".animate-in");
      if (items) {
        items.forEach((item) => {
          gsap.from(item, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }
    }, sectionRef);

    return () => {
      mm.revert();
      ctx2.revert();
    };
  }, [region.id]);

  const isEven = index % 2 === 0;
  const imgSrc = REGION_IMAGES[region.id] || "";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen lg:min-h-[200vh]"
      style={{ backgroundColor: region.bgColor }}
    >
      {/* Image — full width on mobile, half on desktop */}
      <div
        ref={imageRef}
        className={`relative lg:absolute lg:top-0 ${isEven ? "lg:left-0" : "lg:right-0"} w-full lg:w-1/2 h-[50vh] lg:h-screen overflow-hidden`}
      >
        <div className={`region-img-${region.id} w-full h-full`}>
          <img
            src={imgSrc}
            alt={region.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Desktop gradient fade */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background: isEven
                ? `linear-gradient(to right, transparent 40%, ${region.bgColor})`
                : `linear-gradient(to left, transparent 40%, ${region.bgColor})`,
            }}
          />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background: `linear-gradient(to bottom, ${region.bgColor} 0%, transparent 15%, transparent 85%, ${region.bgColor} 100%)`,
            }}
          />
          {/* Mobile gradient fade */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              background: `linear-gradient(to bottom, transparent 40%, ${region.bgColor})`,
            }}
          />
        </div>

        {/* Day Counter - pinned with image */}
        <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? "right-4 lg:right-16" : "left-4 lg:left-16"}`}>
          <div className="font-counter text-[80px] sm:text-[120px] lg:text-[200px] leading-none opacity-10" style={{ color: region.textColor }}>
            {String(region.stops[0]?.day || 0).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Scrolling Content Half */}
      <div
        ref={contentRef}
        className={`relative z-10 ${isEven ? "lg:ml-auto" : "lg:mr-auto"} w-full lg:w-1/2 min-h-screen`}
      >
        {/* Spacer for first viewport on desktop */}
        <div className="hidden lg:block h-[30vh]" />

        {/* Region Header */}
        <div className="px-4 sm:px-6 lg:px-16 py-8">
          <div className="animate-in flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px]" style={{ backgroundColor: region.accentColor }} />
            <span className="font-mono-custom text-xs tracking-[0.2em] uppercase" style={{ color: region.accentColor }}>
              Chapter {index + 1}
            </span>
          </div>

          <h2
            className="animate-in font-display font-extrabold text-3xl sm:text-4xl lg:text-6xl leading-[0.95] mb-3"
            style={{ color: region.textColor }}
          >
            {region.name}
          </h2>
          <p
            className="animate-in font-display text-base sm:text-lg lg:text-xl font-medium mb-6"
            style={{ color: region.accentColor }}
          >
            {region.subtitle}
          </p>
          <p
            className="animate-in font-body text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg opacity-80"
            style={{ color: region.textColor }}
          >
            {region.description}
          </p>

          {/* Stats */}
          <div className="animate-in flex gap-6 sm:gap-8 mt-6 sm:mt-8 mb-8 sm:mb-12">
            {region.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-counter text-xl sm:text-2xl lg:text-3xl" style={{ color: region.accentColor }}>
                  {stat.value}
                </div>
                <div className="font-mono-custom text-[10px] uppercase tracking-wider opacity-50" style={{ color: region.textColor }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stop Cards */}
        <div className="px-4 sm:px-6 lg:px-16 pb-12 lg:pb-16 space-y-3 sm:space-y-4">
          {region.stops.map((stop, i) => {
            const uniqueKey = `${stop.day}-${stop.place}`;
            const isFirst = i === 0;
            const isLast = i === region.stops.length - 1;
            return (
              <div
                key={uniqueKey}
                className="animate-in group relative"
              >
                <div
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: `${region.textColor}08`,
                    borderLeft: `3px solid ${isFirst || isLast ? region.accentColor : `${region.textColor}15`}`,
                  }}
                >
                  {/* Day Number */}
                  <div className="shrink-0 w-10 sm:w-12 text-center">
                    <div className="font-counter text-xl sm:text-2xl leading-none" style={{ color: region.accentColor }}>
                      {String(stop.day).padStart(2, "0")}
                    </div>
                    <div className="font-mono-custom text-[9px] uppercase tracking-wider opacity-40 mt-0.5" style={{ color: region.textColor }}>
                      Day
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-sm sm:text-lg" style={{ color: region.textColor }}>
                      {stop.place}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="font-mono-custom text-[11px] sm:text-xs opacity-50" style={{ color: region.textColor }}>
                        {stop.date} · {stop.dayOfWeek}
                      </span>
                      <span className="font-mono-custom text-[11px] sm:text-xs opacity-30" style={{ color: region.textColor }}>
                        · {stop.state}
                      </span>
                    </div>
                    {stop.notes && (
                      <div
                        className="font-body text-[11px] sm:text-xs mt-1.5 px-2 py-0.5 rounded-full inline-block"
                        style={{ backgroundColor: `${region.accentColor}20`, color: region.accentColor }}
                      >
                        {stop.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Spacer for last viewport on desktop */}
        <div className="hidden lg:block h-[20vh]" />
      </div>
    </section>
  );
}
