"use client";

import { createContext, useContext, useMemo, useState } from "react";

/* ---------- Types ---------- */

type ZoomContextValue = {
  scale: number;
  zoomIn: () => void;
  zoomOut: () => void;
};

/* ---------- Context ---------- */

const ZoomContext = createContext<ZoomContextValue | null>(null);

/* ---------- Hook ---------- */

export function useZoom() {
  const ctx = useContext(ZoomContext);
  if (!ctx) {
    throw new Error("useZoom must be used inside ZoomProvider");
  }
  return ctx;
}

/* ---------- Provider ---------- */

export function ZoomProvider({
  children,
  min = 0.2,
  max = 3,
  step = 0.1,
}: {
  children: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
}) {
  const [scale, setScale] = useState(1);

  const value = useMemo<ZoomContextValue>(
    () => ({
      scale,
      zoomIn: () => setScale((s) => Math.min(s + step, max)),
      zoomOut: () => setScale((s) => Math.max(s - step, min)),
    }),
    [scale, min, max, step],
  );

  return <ZoomContext.Provider value={value}>{children}</ZoomContext.Provider>;
}
