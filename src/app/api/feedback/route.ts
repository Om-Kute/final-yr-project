import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Removed LocalDB Fallback for Feedback

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, rating, comment, userName } = body;

        // Enforce MongoDB
        await connectDB();
        const FeedbackSchema = new mongoose.Schema({
            userId: String,
            userName: String,
            rating: Number,
            comment: String,
            createdAt: { type: Date, default: Date.now }
        });

        const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
        await Feedback.create({ userId, userName, rating, comment });

        return NextResponse.json({ success: true, message: "Feedback saved to MongoDB" });

    } catch (error: any) {
        console.error("Feedback error:", error);
        return NextResponse.json({
            success: false,
            error: error.message?.includes("connection") ? "Database connection failed" : "Server error"
        }, { status: 500 });
    }
}