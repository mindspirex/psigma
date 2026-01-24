import { ObjectModel } from "@/db/schema";
import dbConnect from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/utility/auth";
import { ProjectModel } from "@/db/schema";

export async function GET(request: NextRequest) {
  // get projectId from URL
  const projectId = request.nextUrl.searchParams.get("projectId");
  if (!projectId) {
    return NextResponse.json(
      { error: "projectId is required" },
      { status: 400 },
    );
  }

  // authorization
  const user = await getAuthUser();
  const project = await ProjectModel.findOne({
    _id: projectId,
    ownerId: user._id,
  });
  if (!project) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await dbConnect();

    const objects = await ObjectModel.find({ projectId }).lean();

    return NextResponse.json(
      objects.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id.toString(),
      })),
    );
  } catch (error) {
    console.error("GET /object error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // getting projectId from body
    const body = await req.json();
    const { projectId } = body;

    await dbConnect();
    const created = await ObjectModel.create({
      projectId: projectId,
    });

    const { _id, __v, ...rest } = created._doc;

    return NextResponse.json(
      { id: created._id.toString(), ...rest },
      { status: 201 },
    );
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
