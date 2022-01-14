const express = require("express");
const bookRouter = express.Router();
const bookController = require("../controllers/BooksController");

bookRouter.post("/addBook", bookController.addBook);
// update a book status
bookRouter.put("/updateBook/:id", bookController.updateBook);
module.exports = bookRouter;
