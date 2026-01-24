import { createContext, useContext, useEffect, useState } from "react";

/* ---------- Types ---------- */
export type Object = {
  id: string;
  projectId: string;

  isTopLayerElement: boolean;
  position: string;

  x: number;
  y: number;
  width: number;
  height: number;

  margin: number;
  padding: number;

  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  boxShadow: number;

  backgroundColor: string;

  justifyContent: string;
  alignItems: string;
  rowGap: number;
  columnGap: number;

  text: string;

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
export function ObjectsProvider({
  children,
  projectId,
}: {
  children: React.ReactNode;
  projectId: string;
}) {
  const [objects, setObjects] = useState<Object[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/object?projectId=${projectId}`);
      const data = await res.json();
      setObjects(data);
    }

    load();
  }, [projectId]);

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
