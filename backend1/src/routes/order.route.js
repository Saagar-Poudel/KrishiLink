import { Router } from "express";
import { createOrder, getAllOrders, updateOrderStatus, deleteOrder, getAllOrdersBySellerName, getUserOrders } from "../controllers/order.controller.js";

const router = Router();

// POST /api/orders - Create new order
router.post("/", createOrder);

// GET /api/orders - Get all orders
router.get("/", getAllOrders);

router.get("/buyer/:userId", getUserOrders);

//GET /api/orders/:sellerName - get orders by seller name
router.get("/:sellerName", getAllOrdersBySellerName);

// PATCH /api/orders/:orderId/status
router.patch("/:orderId/status", updateOrderStatus);

// DELETE /api/orders/:id - Delete order
router.delete("/:id", deleteOrder);

export default router;
