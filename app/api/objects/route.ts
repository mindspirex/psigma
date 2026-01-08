import clientPromise from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("psigma");

    const objects = await db.collection("objects").find({}).toArray();

    return NextResponse.json(
      objects.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id.toString(),
      })),
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    const client = await clientPromise;
    const db = client.db("psigma");

    await db
      .collection("objects")
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });

    return NextResponse.json({ Message: "Object updated sucessfully" });
  } catch (err) {
    console.error("PATCH /objects error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    const client = await clientPromise;
    const db = client.db("psigma");

    const result = await db.collection("objects").insertOne({
      _id: new ObjectId(),
      ...data,
    });

    return NextResponse.json(
      {
        id: result.insertedId,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /objects error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
