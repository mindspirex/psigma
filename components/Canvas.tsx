"use client";

import { useObjects } from "@/utility/useObjects";
import RenderObject from "@/components/RenderObject";

export default function Canvas() {
  const { objects } = useObjects();

  return (
    <div className="h-screen">
      {objects.map((o) => (
        <RenderObject key={o.id} obj={o} />
      ))}
    </div>
  );
}
