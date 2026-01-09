"use client";

import { useObjects, Obj } from "@/utility/useObjects";
import usePatchObject from "@/utility/usePatchObject";

export default function Styling() {
  const { objects, selectedId, setObjects, setSelectedId } = useObjects();
  const patchObject = usePatchObject();

  function update<K extends keyof Obj>(key: K, value: Obj[K]) {
    if (!selectedId) return;
    patchObject(selectedId, { [key]: value });
  }

  async function deleteObject() {
    try {
      const res = await fetch("/api/object", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedId }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to delete object");
      }

      setObjects((prevObject) =>
        prevObject.filter((object) => object.id !== selectedId),
      );
      setSelectedId(null);

      console.log("Deleted successfully:");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  const selectedObject = objects.find((o) => o.id === selectedId);

  if (!selectedObject) {
    return (
      <div className="p-4 text-sm text-white/60">Select an object to edit</div>
    );
  }

  return (
    <div className="w-full rounded-xl">
      {/* Header */}
      <div className="border-b border-white/20 py-3">
        <h2 className="text-sm font-semibold text-white">Object Properties</h2>
      </div>

      <div className="space-y-6 py-4 text-sm text-white">
        {/* POSITION */}
        <section>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-white/60">
            Position
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-xs text-white/70">X</span>
              <input
                type="number"
                value={selectedObject.x}
                onChange={(e) => update("x", Number(e.target.value))}
                className="h-8 rounded-md border border-white/20 bg-white/10 px-2 text-white outline-none focus:border-white/40"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs text-white/70">Y</span>
              <input
                type="number"
                value={selectedObject.y}
                onChange={(e) => update("y", Number(e.target.value))}
                className="h-8 rounded-md border border-white/20 bg-white/10 px-2 text-white outline-none focus:border-white/40"
              />
            </label>
          </div>
        </section>

        {/* SIZE */}
        <section>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-white/60">
            Size
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-xs text-white/70">Width</span>
              <input
                type="number"
                value={selectedObject.width}
                onChange={(e) => update("width", Number(e.target.value))}
                className="h-8 rounded-md border border-white/20 bg-white/10 px-2 text-white outline-none focus:border-white/40"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs text-white/70">Height</span>
              <input
                type="number"
                value={selectedObject.height}
                onChange={(e) => update("height", Number(e.target.value))}
                className="h-8 rounded-md border border-white/20 bg-white/10 px-2 text-white outline-none focus:border-white/40"
              />
            </label>
          </div>
        </section>

        {/* LAYOUT */}
        <section>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-white/60">
            Layout
          </h3>

          <label className="flex items-center justify-between gap-4 cursor-pointer">
            <span className="text-white/80 select-none">Flex Layout</span>

            <button
              type="button"
              onClick={() => update("isFlex", !selectedObject.isFlex)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-white/40
                ${selectedObject.isFlex ? "bg-white" : "bg-white/30"}
              `}
            >
              <span
                className={`
                  inline-block h-5 w-5 rounded-full bg-black
                  transition-transform duration-200 ease-out
                  ${selectedObject.isFlex ? "translate-x-5" : "translate-x-1"}
                `}
              />
            </button>
          </label>

          {selectedObject.isFlex && (
            <div className="mt-3 space-y-2">
              <label className="flex flex-col gap-1">
                <span className="text-xs text-white/70">Justify Content</span>
                <select
                  value={selectedObject.justifyContent}
                  onChange={(e) => update("justifyContent", e.target.value)}
                  className="h-8 rounded-md border border-white/20 bg-white/10 px-2 text-white outline-none focus:border-white/40"
                >
                  {[
                    "flex-start",
                    "center",
                    "flex-end",
                    "space-between",
                    "space-around",
                    "space-evenly",
                  ].map((o) => (
                    <option key={o} value={o} className="text-black">
                      {o}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs text-white/70">Align Items</span>
                <select
                  value={selectedObject.alignItems}
                  onChange={(e) => update("alignItems", e.target.value)}
                  className="h-8 rounded-md border border-white/20 bg-white/10 px-2 text-white outline-none focus:border-white/40"
                >
                  {[
                    "stretch",
                    "flex-start",
                    "center",
                    "flex-end",
                    "baseline",
                  ].map((o) => (
                    <option key={o} value={o} className="text-black">
                      {o}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
        </section>

        {/* APPEARANCE */}
        <section>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-white/60">
            Appearance
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-white/80">Background</span>
            <input
              type="color"
              value={selectedObject.backgroundColor}
              onChange={(e) => update("backgroundColor", e.target.value)}
              className="h-8 w-10 cursor-pointer rounded border border-white/30 bg-transparent"
            />
          </div>
        </section>

        <section>
          <button
            onClick={deleteObject}
            className="w-full bg-red-500 rounded-full py-2"
          >
            Delete Object
          </button>
        </section>
      </div>
    </div>
  );
}
