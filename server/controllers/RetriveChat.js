// controllers/RetriveChat.js
const Chat = require("../models/Chat");

exports.RetriveChat = async (req, res) => {
  try {
    const { sender, receiver } = req.query||req.params||req.body;

    if (!sender || !receiver) {
      return res.status(400).json({
        success: false,
        message: "Sender and receiver are required",
      });
    }

    const chats = await Chat.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 });

    return res.json(chats);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve chats",
      error: error.message,
    });
  }
};
