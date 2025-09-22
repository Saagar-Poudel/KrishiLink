// controllers/wishlist.controller.js
import { db } from "../dbConnection/dbConnection.js";
import { wishlists, products } from "../models/schema.js";
import { eq, and } from "drizzle-orm";

// ✅ Add product to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Check if already wishlisted
    const existing = await db
      .select()
      .from(wishlists)
      .where(and(eq(wishlists.userId, userId), eq(wishlists.productId, productId)));

    if (existing.length > 0) {
      return res.status(400).json({ error: "Product already in wishlist" });
    }

    const [newWishlist] = await db
      .insert(wishlists)
      .values({ userId, productId })
      .returning();

    res.status(201).json(newWishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
};

// ✅ Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const [deleted] = await db
      .delete(wishlists)
      .where(and(eq(wishlists.userId, userId), eq(wishlists.productId, productId)))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }

    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
};

// ✅ Get all wishlisted products for a user
export const getUserWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const rows = await db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        image: products.image,
        unit: products.unit,
        category: products.category,
        rating: products.rating,
        reviewCount: products.reviewCount,
      })
      .from(wishlists)
      .innerJoin(products, eq(wishlists.productId, products.id))
      .where(eq(wishlists.userId, Number(userId)));

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};