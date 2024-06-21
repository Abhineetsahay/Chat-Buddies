const express = require("express");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const Contact = require("./models/Contacts");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:3000"
}));
require("./config/database").connect();
app.use(express.json());

const auth = require("./routes/Auth");
const search = require("./routes/Search");
const chatRetrieving = require("./routes/RetriveChat");
const deleteChat = require("./routes/Delete.Chat.Account");

app.use("/auth", auth);
app.use("/searchFriend", search);
app.use("/chatHistory", chatRetrieving);
app.use("/DeleteChatAccount", deleteChat);

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
  socket.on("message", async (data) => {
    try {
      const chat = {
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        timestamp: data.timestamp,
      };

      // Save the message in the Chat collection
      // Update the chat array in the Contact document
      await Contact.updateOne(
        { name: data.sender, "contacts.name": data.receiver },
        { $push: { "contacts.$.chats": chat } }
      );

      await Contact.updateOne(
        { name: data.receiver, "contacts.name": data.sender },
        { $push: { "contacts.$.chats": chat } }
      );

      io.emit("message", data);
    } catch (error) {
      console.log(error.message);
    }
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("status", (data) => {
    io.emit("status", { id: socket.id, status: data });
  });

  socket.on("disconnect", () => {
    // console.log("A user disconnected: " + socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server started at Port No. ${PORT}`);
});
