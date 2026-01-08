"use client";

import RightSideBar from "@/components/RightSideBar";
import Canvas from "@/components/Canvas";
import { ObjectsProvider } from "@/utility/ObjectsContext";

export default function Page() {
  return (
    <ObjectsProvider>
      <RightSideBar />
      <Canvas />
    </ObjectsProvider>
  );
}
