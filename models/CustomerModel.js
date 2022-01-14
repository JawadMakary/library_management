const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    trim: true,
  },
  LastName: {
    type: String,
    required: true,
    trim: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  BorrowedBookList: {
    type: [String],
  },
  Date: {
    type: Date,
  },
});


module.exports = mongoose.model("Customer", CustomerSchema);
