
const Chat = require("../models/Chat");


exports.DeleteChat=async(req,res)=>{
          try {
                    const id=req.params.id;
                    console.log(req.params);
                    console.log(id);
                    const deletedChat=await Chat.findByIdAndDelete(id);
                    if (!deletedChat) {
                              return res.status(404).json({
                                        success:false,
                                        message:"Chat not found"
                              })
                    }
                    return res.status(200).json({
                              success:true,
                              message:"Chat Deleted Successfully"
                    })
          } catch (error) {
                    return res.status(500).json({
                              success: false,
                              message: "Failed to retrieve chats",
                              error: error.message,
                    });
          }
}