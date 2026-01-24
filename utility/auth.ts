import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export interface AuthPayload extends JwtPayload {
  userId: string;
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

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    return decoded;
  } catch {
    throw new Error("JWT_VERIFICATION_FAILED");
  }
}
