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
    display: "flex",
    justifyContent: object.justifyContent,
    alignItems: object.alignItems,
    rowGap: object.rowGap,
    columnGap: object.columnGap,
    border: selected ? "2px solid #4c8bf5" : "none",
  };

  const detachFromParent = (objectId: string) => {
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

  const attachToObject = () => {
    // center point of the dragged object
    const centerX = x + object.width / 2;
    const centerY = y + object.height / 2;

    // find all valid drop targets
    const candidates = objects.filter((target) => {
      if (target.id === object.id) return false;
      if (target.position === "absolute") return false;

      const left = target.x;
      const top = target.y;
      const right = left + target.width;
      const bottom = top + target.height;

      return (
        centerX >= left &&
        centerX <= right &&
        centerY >= top &&
        centerY <= bottom
      );
    });

    if (candidates.length === 0) return;

    // choose the smallest containing object (most specific container)
    const target = candidates.sort(
      (a, b) => a.width * a.height - b.width * b.height,
    )[0];

    // attach to new parent
    patchObject(object.id, {
      position: "static",
      isTopLayerElement: false,
    });

    patchObject(target.id, {
      children: [...target.children, object.id],
    });
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

      {selected && object.position === "static" && (
        <button
          className="text-white absolute top-1 bg-blue-300 rounded-full px-0.5 text-xs"
          onClick={(e) => {
            e.stopPropagation();
            detachFromParent(object.id);
          }}
        >
          Detach
        </button>
      )}

      {selected && object.position === "absolute" && (
        <button
          className="text-white absolute top-1 bg-blue-300 rounded-full px-0.5 text-xs"
          onClick={(e) => {
            e.stopPropagation();
            attachToObject();
          }}
        >
          Attach
        </button>
      )}
    </div>
  );
}
