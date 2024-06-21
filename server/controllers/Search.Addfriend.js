const User = require("../models/Autho");
const Contact=require("../models/Contacts");

require("dotenv").config();

exports.SearchUser = async (req, res) => {
  try {
    const { friendNumber } = req.body;
    const {phone}=req.user
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
 await Contact.findOneAndUpdate({phone:phone},{$push:{contacts:FriendDetails}});
    return res.status(200).json({
      success: true,
      message: "User successfully found",
      FriendDetails
    });

  } catch (error) {
    console.error("Error searching for user:", error.message); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
 

exports.getfriend=async(req,res)=>{

   try {
          const {username}=req.user;
          const {contacts}=await Contact.findOne({name:username});
          // console.log();
          return res.status(200).json({
            success:true,
            message:"fetched data successfully",
            contacts
          })

   } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
   }
}