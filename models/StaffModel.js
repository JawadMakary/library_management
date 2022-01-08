const mongoose = require("mongoose");
const StaffSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: [true, "Please enter your first name"],
      trim: true,
    },
    LastName: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true,
    },
    Gender: {
      type: String,
      required: false,
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
