const express = require("express");
const { SearchUser, getfriend } = require("../controllers/Search.Addfriend");
const { jwtauthenticateToken } = require("../middlewares/jwtAuthenticate");

const router = express.Router();

router.post("/search",jwtauthenticateToken,SearchUser);
router.get("/get-friend",jwtauthenticateToken,getfriend);

module.exports = router;