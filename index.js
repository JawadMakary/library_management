const express = require("express");
const dotenv = require("dotenv").config();
const DB = require("./database").connectToDb;
const app = express();
DB();
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
