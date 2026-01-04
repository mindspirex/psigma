"use client";

import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`
          absolute top-5 z-20
          bg-background text-white px-3 py-1 rounded left-5
        `}
      >
        {open ? "Close" : "Open"}
      </button>

      <aside
        className={`
          absolute top-0 h-screen w-60
          bg-foreground text-white p-5 z-10
          ${open ? "left-0" : "-left-64"}
        `}
      ></aside>
    </>
  );
}
