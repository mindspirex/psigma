"use client";

import { Obj } from "@/types/Obj";

export default function RenderObject({ obj }: { obj: Obj }) {
  const style: React.CSSProperties = {
    position: "absolute",
    left: obj.x,
    top: obj.y,
    width: obj.width,
    height: obj.height,
    backgroundColor: `rgb(${obj.backgroundColor.red},${obj.backgroundColor.green},${obj.backgroundColor.blue})`,
    display: obj.isFlex ? "flex" : "block",
    justifyContent: obj.isFlex ? obj.justifyContent : undefined,
    alignItems: obj.isFlex ? obj.alignItems : undefined,
    columnGap: obj.gapX,
    rowGap: obj.gapY,
  };

  return <div style={style}></div>;
}
