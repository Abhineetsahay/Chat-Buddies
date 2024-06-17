// routes.js
const express = require("express");
const { Signup, refreshToken, Login } = require("../controllers/Autho");
const { Update } = require("../controllers/Update");
const { jwtauthenticateToken } = require("../middlewares/jwtAuthenticate");

const router = express.Router();

router.post("/signup", Signup);
router.post("/refresh-Token", refreshToken);
router.post("/login", Login);

//update
router.post("/update-picture",jwtauthenticateToken,Update);

module.exports = router;
