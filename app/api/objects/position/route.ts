import clientPromise from "@/db/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { _id, x, y } = await req.json();

  if (!_id || x === undefined || y === undefined) {
    return NextResponse.json({ error: "Missing id, x, or y" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("psigma");

  await db
    .collection("objects")
    .updateOne({ _id: new ObjectId(_id) }, { $set: { x, y } });

  return NextResponse.json({ success: true });
}
