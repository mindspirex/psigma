import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/db/mongodb";
import { UserModel } from "@/db/schema";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
  // get email, password from body
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email or password is missing" },
      { status: 400 },
    );
  }

  // fetch user from db
  await connectDB();

  const user = await UserModel.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { message: "User doesn't exist" },
      { status: 401 },
    );
  }

  // verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  // create jwt
  const secret = JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET not defined");
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "15m",
  });

  // set http only cookie
  const res = NextResponse.json({ message: "Login successful" });
  res.cookies.set("access_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });
  return res;
}
