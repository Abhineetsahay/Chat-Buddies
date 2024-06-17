const express = require("express");
const { SearchUser } = require("../controllers/Search");

const router = express.Router();

router.post("/search",SearchUser);

module.exports = router;