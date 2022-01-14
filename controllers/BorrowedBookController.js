const BorrowedBooksModel = require("../models/BorrowedBooksModel");
var jwt = require("jsonwebtoken");

const checkAuth = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;
    return true;
    // next();
  } catch (err) {
    console.log(err);
    return false;
  }
};
exports.addBorrowedBook = async (req, res) => {
  if (checkAuth) {
    try {
      const borrowedBook = await BorrowedBooksModel.create(req.body);
      return res.status(201).json({
        message: "borrowed book added successfully",
        data: borrowedBook,
      });
    } catch (err) {
      console.log(err);
    }
  }
};
exports.addBorrowedList = async (req, res) => {
  if (checkAuth) {
    try {
      const borrowedList = await BorrowedBooksModel.create(req.body);
      const customer = await CustomerModel.findById(req.params.id);
      customer.BorrowedBookList.push(borrowedList);
      await customer.save();
      return res.status(201).json({
        message: "borrowed book added successfully",
        data: borrowedList,
      });
    } catch (err) {
      console.log(err);
    }
  }
};
