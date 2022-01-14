const express = require("express");
const BorrowedBookRouter = express.Router();
const BorrowedBookController = require("../controllers/BorrowedBookController");


BorrowedBookRouter.post(
  "/",
  BorrowedBookController.borrowBook
);

module.exports = BorrowedBookRouter;
