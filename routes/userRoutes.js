const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { getAvailability, bookSeat } = require("../Controllers/userController");
const router = express.Router();

router.get("/availability", verifyToken, getAvailability);
router.post("/book", verifyToken, bookSeat);

module.exports = router;
