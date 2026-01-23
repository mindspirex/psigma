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
