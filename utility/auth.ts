import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export interface AuthPayload extends JwtPayload {
  email: string;
}

export async function getAuthPayload(): Promise<AuthPayload> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET_MISSING");
  }

  return jwt.verify(token, JWT_SECRET) as AuthPayload;
}
