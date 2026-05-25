import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { LocalDB } from "@/lib/localDb";

// Define Project Schema if not exists (Inline for simplicity in API)
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

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, ...projectData } = body;

        // Enforce MongoDB
        await connectDB();
        const project = await Project.findOneAndUpdate(
            { id: projectData.id },
            { userId, ...projectData },
            { upsert: true, returnDocument: 'after' } // Fixed deprecation: used returnDocument instead of new
        );
        return NextResponse.json({ success: true, project });

    } catch (error: any) {
        console.error("Save Project Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message?.includes("connection") ? "Database connection failed" : "Server Error"
        }, { status: 500 });
    }
}
