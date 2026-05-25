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

async function tryAnyModel() {
    const apiKey = getApiKey();
    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        const result = await genAI.listModels();
        const models = result.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
        console.log(`Found ${models.length} candidate models.`);

        for (const m of models.slice(0, 5)) {
            const name = m.name.replace("models/", ""); // SDK adds models/
            console.log(`Trying ${name}...`);
            try {
                const model = genAI.getGenerativeModel({ model: name });
                const res = await model.generateContent("Hi");
                console.log(`SUCCESS with ${name}:`, (await res.response).text());
                return;
            } catch (e) {
                console.log(`FAILED with ${name}:`, e.message);
            }
        }
    } catch (e) {
        console.log("CRITICAL ERROR:", e.message);
    }
}

tryAnyModel();
