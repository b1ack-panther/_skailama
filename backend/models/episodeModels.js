const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const episodeSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		project: {
			type: Schema.Types.ObjectId,
			ref: "Project",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Episode", episodeSchema);
