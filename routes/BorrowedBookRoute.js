const express = require("express");
const BorrowedBookRouter = express.Router();
const BorrowedBookController = require("../controllers/BorrowedBookController");

BorrowedBookRouter.post(
  "/addToBorrowedDb",
  BorrowedBookController.addBorrowedBook
);
BorrowedBookRouter.post(
  "/addToClientDb",
  BorrowedBookController.addBorrowedList
);

module.exports = BorrowedBookRouter;
