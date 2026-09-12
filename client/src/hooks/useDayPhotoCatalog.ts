import { useEffect, useState } from "react";
import { type DayPhotoCatalog, fetchDayPhotoCatalog, getPhotoDays } from "@/lib/tripDates";

export function useDayPhotoCatalog() {
  const [state, setState] = useState<{
    ready: boolean;
    catalog: DayPhotoCatalog;
    photoDays: number[];
  }>({
    ready: false,
    catalog: {},
    photoDays: [],
  });

  useEffect(() => {
    let live = true;
    fetchDayPhotoCatalog().then((catalog) => {
      if (!live) return;
      setState({ ready: true, catalog, photoDays: getPhotoDays(catalog) });
    });
    return () => {
      live = false;
    };
  }, []);

  return state;
}
