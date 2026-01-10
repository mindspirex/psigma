"use client";

import { useObjects } from "@/utility/useObjects";
import RenderObject from "@/components/RenderObject";
import { useZoom } from "@/utility/useZoom";

export default function Canvas() {
  const { objects } = useObjects();
  const { scale } = useZoom();

  return (
    <div
      className="h-screen"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "0 0",
      }}
    >
      {objects.map((o) => (
        <RenderObject key={o.id} obj={o} />
      ))}
    </div>
  );
}
