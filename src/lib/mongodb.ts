import mongoose from "mongoose";
import dns from "dns";

// FORCE GOOGLE DNS for the entire process
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  console.warn("⚠️ DNS override failed");
}

const MONGODB_URI_BASE = process.env.MONGODB_URI!;

let isConnected = false;

/**
 * SHARD HOSTNAMES (Manually listed for maximum DNS resilience)
 */
const SHARDS = [
  "ac-atrilfs-shard-00-00.4lmeemw.mongodb.net",
  "ac-atrilfs-shard-00-01.4lmeemw.mongodb.net",
  "ac-atrilfs-shard-00-02.4lmeemw.mongodb.net",
];

export async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;

  console.log("🔄 Initializing Intelligent MongoDB Discovery...");

  // Try each shard until we find the Primary (Writable) node
  for (const shard of SHARDS) {
    try {
      console.log(`📡 Attempting direct connection to: ${shard}...`);

      // Construct a direct connection URI to this specific shard
      const directUri = `mongodb://anandkale9876_db_user:wcpB9Mn9iNF4jpT5@${shard}:27017/test?directConnection=true&ssl=true&authSource=admin&retryWrites=true&w=majority`;

      await mongoose.connect(directUri, {
        serverSelectionTimeoutMS: 5000, // Quick fail if node is unreachable or backup
        connectTimeoutMS: 5000,
        family: 4,
      });

      // Check if this node is the Primary
      const isMasterResult = await mongoose.connection.db?.admin().command({ isMaster: 1 });

      if (isMasterResult && (isMasterResult.ismaster || isMasterResult.isWritablePrimary)) {
        console.log(`✅ SUCCESS: Found Writable Primary at ${shard}`);
        isConnected = true;
        return;
      } else {
        console.warn(`⏳ Node ${shard} is a Secondary (Read-Only). Moving to next...`);
        await mongoose.disconnect();
      }
    } catch (err: any) {
      console.warn(`❌ Connection to ${shard} failed: ${err.message}`);
      await mongoose.disconnect();
    }
  }

  // Final Fallback: If discovery fails, try the standard group string one last time
  console.log("⚠️ Discovery failed. Trying standard group connection as a last resort...");
  try {
    await mongoose.connect(MONGODB_URI_BASE, {
      serverSelectionTimeoutMS: 15000,
      family: 4,
    });
    isConnected = true;
    console.log("✅ Connected via Standard Group String.");
  } catch (finalErr: any) {
    console.error("⛔ ALL connection attempts failed. Check your IP whitelisting in MongoDB Atlas.");
    throw finalErr;
  }
}