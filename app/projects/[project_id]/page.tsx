"use client";

import Editor from "@/components/Editor";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  const projectId = pathname.split("/")[2];

  return <Editor projectId={projectId} />;
}
