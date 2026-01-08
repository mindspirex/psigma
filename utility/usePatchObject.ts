import { useObjects } from "./ObjectsContext";

export default function usePatchObject() {
  const { setObjects } = useObjects();

  return async function patchObject(id: string, fields: Record<string, any>) {
    await fetch("/api/objects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...fields }),
    });

    setObjects((prevObjects) =>
      prevObjects.map((obj) => (obj.id === id ? { ...obj, ...fields } : obj)),
    );
  };
}
