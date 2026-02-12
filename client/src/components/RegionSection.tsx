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
  variant?: "half" | "full";
}

// Compact region card: used in both half-page pairs and full-page solo
export default function RegionSection({ region, index, variant = "full" }: RegionSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".animate-in");
      if (items) {
        items.forEach((item) => {
          gsap.from(item, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [region.id]);

  const imgSrc = REGION_IMAGES[region.id] || "";
  const isHalf = variant === "half";

  return (
    <div
      ref={sectionRef}
      className={`relative overflow-hidden ${isHalf ? "min-h-[50vh] lg:h-[50vh]" : "min-h-[50vh]"
        }`}
      style={{ backgroundColor: region.bgColor }}
    >
      {/* Background image — fills the whole area */}
      <div className="absolute inset-0">
        <img
          src={imgSrc}
          alt={region.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${region.bgColor}ee ${isHalf ? "50%" : "45%"}, ${region.bgColor}99 100%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${region.bgColor}40 0%, ${region.bgColor}cc 100%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col justify-start pt-6 sm:pt-8 lg:justify-center px-4 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-10
        `}>
        <div className="max-w-5xl mx-auto w-full">
          {/* Header row: chapter tag + stats */}
          <div className="animate-in flex items-center gap-3 mb-2 sm:mb-3">
            <div className="w-8 h-[2px]" style={{ backgroundColor: region.accentColor }} />
            <span className="font-mono-custom text-[10px] sm:text-xs tracking-[0.2em] uppercase" style={{ color: region.accentColor }}>
              Chapter {index + 1}
            </span>
          </div>

          {/* Title + subtitle */}
          <div className="animate-in flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-2 sm:mb-3">
            <h2
              className={`font-display font-extrabold leading-[0.95] ${isHalf ? "text-2xl sm:text-3xl lg:text-4xl" : "text-3xl sm:text-4xl lg:text-6xl"
                }`}
              style={{ color: region.textColor }}
            >
              {region.name}
            </h2>
            <p
              className="font-display text-sm sm:text-base lg:text-lg font-medium mt-1 sm:mt-0"
              style={{ color: region.accentColor }}
            >
              {region.subtitle}
            </p>
          </div>

          {/* Description — shorter for half variant */}
          <p
            className={`animate-in font-body text-sm leading-relaxed max-w-xl opacity-80 ${isHalf ? "mb-3 sm:mb-4" : "mb-4 sm:mb-6 sm:text-base"
              }`}
            style={{ color: region.textColor }}
          >
            {region.description}
          </p>

          {/* Stats row */}
          <div className="animate-in flex gap-4 sm:gap-6 mb-3 sm:mb-4">
            {region.stats.map((stat) => (
              <div key={stat.label}>
                <div className={`font-counter ${isHalf ? "text-lg sm:text-xl" : "text-xl sm:text-2xl lg:text-3xl"}`} style={{ color: region.accentColor }}>
                  {stat.value}
                </div>
                <div className="font-mono-custom text-[9px] sm:text-[10px] uppercase tracking-wider opacity-50" style={{ color: region.textColor }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Stop Cards — Horizontal Scroll Strip */}
          <div className="animate-in">
            <div
              className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 snap-x snap-mandatory"
              style={{
                scrollbarColor: `${region.accentColor}40 transparent`,
                scrollbarWidth: "thin",
              }}
            >
              {region.stops.map((stop, i) => {
                const uniqueKey = `${stop.day}-${stop.place}`;
                const isFirst = i === 0;
                const isLast = i === region.stops.length - 1;
                return (
                  <div
                    key={uniqueKey}
                    className="snap-start shrink-0 group relative rounded-lg transition-all duration-300 hover:scale-[1.03]"
                    style={{
                      backgroundColor: `${region.textColor}0a`,
                      borderBottom: `2px solid ${isFirst || isLast ? region.accentColor : `${region.textColor}15`}`,
                      minWidth: isHalf ? "110px" : "130px",
                      maxWidth: isHalf ? "140px" : "160px",
                    }}
                  >
                    <div className={`${isHalf ? "p-2 sm:p-3" : "p-3 sm:p-4"}`}>
                      <div className="flex items-baseline gap-1 mb-1">
                        <div className={`font-counter leading-none ${isHalf ? "text-base sm:text-lg" : "text-lg sm:text-xl"}`} style={{ color: region.accentColor }}>
                          {String(stop.day).padStart(2, "0")}
                        </div>
                        <div className="font-mono-custom text-[8px] uppercase tracking-wider opacity-40" style={{ color: region.textColor }}>
                          Day
                        </div>
                      </div>
                      <div className={`font-display font-bold leading-tight ${isHalf ? "text-xs sm:text-sm" : "text-sm sm:text-base"}`} style={{ color: region.textColor }}>
                        {stop.place}
                      </div>
                      <div className="font-mono-custom text-[9px] sm:text-[10px] opacity-50 mt-0.5" style={{ color: region.textColor }}>
                        {stop.date} · {stop.dayOfWeek}
                      </div>
                      {stop.notes && (
                        <div
                          className="font-body text-[9px] mt-1 px-1.5 py-0.5 rounded-full inline-block"
                          style={{ backgroundColor: `${region.accentColor}20`, color: region.accentColor }}
                        >
                          {stop.notes}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
