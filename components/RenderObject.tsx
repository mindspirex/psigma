"use client";

import { Object, useObjects } from "@/utility/useObjects";
import { useDrag } from "@/utility/useDrag";

export default function RenderObject({
  object,
  isParentFlex,
}: {
  object: Object;
  isParentFlex: boolean;
}) {
  const { setSelectedId, objects } = useObjects();

  const { x, y, selected, startDragging } = useDrag(
    object.x,
    object.y,
    object.width,
    object.height,
    object.id,
  );

  const style: React.CSSProperties = {
    position: "absolute",
    left: x,
    top: y,
    width: object.width,
    height: object.height,
    backgroundColor: object.backgroundColor,
    display: object.isFlex ? "flex" : "block",
    justifyContent: object.justifyContent,
    alignItems: object.alignItems,
    gap: `${object.rowGap}px ${object.columnGap}px`,
    cursor: selected ? "grab" : "pointer",
    outline: selected ? "2px solid #4c8bf5" : "none",
  };

  return (
    <div
      style={style}
      onMouseDown={(e) => {
        e.stopPropagation();
        startDragging(e);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(object.id);
      }}
    >
      {object.children.map((childId) => {
        const child = objects.find((object) => object.id === childId);
        return child ? <RenderObject key={childId} object={child} /> : null;
      })}
    </div>
  );
}
