import { getAuthPayload } from "@/utility/auth";
import { ProjectModel, UserModel } from "@/db/schema";
import dbConnect from "@/db/mongodb";

export async function GET() {
  try {
    const decoded = await getAuthPayload();

    await dbConnect();

    const user = await UserModel.findOne({ email: decoded.email });
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const projects = await ProjectModel.find({
      ownerId: user._id,
    });

    return Response.json(projects, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
