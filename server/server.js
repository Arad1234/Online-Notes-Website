const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const socketHandler = require("./handlers/socketHandlers");
const authRouter = require("./routes/authRoutes");

const app = express();
const server = http.createServer(app);
const socketServer = new Server(server, {
  cors: { origin: ["http://localhost:5173"] },
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
  console.log("Connected to DB");
});

app.use("/api/auth", authRouter);

// Middleware that every client that try to connect to the socket connection needs to verify their token first.
socketServer.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);

    socket.user = user;
    next();
  } catch (error) {
    next(new Error("Authorization error"));
  }
});

// After the middleware verified the token successfully, this event listener is triggered.
socketServer.on("connection", (socket) => {
  console.log("Client connected!");
  // Calling the socketHandler function to handle sockets events.
  socketHandler(socket, socketServer); // Passing the socketServer server instance to emit events to all connected clients.
});

server.listen(3000, () => {
  console.log("Server on 3000");
});
