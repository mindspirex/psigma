import { ObjectModel, ProjectModel } from "@/db/schema";
import dbConnect from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/utility/authentication";

export async function GET(request: NextRequest) {
  // get projectId from query parameters
  const projectId = request.nextUrl.searchParams.get("projectId");
  if (!projectId) {
    console.log("projectId is undefined");
    return NextResponse.json(
      { message: "projectId is required" },
      { status: 400 },
    );
  }

  // authentication
  let userId;
  try {
    userId = await getAuthUser();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "user not authenticated" },
      { status: 401 },
    );
  }

  // connect db
  try {
    await dbConnect();
  } catch (error) {
    console.log(error);
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
    console.log("project is undefined");
    return NextResponse.json({ error: "user not authorized" }, { status: 403 });
  }

  // getting objects from db
  let objects;
  try {
    objects = await ObjectModel.find({ projectId }).lean();
  } catch (error) {
    console.log(error);
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
    console.log("projectId doesn't exist");
    return NextResponse.json(
      { message: "projectId is required" },
      { status: 400 },
    );
  }

  // authentication
  let userId;
  try {
    userId = await getAuthUser();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "user not authenticated" },
      { status: 401 },
    );
  }

  // connect db
  try {
    await dbConnect();
  } catch (error) {
    console.log(error);
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
    console.log("project is undefined");
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
  } catch (error) {
    console.log(error);
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
    console.log("_id or projectId is undefined");
    return NextResponse.json(
      { message: "objectId and projectId required" },
      { status: 400 },
    );
  }

  // authentication
  let userId;
  try {
    userId = await getAuthUser();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "user not authenticated" },
      { status: 401 },
    );
  }

  // connect db
  try {
    await dbConnect();
  } catch (error) {
    console.log(error);
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
    console.log("project is undefined");
    return NextResponse.json({ error: "user not authorized" }, { status: 403 });
  }

  // modify object on db
  const updated = await ObjectModel.findByIdAndUpdate(
    _id,
    { $set: data },
    { new: true },
  );
  if (!updated) {
    console.log("updated is undefined");
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
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "objectId is required" },
      { status: 400 },
    );
  }
  if (!_id) {
    console.log("_id is undefined");
    return NextResponse.json(
      { message: "objectId is required" },
      { status: 400 },
    );
  }

  // authentication
  let userId;
  try {
    userId = await getAuthUser();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "user not authenticated" },
      { status: 401 },
    );
  }

  // connect db
  try {
    await dbConnect();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }

  // get projectId
  const object = await ObjectModel.findById(_id);
  if (!object) {
    console.log("object is undefined");
    return NextResponse.json(
      { message: "object doesn't exist" },
      { status: 404 },
    );
  }
  const projectId = object.projectId;
  if (!projectId) {
    console.log("projectId is undefined");
    return NextResponse.json({ message: "invalid object" }, { status: 400 });
  }

  // authorization
  const project = await ProjectModel.findOne({
    _id: projectId,
    ownerId: userId,
  });
  if (!project) {
    console.log("project is undefined");
    return NextResponse.json({ error: "user not authorized" }, { status: 403 });
  }

  // delete object
  try {
    const deleted = await ObjectModel.findByIdAndDelete(_id);

    if (!deleted) {
      console.log("deleted is undefined");
      return NextResponse.json({ error: "Object not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
