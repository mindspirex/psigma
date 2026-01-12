"use client";

import { useObjects } from "@/utility/useObjects";
import RenderObject from "@/components/RenderObject";
import { useZoom } from "@/utility/useZoom";
import { usePan } from "@/utility/usePan";

export default function Canvas() {
  const { objects, selectedId } = useObjects();
  const { scale } = useZoom();
  const panRef = usePan(selectedId);

  return (
    <div
      ref={panRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        overscrollBehavior: "none",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          width: 5000,
          height: 5000,
        }}
      >
        {objects.map((o) => (
          <RenderObject key={o.id} object={o} />
        ))}
      </div>
    </div>
  );
}
