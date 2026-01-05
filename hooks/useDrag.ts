import { useState, useEffect, useCallback } from "react";

export function useDrag(initialX: number, initialY: number, id: string) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [selected, setSelected] = useState(false);

  const toggleSelect = useCallback(() => {
    setSelected((s) => !s);
  }, []);

  useEffect(() => {
    const globalClickHandler = () => setSelected(false);
    document.addEventListener("mousedown", globalClickHandler);
    return () => document.removeEventListener("mousedown", globalClickHandler);
  }, []);

  const startDragging = useCallback(
    (e: MouseEvent) => {
      if (!selected) return;

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

        await fetch("/api/objects/position", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: id,
            x: startPos.x + (e.clientX - startCursor.x),
            y: startPos.y + (e.clientY - startCursor.y),
          }),
        });
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [pos, selected, id],
  );

  return { ...pos, selected, toggleSelect, startDragging };
}
