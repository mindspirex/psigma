"use client";

import { useObjects, Obj } from "@/context/ObjectsContext";

export default function Sidebar() {
  const { objects, setObjects, selectedId } = useObjects();

  const selected = objects.find((o) => o._id === selectedId);

  function update<K extends keyof Obj>(key: K, value: Obj[K]) {
    setObjects((objects) => {
      const i = objects.findIndex((o) => o._id === selectedId);
      if (i === -1) return objects;

      const copy = [...objects];
      copy[i] = { ...copy[i], [key]: value };
      return copy;
    });
  }

  return (
    <aside
      className={`
        absolute top-0 h-screen w-60
        bg-foreground text-white p-5 z-10 right-0
      `}
    >
      {selected && (
        <div className="space-y-3">
          <h2 className="font-bold text-lg">Object Properties</h2>

          {/* POSITION */}
          <label>
            X
            <input
              type="number"
              value={selected.x}
              onChange={(e) => update("x", Number(e.target.value))}
            />
            Y
            <input
              type="number"
              value={selected.y}
              onChange={(e) => update("y", Number(e.target.value))}
            />
          </label>

          {/* SIZE */}
          <label>
            Width
            <input
              type="number"
              value={selected.width}
              onChange={(e) => update("width", Number(e.target.value))}
            />
          </label>

          <label>
            Height
            <input
              type="number"
              value={selected.height}
              onChange={(e) => update("height", Number(e.target.value))}
            />
          </label>

          {/* FLEX TOGGLE */}
          <label>
            Flex
            <input
              type="checkbox"
              checked={selected.isFlex}
              onChange={(e) => update("isFlex", e.target.checked)}
            />
          </label>

          {selected.isFlex && (
            <>
              <label>
                Justify Content
                <select
                  value={selected.justifyContent}
                  onChange={(e) => update("justifyContent", e.target.value)}
                >
                  <option>flex-start</option>
                  <option>flex-end</option>
                  <option>center</option>
                  <option>space-between</option>
                  <option>space-around</option>
                  <option>space-evenly</option>
                </select>
              </label>

              <label>
                Align Items
                <select
                  value={selected.alignItems}
                  onChange={(e) => update("alignItems", e.target.value)}
                >
                  <option>stretch</option>
                  <option>flex-start</option>
                  <option>flex-end</option>
                  <option>center</option>
                  <option>baseline</option>
                </select>
              </label>
            </>
          )}

          {/* BACKGROUND COLOR */}
          <label>
            Background
            <input
              type="color"
              value={`#${(
                (1 << 24) +
                (selected.backgroundColor.red << 16) +
                (selected.backgroundColor.green << 8) +
                selected.backgroundColor.blue
              )
                .toString(16)
                .slice(1)}`}
              onChange={(e) => {
                const hex = e.target.value;
                update("backgroundColor", {
                  red: parseInt(hex.slice(1, 3), 16),
                  green: parseInt(hex.slice(3, 5), 16),
                  blue: parseInt(hex.slice(5, 7), 16),
                });
              }}
            />
          </label>
        </div>
      )}
    </aside>
  );
}
