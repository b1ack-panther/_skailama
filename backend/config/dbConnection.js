const mongoose = require("mongoose");

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.DATABASE_URI + "skailamaDB");
  }
  catch (err) {
    console.log("custom:some error occured while connecting to database: ", err);
  }
}

module.exports = dbConnection;