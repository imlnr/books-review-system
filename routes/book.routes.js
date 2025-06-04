const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { createBook, getAllBooks, searchBooks, getBookById } = require("../controllers/books.controller");
const BooksRouter = express.Router();


BooksRouter.post("/", auth, createBook);
BooksRouter.get("/allBooks", auth, getAllBooks);
BooksRouter.get("/search", auth, searchBooks);
BooksRouter.get("/:id", auth, getBookById);

module.exports = {
    BooksRouter
}