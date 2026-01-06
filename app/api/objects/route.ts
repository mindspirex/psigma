import clientPromise from "@/db/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("psigma");

  const objects = await db.collection("objects").find({}).toArray();

  return NextResponse.json(
    objects.map((o) => ({ ...o, _id: o._id.toString() })),
  );
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { obj } = body;
    const { id, ...data } = obj;

    const client = await clientPromise;
    const db = client.db("psigma");

    await db
      .collection("objects")
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update object" },
      { status: 500 },
    );
  }
}
