import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useDayPhotoLightbox } from "@/contexts/DayPhotoLightboxContext";
import { useDayPhotoCatalog } from "@/hooks/useDayPhotoCatalog";
import { getDayPhotoAssetUrl } from "@/lib/tripDates";
import { ALL_STOPS } from "@/lib/tripData";

const SWIPE_THRESHOLD = 48;

export default function DayPhotoLightbox() {
  const { state, close, open } = useDayPhotoLightbox();
  const { ready, catalog, photoDays } = useDayPhotoCatalog();
  const [imageIndex, setImageIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const day = state?.day ?? null;
  const entry = day != null ? catalog[day] : undefined;
  const gallery = entry?.gallery ?? [];
  const currentAsset = gallery[imageIndex];
  const currentUrl = currentAsset ? getDayPhotoAssetUrl(currentAsset) : null;
  const dayIndex = day != null ? photoDays.indexOf(day) : -1;
  const hasPrevDay = dayIndex > 0;
  const hasNextDay = dayIndex >= 0 && dayIndex < photoDays.length - 1;
  const hasPrevImage = imageIndex > 0;
  const hasNextImage = imageIndex < gallery.length - 1;

  useEffect(() => {
    if (state) setImageIndex(state.imageIndex);
  }, [state]);

  const goToDay = useCallback(
    (targetDay: number) => {
      const stop = ALL_STOPS.find((s) => s.day === targetDay);
      open(targetDay, stop?.place ?? `Day ${targetDay}`, 0);
    },
    [open],
  );

  const goPrevDay = useCallback(() => {
    if (!hasPrevDay) return;
    goToDay(photoDays[dayIndex - 1]);
  }, [dayIndex, goToDay, hasPrevDay, photoDays]);

  const goNextDay = useCallback(() => {
    if (!hasNextDay) return;
    goToDay(photoDays[dayIndex + 1]);
  }, [dayIndex, goToDay, hasNextDay, photoDays]);

  const goPrevImage = useCallback(() => {
    if (hasPrevImage) setImageIndex((i) => i - 1);
    else goPrevDay();
  }, [goPrevDay, hasPrevImage]);

  const goNextImage = useCallback(() => {
    if (hasNextImage) setImageIndex((i) => i + 1);
    else goNextDay();
  }, [goNextDay, hasNextImage]);

  useEffect(() => {
    if (!state) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevImage();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNextImage();
      } else if (event.key === "ArrowUp" && hasPrevDay) {
        event.preventDefault();
        goPrevDay();
      } else if (event.key === "ArrowDown" && hasNextDay) {
        event.preventDefault();
        goNextDay();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNextDay, goNextImage, goPrevDay, goPrevImage, hasNextDay, hasPrevDay, state]);

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) goPrevImage();
    else goNextImage();
  };

  const title = state
    ? `Day ${String(state.day).padStart(2, "0")} · ${state.place}`
    : "Day photo viewer";

  return (
    <Dialog open={!!state} onOpenChange={(openState) => !openState && close()}>
      <DialogContent
        fullscreen
        showCloseButton={false}
        overlayClassName="bg-black/90"
        className="data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 bg-[#050505]/96"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>

        <header className="relative z-20 flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <div className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/45">
              Day {state ? String(state.day).padStart(2, "0") : "--"}
              {gallery.length > 1 && ` · ${imageIndex + 1} / ${gallery.length}`}
            </div>
            <div className="truncate font-display text-lg font-bold text-white sm:text-xl">
              {state?.place}
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-full border border-white/15 bg-white/5 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Close photo viewer"
          >
            <X className="size-5" />
          </button>
        </header>

        <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-4 sm:px-16">
          {hasPrevDay && (
            <button
              type="button"
              onClick={goPrevDay}
              className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-2 text-white/80 backdrop-blur-sm transition hover:bg-black/60 hover:text-white sm:left-4 sm:flex"
              aria-label="Previous day"
            >
              <ChevronLeft className="size-6" />
            </button>
          )}

          <div
            className="relative flex h-full w-full max-h-[calc(100dvh-8.5rem)] items-center justify-center"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {!ready || !currentUrl ? (
              <div className="h-48 w-full max-w-md animate-pulse rounded-xl bg-white/5" />
            ) : (
              <img
                key={currentUrl}
                src={currentUrl}
                alt={title}
                className="max-h-full max-w-full object-contain"
                draggable={false}
              />
            )}
          </div>

          {hasNextDay && (
            <button
              type="button"
              onClick={goNextDay}
              className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-2 text-white/80 backdrop-blur-sm transition hover:bg-black/60 hover:text-white sm:right-4 sm:flex"
              aria-label="Next day"
            >
              <ChevronRight className="size-6" />
            </button>
          )}

          {gallery.length > 1 && (
            <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-sm">
              <button
                type="button"
                onClick={goPrevImage}
                className="rounded-full p-1 text-white/70 transition hover:text-white disabled:opacity-30"
                aria-label="Previous photo"
                disabled={!hasPrevImage && !hasPrevDay}
              >
                <ChevronLeft className="size-4" />
              </button>
              <div className="flex items-center gap-1.5">
                {gallery.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setImageIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === imageIndex ? "w-5 bg-[#FFB800]" : "w-2 bg-white/35 hover:bg-white/60"
                    }`}
                    aria-label={`Photo ${index + 1} of ${gallery.length}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goNextImage}
                className="rounded-full p-1 text-white/70 transition hover:text-white disabled:opacity-30"
                aria-label="Next photo"
                disabled={!hasNextImage && !hasNextDay}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>

        {photoDays.length > 1 && (
          <footer className="shrink-0 px-4 pb-4 text-center font-mono-custom text-[10px] uppercase tracking-[0.16em] text-white/35 sm:pb-5">
            {hasPrevDay ? (
              <button type="button" className="hover:text-white/60" onClick={goPrevDay}>
                Day {String(photoDays[dayIndex - 1]).padStart(2, "0")}
              </button>
            ) : (
              <span />
            )}
            <span className="mx-3 text-white/20">·</span>
            <span className="text-[#FFB800]/80">Swipe or arrow keys</span>
            <span className="mx-3 text-white/20">·</span>
            {hasNextDay ? (
              <button type="button" className="hover:text-white/60" onClick={goNextDay}>
                Day {String(photoDays[dayIndex + 1]).padStart(2, "0")}
              </button>
            ) : (
              <span />
            )}
          </footer>
        )}
      </DialogContent>
    </Dialog>
  );
}
