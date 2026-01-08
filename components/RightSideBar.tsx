"use client";

import Styling from "@/components/Styling";

export default function Sidebar() {
  return (
    <aside
      className={`
        absolute top-0 h-screen w-60
        bg-foreground text-white p-5 z-10 right-0
      `}
    >
      <Styling />
    </aside>
  );
}
