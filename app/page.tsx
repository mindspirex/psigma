import clientPromise from "@/db/mongodb";
import { Obj } from "@/types/Obj";
import RenderObject from "@/components/RenderObject";
import Sidebar from "@/components/SideBar";

async function getObjects(): Promise<Obj[]> {
  const client = await clientPromise;
  const db = client.db("psigma");

  return db.collection<Obj>("objects").find({}).toArray();
}

export default async function Page() {
  const objects = await getObjects();

  return (
    <main>
      <Sidebar />
      {objects.map((o) => (
        <RenderObject key={o._id} obj={o} />
      ))}
    </main>
  );
}
