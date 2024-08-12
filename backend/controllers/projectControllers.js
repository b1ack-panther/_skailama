const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModels.js");
const User = require("../models/userModels.js");

const createProject = asyncHandler(async (req, res) => {
	const { name, email } = req.body;

	if (!name || !email) {
		return res.status(400).json({ message: "All fields required" });
	}

	const user = await User.findOne({ email }).exec();

	if (!user) {
		return res.status(400).json({ message: "User not found" });
	}

	const project = await Project.create({ name, user: user._id });
	user.projects.push(project._id);
	await user.save();

	return res.json(project);
});

const getAllProjects = asyncHandler(async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email }).exec();
	if (!user) {
		return res.status(400).json({ message: "User not found" });
	}

	const projects = await Project.find({ user: user._id })
		.populate("episodes")
		.exec();

	return res.json(projects);
});

module.exports = { createProject, getAllProjects };
