
const express = require("express");
const { DeleteChat } = require("../controllers/DeleteChat");
const { DeleteAccount } = require("../controllers/DeleteAccount");
const { jwtauthenticateToken } = require("../middlewares/jwtAuthenticate");


const router = express.Router();

router.delete("/chats/:sender/:receiver/:chatId/:timeStamp/:message", DeleteChat);
router.delete("/Account/:accountToBeDeletingId",jwtauthenticateToken,DeleteAccount)

module.exports=router