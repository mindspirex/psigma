import { createContext, useContext, useEffect, useState } from "react";

/* ---------- Types ---------- */
export type Object = {
  id: string;
  isTopLayerElement: boolean;
  position: string;

  x: number;
  y: number;
  width: number;
  height: number;

  backgroundColor: string;

  justifyContent: string;
  alignItems: string;
  rowGap: number;
  columnGap: number;

  children: string[];
};

type ObjectsContextValue = {
  objects: Object[];
  setObjects: React.Dispatch<React.SetStateAction<Object[]>>;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
};

/* ---------- Context ---------- */
const ObjectsContext = createContext<ObjectsContextValue | undefined>(
  undefined,
);

/* ---------- Provider ---------- */
export function ObjectsProvider({ children }: { children: React.ReactNode }) {
  const [objects, setObjects] = useState<Object[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/object");
      const data = await res.json();
      setObjects(data);
    }

    load();
  }, []);

  return (
    <ObjectsContext.Provider
      value={{ objects, setObjects, selectedId, setSelectedId }}
    >
      {children}
    </ObjectsContext.Provider>
  );
}

/* ---------- Hook ---------- */
export function useObjects() {
  const ctx = useContext(ObjectsContext);
  if (!ctx) throw new Error("useObjects must be used inside ObjectsProvider");
  return ctx;
}
