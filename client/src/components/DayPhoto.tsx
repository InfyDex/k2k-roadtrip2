import { useState } from "react";
import { useDayPhotoLightbox } from "@/contexts/DayPhotoLightboxContext";
import { useDayPhotoUrl } from "@/hooks/useDayPhotoUrl";

export type DayPhotoStatus = "past" | "current" | "future";

type DayPhotoProps = {
  day: number;
  place: string;
  accent: string;
  bg: string;
  status: DayPhotoStatus;
};

export default function DayPhoto({ day, place, accent, bg, status }: DayPhotoProps) {
  const [failed, setFailed] = useState(false);
  const { ready, url } = useDayPhotoUrl(day);
  const { open } = useDayPhotoLightbox();
  const opacity = status === "past" ? 0.6 : status === "future" ? 0.38 : 1;
  const hasPhoto = ready && !failed && !!url;

  if (!ready) {
    return <div className="relative w-full aspect-video rounded-xl overflow-hidden" style={{ opacity }} />;
  }

  if (failed || !url) {
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
    <button
      type="button"
      className="group relative w-full aspect-video rounded-xl overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      style={{ opacity }}
      onClick={() => open(day, place)}
      aria-label={`View photos for day ${day}, ${place}`}
    >
      <img
        src={url}
        alt={`${place}, day ${day}`}
        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02] ${status === "past" ? "grayscale-[30%]" : ""}`}
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
      {hasPhoto && (
        <div
          className="absolute top-2 right-2 rounded-full bg-black/50 px-2 py-1 font-mono-custom text-[9px] uppercase tracking-wider text-white/80 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          View
        </div>
      )}
    </button>
  );
}
