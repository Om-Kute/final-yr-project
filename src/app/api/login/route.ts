import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { LocalDB } from "@/lib/localDb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Connect to MongoDB
    await connectDB();
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      return NextResponse.json({ success: true, user });
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 400 });
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({
      success: false,
      error: error.message?.includes("connection") ? "Database connection failed" : "Server Error"
    }, { status: 500 });
  }
}