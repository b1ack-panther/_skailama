const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("custom: not allowed by cors"));
		}
	},
	credentials: true,
};

module.exports = corsOptions;
