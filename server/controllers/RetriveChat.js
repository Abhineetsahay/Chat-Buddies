const Contact = require("../models/Contacts");

exports.RetriveChat = async (req, res) => {
  try {
    const { sender, receiver } = req.query || req.params || req.body;

    if (!sender || !receiver) {
      return res.status(400).json({
        success: false,
        message: "Sender and receiver are required",
      });
    }

    const senderContact = await Contact.findOne({ name: sender, "contacts.name": receiver });
    const receiverContact = await Contact.findOne({ name: receiver, "contacts.name": sender });

    if (!senderContact || !receiverContact) {
      return res.status(404).json({
        success: false,
        message: "Contacts not found",
      });
    }

    const senderChats = senderContact.contacts.find(contact => contact.name === receiver).chats;

    // Combine and sort chats
    const allChats = [...senderChats].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return res.json(allChats);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve chats",
      error: error.message,
    });
  }
};
