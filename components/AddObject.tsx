import { useObjects, Obj } from "@/utility/ObjectsContext";

export default function AddObject() {
  const { setObjects } = useObjects();

  const defaultObj: Obj = {
    id: "temporary id",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    backgroundColor: "#ff0000",
    isFlex: false,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 0,
    columnGap: 0,
    children: [],
  };

  async function clickHandler() {
    try {
      const res = await fetch("/api/objects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(defaultObj),
      });

      if (!res.ok) {
        throw new Error("Failed to create object");
      }

      const data: { id: string } = await res.json();

      const createdObj: Obj = {
        ...defaultObj,
        id: data.id,
      };

      setObjects((prev) => [...prev, createdObj]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button className="w-10 h-10 bg-blue-500" onClick={clickHandler} />
    </div>
  );
}
