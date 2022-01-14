const express = require("express");
const bookRouter = express.Router();
const bookController = require("../controllers/BooksController");

bookRouter.post("/addBook", bookController.addBook);
module.exports = bookRouter;
