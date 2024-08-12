const express = require("express");
const episodeControllers = require("../controllers/episodeControllers.js");

const router = express.Router();

router
	.route("/")
	.put(episodeControllers.getEpisodesList)
	.post(episodeControllers.createEpisode)
	.patch(episodeControllers.editEpisode)
	.delete(episodeControllers.deleteEpisode);

module.exports = router;
