import { useEffect, useRef } from "react";

export function usePan(selectedId: string | null) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (selectedId !== null) return;

      e.preventDefault();

      el.scrollLeft += e.deltaX;
      el.scrollTop += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, [selectedId]);

  return ref;
}
