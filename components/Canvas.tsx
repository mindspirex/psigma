"use client";

import { useObjects } from "@/utility/ObjectsContext";
import RenderObject from "@/components/RenderObject";

export default function Canvas() {
  const { objects } = useObjects();

  return (
    <div className="canvas h-screen">
      {objects.map((o) => (
        <RenderObject key={o.id} obj={o} />
      ))}
    </div>
  );
}
