var BookModel = require("../models/BookModel");
var jwt = require("jsonwebtoken");

// check if staff has jwt token
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
// add book
exports.addBook = async (req, res) => {
  if (checkAuth(req, res)) {
    try {
      // check if book already exists
      const book = await BookModel.findOne({
        Title: req.body.Title,
      });
      if (book) {
        return res.status(400).json({
          message: "book already exists",
        });
      } else {
        // create new book with req.body using mongoose create
        const newBook = await BookModel.create(req.body);
        return res.status(201).json({
          message: "book added successfully",
          data: newBook,
        });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(401).json({
      message: "you are not authorized to add a book",
    });
  }
};
// delete book if user authorized
exports.deleteBook = async (req, res) => {
  if (checkAuth(req, res)) {
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
      message: "you are not authorized to delete a book",
    });
  }
};
// UPDATE book status if user authorized
exports.updateBook = async (req, res) => {
  if (checkAuth(req, res)) {
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

// • Search by bookName or ISSN in the book directory (admin, librarian, assistant)

exports.searchByNameOrISSN = async (req, res) => {
  if (checkAuth(req, res)) {
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
