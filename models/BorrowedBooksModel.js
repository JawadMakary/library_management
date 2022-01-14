const mongoose = require("mongoose");


const BorrowedBooksSchema = new mongoose.Schema(
  {
    borrowerID: {
      type: String,
      required: true,
    },
    BorrowedBookName: {
      type: String,
      required: [true, "Please enter your the book name"],
      trim: true,
    },
    borrowedBookID: {
      type: String,
      required: true,

    },
    borrowedBookDate: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BorrowedBooks", BorrowedBooksSchema);
