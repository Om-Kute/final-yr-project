import { NextResponse } from "next/server";
import Chat from "@/models/Chat";
import { connectDB } from "@/lib/mongodb"
import Project from "@/models/ProjectPrompt";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { LocalDB } from "@/lib/localDb";

const DEFAULT_MODEL = "gemini-1.5-flash-latest";

export async function POST(req: Request) {

    await connectDB();

    try {

        const body = await req.json();

        const userMessage = body.userMessage;
        const userId = body.userId || "Guest_User";

        // API Request using Gemini
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY missing");
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        let modelToUse = DEFAULT_MODEL;
        let result;

        try {
            const model = genAI.getGenerativeModel({ model: modelToUse });
            result = await model.generateContent(userMessage);
        } catch (error: any) {
            const msg = error?.message || "";
            if (msg.includes("404") || msg.includes("not found")) {
                console.warn(`Primary model ${modelToUse} not found for Chat. Discovering alternatives...`);

                // Fetch list of models manually
                const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
                const listData = await listRes.json();

                if (listData.models && Array.isArray(listData.models)) {
                    const candidates = listData.models
                        .filter((m: any) => m.supportedGenerationMethods.includes("generateContent"))
                        .map((m: any) => m.name.replace("models/", ""))
                        .sort((a: string, b: string) => b.localeCompare(a));

                    const fallback = candidates.find((c: string) => c.includes("flash")) || candidates[0];
                    if (fallback) {
                        console.info(`Switching Chat to fallback model: ${fallback}`);
                        modelToUse = fallback;
                        const fallbackModel = genAI.getGenerativeModel({ model: modelToUse });
                        result = await fallbackModel.generateContent(userMessage);
                    } else {
                        throw error;
                    }
                } else {
                    throw error;
                }
            } else {
                throw error;
            }
        }

        const response = await result.response;
        const reply = response.text() || "No AI response received.";

        // Save Chat (Strictly MongoDB)
        await Chat.create({
            userId,
            userMessage,
            aiReply: reply,
        });

        return NextResponse.json({
            success: true,
            reply,
        });

    } catch (error: any) {

        console.error(
            "GEMINI CHAT ERROR:",
            error?.message || error
        );

        return NextResponse.json(
            {
                success: false,
                error: "Server Error",
            },
            {
                status: 500,
            }
        );
    }
}