import jwt, { JwtPayload } from "jsonwebtoken";
import { ProjectModel, UserModel } from "@/db/schema";
import { cookies } from "next/headers";
import dbConnect from "@/db/mongodb";

interface AuthPayload extends JwtPayload {
  email: string;
}

export async function GET() {
  // get jwt from header
  const cookieStore = await cookies();
  console.log(cookieStore.getAll());
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  // get JWT_SECRET
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;

    await dbConnect();

    // find user with said email
    const user = await UserModel.findOne({ email: decoded.email });
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    // find projects of the user
    const projects = await ProjectModel.find({
      ownerId: user._id,
    });

    return Response.json(projects, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
