require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const corsOptions = require("./config/corsOptions.js");
const dbConnection = require("./config/dbConnection.js");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3333;

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Credentials", true);
	// res.setHeader("Access-Control-Allow-Origin", "*");
	// another common pattern
	res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,OPTIONS,PATCH,DELETE,POST,PUT"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
	);
	if (req.method === "OPTIONS") {
		res.status(200).end();
		return;
	}
	next();
});

app.use(cors(corsOptions));

app.use(express.json());
dbConnection();

app.get("^/$|/index(.html)?", (req, res) => {
	res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/user", require("./routes/userRoutes.js"));
app.use("/project", require("./routes/projectRoutes.js"));
app.use("/episode", require("./routes/episodeRouts.js"));

mongoose.connection.once("open", () => {
	console.log("Connected to mongoDB");
	app.listen(PORT, () => {
		console.log(`App is listening on PORT:${PORT}. http://localhost:${PORT}`);
	});
});

mongoose.connection.on("error", (error) => {
	console.log(error);
});
