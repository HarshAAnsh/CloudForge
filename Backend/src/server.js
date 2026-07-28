require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const { Server } = require("socket.io");

const deployRoutes = require("./routes/deployRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", deployRoutes);

mongoose.connect(process.env.MONGO_URI);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

global.io = io;

io.on("connection", (socket) => {
  console.log("Client connected");
});

server.listen(5000, () => {
  console.log("API running on port 5000");
});