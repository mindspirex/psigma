import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export interface AuthPayload extends JwtPayload {
  userId: string;
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    throw new Error();
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error();
  }

  let decoded: AuthPayload;
  try {
    decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch {
    throw new Error();
  }

  return decoded;
}
