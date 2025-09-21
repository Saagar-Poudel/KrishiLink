import {db} from "../dbConnection/dbConnection.js";
import { notifications, users } from "../models/schema.js";
import { eq, desc } from "drizzle-orm";

export const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    let rows = [];

    if (userId === "all_buyers") {
      // Fetch notifications for all users that are buyers
      rows = await db
        .select({
          id: notifications.id,
          userId: notifications.userId,
          type: notifications.type,
          message: notifications.message,
          isRead: notifications.isRead,
          createdAt: notifications.createdAt,
          username: users.username,
        })
        .from(notifications)
        .innerJoin(users, eq(notifications.userId, users.id))
        .where(eq(users.role, "buyer"))
        .orderBy(desc(notifications.createdAt));
    } else {
      // Fetch notifications for a particular user
      rows = await db
        .select()
        .from(notifications)
        .where(eq(notifications.userId, Number(userId)))
        .orderBy(desc(notifications.createdAt));
    }

    res.json(rows);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, Number(id)));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark as read" });
  }
};