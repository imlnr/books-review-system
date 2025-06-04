const { BooksModel } = require("../models/books.model");
const { ReviewModel } = require("../models/review.model");

const createBook = async (req, res) => {
    try {
        const book = new BooksModel({ ...req.body, createdBy: req?.body?.userID });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const { author, genre, page = 1, limit = 10 } = req.query;
        const filter = {};

        if (author) filter.author = new RegExp(author, 'i');
        if (genre) filter.genre = genre;

        const books = await BooksModel.find(filter)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const book = await BooksModel.findById(id);

        if (!book) return res.status(404).json({ error: 'Book not found' });

        const reviews = await ReviewModel.find({ book: id }).populate('user', 'name');
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const avgRating = reviews.length ? (totalRating / reviews.length).toFixed(2) : null;

        const { page = 1, limit = 5 } = req.query;
        const paginatedReviews = await ReviewModel.find({ book: id })
            .populate('user', 'name')
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json({
            book,
            averageRating: avgRating,
            totalReviews: reviews.length,
            reviews: paginatedReviews
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const searchBooks = async (req, res) => {
    try {
        const { q } = req.query;
        console.log(q)
        if (!q) return res.status(400).json({ error: 'Missing search query' });

        const regex = new RegExp(q, 'i');
        const books = await BooksModel.find({
            $or: [{ title: regex }, { author: regex }]
        });

        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    searchBooks,
    getBookById
}