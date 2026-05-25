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

async function testAliases() {
    const apiKey = getApiKey();
    const genAI = new GoogleGenerativeAI(apiKey);

    const aliases = ["gemini-1.5-flash-latest", "gemini-1.5-flash-001", "gemini-1.5-flash-002", "gemini-pro"];

    for (const alias of aliases) {
        console.log(`Testing alias: ${alias}...`);
        try {
            const model = genAI.getGenerativeModel({ model: alias });
            const result = await model.generateContent("Hi");
            const response = await result.response;
            console.log(`SUCCESS for ${alias}:`, response.text());
        } catch (e) {
            console.log(`FAILED for ${alias}:`, e.message);
        }
    }
}

testAliases();
