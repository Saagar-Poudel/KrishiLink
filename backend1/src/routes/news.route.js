import { Router } from "express";
import { getNepalAgriNews } from "../controllers/newsController.js";

const router = Router();

// GET /api/news
router.get("/", getNepalAgriNews);

export default router;
