import "dotenv/config.js";
import http from "http";


import app from "./app.js";
import connectDatabase from "./config/database.config.js";

import { initializeSocket } from "./socket/socket.js";



const PORT = process.env.PORT || 5000;

connectDatabase();

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});