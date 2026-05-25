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

async function listModels() {
    const apiKey = getApiKey();
    if (!apiKey) {
        console.error("No API key");
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) {
            console.error("API ERROR:", data.error?.message || "Unknown error");
            return;
        }
        console.log("Total models:", data.models?.length);
        data.models?.forEach(m => {
            console.log(`- ${m.name}`);
        });
    } catch (e) {
        console.error("FETCH ERROR:", e.message);
    }
}

listModels();
