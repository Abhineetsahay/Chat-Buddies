const Contact = require("../models/Contacts");

exports.DeleteAccount = async (req, res) => {
  try {
          const { accountToBeDeletingId } = req.params;
          const { phone } = req.user;
      
          // Find the user's contacts document
          const findSenderContacts = await Contact.findOne({ phone });
      
          if (!findSenderContacts) {
            return res.status(404).json({
              success: false,
              message: "User contacts not found",
            });
          }
      
          // Filter out the contact to be deleted
          const initialContactCount = findSenderContacts.contacts.length;
          findSenderContacts.contacts = findSenderContacts.contacts.filter(contact => contact._id.toString() !== accountToBeDeletingId);
      
          if (findSenderContacts.contacts.length === initialContactCount) {
            return res.status(404).json({
              success: false,
              message: "Contact not found",
            });
          }
      
          // Save the updated document
          await findSenderContacts.save();
      
          return res.status(200).json({
            success: true,
            message: "Contact deleted successfully",
          })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete Account",
      error: error.message,
    });
  }
};
