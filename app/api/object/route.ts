import { ObjectModel } from "@/db/schema";
import dbConnect from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/utility/auth";
import { ProjectModel } from "@/db/schema";

export async function GET(request: NextRequest) {
  // get projectId from query parameters
  const projectId = request.nextUrl.searchParams.get("projectId");
  if (!projectId) {
    return NextResponse.json(
      { error: "projectId is required" },
      { status: 400 },
    );
  }

  // authorization
  const userId = await getAuthUser();
  const project = await ProjectModel.findOne({
    _id: projectId,
    ownerId: userId,
  });
  if (!project) {
    return NextResponse.json({ error: "user not authorized" }, { status: 403 });
  }

  try {
    await dbConnect();

    const objects = await ObjectModel.find({ projectId }).lean();

    return NextResponse.json(
      objects.map(({ _id, ...rest }) => ({
        ...rest,
        _id: _id.toString(),
      })),
    );
  } catch (error) {
    console.error("GET /object error:", error);
    return NextResponse.json(
      { error: "internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  // get projectId from query parameters
  const projectId = request.nextUrl.searchParams.get("projectId");
  if (!projectId) {
    return NextResponse.json(
      { error: "projectId is required" },
      { status: 400 },
    );
  }

  // authorization
  const userId = await getAuthUser();
  const project = await ProjectModel.findOne({
    _id: projectId,
    ownerId: userId,
  });
  if (!project) {
    return NextResponse.json({ error: "user not authorized" }, { status: 403 });
  }

  let _id;
  let rest;
  try {
    await dbConnect();
    const created = await ObjectModel.create({
      projectId: projectId,
    });

    ({ _id, ...rest } = created._doc);
  } catch (err) {
    console.error("POST /object error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ _id: _id.toString(), ...rest }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const { _id, ...data } = await req.json();

    if (!_id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const updated = await ObjectModel.findByIdAndUpdate(
      _id,
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

    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const deleted = await ObjectModel.findByIdAndDelete(_id);

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
