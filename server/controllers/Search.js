const User = require("../models/Autho");
require("dotenv").config();

exports.SearchUser = async (req, res) => {
  try {
    const { friendNumber } = req.body;
    
    // Validate friendNumber
    if (!friendNumber || typeof friendNumber !== 'string' || friendNumber.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Enter a valid number"
      });
    }

    // Find the friend
    const Friend = await User.findOne({ phone:friendNumber });
    // Check if the friend exists
    if (!Friend) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
   const FriendDetails={
          id:Friend._id,
          name:Friend.name,
          phone:Friend.phone,
          image:Friend.image
   }
    // Respond with the found user
    return res.status(200).json({
      success: true,
      message: "User successfully found",
      FriendDetails
    });

  } catch (error) {
    console.error("Error searching for user:", error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
 