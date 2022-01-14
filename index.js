const express = require("express");
const DB = require("./database").connectToDb;
const app = express();
require("dotenv").config();

//Declearing routers
const authRouter = require("./routes/AuthRouter");
const bookRouter =require("./routes/BookRoute");
const CustomerRoute = require("./routes/CustomerRoute");
const BorrowedBookRoute = require("./routes/BorrowedBookRoute");

DB();

app.use(express.json());

app.use("/api/auth", authRouter)

app.use("/api/book", bookRouter)

app.use("/api/customer", CustomerRoute)

app.use("/api/borrowedbook", BorrowedBookRoute)

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});