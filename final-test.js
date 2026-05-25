const mongoose = require('mongoose');
const dns = require('dns');
const MONGODB_URI = "mongodb://anandkale9876_db_user:wcpB9Mn9iNF4jpT5@ac-atrilfs-shard-00-00.4lmeemw.mongodb.net:27017,ac-atrilfs-shard-00-01.4lmeemw.mongodb.net:27017,ac-atrilfs-shard-00-02.4lmeemw.mongodb.net:27017/test?replicaSet=atlas-4lmeemw-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority";

async function test() {
    console.log("🚀 FINAL TEST: Connecting via Legacy String...");
    console.log("URI Format check:", MONGODB_URI.startsWith("mongodb://") ? "✅ LEGACY DETECTED" : "❌ STILL SRV");

    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 15000,
            family: 4,
        });
        console.log("✅ SUCCESS: Connected to MongoDB via Legacy String!");
        await mongoose.disconnect();
    } catch (err) {
        console.error("❌ Final Attempt Failed:", err.message);
    }
    process.exit();
}

test();
