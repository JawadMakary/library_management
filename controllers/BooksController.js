//  CREATE and ADD new books to the system ( user is admin or librarian)
const { db } = require("../models/StaffModel");
const Staff = require("../models/StaffModel");
exports.addBook = (req, res) => {
  if (Staff.role == "librarian" || Staff.role == "admin") {
    const { ISBN, BookName, Author, Gender, Status, Date } = req.body;
    // add to db
    try {
      db.Book.insertOne({
        ISBN: ISBN,
        BookName: BookName,
        Author: Author,
        Gender: Gender,
        Status: Status,
        Date: Date,
      });
    } catch (err) {
      console.log(err);
    }
  }
};
