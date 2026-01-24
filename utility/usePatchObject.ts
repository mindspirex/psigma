import { useObjects } from "@/utility/useObjects";

export function usePatchObject() {
  const { setObjects } = useObjects();

  return async function patchObject(
    _id: string,
    fields: Record<string, unknown>,
  ) {
    const sanitizedFields = {
      ...fields,
      ...(typeof fields.x === "number" && { x: Math.round(fields.x) }),
      ...(typeof fields.y === "number" && { y: Math.round(fields.y) }),
      ...(typeof fields.width === "number" && {
        width: Math.round(fields.width),
      }),
      ...(typeof fields.height === "number" && {
        height: Math.round(fields.height),
      }),
    };

    await fetch("/api/object", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id, ...sanitizedFields }),
    });

    setObjects((prevObjects) =>
      prevObjects.map((object) =>
        object._id === _id ? { ...object, ...sanitizedFields } : object,
      ),
    );
  };
}
