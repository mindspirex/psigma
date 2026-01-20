import { ObjectModel } from "@/db/schema";
import dbConnect from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const objects = await ObjectModel.find().lean();

    return NextResponse.json(
      objects.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id.toString(),
      })),
    );
  } catch (err) {
    console.error("GET /object error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { id, ...data } = body;

    const created = await ObjectModel.create(data);

    return NextResponse.json({ id: created._id.toString() }, { status: 201 });
  } catch (err) {
    console.error("POST /object error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const { id, ...data } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const updated = await ObjectModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json({ error: "Object not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Object updated successfully" });
  } catch (err) {
    console.error("PATCH /object error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const deleted = await ObjectModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Object not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /object error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
