import express from "express";
import { getFarmerProfileStats } from "../controllers/profile.controller.js";

const router = express.Router();

// GET /api/profile/:farmerId/stats
router.get("/:farmerId/stats", getFarmerProfileStats);

export default router;