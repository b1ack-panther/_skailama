const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const Project = require("../models/projectModels");
const Episode = require("../models/episodeModels");

const getEpisodesList = asyncHandler(async (req, res) => {
	const { email, projectId } = req.body;

	if (!email || !projectId) {
		res.status(400).json({ message: "All fields required" });
	}

	const user = await User.findOne({ email }).exec();
	if (!user) {
		return res.status(400).json({ message: "User not found" });
	}

	const project = await Project.findById({
		_id: projectId,
	}).exec();

	if (!project) {
		return res.status(400).json({ message: "Project not found" });
	}

	if (!project.user._id.equals(user._id)) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const episodes = await Episode.find({ project: project._id }).exec();

	return res.json(episodes);
});

const createEpisode = asyncHandler(async (req, res) => {
	const { name, description, email, projectId } = req.body;
	if ([name, description, email, projectId].some((item) => !item)) {
		return res.status(400).json({ message: "All fields required" });
	}

	const user = await User.findOne({ email }).lean().exec();
	if (!user) {
		return res.status(401).json({ message: "User not found" });
	}
	const project = await Project.findById(projectId).exec();
	if (!project) {
		return res.status(401).json({ message: "Project not found" });
	}

	if (!project.user._id.equals(user._id)) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const episode = await Episode.create({
		name,
		description,
		project: projectId,
	});
	project.episodes.push(episode._id);
	await project.save();

	return res.json(episode);
});

const editEpisode = asyncHandler(async (req, res) => {
	const { episodeId, email, name, description } = req.body;

	if (!episodeId || !email) {
		return res.status(400).send({
			message: "All fields required",
		});
	}

	const episode = await Episode.findById(episodeId).populate("project").exec();
	if (!episode) {
		return res.status(400).json({ message: "Episode not found" });
	}

	const user = await User.findOne({ email }).lean().exec();
	if (!user) {
		return res.status(401).json({ message: "User not found" });
	}

	if (!episode.project.user.equals(user._id)) {
		return res.status(401).json({ message: "Unaunothorized" });
	}

	episode.name = name || episode.name;
	episode.description = description || episode.description;

	const updatedEpisode = await episode.save();
	return res.json(updatedEpisode);
});

const deleteEpisode = asyncHandler(async (req, res) => {
	const { episodeId, email } = req.body;

	const episode = await Episode.findById(episodeId).populate("project").exec();
	if (!episode) {
		return res.status(400).json({ message: "Episode not found" });
	}

	const user = await User.findOne({ email }).exec();
	if (!user) {
		return res.status(401).json({ message: "User not found" });
	}
	if (!user._id.equals(episode.project.user)) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	await episode.deleteOne();

	return res.json({ message: "Episode deleted successfully" });
});

module.exports = { getEpisodesList, editEpisode, deleteEpisode, createEpisode };
