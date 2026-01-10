import { useZoom } from "@/utility/useZoom";

export default function ZoomControls() {
  const { zoomIn, zoomOut } = useZoom();

  return (
    <div className="absolute bottom-4 right-4 z-50 flex gap-2">
      <button
        onClick={zoomIn}
        className="w-10 h-10 flex items-center justify-center rounded-full
                   bg-white/20 backdrop-blur-md text-white text-xl font-semibold
                   border border-white/30 shadow-lg
                   hover:bg-white/30 active:scale-95 transition"
      >
        +
      </button>

      <button
        onClick={zoomOut}
        className="w-10 h-10 flex items-center justify-center rounded-full
                   bg-white/20 backdrop-blur-md text-white text-xl font-semibold
                   border border-white/30 shadow-lg
                   hover:bg-white/30 active:scale-95 transition"
      >
        −
      </button>
    </div>
  );
}
