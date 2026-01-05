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
  objects.forEach((o) => (o._id = o._id.toString()));

  return (
    <main>
      <LeftSideBar />
      <RightSideBar />
      <div className="canvas h-screen">
        {objects.map((o) => (
          <RenderObject key={o._id} obj={o} />
        ))}
      </div>
    </main>
  );
}
