import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "logout successful" });

  // edit cookie
  res.cookies.set("access_token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return res;
}
