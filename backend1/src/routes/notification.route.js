import express from "express";
import { getUserNotifications, markAsRead } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/:userId", getUserNotifications);
router.put("/read/:id", markAsRead);

export default router;