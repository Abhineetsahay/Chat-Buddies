const Contact = require("../models/Contacts");

exports.DeleteChat = async (req, res) => {
  try {
    const { sender, receiver, chatId, timeStamp, message } = req.params;
    let timeStampDate = new Date(timeStamp);

    // Find sender's contact document
    const senderContact = await Contact.findOne({ name: sender, "contacts.name": receiver });
    // Find receiver's contact document
    const receiverContact = await Contact.findOne({ name: receiver, "contacts.name": sender });

    if (!senderContact || !receiverContact) {
      return res.status(404).json({
        success: false,
        message: "Contacts not found",
      });
    }

    // Log all chat messages in receiverContact before deletion
    const receiverChatIndex = receiverContact.contacts.findIndex(contact => contact.name === sender);
    const allReceiverChats = receiverContact.contacts[receiverChatIndex].chats;
    
    const receiverChatDelete = allReceiverChats.filter(receiver => {
      const receiverTimeStamp = new Date(receiver.timestamp).toISOString();
      const paramTimeStamp = timeStampDate.toISOString();
      return receiver.message === message && receiverTimeStamp === paramTimeStamp;
    });

    // Remove chat from sender's contact
    const senderChatIndex = senderContact.contacts.findIndex(contact => contact.name === receiver);
    senderContact.contacts[senderChatIndex].chats = senderContact.contacts[senderChatIndex].chats.filter(chat => chat._id.toString() !== chatId);

    // Remove chat from receiver's contact
    receiverContact.contacts[receiverChatIndex].chats = receiverContact.contacts[receiverChatIndex].chats.filter(chat => chat._id!==receiverChatDelete[0]._id);

    await senderContact.save();
    await receiverContact.save();

    // Log all chat messages in receiverContact after deletion
    const updatedReceiverChats = receiverContact.contacts[receiverChatIndex].chats;

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
      allReceiverChatsBefore: allReceiverChats, // Return all receiver's chats before deletion
      allReceiverChatsAfter: updatedReceiverChats // Return all receiver's chats after deletion
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete chat",
      error: error.message,
    });
  }
};
