"use client";

import { Obj, useObjects } from "@/context/ObjectsContext";
import { useDrag } from "@/hooks/useDrag";

export default function RenderObject({ obj }: { obj: Obj }) {
  const { setSelectedId } = useObjects();

  const { x, y, selected, startDragging } = useDrag(obj.x, obj.y, obj._id);

  const style: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    width: obj.width,
    height: obj.height,
    backgroundColor: `rgb(${obj.backgroundColor.red},${obj.backgroundColor.green},${obj.backgroundColor.blue})`,
    display: obj.isFlex ? "flex" : "block",
    justifyContent: obj.justifyContent,
    alignItems: obj.alignItems,
    gap: `${obj.rowGap}px ${obj.columnGap}px`,
    cursor: selected ? "grab" : "pointer",
    outline: selected ? "2px solid #4c8bf5" : "none",
  };

  return (
    <div
      style={style}
      onMouseDown={startDragging}
      onClick={() => setSelectedId(obj._id)}
    />
  );
}
