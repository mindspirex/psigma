"use client";

import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import Canvas from "@/components/Canvas";

export default function Page() {
  return (
    <>
      <LeftSideBar />
      <RightSideBar />
      <Canvas />
    </>
  );
}
