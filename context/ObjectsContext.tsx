import { createContext, useContext, useEffect, useState } from "react";

export type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

export type AlignItems =
  | "stretch"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline";

export type Color = {
  red: number;
  green: number;
  blue: number;
};

export type Obj = {
  _id: string;
  x: number;
  y: number;
  width: number;
  height: number;

  backgroundColor: Color;

  isFlex: boolean;
  justifyContent: JustifyContent;
  alignItems: AlignItems;
  rowGap: number;
  columnGap: number;

  children: string[];
};

type ObjectsContextValue = {
  objects: Obj[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
};

const ObjectsContext = createContext<ObjectsContextValue | undefined>(
  undefined,
);

export function ObjectsProvider({ children }: { children: React.ReactNode }) {
  const [objects, setObjects] = useState<Obj[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/objects");
      const data = await res.json();
      setObjects(data);
    }

    load();
  }, []);

  return (
    <ObjectsContext.Provider value={{ objects, selectedId, setSelectedId }}>
      {children}
    </ObjectsContext.Provider>
  );
}

// helper hook so consumers are clean
export function useObjects() {
  const ctx = useContext(ObjectsContext);
  if (!ctx) throw new Error("useObjects must be used inside ObjectsProvider");
  return ctx;
}
