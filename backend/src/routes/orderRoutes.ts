import { Router } from "express";
import { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } from "../controllers/orderController";

const router = Router();

// POST /api/orders - Create new order
router.post("/", createOrder);

// GET /api/orders - Get all orders
router.get("/", getAllOrders);

// GET /api/orders/:id - Get single order
router.get("/:id", getOrderById);

// PUT /api/orders/:id/status - Update order status
router.put("/:id/status", updateOrderStatus);

// DELETE /api/orders/:id - Delete order
router.delete("/:id", deleteOrder);

export default router;
