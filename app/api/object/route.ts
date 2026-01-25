import { ObjectModel } from "@/db/schema";
import dbConnect from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/utility/authentication";
import { ProjectModel } from "@/db/schema";

export async function GET(request: NextRequest) {
  // get projectId from query parameters
  const projectId = request.nextUrl.searchParams.get("projectId");
  if (!projectId) {
    return NextResponse.json(
      { message: "projectId is required" },
      { status: 400 },
    );
  }

  // authentication
  let userId;
  try {
    userId = await getAuthUser();
  } catch {
    return NextResponse.json(
      { message: "user not authenticated" },
      { status: 401 },
    );
  }

  // connect db
  try {
    await dbConnect();
  } catch {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }

  // authorization
  const project = await ProjectModel.findOne({
    _id: projectId,
    ownerId: userId,
  });
  if (!project) {
    return NextResponse.json({ error: "user not authorized" }, { status: 403 });
  }

  // getting objects from db
  let objects;
  try {
    objects = await ObjectModel.find({ projectId }).lean();
  } catch {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    objects.map(({ _id, ...rest }) => ({
      _id: _id.toString(),
      ...rest,
    })),
  );
}

export async function POST(request: NextRequest) {
  // get projectId from query parameters
  const projectId = request.nextUrl.searchParams.get("projectId");
  if (!projectId) {
    return NextResponse.json(
      { message: "projectId is required" },
      { status: 400 },
    );
  }

  // authentication
  let userId;
  try {
    userId = await getAuthUser();
  } catch {
    return NextResponse.json(
      { message: "user not authenticated" },
      { status: 401 },
    );
  }

  // connect db
  try {
    await dbConnect();
  } catch {
    return NextResponse.json(
      { message: "internal server errror" },
      { status: 500 },
    );
  }

  // authorization
  const project = await ProjectModel.findOne({
    _id: projectId,
    ownerId: userId,
  });
  if (!project) {
    return NextResponse.json({ error: "user not authorized" }, { status: 403 });
  }

  // add object to db
  let _id;
  let rest;
  try {
    const created = await ObjectModel.create({
      projectId: projectId,
    });

    ({ _id, ...rest } = created._doc);
  } catch {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ _id: _id.toString(), ...rest }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  // get data from body
  const { _id, ...data } = await req.json();
  const projectId = data.projectId;

  // check for undefined fields
  if (!_id || !projectId) {
    return NextResponse.json(
      { message: "objectId and projectId required" },
      { status: 400 },
    );
  }

  // authentication
  let userId;
  try {
    userId = await getAuthUser();
  } catch {
    return NextResponse.json(
      { message: "user not authenticated" },
      { status: 401 },
    );
  }

  // connect db
  try {
    await dbConnect();
  } catch {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }

  // authorization
  const project = await ProjectModel.findOne({
    _id: projectId,
    ownerId: userId,
  });
  if (!project) {
    return NextResponse.json({ error: "user not authorized" }, { status: 403 });
  }

  // modify object on db
  const updated = await ObjectModel.findByIdAndUpdate(
    _id,
    { $set: data },
    { new: true },
  );
  if (!updated) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "object updated successfully" },
    { status: 200 },
  );
}

export async function DELETE(req: NextRequest) {
  let _id;
  try {
    ({ _id } = await req.json());
  } catch {
    return NextResponse.json(
      { message: "objectId is required" },
      { status: 400 },
    );
  }
  if (!_id) {
    return NextResponse.json(
      { message: "objectId is required" },
      { status: 400 },
    );
  }

  // authentication
  let userId;
  try {
    userId = await getAuthUser();
  } catch {
    return NextResponse.json(
      { message: "user not authenticated" },
      { status: 401 },
    );
  }

  // connect db
  try {
    await dbConnect();
  } catch {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }

  // get projectId
  const object = await ObjectModel.findById(_id);
  if (!object) {
    return NextResponse.json(
      { message: "object doesn't exist" },
      { status: 404 },
    );
  }
  const projectId = object.projectId;
  if (!projectId) {
    return NextResponse.json({ message: "invalid object" }, { status: 400 });
  }

  // authorization
  const project = await ProjectModel.findOne({
    _id: projectId,
    ownerId: userId,
  });
  if (!project) {
    return NextResponse.json({ error: "user not authorized" }, { status: 403 });
  }

  // delete object
  try {
    const deleted = await ObjectModel.findByIdAndDelete(_id);

    if (!deleted) {
      return NextResponse.json({ error: "Object not found" }, { status: 404 });
    }
  } catch {
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
