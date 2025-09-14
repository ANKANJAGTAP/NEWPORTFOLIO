const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const ioServer = new Server(server, {
  cors: { origin: "*" },
});

ioServer.on("connection", (socket) => {
  console.log("client connected", socket.id);
  socket.emit("msgs-receive-init", []);
  socket.on("disconnect", () => console.log("disconnected", socket.id));
});

const PORT = process.env.SOCKET_PORT || 3001;
server.listen(PORT, () => console.log(`Socket server listening on :${PORT}`));