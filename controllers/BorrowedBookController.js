const BorrowedBooksModel = require("../models/BorrowedBooksModel");

const BookModel = require("../models/BookModel");
const CustomerModel = require("../models/CustomerModel");
const checkAuth = require("../middleware/checkAuth.js");

const sendEmail = require("../middleware/mailer.js");


exports.borrowBook = async (req, res) => {
  const staffData = checkAuth(req);
  
  if (staffData != undefined) {

    try {

      const customer = await CustomerModel.findOne({
        _id: req.body.borrowerID
      });

      if(!customer){
        res.status(404).json({
          message: "Customer not found"
        })
      }

      const bookModel = await BookModel.findOne({
        _id: req.body.borrowedBookID,
        BookName: req.body.BorrowedBookName,
      });
      console.log(bookModel);
      if(!bookModel){
        res.status(404).json({
          message: "Book not found"
        })
      }

      const borrowedBook = await BorrowedBooksModel.create(req.body);

      //Add Borrowed Book to Customer
      console.log(req.body.borrowedBookID,req.body.borrowerID);
      await CustomerModel.findByIdAndUpdate(req.body.borrowerID, 
        { $push: { BorrowedBookList: req.body.borrowedBookID }}
        );

      //Send Email
      mailOptions = {
        to: customer.Email,
        subject: "Book Borrowed",
        text: "You have borrowed a book from the library. Please return the book within 7 days."
      }
      sendEmail(mailOptions);
      

      return res.status(201).json({
        message: "Borrowed book added successfully",
        data: borrowedBook,
      });



    } catch (err) {
      console.log(err);
    }
  }else{
    return res.status(401).json({
      message: "You need to be logged in to add a borrow a book",
    });
  }
};