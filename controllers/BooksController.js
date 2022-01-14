var BookModel = require("../models/BookModel");
const checkAuth = require("../middleware/checkAuth.js");


// add book
exports.addBook = async (req, res) => {

 
  const staffData = checkAuth(req);

  if (staffData != undefined && staffData.data.role != "librarian-assistant") {
    try {
      // check if book already exists
      const book = await BookModel.findOne({
        BookName: req.body.BookName,
      });
      if (book) {

        return res.status(400).json({
          message: "Book already exists",
        });

      } else {
        // create new book with req.body using mongoose create
        const newBook = await BookModel.create(req.body);
        return res.status(201).json({
          message: "Book added successfully",
          data: newBook,
        });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(401).json({
      message: "You are not authorized to add a book",
    });
  }
};
// delete book if user authorized
exports.deleteBook = async (req, res) => {

  const staffData = checkAuth(req);

  if (staffData != undefined && staffData.data.role == "admin") {
    console.log(staffData);
    try {
      const book = await BookModel.findById(req.params.id);

      if (!book) {
        return res.status(404).json({
          message: "book not found",
        });
      }
      await BookModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        message: "book deleted successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "server error",
      });
    }
  } else {
    return res.status(401).json({
      message: "You are not authorized to delete a book",
    });
  }
};
// UPDATE book status if user authorized
exports.updateBook = async (req, res) => {

  const staffData = checkAuth(req);

  if (staffData != undefined) {
    try {
      const book = await BookModel.findById(req.params.id);
      if (!book) {
        return res.status(404).json({
          message: "book not found",
        });
      }
      await BookModel.findByIdAndUpdate(req.params.id, req.body);
      return res.status(200).json({
        message: "book updated successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "server error",
      });
    }
  } else {
    return res.status(401).json({
      message: "you are not authorized to update a book",
    });
  }
};

//Search by Book Name or ISSN
exports.searchByNameOrISSN = async (req, res) => {
  const staffData = checkAuth(req);

  if (staffData != undefined) {
    try {
      const book = await BookModel.find({
        $or: [{ BookName: req.body.BookName }, { ISSN: req.body.ISSN }],
      });
      if (!book) {
        return res.status(404).json({
          message: "book not found",
        });
      }
      return res.status(200).json({
        message: "book found",
        data: book,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "server error",
      });
    }
  } else {
    return res.status(401).json({
      message: "you are not authorized to search a book",
    });
  }
};

//Create a function that return the existing Books sorted by gender or author
exports.getBookByGenderOrAuthor = async (req, res) => {
  const staffData = checkAuth(req);

  if (staffData != undefined) {
    try {
    } catch (err) {
      console.log(err);
    }
  }
};
