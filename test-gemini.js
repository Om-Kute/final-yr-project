const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

function getApiKey() {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
        const env = fs.readFileSync(envPath, "utf8");
        const match = env.match(/GEMINI_API_KEY=(.*)/);
        if (match && match[1]) return match[1].trim().replace(/["']/g, '');
    }
    return process.env.GEMINI_API_KEY;
}

async function runDiagnostics() {
    const apiKey = getApiKey();
    if (!apiKey) {
        console.error("No API key found");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    console.log("--- Listing Available Models ---");
    try {
        const models = await genAI.listModels();
        for (const m of models.models) {
            console.log(`Model: ${m.name}, Methods: ${m.supportedGenerationMethods.join(', ')}`);
        }
    } catch (e) {
        console.error("Error listing models:", e.message);
    }

    console.log("\n--- Testing Content Generation ---");
    const testModel = "gemini-1.5-flash";
    try {
        const model = genAI.getGenerativeModel({ model: testModel });
        const result = await model.generateContent("Hi");
        console.log(`Success with ${testModel}`);
    } catch (e) {
        console.error(`Failed with ${testModel}:`, e.message);
    }
}

runDiagnostics();
