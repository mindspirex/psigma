import { useState, useEffect, useRef } from "react";
import { useObjects } from "@/utility/useObjects";
import usePatchObject from "@/utility/usePatchObject";
import { useCameraContext } from "@/utility/useCamera";
import type React from "react";

/* ---------- helpers ---------- */
function screenToWorld(
  e: MouseEvent | React.MouseEvent,
  scale: number,
  offset: { x: number; y: number },
) {
  return {
    x: (e.clientX - offset.x) / scale,
    y: (e.clientY - offset.y) / scale,
  };
}

export function useDrag(initialX: number, initialY: number, id: string) {
  const { selectedId, setSelectedId } = useObjects();
  const patchObject = usePatchObject();
  const { scale, offset } = useCameraContext();

  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const posRef = useRef(pos);

  // update ref AFTER render
  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  const selected = selectedId === id;

  /* ---------- deselect ---------- */
  useEffect(() => {
    const globalClickHandler = () => {
      setSelectedId(null);
    };

    document.addEventListener("mousedown", globalClickHandler);
    return () => document.removeEventListener("mousedown", globalClickHandler);
  }, [setSelectedId]);

  /* ---------- drag ---------- */
  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!selected) {
      setSelectedId(id);
      return;
    }

    const startCursor = screenToWorld(e, scale, offset);
    const startPos = { ...posRef.current };

    const onMove = (e: MouseEvent) => {
      const cursor = screenToWorld(e, scale, offset);

      setPos({
        x: startPos.x + (cursor.x - startCursor.x),
        y: startPos.y + (cursor.y - startCursor.y),
      });
    };

    const onUp = async (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);

      const cursor = screenToWorld(e, scale, offset);

      await patchObject(id, {
        x: startPos.x + (cursor.x - startCursor.x),
        y: startPos.y + (cursor.y - startCursor.y),
      });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return { ...pos, selected, startDragging };
}
