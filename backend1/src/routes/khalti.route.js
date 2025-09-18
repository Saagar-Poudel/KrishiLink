import express from "express";
import { updateOrderAfterPayment } from "../controllers/order.controller.js";
import { handleKhaltiCallback } from "../controllers/khalti.controller.js";

const router = express.Router();

router.get("/callback", handleKhaltiCallback, updateOrderAfterPayment);

export default router;