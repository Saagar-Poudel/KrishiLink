import {db} from "../dbConnection/dbConnection.js";
import { notifications } from "../models/schema.js";
import { eq, desc } from "drizzle-orm";

export const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const rows = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, Number(userId)))
      .orderBy(desc(notifications.createdAt));
    res.json(rows);
  } catch (err) {
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