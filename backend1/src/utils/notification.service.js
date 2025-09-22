// utils/notification.service.js
import { db } from "../dbConnection/dbConnection.js";
import { notifications, users } from "../models/schema.js";
import { io } from "../index.js";
import { eq } from "drizzle-orm";

export const sendNotification = async ({ userId, type, message }) => {
  const createdAt = new Date();

  // Case 1: Send to all buyers
  if (userId === "all_buyers") {
    // Get all buyer IDs
    const buyers = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.role, "buyers"));

    if (buyers.length === 0) return;

    const insertedNotifications = [];

    for (const buyer of buyers) {
      const [newNotification] = await db
        .insert(notifications)
        .values({
          userId: buyer.id,
          type,
          message,
          createdAt,
        })
        .returning();

      insertedNotifications.push(newNotification);

      // Emit to that buyer socket (real-time)
      io.to(buyer.id.toString()).emit("notification-receive", newNotification);
    }

    // Also broadcast for global listeners (optional)
    io.emit("notification-receive", { type, message, target: "all_buyers" });

    return insertedNotifications;
  }

  // Case 2: Single user
  const [newNotification] = await db
    .insert(notifications)
    .values({
      userId: Number(userId),
      type,
      message,
      createdAt,
    })
    .returning();

  io.to(userId.toString()).emit("notification-receive", newNotification);

  return newNotification;
};
