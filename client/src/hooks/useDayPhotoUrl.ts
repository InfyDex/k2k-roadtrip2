import { useEffect, useState } from "react";
import { fetchDayPhotoCatalog, getDayPreviewUrl } from "@/lib/tripDates";

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
    fetchDayPhotoCatalog().then((catalog) => {
      if (!live) return;
      const entry = catalog[day];
      setState({
        ready: true,
        url: entry ? getDayPreviewUrl(day, entry.preview) : null,
      });
    });

    return () => {
      live = false;
    };
  }, [day]);

  return state;
}
