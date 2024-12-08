const express = require("express");
const verifyApiKey = require("../middleware/verifyApiKey");
const { addTrain } = require("../Controllers/adminController");
const router = express.Router();

router.post("/add-train", verifyApiKey, addTrain);

module.exports = router;
