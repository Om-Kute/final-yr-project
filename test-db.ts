import mongoose from "mongoose";
import dns from "dns";

const MONGODB_URI = process.env.MONGODB_URI || "";

console.log("🔍 Starting MongoDB Connectivity Debug...");
dns.setServers(['8.8.8.8', '8.8.4.4']); // Use Google Public DNS
console.log("Current URI:", MONGODB_URI.replace(/:([^:@]+)@/, ":****@")); // Hide password

async function debugDNS() {
    console.log("\n1. Testing DNS SRV Resolution...");
    try {
        const records = await dns.promises.resolveSrv("_mongodb._tcp.cluster0.4lmeemw.mongodb.net");
        console.log("✅ SRV Records found:", records);
    } catch (err: any) {
        console.error("❌ SRV DNS Resolution Failed:", err.message);
        console.info("TIP: This usually means your DNS provider (mobile hotspot) is blocking MongoDB Atlas records.");
    }

    console.log("\n2. Testing Normal DNS Resolution...");
    try {
        const address = await dns.promises.lookup("ac-atrilfs-shard-00-00.4lmeemw.mongodb.net");
        console.log("✅ Shard Hostname resolved to:", address.address);
    } catch (err: any) {
        console.error("❌ Shard Hostname Resolution Failed:", err.message);
    }
}

async function debugConnection() {
    console.log("\n3. Testing Mongoose Connection Method...");
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            family: 4,
        });
        console.log("✅ SUCCESS: Connected to MongoDB!");
        await mongoose.disconnect();
    } catch (err: any) {
        console.error("❌ Connection Failed:", err.message);
        if (err.message.includes("timeout")) {
            console.info("TIP: Port 27017 is likely blocked by your mobile network.");
        }
    }
}

async function run() {
    if (!MONGODB_URI) {
        console.error("No MONGODB_URI found in environment.");
        return;
    }
    await debugDNS();
    await debugConnection();
    process.exit();
}

run();
