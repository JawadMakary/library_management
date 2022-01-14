const express = require("express");
const bookRouter = express.Router();
const bookController = require("../controllers/BooksController");




bookRouter.post("/addBook", bookController.addBook);
// update a book status
bookRouter.put("/:id", bookController.updateBook);

//delete book
bookRouter.delete("/:id", bookController.deleteBook);

module.exports = bookRouter;
