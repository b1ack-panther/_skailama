const express = require("express");
const {
	createProject,
	getAllProjects,
} = require("../controllers/projectControllers.js");

const router = express.Router();

router.route("/").post(createProject).patch(getAllProjects);

module.exports = router;
