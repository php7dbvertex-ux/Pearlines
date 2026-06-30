import "dotenv/config.js";
import http from "http";
import dns from "dns";

import app from "./app.js";
import connectDatabase from "./config/database.config.js";

import { initializeSocket } from "./socket/socket.js";

dns.setDefaultResultOrder("ipv4first");

const PORT = process.env.PORT || 5000;

connectDatabase();

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});