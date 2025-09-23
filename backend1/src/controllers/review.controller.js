import { db } from "../dbConnection/dbConnection.js";
import { reviews, products, users } from "../models/schema.js";
import { eq, sql } from "drizzle-orm";

// Add a review
// Add a review
export const addReview = async (req, res) => {
  try {
    const { userId, productId, rating, review } = req.body;

    const [newReview] = await db
      .insert(reviews)
      .values({ userId, productId, rating, review })
      .returning({
        id: reviews.id,
        rating: reviews.rating,
        review: reviews.review,
        createdAt: reviews.createdAt,   // ✅ make sure schema has createdAt default now()
        userId: reviews.userId,
      });

    const [userData] = await db
      .select({ username: users.username }) // or users.username
      .from(users)
      .where(eq(users.id, userId));

    // recalc rating
    const result = await db
      .select({
        avg: sql`AVG(${reviews.rating})`,
        count: sql`COUNT(*)`,
      })
      .from(reviews)
      .where(eq(reviews.productId, productId));

    const avg = Number(result[0].avg).toFixed(1);
    const count = Number(result[0].count);

    await db
      .update(products)
      .set({ rating: avg, reviewCount: count })
      .where(eq(products.id, productId));

    res.json({
      success: true,
      review: {
        ...newReview,
        username: userData?.username || "Anonymous",
      },
    });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ error: "Failed to add review" });
  }
};


// Get reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const productReviews = await db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        review: reviews.review,
        createdAt: reviews.createdAt,
        userId: reviews.userId,
        username: users.username, // <-- get username from users schema
      })
      .from(reviews)
      .leftJoin(users, eq(reviews.userId, users.id)) // join with users
      .where(eq(reviews.productId, productId));

    res.json(productReviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};
