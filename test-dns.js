const dns = require('dns');

console.log("🔍 Running DNS Connectivity Test (Node.js native)...");

// Test with Default DNS first
dns.resolveSrv('_mongodb._tcp.cluster0.4lmeemw.mongodb.net', (err, addresses) => {
    if (err) {
        console.error("❌ Default DNS SRV Failed:", err.message);
    } else {
        console.log("✅ Default DNS SRV Successful:", addresses);
    }

    // Now try with Google DNS
    console.log("\n--- Switching to Google DNS (8.8.8.8) ---");
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    dns.resolveSrv('_mongodb._tcp.cluster0.4lmeemw.mongodb.net', (err2, addresses2) => {
        if (err2) {
            console.error("❌ Google DNS SRV Failed:", err2.message);
        } else {
            console.log("✅ Google DNS SRV Successful:", addresses2);
        }

        // Test normal lookup
        dns.lookup('ac-atrilfs-shard-00-00.4lmeemw.mongodb.net', (err3, address) => {
            if (err3) {
                console.error("\n❌ Shard Hostname Lookup Failed:", err3.message);
                process.exit();
            } else {
                console.log("\n✅ Shard Hostname Lookup Successful:", address);

                // Test Port 27017
                const net = require('net');
                console.log("\n4. Testing TCP connection to port 27017...");
                const socket = new net.Socket();
                socket.setTimeout(5000);

                socket.connect(27017, 'ac-atrilfs-shard-00-00.4lmeemw.mongodb.net', () => {
                    console.log("✅ SUCCESS: Port 27017 is OPEN!");
                    socket.destroy();
                    process.exit();
                });

                socket.on('error', (err4) => {
                    console.error("❌ Port 27017 is CLOSED/BLOCKED:", err4.message);
                    socket.destroy();
                    process.exit();
                });

                socket.on('timeout', () => {
                    console.error("❌ Port 27017 Connection TIMED OUT (Blocked by firewall?)");
                    socket.destroy();
                    process.exit();
                });
            }
        });
    });
});
