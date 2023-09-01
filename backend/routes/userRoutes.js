const express = require("express");
const { registerUser, authUser } = require("../controllers/UserController");
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/").get(allUsers);

module.exports = router;
