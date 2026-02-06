import { NextResponse } from "next/server";

export async function POST() {
  // edit cookie
  const res = NextResponse.json({ message: "logout successful" });
  res.cookies.delete("access_token");

  return res;
}
