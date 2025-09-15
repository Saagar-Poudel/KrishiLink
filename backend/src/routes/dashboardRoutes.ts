import { Router } from "express";
import { getSummary } from "../controllers/dashboardController";

const router = Router();

// Define your dashboard routes here
router.get('/summary', getSummary);

export default router;