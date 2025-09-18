import { Router } from "express";
import { db } from "../dbConnection/dbConnection.js";
import { messages, users } from "../models/schema.js";
import { eq, or, and } from "drizzle-orm";

const router = Router();

// Add message
router.post("/add", async (req, res) => {
  const { from, to, message } = req.body;

  const [newMessage] = await db.insert(messages).values({
    fromUserId: from,
    toUserId: to,
    message,
  }).returning();

  res.json({ success: true, message: newMessage });
});

// Get all messages between two users
router.post("/get", async (req, res) => {
  const { from, to } = req.body;

  const msgs = await db
    .select({
      id: messages.id,
      message: messages.message,
      createdAt: messages.createdAt,
      fromUserId: messages.fromUserId,
      toUserId: messages.toUserId,
      fromUsername: users.username,
    })
    .from(messages)
    .leftJoin(users, eq(messages.fromUserId, users.id))
    .where(
      or(
        and(eq(messages.fromUserId, from), eq(messages.toUserId, to)),
        and(eq(messages.fromUserId, to), eq(messages.toUserId, from))
      )
    )
    .orderBy(messages.createdAt);

  res.json(msgs);
});

// Get all distinct chat users for a given user
router.get("/conversations/:userId", async (req, res) => {
  const { userId } = req.params;

  const results = await db
    .select({
      id: users.id,
      username: users.username,
    })
    .from(messages)
    .leftJoin(users, or(eq(messages.fromUserId, users.id), eq(messages.toUserId, users.id)))
    .where(or(eq(messages.fromUserId, userId), eq(messages.toUserId, userId)));

  // Filter unique users (excluding yourself)
  const uniqueUsers = results
    .filter((u) => u.id && u.id.toString() !== userId)
    .reduce((acc, user) => {
      if (!acc.find((x) => x.id === user.id)) acc.push(user);
      return acc;
    }, []);

  res.json(uniqueUsers);
});

export default router;