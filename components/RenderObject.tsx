"use client";

import { Object, useObjects } from "@/utility/useObjects";
import { useDrag } from "@/utility/useDrag";
import { usePatchObject } from "@/utility/usePatchObject";

export default function RenderObject({
  object,
  parentId,
}: {
  object: Object;
  parentId: string | null;
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

  const parent = objects.find((object) => object.id === parentId);

  const style: React.CSSProperties = {
    left: x,
    top: y,
    position: (object.position ??
      "absolute") as React.CSSProperties["position"],
    width: object.width,
    height: object.height,
    backgroundColor: object.backgroundColor,
    display: object.isFlex ? "flex" : "block",
    justifyContent: object.justifyContent,
    alignItems: object.alignItems,
    rowGap: object.rowGap,
    columnGap: object.columnGap,
    border: selected ? "2px solid #4c8bf5" : "none",
  };

  const removeFromParent = (objectId: string) => {
    patchObject(objectId, {
      isTopLayerElement: true,
      x: parent ? parent.x : 0,
      y: parent ? parent.y : 0,
      position: "absolute",
    });
    if (parentId) {
      patchObject(parentId, {
        children: parent
          ? parent.children.filter((childId: string) => childId !== objectId)
          : [],
      });
    }
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
          <RenderObject key={childId} object={child} parentId={object.id} />
        ) : null;
      })}

      {selected && parent?.isFlex && object.position === "static" && (
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
