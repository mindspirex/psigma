"use client";

import { useEffect, useState } from "react";
import { ObjectsProvider, Obj } from "@/context/ObjectsContext";
import RenderObject from "@/components/RenderObject";

export default function Canvas() {
  const [objects, setObjects] = useState<Obj[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/objects");
      const data = await res.json();
      setObjects(data);
    }

    load();
  }, []);

  return (
    <div className="canvas h-screen">
      <ObjectsProvider>
        {objects.map((o) => (
          <RenderObject key={o._id} obj={o} />
        ))}
      </ObjectsProvider>
    </div>
  );
}
