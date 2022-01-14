const express = require("express");
const dotenv = require("dotenv").config();
const DB = require("./database").connectToDb;
const app = express();
const authRouter=require("./routes/AuthRouter")
const bookRouter=require("./routes/BookRoute")
DB();
app.use(express.json());
app.use("/api/auth",authRouter)
app.use("/api/book",bookRouter)
app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});