"use client";

import { Object, useObjects } from "@/utility/useObjects";
import { useDrag } from "@/utility/useDrag";
import { usePatchObject } from "@/utility/usePatchObject";

export default function RenderObject({
  object,
  isParentFlex,
}: {
  object: Object;
  isParentFlex: boolean;
}) {
  const { setSelectedId, objects, selectedId } = useObjects();
  const patchObject = usePatchObject();

  const { x, y, startDragging } = useDrag(
    object.x,
    object.y,
    object.width,
    object.height,
    object.id,
  );

  const selected = selectedId === object.id;

  const style: React.CSSProperties = {
    position: isParentFlex ? "static" : "absolute",
    left: x,
    top: y,
    width: object.width,
    height: object.height,
    backgroundColor: object.backgroundColor,
    display: object.isFlex ? "flex" : "block",
    justifyContent: object.justifyContent,
    alignItems: object.alignItems,
    gap: `${object.rowGap}px ${object.columnGap}px`,
    border: selected ? "2px solid #4c8bf5" : "none",
  };

  const removeFromParent = (objectId: string) => {
    patchObject(objectId, { isTopLayerElement: true });
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
        return child ? (
          <RenderObject
            key={childId}
            object={child}
            isParentFlex={object.isFlex}
          />
        ) : null;
      })}

      {selected && isParentFlex && (
        <button
          className="text-white absolute top-1 bg-blue-300 rounded-full px-0.5 text-xs"
          onClick={(e) => {
            e.stopPropagation();
            removeFromParent(object.id);
          }}
        >
          Remove From Parent
        </button>
      )}
    </div>
  );
}
