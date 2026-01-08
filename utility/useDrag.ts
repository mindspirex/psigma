import { useState, useEffect, useCallback } from "react";
import { useObjects } from "@/utility/ObjectsContext";
import type React from "react";

export function useDrag(initialX: number, initialY: number, id: string) {
  const { selectedId, setSelectedId, setObjects } = useObjects();

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

      await fetch("/api/objects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          x: startPos.x + (e.clientX - startCursor.x),
          y: startPos.y + (e.clientY - startCursor.y),
        }),
      });

      setObjects((prevObjects) =>
        prevObjects.map((obj) =>
          obj.id === id
            ? {
                ...obj,
                x: startPos.x + (e.clientX - startCursor.x),
                y: startPos.y + (e.clientY - startCursor.y),
              }
            : obj,
        ),
      );
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return { ...pos, selected, startDragging };
}
