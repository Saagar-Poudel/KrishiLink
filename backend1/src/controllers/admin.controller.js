// controllers/dashboard.controller.js
import { db } from "../dbConnection/dbConnection.js";
import { users, products, orders, orderItems, messages, deletedUsers, reports } from "../models/schema.js";
import { eq, sql } from "drizzle-orm";

export const getDashboardStats = async (req, res) => {
  try {
    // Total buyers
    const buyersCount = await db
      .select({ count: sql`COUNT(*)` })
      .from(users)
      .where(eq(users.role, "buyer"));

    // Total sellers
    const sellersCount = await db
      .select({ count: sql`COUNT(*)` })
      .from(users)
      .where(eq(users.role, "farmer"));

    // Total products
    const productsCount = await db
      .select({ count: sql`COUNT(*)` })
      .from(products);

    // Total delivered orders (sum of totalAmount where status = delivered)
    const deliveredOrders = await db
      .select({ total: sql`COALESCE(SUM(${orders.totalAmount}), 0)` })
      .from(orders)
      .where(eq(orders.status, "delivered"));

    const totalDeliveredAmount = Number(deliveredOrders[0]?.total || 0);

    // Calculate revenue (1% of delivered amount)
    const revenue = totalDeliveredAmount * 0.01;

    res.json({
      totalBuyers: Number(buyersCount[0].count),
      totalSellers: Number(sellersCount[0].count),
      totalProducts: Number(productsCount[0].count),
      totalRevenue: revenue.toFixed(2),
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};

export const getAllBuyers = async (req, res) => {
  try {
    // fetch buyers with order count
    const buyers = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        joinDate: users.createdAt,
        status: users.status,
        orderCount: sql`COUNT(${orders.id})`.as("order_count"),
      })
      .from(users)
      .leftJoin(orders, eq(users.id, orders.userId))
      .where(eq(users.role, "buyer"))
      .groupBy(
        users.id,
        users.username,
        users.email,
        users.createdAt,
        users.status
      );

    // format joinDate
    const result = buyers.map((buyer) => ({
      id: buyer.id,
      username: buyer.username,
      email: buyer.email,
      joinDate: new Date(buyer.joinDate).toLocaleDateString(),
      orderCount: buyer.orderCount,
      status: buyer.status,
    }));

    res.json(result);
  } catch (error) {
    console.error("Error fetching buyers:", error);
    res.status(500).json({ error: "Failed to fetch buyers" });
  }
};

export const getAllSellers = async (req, res) => {
  try {
    // fetch sellers with product count + revenue
    const sellers = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        joinDate: users.createdAt,
        status: users.status,
        productCount: sql`COUNT(DISTINCT ${products.id})`.as("product_count"),
        revenue: sql`
          COALESCE(SUM(
            CASE 
              WHEN ${orders.status} = 'delivered' 
              THEN ${orderItems.price} * ${orderItems.quantity} 
              ELSE 0 
            END
          ), 0)
        `.as("revenue"),
      })
      .from(users)
      .leftJoin(products, eq(users.username, products.sellerName)) // link seller to products
      .leftJoin(orderItems, eq(products.id, orderItems.productId))
      .leftJoin(orders, eq(orderItems.orderId, orders.id))
      .where(eq(users.role, "farmer"))
      .groupBy(users.id, users.username, users.email, users.createdAt, users.status);

    // format response
    const result = sellers.map((seller) => ({
      id: seller.id,
      username: seller.username,
      email: seller.email,
      joinDate: new Date(seller.joinDate).toLocaleDateString(),
      productCount: Number(seller.productCount) || 0,
      revenue: Number(seller.revenue) || 0,
      status: seller.status ? "Verified" : "Unverified",
    }));

    res.json(result);
  } catch (error) {
    console.error("Error fetching sellers:", error);
    res.status(500).json({ error: "Failed to fetch sellers" });
  }
};

export const updateBuyer = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, status } = req.body;

    await db.update(users)
      .set({ username, email, status })
      .where(eq(users.id, Number(id)));

    res.json({ success: true, message: "Buyer updated successfully" });
  } catch (error) {
    console.error("Error updating buyer:", error);
    res.status(500).json({ error: "Failed to update buyer" });
  }
};

export const deleteBuyer = async (req, res) => {
  try {
    const { id } = req.params;

    // First delete messages referencing this user
    await db.delete(messages).where(eq(messages.fromUserId, id));

    // Then delete user
    await db.delete(users).where(eq(users.id, id));

    res.json({ message: "Buyer deleted successfully" });
  } catch (error) {
    console.error("Error deleting buyer:", error);
    res.status(500).json({ error: "Failed to delete buyer" });
  }
};

export const updateSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, status } = req.body;

    await db.update(users)
      .set({ username, email, status })
      .where(eq(users.id, Number(id)));

    res.json({ success: true, message: "Seller updated successfully" });
  } catch (error) {
    console.error("Error updating buyer:", error);
    res.status(500).json({ error: "Failed to update buyer" });
  }
};

export const deleteSeller = async (req, res) => {
  try {
    const { id } = req.params;

    // First delete messages referencing this user
    await db.delete(messages).where(eq(messages.fromUserId, id));

    // Then delete user
    await db.delete(users).where(eq(users.id, id));

    res.json({ message: "Seller deleted successfully" });
  } catch (error) {
    console.error("Error deleting buyer:", error);
    res.status(500).json({ error: "Failed to delete buyer" });
  }
};

export const addDeletedUser = async (req, res) => {
  try {
    const { name, email, type, reason } = req.body;

    if (!name || !email || !type || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [newDeletedUser] = await db
      .insert(deletedUsers)
      .values({
        name,
        email,
        type,
        reason,
      })
      .returning();

    res.status(201).json(newDeletedUser);
  } catch (error) {
    console.error("Error adding deleted user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDeletedUsers = async (_req, res) => {
  try {
    const allDeletedUsers = await db.select().from(deletedUsers);
    res.json(allDeletedUsers);
  } catch (error) {
    console.error("Error fetching deleted users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Priority mapping
const priorityMap= {
  "Product Issue": "High",
  "Fraudulent Seller": "High",
  "User Behavior": "Medium",
  "Product Quality": "Low",
};

// Create Report
export const createReport = async (req, res) => {
  try {
    const { reporter, reported, type } = req.body;

    if (!reporter || !reported || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const priority = priorityMap[type] || "Medium";

    const [newReport] = await db
      .insert(reports)
      .values({
        reporter,
        reported,
        type,
        priority,
      })
      .returning();

    return res.status(201).json(newReport);
  } catch (err) {
    console.error("Error creating report:", err);
    return res.status(500).json({ error: "Failed to create report" });
  }
};

// Get all reports
export const getReports = async (_req, res) => {
  try {
    const allReports = await db.select().from(reports);
    return res.json(allReports);
  } catch (err) {
    console.error("Error fetching reports:", err);
    return res.status(500).json({ error: "Failed to fetch reports" });
  }
};

export const getChartsData = async (req, res) => {
  try {
    // 1️⃣ Product Categories (grouped by category)
    const categories = await db
      .select({
        name: products.category,
        value: sql`SUM(${orderItems.quantity})::int`.as("value"),
      })
      .from(orderItems)
      .leftJoin(products, eq(orderItems.productId, products.id))
      .groupBy(products.category);

    // 2️⃣ Monthly Buyers / Sellers / Revenue
    const monthly = await db
      .select({
        month: sql`TO_CHAR(DATE_TRUNC('month', ${orders.createdAt}), 'Mon')`,
        buyers: sql`COUNT(DISTINCT CASE WHEN ${users.role} = 'buyer' THEN ${users.id} END)`,
        sellers: sql`COUNT(DISTINCT CASE WHEN ${users.role} = 'farmer' THEN ${users.id} END)`,
        revenue: sql`COALESCE(SUM(${orders.totalAmount}), 0)`,
      })
      .from(orders)
      .innerJoin(users, eq(orders.userId, users.id))
      .groupBy(sql`DATE_TRUNC('month', ${orders.createdAt})`)
      .orderBy(sql`DATE_TRUNC('month', ${orders.createdAt})`);

    // 3️⃣ Revenue Trend
    const revenueTrend = monthly.map((m) => ({
      month: m.month,
      revenue: Number(m.revenue),
    }));

    res.json({
      categories: categories.map((c) => ({
        name: c.name,
        value: Number(c.value) || 0,
      })),
      monthly: monthly.map((m) => ({
        month: m.month,
        buyers: Number(m.buyers) || 0,
        sellers: Number(m.sellers) || 0,
        revenue: Number(m.revenue) || 0,
      })),
      revenueTrend,
    });
  } catch (error) {
    console.error("Error fetching charts data:", error);
    res.status(500).json({ message: "Failed to fetch charts data" });
  }
};