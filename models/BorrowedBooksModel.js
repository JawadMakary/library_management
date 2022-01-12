const mongoose = require("mongoose");
const BorrowedBooksSchema = new mongoose.Schema(
  {
    borrowedID: {
      type: Number,
      unique: true,
    },
    BorrowedBookName: {
      type: String,
      required: [true, "Please enter your the book name"],
      trim: true,
    },
    borrowedBookID: {
      type: Number,
      unique: false,
    },
    borrowedBookDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BorrowedBooks", BorrowedBooksSchema);
