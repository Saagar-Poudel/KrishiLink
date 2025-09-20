// utils/notification.service.js
import { db } from "../dbConnection/dbConnection.js";
import { notifications } from "../models/schema.js";
import { io } from "../index.js";

export const sendNotification = async ({ userId, type, title, message }) => {
  // Save in DB
  const [newNotification] = await db.insert(notifications).values({
    userId,
    type,
    title,
    message,
    createdAt: new Date(),
  }).returning();

  // Emit real-time
  if (userId === "all_buyers") {
    io.emit("notification-receive", newNotification); // broadcast
  } else {
    io.to(userId.toString()).emit("notification-receive", newNotification);
  }

  return newNotification;
};