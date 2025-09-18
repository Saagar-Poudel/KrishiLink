import express from "express";
import { handleEsewaSuccess } from "../controllers/esewa.controller.js";
import { updateOrderStatus } from "../controllers/order.controller.js";

const router = express.Router();

// POST /api/esewa/success - Handle eSewa payment success
router.post("/success", handleEsewaSuccess, updateOrderStatus);

export default router;
