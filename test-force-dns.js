const mongoose = require('mongoose');
const dns = require('dns');

// FORCE GOOGLE DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://anandkale9876_db_user:wcpB9Mn9iNF4jpT5@cluster0.4lmeemw.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

async function test() {
    console.log("🚀 Testing Mongoose with Programmatic Google DNS...");
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
            family: 4,
        });
        console.log("✅ SUCCESS: Connected to MongoDB via SRV using Google DNS!");
        await mongoose.disconnect();
    } catch (err) {
        console.error("❌ Still Failed:", err.message);
    }
    process.exit();
}

test();
