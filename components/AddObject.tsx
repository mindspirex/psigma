import { useObjects, Object } from "@/utility/useObjects";

export default function AddObject() {
  const { setObjects, setSelectedId } = useObjects();

  const defaultObj: Object = {
    id: "temporary id",
    isTopLayerElement: true,
    position: "absolute",

    x: 100,
    y: 100,
    width: 100,
    height: 100,

    backgroundColor: "#ff0000",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 0,
    columnGap: 0,
    children: [],
  };

  async function clickHandler() {
    try {
      const res = await fetch("/api/object", {
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

      const createdObj: Object = {
        ...defaultObj,
        id: data.id,
      };

      setObjects((prev) => [...prev, createdObj]);
      setSelectedId(data.id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button
        onClick={clickHandler}
        className="
          flex items-center justify-center
          w-full h-12 rounded-full
          bg-blue-600 text-white
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          active:scale-95
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
          transition-all duration-200
        "
      >
        Add Object
      </button>
    </div>
  );
}
