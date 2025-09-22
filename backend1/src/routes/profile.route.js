import express from "express";
import { getFarmerProfileStats } from "../controllers/profile.controller.js";
import { getBuyerProfileStats } from "../controllers/profile.controller.js";

const router = express.Router();

// GET /api/profile/:farmerId/stats
router.get("/:farmerId/stats", getFarmerProfileStats);

// GET /api/profile/buyer/:buyerId/stats
router.get("/buyer/:buyerId/stats", getBuyerProfileStats);

export default router;