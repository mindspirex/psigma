"use client";

import Styling from "@/components/Styling";
import AddObject from "@/components/AddObject";
import ZoomControls from "@/components/ZoomControls";

export default function Sidebar() {
  return (
    <div
      className={`flex flex-col gap-5
        absolute top-0 h-full w-80
        bg-foreground text-white p-5 z-10 right-0
      `}
    >
      <AddObject />
      <Styling />
      <ZoomControls />
    </div>
  );
}
