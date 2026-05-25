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

async function discoverAndTest() {
    const apiKey = getApiKey();
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.models) {
        console.log("No models found. Error:", JSON.stringify(data));
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Find all models that support generating content
    const candidates = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
    console.log(`Found ${candidates.length} candidates.`);

    for (const m of candidates) {
        const shortName = m.name.replace("models/", "");
        console.log(`Testing ${shortName}...`);
        try {
            const model = genAI.getGenerativeModel({ model: shortName });
            const result = await model.generateContent("Hi");
            console.log(`SUCCESS with ${shortName}:`, (await result.response).text());
            return;
        } catch (e) {
            console.log(`FAILED with ${shortName}: ${e.message}`);
        }
    }
}

discoverAndTest();
