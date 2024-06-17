const express = require("express");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const Chat = require("./models/Chat");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:3000"
}));
require("./config/database").connect();
app.use(express.json());

const auth = require("./routes/Auth");
const search = require("./routes/Search");
const chatRetriving = require("./routes/RetriveChat");

app.use("/auth", auth);
app.use("/searchFriend", search);
app.use("/chatHistory", chatRetriving);

app.get("/", (req, res) => {
  res.send("<p>Hello, this is your Express server!</p>");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("message", async (data) => {
    console.log("Message received: ", data);
    try {
      const chat = new Chat({ 
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        timestamp: data.timestamp
      });
   
      await chat.save();
  
      io.emit("message", data); 
    } catch (error) {
      console.log(error.message);
    }
  });

  socket.on("typing", (data) => {
    console.log("Typing event received: ", data);
    socket.broadcast.emit("typing", data);
  });

  socket.on("status", (data) => {
    // console.log("Status update received: ", data);
    io.emit("status", { id: socket.id, status: data });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected: " + socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server started at Port No. ${PORT}`);
});
