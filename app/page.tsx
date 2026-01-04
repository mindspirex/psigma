import clientPromise from "@/db/mongodb";
import { Obj } from "@/types/Obj";
import RenderObject from "@/components/RenderObject";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";

async function getObjects(): Promise<Obj[]> {
  const client = await clientPromise;
  const db = client.db("psigma");

  return db.collection<Obj>("objects").find({}).toArray();
}

export default async function Page() {
  const objects = await getObjects();

  return (
    <main>
      <LeftSideBar />
      <RightSideBar />
      {objects.map((o) => (
        <RenderObject key={o._id} obj={o} />
      ))}
    </main>
  );
}
