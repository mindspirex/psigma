"use client";

import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import Canvas from "@/components/Canvas";
import { ObjectsProvider } from "@/context/ObjectsContext";

export default function Page() {
  return (
    <ObjectsProvider>
      <LeftSideBar />
      <RightSideBar />
      <Canvas />
    </ObjectsProvider>
  );
}
