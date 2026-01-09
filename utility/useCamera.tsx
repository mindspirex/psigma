"use client";

import { createContext, useContext, useState, useRef } from "react";

/* ---------- Types ---------- */
type Camera = {
  scale: number;
  offset: { x: number; y: number };
  transform: string;
  bind: {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
  };
  zoomIn: () => void;
  zoomOut: () => void;
};

/* ---------- Context ---------- */
const CameraContext = createContext<Camera | null>(null);

export function useCameraContext() {
  const ctx = useContext(CameraContext);
  if (!ctx) {
    throw new Error("useCameraContext must be used inside CameraProvider");
  }
  return ctx;
}

/* ---------- Hook ---------- */
export function useCamera() {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const isPanning = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    isPanning.current = true;
    last.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isPanning.current) return;

    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;

    setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
    last.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    isPanning.current = false;
  };

  return {
    scale,
    offset,
    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
    zoomIn: () => setScale((s) => Math.min(s + 0.1, 3)),
    zoomOut: () => setScale((s) => Math.max(s - 0.1, 0.2)),
    bind: { onMouseDown, onMouseMove, onMouseUp },
  };
}

/* ---------- Provider ---------- */
export function CameraProvider({ children }: { children: React.ReactNode }) {
  const camera = useCamera();
  return (
    <CameraContext.Provider value={camera}>{children}</CameraContext.Provider>
  );
}
