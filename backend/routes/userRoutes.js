const express = require("express");
const { loginUser, updateUser } = require("../controllers/userControllers.js");

const router = express.Router();

router.route("/").post(loginUser).patch(updateUser);

module.exports = router;
