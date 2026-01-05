"use client";

import { Obj } from "@/types/Obj";
import { useState } from "react";

export default function RenderObject({ obj }: { obj: Obj }) {
  const [pos, setPos] = useState({ x: obj.x, y: obj.y });
  const [selected, setSelected] = useState(false);

  const startDragging = (e: React.MouseEvent) => {
    if (!selected) return;

    const startX = e.clientX - pos.x;
    const startY = e.clientY - pos.y;

    const onMouseMove = (moveEvent: MouseEvent) => {
      setPos({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY,
      });
    };

    const onMouseUp = async (upEvent: MouseEvent) => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      const finalX = upEvent.clientX - startX;
      const finalY = upEvent.clientY - startY;

      await fetch("/api/objects/position", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: obj._id, x: finalX, y: finalY }),
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const toggleSelect = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevents parent clicks
    setSelected(true);
  };

  const style: React.CSSProperties = {
    position: "absolute",
    left: pos.x,
    top: pos.y,
    width: obj.width,
    height: obj.height,
    backgroundColor: `rgb(${obj.backgroundColor.red},${obj.backgroundColor.green},${obj.backgroundColor.blue})`,
    display: obj.isFlex ? "flex" : "block",
    justifyContent: obj.justifyContent,
    alignItems: obj.alignItems,
    gap: `${obj.rowGap}px ${obj.columnGap}px`,
    cursor: selected ? "grab" : "pointer", // 👉 visual feedback
    outline: selected ? "2px solid #4c8bf5" : "none", // optional selection highlight
  };

  return (
    <div style={style} onMouseDown={startDragging} onClick={toggleSelect} />
  );
}
