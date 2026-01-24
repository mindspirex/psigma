"use client";

import { useObjects, Object } from "@/utility/useObjects";
import { usePatchObject } from "@/utility/usePatchObject";

import NumberInput from "@/components/NumberInput";
import ColorInput from "@/components/ColorInput";

export default function Styling() {
  const { objects, selectedId, setObjects, setSelectedId } = useObjects();
  const patchObject = usePatchObject();

  function update<K extends keyof Object>(key: K, value: Object[K]) {
    if (!selectedId) return;
    patchObject(selectedId, { [key]: value });
  }

  async function deleteObject() {
    try {
      const res = await fetch("/api/object", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: selectedId }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to delete object");
      }

      setObjects((prev) => prev.filter((object) => object._id !== selectedId));
      setSelectedId(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  const selectedObject = objects.find((o) => o._id === selectedId);

  if (!selectedObject) {
    return (
      <div className="m-auto text-sm text-white/60">
        Select an object to edit
      </div>
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
            <NumberInput
              label="X"
              value={selectedObject.x}
              onChange={(v) => update("x", v)}
            />
            <NumberInput
              label="Y"
              value={selectedObject.y}
              onChange={(v) => update("y", v)}
            />
          </div>
        </section>

        {/* SIZE */}
        <section>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-white/60">
            Size
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <NumberInput
              label="Width"
              value={selectedObject.width}
              onChange={(v) => update("width", v)}
            />
            <NumberInput
              label="Height"
              value={selectedObject.height}
              onChange={(v) => update("height", v)}
            />
          </div>
        </section>

        {/* LAYOUT */}
        <section>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-white/60">
            Layout
          </h3>

          <div className="space-y-2">
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
        </section>

        {/* SPACING */}
        <section>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-white/60">
            Spacing
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <NumberInput
              label="Margin"
              value={selectedObject.margin}
              onChange={(v) => update("margin", v)}
            />
            <NumberInput
              label="Padding"
              value={selectedObject.padding}
              onChange={(v) => update("padding", v)}
            />
            <NumberInput
              label="Row Gap"
              value={selectedObject.rowGap}
              onChange={(v) => update("rowGap", v)}
            />
            <NumberInput
              label="Column Gap"
              value={selectedObject.columnGap}
              onChange={(v) => update("columnGap", v)}
            />
          </div>
        </section>

        {/* APPEARANCE */}
        <section>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-white/60">
            Appearance
          </h3>

          <ColorInput
            label="Background"
            value={selectedObject.backgroundColor}
            onChange={(v) => update("backgroundColor", v)}
          />
        </section>

        {/* BORDER & SHADOW */}
        <section>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-white/60">
            Border & Shadow
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <NumberInput
              label="Radius"
              value={selectedObject.borderRadius}
              onChange={(v) => update("borderRadius", v)}
            />
            <NumberInput
              label="Border Width"
              value={selectedObject.borderWidth}
              onChange={(v) => update("borderWidth", v)}
            />
            <NumberInput
              label="Shadow"
              value={selectedObject.boxShadow}
              onChange={(v) => update("boxShadow", v)}
            />
          </div>

          <div className="mt-2">
            <ColorInput
              label="Border Color"
              value={selectedObject.borderColor}
              onChange={(v) => update("borderColor", v)}
            />
          </div>
        </section>

        {/* CONTENT */}
        <section>
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-white/60">
            Content
          </h3>

          <label className="flex flex-col gap-1">
            <span className="text-xs text-white/70">Text</span>
            <input
              type="text"
              value={selectedObject.text}
              onChange={(e) => update("text", e.target.value)}
              className="h-8 rounded-md border border-white/20 bg-white/10 px-2 text-white outline-none focus:border-white/40"
            />
          </label>
        </section>

        {/* DELETE */}
        <section>
          <button
            onClick={deleteObject}
            className="w-full rounded-full bg-red-500 py-2 text-white"
          >
            Delete Object
          </button>
        </section>
      </div>
    </div>
  );
}
