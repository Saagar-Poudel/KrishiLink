import express from "express";
import { handleEsewaSuccess } from "../controllers/esewa.controller.js";
import { updateOrderAfterPayment } from "../controllers/order.controller.js";

const router = express.Router();

// POST /api/esewa/success - Handle eSewa payment success
router.get("/success", handleEsewaSuccess, updateOrderAfterPayment);

export default router;
