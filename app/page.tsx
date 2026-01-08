"use client";

import SideBar from "@/components/SideBar";
import Canvas from "@/components/Canvas";
import { ObjectsProvider } from "@/utility/ObjectsContext";

export default function Page() {
  return (
    <ObjectsProvider>
      <SideBar />
      <Canvas />
    </ObjectsProvider>
  );
}
