import { useEffect, useState } from "react";
import { fetchDayPhotoVersions, getDayPhotoUrl } from "@/lib/tripDates";

export function useDayPhotoUrl(day: number | undefined) {
  const [state, setState] = useState<{ ready: boolean; url: string | null }>({
    ready: false,
    url: null,
  });

  useEffect(() => {
    if (day == null) {
      setState({ ready: true, url: null });
      return;
    }

    let live = true;
    fetchDayPhotoVersions().then((versions) => {
      if (!live) return;
      const version = versions[day];
      setState({ ready: true, url: version ? getDayPhotoUrl(day, version) : null });
    });

    return () => {
      live = false;
    };
  }, [day]);

  return state;
}
