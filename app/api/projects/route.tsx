import { getAuthUser } from "@/utility/auth";
import { ProjectModel, UserModel } from "@/db/schema";
import dbConnect from "@/db/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // get user if user if logged in
    const user = await getAuthUser();

    await dbConnect();

    const projects = await ProjectModel.find({
      ownerId: user._id,
    });

    return Response.json(projects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // get user if user is logged in
    const user = await getAuthUser();

    await dbConnect();

    const body = await request.json();
    const { name } = body;

    if (!name) {
      return Response.json(
        { message: "Project name is required" },
        { status: 400 },
      );
    }

    const project = await ProjectModel.create({
      name,
      ownerId: user._id,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // get authenticated user
    const user = await getAuthUser();
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("id");

    if (!projectId) {
      return NextResponse.json(
        { message: "Project id is required" },
        { status: 400 },
      );
    }

    const deletedProject = await ProjectModel.findOneAndDelete({
      _id: projectId,
      ownerId: user._id, // ownership check
    });

    if (!deletedProject) {
      return NextResponse.json(
        { message: "Project not found or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
