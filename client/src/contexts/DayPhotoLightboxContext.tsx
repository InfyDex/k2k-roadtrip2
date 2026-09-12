import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type LightboxState = {
  day: number;
  imageIndex: number;
  place: string;
} | null;

type DayPhotoLightboxContextValue = {
  state: LightboxState;
  open: (day: number, place: string, imageIndex?: number) => void;
  close: () => void;
};

const DayPhotoLightboxContext = createContext<DayPhotoLightboxContextValue | null>(null);

export function DayPhotoLightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LightboxState>(null);

  const open = useCallback((day: number, place: string, imageIndex = 0) => {
    setState({ day, place, imageIndex });
  }, []);

  const close = useCallback(() => {
    setState(null);
  }, []);

  const value = useMemo(() => ({ state, open, close }), [state, open, close]);

  return (
    <DayPhotoLightboxContext.Provider value={value}>{children}</DayPhotoLightboxContext.Provider>
  );
}

export function useDayPhotoLightbox() {
  const context = useContext(DayPhotoLightboxContext);
  if (!context) {
    throw new Error("useDayPhotoLightbox must be used within DayPhotoLightboxProvider");
  }
  return context;
}
