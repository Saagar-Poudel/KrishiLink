import express from "express";
import { addReview, getProductReviews } from "../controllers/review.controller.js";

const router = express.Router();

// POST /api/reviews
router.post("/", addReview);

// GET /api/reviews/:productId
router.get("/:productId", getProductReviews);

export default router;
