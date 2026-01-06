import clientPromise from "@/db/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("psigma");

  const objects = await db.collection("objects").find({}).toArray();

  return NextResponse.json(
    objects.map((o) => ({ ...o, _id: o._id.toString() })),
  );
}
