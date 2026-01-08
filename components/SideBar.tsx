"use client";

import Styling from "@/components/Styling";
import AddObject from "@/components/AddObject";

export default function Sidebar() {
  return (
    <aside
      className={`
        absolute top-0 h-full w-80
        bg-foreground text-white p-5 z-10 right-0
      `}
    >
      <AddObject />
      <Styling />
    </aside>
  );
}
