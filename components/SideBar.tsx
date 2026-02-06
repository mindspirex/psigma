"use client";

import Styling from "@/components/Styling";
import AddObject from "@/components/AddObject";

export default function Sidebar() {
  return (
    <div
      className={`flex flex-col gap-5
        fixed top-0 h-full w-80 overflow-y-auto
        bg-foreground text-white p-5 z-10 right-0
      `}
    >
      <AddObject />
      <Styling />
    </div>
  );
}
