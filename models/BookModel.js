const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  BookID: {
    type: Number,
    required: true,
    unique: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  BookName: {
    type: String,
    required: true,
    trim: true,
  },
  Author: {
    type: String,
    required: true,
    trim: true,
  },
  Gender: {
    type: String,
    required: false,
  },
  Status: {
    type: String,
    enum: ["Borrowed", "available"],
  },
  Date: {
    type: Date,
  },
});
module.exports = mongoose.model("Book", BookSchema);
