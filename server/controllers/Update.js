const User = require("../models/Autho");

exports.Update = async (req, res) => {
  try {
    const { imageSrc: image } = req.body;
    const { phone } = req.user; // Assuming req.user contains the authenticated user's details


    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image Required",
      });
    }

    // Find the user by phone number
    const updateUser = await User.findOne({ phone });

    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "User not found", // Adjust the message as per your use case
      });
    }

    // Update the user's image field
    const updatedUser = await User.findOneAndUpdate(
      { phone: phone },
      { $set: { image: image } },
      { new: true } // To return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found after update", // Adjust the message as per your use case
      });
    }

    return res.status(200).json({
      success: true,
      message: "Image Successfully Updated",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
