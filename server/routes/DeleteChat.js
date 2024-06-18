
const express = require("express");
const { DeleteChat } = require("../controllers/DeleteChat");


const router = express.Router();

router.delete("/chats/:id",DeleteChat)

module.exports=router