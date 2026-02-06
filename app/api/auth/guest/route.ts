import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";

export async function POST(req: NextRequest) {
  // generate random credentions for guest user
  const UUID = randomUUID();

  // create guest user using random credentials
  const baseUrl = new URL(req.url).origin;
  let guestUserId;
  try {
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: UUID,
        email: UUID,
        password: UUID,
      }),
    });
    const data = await response.json();
    guestUserId = data._id;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to create guest user",
      },
      { status: 500 },
    );
  }

  // create jwt
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.error("JWT_SECRET not defined");
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }

  const token = jwt.sign(
    {
      _id: guestUserId,
    },
    JWT_SECRET,
    { expiresIn: "60m" },
  );

  // set http only cookie
  const res = NextResponse.json({ message: "Guest session created" });
  res.cookies.set("access_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
