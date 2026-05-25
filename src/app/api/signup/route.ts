import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { LocalDB } from "@/lib/localDb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Enforce MongoDB
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return NextResponse.json({ success: true, user });

  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json({
      success: false,
      error: error.message?.includes("connection") ? "Database connection failed" : "Server Error"
    }, { status: 500 });
  }
}