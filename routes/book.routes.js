const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { createBook, getAllBooks, searchBooks, getBookById } = require("../controllers/books.controller");
const BooksRouter = express.Router();

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *               genre:
 *                 type: string
 *               publishedYear:
 *                 type: number
 *     responses:
 *       201:
 *         description: Book created successfully
 *       401:
 *         description: Unauthorized
 */
BooksRouter.post("/", auth, createBook);

/**
 * @swagger
 * /books/allBooks:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter books by author name (case-insensitive)
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter books by genre
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of books per page
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   description:
 *                     type: string
 *                   genre:
 *                     type: string
 *                   publishedYear:
 *                     type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
BooksRouter.get("/allBooks", auth, getAllBooks);

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Search books by title or author
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query to match against book titles and authors (case-insensitive)
 *     responses:
 *       200:
 *         description: List of matching books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   description:
 *                     type: string
 *                   genre:
 *                     type: string
 *                   publishedYear:
 *                     type: number
 *       400:
 *         description: Missing search query
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
BooksRouter.get("/search", auth, searchBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book details by ID with reviews
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details with reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 book:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *                     description:
 *                       type: string
 *                     genre:
 *                       type: string
 *                     publishedYear:
 *                       type: number
 *                 averageRating:
 *                   type: number
 *                   nullable: true
 *                   description: Average rating of the book (null if no reviews)
 *                 totalReviews:
 *                   type: integer
 *                   description: Total number of reviews
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       comment:
 *                         type: string
 *                       user:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
BooksRouter.get("/:id", auth, getBookById);

module.exports = {
    BooksRouter
}