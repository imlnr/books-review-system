const { ReviewModel } = require("../models/review.model");

const createReview = async (req, res) => {
    try {
        const review = new ReviewModel({
            ...req.body,
            user: req.body.userID,
            book: req.params.id
        });

        await review.save();
        res.status(201).json(review);
    } catch (err) {
        // Duplicate review error (unique index violation)
        if (err.code === 11000) {
            return res.status(400).json({ error: 'You have already reviewed this book' });
        }
        res.status(400).json({ error: err.message });
    }
};

// ✏️ Update a review (only your own review)
const updateReview = async (req, res) => {
    try {
        const review = await ReviewModel.findOneAndUpdate(
            { _id: req.params.id, user: req.userID },
            req.body,
            { new: true }
        );

        if (!review) {
            return res.status(404).json({ error: 'Review not found or unauthorized' });
        }

        res.json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ❌ Delete a review (only your own review)
const deleteReview = async (req, res) => {
    try {
        const review = await ReviewModel.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({ error: 'Review not found or unauthorized' });
        }

        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    deleteReview,
    createReview,
    updateReview
}