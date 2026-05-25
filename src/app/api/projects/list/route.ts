import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { LocalDB } from "@/lib/localDb";

const ProjectSchema = new mongoose.Schema({
    id: Number,
    userId: String,
    title: String,
    description: String,
    techStack: Object,
    database: Array,
    features: Array,
    flow: Array,
    createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        // Enforce MongoDB
        await connectDB();
        const projects = await Project.find({ userId }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, projects });

    } catch (error: any) {
        console.error("List Projects Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message?.includes("connection") ? "Database connection failed" : "Server Error"
        }, { status: 500 });
    }
}
