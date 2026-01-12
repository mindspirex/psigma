import { useState, useEffect, useRef } from "react";
import { useObjects } from "@/utility/useObjects";
import usePatchObject from "@/utility/usePatchObject";
import { useZoom } from "@/utility/useZoom";
import { snapToObjects } from "@/utility/snapToObjects";

export function useDrag(
  initialX: number,
  initialY: number,
  width: number,
  height: number,
  id: string,
) {
  const { selectedId, setSelectedId, objects } = useObjects();
  const patchObject = usePatchObject();
  const { scale } = useZoom();

  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const posRef = useRef(pos);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  const selected = selectedId === id;

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!selected) {
      setSelectedId(id);
      return;
    }

    const startCursor = {
      x: e.clientX / scale,
      y: e.clientY / scale,
    };

    const startPos = { ...posRef.current };

    const otherObjects = objects.filter((o) => o.id !== id);

    const onMove = (e: MouseEvent) => {
      const cursor = {
        x: e.clientX / scale,
        y: e.clientY / scale,
      };

      const nextPos = {
        x: startPos.x + (cursor.x - startCursor.x),
        y: startPos.y + (cursor.y - startCursor.y),
      };

      const snapped = snapToObjects(
        nextPos,
        { width, height }, // size of dragged object
        otherObjects,
      );

      setPos(snapped);
    };

    const onUp = async (e: MouseEvent) => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);

      const cursor = {
        x: e.clientX / scale,
        y: e.clientY / scale,
      };

      const nextPos = {
        x: startPos.x + (cursor.x - startCursor.x),
        y: startPos.y + (cursor.y - startCursor.y),
      };

      const snapped = snapToObjects(
        nextPos,
        { width, height }, // size of dragged object
        otherObjects,
      );

      await patchObject(id, snapped);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return {
    x: pos.x,
    y: pos.y,
    startDragging,
  };
}
