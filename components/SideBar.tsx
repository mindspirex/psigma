"use client";

import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`absolute top-5 z-20 transition-all
          ${open ? "left-64" : "left-5"}
          bg-gray-800 text-white px-3 py-1 rounded
        `}
      >
        {open ? "Close" : "Open"}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          absolute top-0 left-0 h-screen w-64
          bg-gray-900 text-white p-5 z-10
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <h2 className="text-lg font-bold mb-4">Menu</h2>

        <ul className="space-y-2">
          <li className="cursor-pointer hover:text-gray-300">Home</li>
          <li className="cursor-pointer hover:text-gray-300">Dashboard</li>
          <li className="cursor-pointer hover:text-gray-300">Settings</li>
        </ul>
      </aside>
    </>
  );
}
