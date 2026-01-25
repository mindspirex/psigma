import { getAuthUser } from "@/utility/authentication";
import { ProjectModel } from "@/db/schema";
import dbConnect from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
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

  // getting all projects of the user
  let projects;
  try {
    await dbConnect();

    projects = await ProjectModel.find({
      ownerId: userId,
    });
  } catch {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }

  return Response.json(projects, { status: 200 });
}

export async function POST(request: NextRequest) {
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

  // retrieve name from body
  const body = await request.json();
  if (!body?.name) {
    return Response.json(
      { message: "project name is required" },
      { status: 400 },
    );
  }
  const { name } = body;

  // create project on db
  let project;
  try {
    await dbConnect();

    project = await ProjectModel.create({
      name,
      ownerId: userId,
    });
  } catch {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }

  return NextResponse.json(project, { status: 201 });
}

export async function DELETE(request: NextRequest) {
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

  // get projectId from params
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("id");
  if (!projectId) {
    return NextResponse.json(
      { message: "projectId not found" },
      { status: 400 },
    );
  }

  // delete from db
  try {
    await dbConnect();

    const deletedProject = await ProjectModel.findOneAndDelete({
      _id: projectId,
      ownerId: userId,
    });

    if (!deletedProject) {
      return NextResponse.json(
        { message: "project not found" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "count not delete project" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Project deleted successfully" },
    { status: 200 },
  );
}
