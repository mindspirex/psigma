import { useState, useEffect, useCallback } from "react";
import { useObjects } from "@/utility/ObjectsContext";
import type React from "react";
import usePatchObject from "@/utility/usePatchObject";

export function useDrag(initialX: number, initialY: number, id: string) {
  const { selectedId, setSelectedId } = useObjects();
  const patchObject = usePatchObject();

  const [pos, setPos] = useState({ x: initialX, y: initialY });

  const selected = selectedId === id;

  // deselect
  useEffect(() => {
    const globalClickHandler = (e: MouseEvent) => {
      const canvas = document.querySelector(".canvas");

      if (canvas && e.target === canvas) {
        setSelectedId(null);
      }
    };

    document.addEventListener("mousedown", globalClickHandler);
    return () => document.removeEventListener("mousedown", globalClickHandler);
  });

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selected) {
      setSelectedId(id);
      return;
    }

    const startCursor = { x: e.clientX, y: e.clientY };
    const startPos = { ...pos };

    const onMove = (e: MouseEvent) => {
      setPos({
        x: startPos.x + (e.clientX - startCursor.x),
        y: startPos.y + (e.clientY - startCursor.y),
      });
    };

    const onUp = async (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);

      const updatedX = startPos.x + (e.clientX - startCursor.x);
      const updatedY = startPos.y + (e.clientY - startCursor.y);

      await patchObject(id, { x: updatedX, y: updatedY });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return { ...pos, selected, startDragging };
}
