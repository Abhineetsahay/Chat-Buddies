const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
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
});

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  contacts: [{
    name: String,
    phone: Number,
    chats: [messageSchema]  // Embed messageSchema here
  }],
});

module.exports = mongoose.model("Contact", contactSchema);
