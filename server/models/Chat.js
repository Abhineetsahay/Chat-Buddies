// models/Chat.js
const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true // This will automatically add `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model("Chat", ChatSchema);
