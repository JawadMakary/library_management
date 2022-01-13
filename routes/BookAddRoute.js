const express = require("express");
const router = express.Router();
const BooksController = require("../controllers/BooksController");


router.post( "/addBook", function(req, res){
    BooksController.protect,
  BooksController.addBook
  });

module.exports = router;
