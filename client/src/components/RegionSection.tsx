import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TripRegion } from "@/lib/tripData";
import { useWebConfig } from "../contexts/WebConfigContext";
import { getCurrentStop, getCurrentTripDay, getDayPhotoUrl, getStopDate } from "@/lib/tripDates";

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

type DayStatus = "past" | "current" | "future";

function DayPhoto({
  day,
  place,
  accent,
  bg,
  status,
}: {
  day: number;
  place: string;
  accent: string;
  bg: string;
  status: DayStatus;
}) {
  const [failed, setFailed] = useState(false);
  const opacity = status === "past" ? 0.6 : status === "future" ? 0.38 : 1;

  if (failed) {
    return (
      <div
        className="relative w-full aspect-video rounded-xl overflow-hidden flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${accent}33, ${bg})`, opacity }}
      >
        <div className="text-center px-4">
          <div className="font-counter text-3xl sm:text-4xl" style={{ color: accent }}>
            {String(day).padStart(2, "0")}
          </div>
          <div className="font-display font-bold text-sm sm:text-base mt-1" style={{ color: accent }}>
            {place}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden" style={{ opacity }}>
      <img
        src={getDayPhotoUrl(day)}
        alt={`${place}, day ${day}`}
        className={`w-full h-full object-cover ${status === "past" ? "grayscale-[30%]" : ""}`}
        loading={status === "current" ? "eager" : "lazy"}
        fetchPriority={status === "current" ? "high" : "low"}
        decoding="async"
        onError={() => setFailed(true)}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${bg}99 0%, transparent 45%)`,
        }}
      />
    </div>
  );
}

export default function RegionSection({ region, index }: RegionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { tripStartDate } = useWebConfig();
  const currentStop = getCurrentStop(tripStartDate);
  const currentDay = getCurrentTripDay(tripStartDate);

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
              once: true,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [region.id]);

  const imgSrc = REGION_IMAGES[region.id] || "";

  const dayStatus = (day: number): DayStatus => {
    if (currentStop?.day === day) return "current";
    if (currentDay == null || currentDay < 1) return "future";
    if (currentStop && day < currentStop.day) return "past";
    if (!currentStop && currentDay > 1 && day < currentDay) return "past";
    return "future";
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-10 isolate overflow-hidden py-16 sm:py-24"
      style={{ backgroundColor: region.bgColor }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <img
          src={imgSrc}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: region.bgColor, opacity: 0.92 }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto w-full">
          <div className="animate-in flex items-center gap-3 mb-2 sm:mb-3">
            <div className="w-8 h-[2px]" style={{ backgroundColor: region.accentColor }} />
            <span className="font-mono-custom text-[10px] sm:text-xs tracking-[0.2em] uppercase" style={{ color: region.accentColor }}>
              Chapter {index + 1}
            </span>
          </div>

          <div className="animate-in flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-2 sm:mb-3">
            <h2
              className="font-display font-extrabold leading-[0.95] text-3xl sm:text-4xl lg:text-6xl"
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

          <p
            className="animate-in font-body text-sm sm:text-base leading-relaxed max-w-xl opacity-80 mb-4 sm:mb-6"
            style={{ color: region.textColor }}
          >
            {region.description}
          </p>

          <div className="animate-in flex gap-4 sm:gap-6 mb-10 sm:mb-14">
            {region.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-counter text-xl sm:text-2xl lg:text-3xl" style={{ color: region.accentColor }}>
                  {stat.value}
                </div>
                <div className="font-mono-custom text-[9px] sm:text-[10px] uppercase tracking-wider opacity-50" style={{ color: region.textColor }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="relative pl-12 sm:pl-16">
            <div
              className="absolute left-[18px] sm:left-[22px] top-2 bottom-2 w-[2px] opacity-40"
              style={{
                background: `repeating-linear-gradient(to bottom, ${region.accentColor} 0px, ${region.accentColor} 10px, transparent 10px, transparent 20px)`,
              }}
            />

            <div className="space-y-8 sm:space-y-10">
              {region.stops.map((stop) => {
                const status = dayStatus(stop.day);
                const isCurrent = status === "current";
                const stopDateObj = getStopDate(tripStartDate, stop.day);
                const dateLabel = stopDateObj
                  ? `${stopDateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · ${stopDateObj.toLocaleDateString("en-US", { weekday: "short" })}`
                  : "Dates TBD";

                return (
                  <div
                    key={`${stop.day}-${stop.place}`}
                    className="animate-in relative"
                  >
                    <div className="absolute -left-12 sm:-left-16 top-3 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11">
                      {isCurrent && (
                        <span
                          className="absolute inset-0 rounded-full animate-ping opacity-40"
                          style={{ backgroundColor: region.accentColor }}
                        />
                      )}
                      <div
                        className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-counter text-[10px] sm:text-xs"
                        style={{
                          backgroundColor: isCurrent || status === "past" ? region.accentColor : "transparent",
                          color: isCurrent || status === "past" ? region.bgColor : region.accentColor,
                          border: `2px solid ${region.accentColor}`,
                          boxShadow: isCurrent ? `0 0 0 4px ${region.accentColor}33, 0 0 18px ${region.accentColor}66` : undefined,
                        }}
                      >
                        {String(stop.day).padStart(2, "0")}
                      </div>
                    </div>

                    <div
                      className="rounded-2xl overflow-hidden border transition-all duration-300"
                      style={{
                        backgroundColor: isCurrent ? `${region.accentColor}18` : `${region.textColor}08`,
                        borderColor: isCurrent ? region.accentColor : `${region.textColor}14`,
                        boxShadow: isCurrent ? `0 0 24px ${region.accentColor}33` : undefined,
                        opacity: status === "future" ? 0.72 : 1,
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-stretch">
                        <div className="sm:w-[42%] shrink-0 p-3 sm:p-4">
                          <DayPhoto
                            day={stop.day}
                            place={stop.place}
                            accent={region.accentColor}
                            bg={region.bgColor}
                            status={status}
                          />
                        </div>
                        <div className="flex-1 px-4 pb-4 sm:py-5 sm:pr-6 sm:pl-2 flex flex-col justify-center">
                          <div className="font-mono-custom text-[10px] uppercase tracking-[0.18em] opacity-50 mb-1" style={{ color: region.textColor }}>
                            Day {String(stop.day).padStart(2, "0")} · {stop.state}
                          </div>
                          <h3 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl leading-tight" style={{ color: region.textColor }}>
                            {stop.place}
                          </h3>
                          <div className="font-mono-custom text-xs sm:text-sm mt-1 opacity-60" style={{ color: region.textColor }}>
                            {dateLabel}
                          </div>
                          {isCurrent && (
                            <div
                              className="mt-3 inline-flex items-center gap-2 self-start font-mono-custom text-[10px] sm:text-xs uppercase tracking-[0.16em] px-2.5 py-1 rounded-full"
                              style={{ backgroundColor: region.accentColor, color: region.bgColor }}
                            >
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                              </span>
                              Currently here
                            </div>
                          )}
                          {stop.notes && (
                            <div
                              className="font-body text-xs mt-3 px-2 py-0.5 rounded-full inline-block self-start"
                              style={{ backgroundColor: `${region.accentColor}24`, color: region.accentColor }}
                            >
                              {stop.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
