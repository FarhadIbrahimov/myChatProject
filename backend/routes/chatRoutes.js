const express = require("express");
const router = express.Router();
const { accessChat } = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, accessChat);
// router.route.route("/").get(protect, fetchChat);
// router.route("/:group").post(protect, createGroup);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupRemove").put(protect, removeGroup);
// router.route("/groupAdd").put(protect, addGroup);

module.exports = router;
