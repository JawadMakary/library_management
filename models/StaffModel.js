const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: [true, "Please enter your first name"],
      unique: true,
      trim: true,
    },
    LastName: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true,
    },
    Gender: {
      type: String,
      enum: ["male", "female", "none"]
    },
    DateOfBirth: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["librarian", "librarian-assistant", "admin"],
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", StaffSchema);
