"use client";

import SideBar from "@/components/SideBar";
import Canvas from "@/components/Canvas";
import { ObjectsProvider } from "@/utility/useObjects";
import { CameraProvider, useCameraContext } from "@/utility/useCamera";

/* ---------------- Camera Viewport ---------------- */

function CameraViewport() {
  const camera = useCameraContext();

  return (
    <div className="relative flex-1 overflow-hidden" {...camera.bind}>
      {/* WORLD */}
      <div
        className="absolute top-0 left-0"
        style={{
          transform: camera.transform,
          transformOrigin: "0 0",
          width: 5000,
          height: 5000,
        }}
      >
        <Canvas />
      </div>

      {/* ZOOM CONTROLS (UI layer, not scaled) */}
      <div className="absolute bottom-4 right-4 text-white z-50 flex gap-2">
        <button onClick={camera.zoomIn}>+</button>
        <button onClick={camera.zoomOut}>−</button>
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */

export default function Page() {
  return (
    <ObjectsProvider>
      <CameraProvider>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar never zooms */}
          <SideBar />

          {/* Canvas viewport */}
          <CameraViewport />
        </div>
      </CameraProvider>
    </ObjectsProvider>
  );
}
