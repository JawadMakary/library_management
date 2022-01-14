const mongoose = require("mongoose");
require("dotenv").config();

exports.connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB connection established !!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};