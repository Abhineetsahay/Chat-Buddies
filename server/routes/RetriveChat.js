
const express = require("express");
const { RetriveChat } = require("../controllers/RetriveChat");


const router = express.Router();

router.get("/chats",RetriveChat)

module.exports=router