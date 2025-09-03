import { Request, Response } from "express";
import { db } from "../dbConnection/dbConnection";
import { products } from "../models/schema";
import { eq } from "drizzle-orm";

// ✅ Get all products
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const result = await db.select().from(products);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// ✅ Get single product
export const getProductById = async (req: Request, res: Response):Promise<any> => {
  try {
    const id = Number(req.params.id);
    const [result] = await db.select().from(products).where(eq(products.id, id));
    if (!result) return res.status(404).json({ error: "Product not found" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// ✅ Create product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, nameNepali, category, price, unit, quantity, location, sellerName, image, isVerified, isAvailable, hasDelivery, rating, reviewCount, isOrganic, isBulkAvailable, estimatedDelivery } = req.body;
    const [newProduct] = await db.insert(products).values({
      name, nameNepali, category, price, unit, quantity, location, sellerName, image, isVerified, isAvailable, hasDelivery, rating, reviewCount, isOrganic, isBulkAvailable, estimatedDelivery
    }).returning();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

// ✅ Update product
export const updateProduct = async (req: Request, res: Response):Promise<any> => {
  try {
    const id = Number(req.params.id);
    const { name, price } = req.body;
    const [updatedProduct] = await db.update(products)
      .set({ name, price })
      .where(eq(products.id, id))
      .returning();
    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// ✅ Delete product
export const deleteProduct = async (req: Request, res: Response):Promise<any> => {
  try {
    const id = Number(req.params.id);
    const [deleted] = await db.delete(products).where(eq(products.id, id)).returning();
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
