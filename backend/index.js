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
	res.setHeader(
		"Content-Security-Policy",
		"default-src 'none'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
	);
	next();
});

app.use(cors());

app.use(express.json());
dbConnection();

// app.get("^/$|/index(.html)?", (req, res) => {
// 	res.sendFile(path.join(__dirname, "views", "index.html"));
// });


app.get("/", (req, res) => {
	res.send("server is running.")
})

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
