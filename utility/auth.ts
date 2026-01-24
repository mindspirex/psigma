import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnect from "@/db/mongodb";
import { UserModel } from "@/db/schema";

export interface AuthPayload extends JwtPayload {
  email: string;
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET_MISSING");
  }

  let decoded: AuthPayload;

  try {
    decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch (error) {
    console.error(error);
    throw new Error("INVALID_TOKEN");
  }

  await dbConnect();

  const user = await UserModel.findOne({ email: decoded.email });
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return user;
}
