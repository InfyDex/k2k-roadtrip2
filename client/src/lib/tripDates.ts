import { ALL_STOPS, type TripStop } from "./tripData";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const TRIP_LENGTH_DAYS = 41;

export const LAST_STOP_DAY = Math.max(...ALL_STOPS.map((s) => s.day));

export function parseLocalDate(isoDate: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12, 0, 0);
}

/** Day 1 = tripStartDate. Uses the device's local calendar. */
export function getCurrentTripDay(tripStartDate: string, now = new Date()): number | null {
  const start = parseLocalDate(tripStartDate);
  if (!start) return null;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
  return Math.round((today.getTime() - start.getTime()) / MS_PER_DAY) + 1;
}

export function getStopDate(tripStartDate: string, day: number): Date | null {
  const start = parseLocalDate(tripStartDate);
  if (!start) return null;
  const stop = new Date(start);
  stop.setDate(start.getDate() + day - 1);
  return stop;
}

export function getDayPhotoUrl(day: number, version: string): string {
  return `/days/day_${day}.jpg?v=${version}`;
}

type DayPhotoManifest = { versions?: Record<string, string> };

let dayPhotoVersionsPromise: Promise<Record<number, string>> | null = null;

/** Fresh list of real day photos. Missing days are placeholders and are never fetched. */
export function fetchDayPhotoVersions(): Promise<Record<number, string>> {
  if (!dayPhotoVersionsPromise) {
    dayPhotoVersionsPromise = fetch("/days/available.json", { cache: "no-store" })
      .then((res) => (res.ok ? (res.json() as Promise<DayPhotoManifest>) : { versions: {} }))
      .then((data) => {
        const versions: Record<number, string> = {};
        for (const [day, version] of Object.entries(data.versions ?? {})) {
          versions[Number(day)] = String(version);
        }
        return versions;
      })
      .catch(() => ({}));
  }
  return dayPhotoVersionsPromise;
}

export function getCurrentStop(tripStartDate: string, now = new Date()): TripStop | null {
  const tripDay = getCurrentTripDay(tripStartDate, now);
  if (tripDay == null || tripDay < 1 || tripDay > TRIP_LENGTH_DAYS) return null;

  const itineraryDay = Math.min(tripDay, LAST_STOP_DAY);
  return ALL_STOPS.find((stop) => stop.day === itineraryDay) ?? null;
}
