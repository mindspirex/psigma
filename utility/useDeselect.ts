import { useEffect } from "react";
import { useObjects } from "@/utility/useObjects";

export function useDeselect(ref: React.RefObject<HTMLElement | null>) {
  const { setSelectedId } = useObjects();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!ref.current) return;

      if (!ref.current.contains(event.target as Node)) {
        setSelectedId(null);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, setSelectedId]);
}
