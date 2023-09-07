const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { sendMessages } = require("../controllers/messageController");
const { allMessages } = require("../controllers/messageController");

const router = express.Router();

router.route("/").post(protect, sendMessages);
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
