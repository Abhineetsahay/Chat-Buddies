// models/Autho.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshTokens: [
    {
      type: String,
    },
  ], // Array to store multiple refresh tokens
  image: {
    type: String,
    required: false,
    default: null,
  }
});

module.exports = mongoose.model("User", userSchema);
