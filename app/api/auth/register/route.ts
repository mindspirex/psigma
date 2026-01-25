import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/db/mongodb";
import { UserModel } from "@/db/schema";

export async function POST(req: Request) {
  // get from body
  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.log(error);
  }

  // destructure body
  const { name, email, password } = body;
  if (!name || !email || !password) {
    console.log("name or email or password is undefined");
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

  // connect db
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
  }

  // check if user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "user already exists" },
      { status: 409 },
    );
  }

  // hash password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error);
  }

  // create user on db
  try {
    await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 },
  );
}
