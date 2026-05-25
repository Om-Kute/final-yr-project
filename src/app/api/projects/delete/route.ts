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

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const userId = searchParams.get("userId");

        if (!id || !userId) {
            return NextResponse.json({ success: false, error: "Missing ID or UserID" }, { status: 400 });
        }

        // Enforce MongoDB
        await connectDB();
        await Project.deleteOne({ id: Number(id), userId });

        // Cleanup LocalDB if it exists (optional but good for cleanup)
        LocalDB.deleteProject(Number(id));

        return NextResponse.json({ success: true, message: "Project deleted from MongoDB" });
    } catch (error: any) {
        console.error("Delete Project Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message?.includes("connection") ? "Database connection failed" : "Server Error"
        }, { status: 500 });
    }
}
