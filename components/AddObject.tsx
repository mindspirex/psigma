import { useObjects, Object } from "@/utility/useObjects";
import { usePathname } from "next/navigation";

export default function AddObject() {
  const { setObjects, setSelectedId } = useObjects();

  // finding projectId
  const pathname = usePathname();
  const projectId = pathname.split("/").pop();

  async function clickHandler() {
    try {
      const res = await fetch(`/api/object?projectId=${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create object");
      }

      const createdObject: Object = await res.json();

      setObjects((prev) => [...prev, createdObject]);
      setSelectedId(createdObject._id);
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
