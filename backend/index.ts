import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

import app from "./src/app";
import { connectDB } from "./src/config/database";
import { createServer } from "node:http";
import { initializeSocket } from "./src/utils/socket";

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

initializeSocket(httpServer);

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });
