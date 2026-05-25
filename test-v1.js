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

async function testV1() {
    const apiKey = getApiKey();
    // THE ONLY WAY to use v1 in the current SDK is sometimes to use manual fetch or check if the constructor supports it
    // Actually, let's try a manual fetch to v1 instead of v1beta
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    console.log("Testing v1 URL...");
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: "Hi" }] }] })
        });
        const data = await res.json();
        if (res.ok) {
            console.log("SUCCESS with v1 REST!");
        } else {
            console.log("FAILED with v1 REST:", data.error?.message);
        }
    } catch (e) {
        console.log("ERROR with v1 REST:", e.message);
    }
}

testV1();
