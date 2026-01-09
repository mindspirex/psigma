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
      <div
        className="absolute top-0 left-0"
        style={{
          transform: camera.transform,
          transformOrigin: "0 0",
        }}
      >
        <Canvas />
      </div>

      {/* ZOOM CONTROLS (UI layer, not scaled) */}
      <div className="absolute bottom-4 right-4 z-50 flex gap-2">
        <button
          onClick={camera.zoomIn}
          className="w-10 h-10 flex items-center justify-center rounded-full
                     bg-white/20 backdrop-blur-md text-white text-xl font-semibold
                     border border-white/30 shadow-lg
                     hover:bg-white/30 active:scale-95 transition"
        >
          +
        </button>

        <button
          onClick={camera.zoomOut}
          className="w-10 h-10 flex items-center justify-center rounded-full
                     bg-white/20 backdrop-blur-md text-white text-xl font-semibold
                     border border-white/30 shadow-lg
                     hover:bg-white/30 active:scale-95 transition"
        >
          −
        </button>
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
