import { Router } from "express";
import { getNepalAgriNews } from "../controllers/newsController";

const router = Router();
router.get("/", getNepalAgriNews);

export default router;
