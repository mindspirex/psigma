"use client";

import SideBar from "@/components/SideBar";
import Canvas from "@/components/Canvas";
import { ObjectsProvider } from "@/utility/useObjects";
import { ZoomProvider } from "@/utility/useZoom";

export default function Dashboard() {
  return (
    <ObjectsProvider>
      <ZoomProvider>
        <div className="flex h-screen overflow-hidden">
          <Canvas />
          <SideBar />
        </div>
      </ZoomProvider>
    </ObjectsProvider>
  );
}
