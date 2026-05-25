import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const DEFAULT_MODEL = "gemini-1.5-flash-latest";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not set in environment" },
                { status: 500 }
            );
        }

        const { idea, difficulty, features } = await req.json();

        if (!idea) {
            return NextResponse.json(
                { error: "Project idea is required" },
                { status: 400 }
            );
        }

        const featureList = Object.entries(features || {})
            .filter(([_, v]) => v)
            .map(([k]) => `- ${k}`)
            .join('\n');

        const prompt = `
    Act as an Expert Full-stack Software Architect.
    Generate a JSON system architecture for: "${idea}" (Difficulty: ${difficulty})
    Features requested:
    ${featureList}
    
    You MUST return ONLY a valid JSON object with this structure:
    {
      "title": "Professional Title",
      "description": "Short overview",
      "techStack": { "frontend": [], "backend": [], "database": [] },
      "architecture": ["Component A", "Component B"],
      "flow": ["Step 1 -> Step 2"],
      "database": ["Table A (fields)", "Table B"],
      "features": ["Feature details"]
    }
    
    Return ONLY JSON. No explanations.
    `;

        const genAI = new GoogleGenerativeAI(apiKey);

        // --- AUTO-FALLBACK DISCOVERY ---
        let modelToUse = DEFAULT_MODEL;
        let result;

        try {
            const model = genAI.getGenerativeModel({ model: modelToUse });
            result = await model.generateContent(prompt);
        } catch (error: any) {
            const msg = error?.message || "";
            if (msg.includes("404") || msg.includes("not found")) {
                console.warn(`Primary model ${modelToUse} not found. Discovering alternatives...`);

                // Fetch list of models manually (SDK listModels can be inconsistent across versions)
                const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
                const listData = await listRes.json();

                if (listData.models && Array.isArray(listData.models)) {
                    // Look for any model containing "flash" or "pro"
                    const candidates = listData.models
                        .filter((m: any) => m.supportedGenerationMethods.includes("generateContent"))
                        .map((m: any) => m.name.replace("models/", ""))
                        .sort((a: string, b: string) => b.localeCompare(a)); // Pick newer/later versions

                    const fallback = candidates.find((c: string) => c.includes("flash")) || candidates[0];
                    if (fallback) {
                        console.info(`Switching to fallback model: ${fallback}`);
                        modelToUse = fallback;
                        const fallbackModel = genAI.getGenerativeModel({ model: modelToUse });
                        result = await fallbackModel.generateContent(prompt);
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
        const text = response.text();

        if (!text) {
            return NextResponse.json({ error: "Empty response from AI engine" }, { status: 500 });
        }

        let cleanedJson = text.trim();
        if (cleanedJson.includes("```")) {
            cleanedJson = cleanedJson.replace(/```json|```/gi, "").trim();
        }

        const start = cleanedJson.indexOf('{');
        const end = cleanedJson.lastIndexOf('}');
        if (start !== -1 && end !== -1) {
            cleanedJson = cleanedJson.substring(start, end + 1);
        }

        const parsed = JSON.parse(cleanedJson);
        return NextResponse.json(parsed);

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Generate API Error:", message);

        let status = 500;
        let userMessage = message;

        if (message.includes("429") || message.includes("quota")) {
            status = 429;
            userMessage = "API Quota exceeded. Please try again later.";
        } else if (message.includes("404") || message.includes("not found")) {
            userMessage = "Model not found. Please ensure your Gemini API key is active and has access to current models.";
        }

        return NextResponse.json({ error: userMessage }, { status });
    }
}
