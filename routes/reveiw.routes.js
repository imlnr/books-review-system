const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { createReview, updateReview, deleteReview } = require("../controllers/review.controller");
const ReviewRoutes = express.Router();

ReviewRoutes.post("/:id", auth, createReview);
ReviewRoutes.patch("/:id", auth, updateReview);
ReviewRoutes.delete("/:id", auth, deleteReview);

module.exports = {
    ReviewRoutes
}