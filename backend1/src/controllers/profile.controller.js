import { db } from "../dbConnection/dbConnection.js";
import { orders, orderItems, products, users } from "../models/schema.js";
import { eq, and } from "drizzle-orm";

// Helper: calculate growth percentage
const calcGrowthText = (current, previous) => {
  if (previous === 0 && current > 0) return "100% growth from last month";
  if (previous === 0 && current === 0) return "No change from last month";

  const diff = current - previous;
  const percent = ((Math.abs(diff) / previous) * 100).toFixed(2);

  if (diff > 0) return `${percent}% growth from last month`;
  if (diff < 0) return `${percent}% decline from last month`;
  return "No change from last month";
};

export const getFarmerProfileStats = async (req, res) => {
  try {
      const { farmerId } = req.params;

    // Check farmer exists
    const farmer = await db
      .select()
      .from(users)
          .where(and(eq(users.id, farmerId), eq(users.role, "farmer")));

    if (!farmer.length) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    // Get all completed orders involving this farmer's products
    const completedOrders = await db
      .select({
        orderId: orders.id,
        totalAmount: orders.totalAmount,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .innerJoin(orderItems, eq(orderItems.orderId, orders.id))
      .innerJoin(products, eq(products.id, orderItems.productId))
      .where(
        and(
          eq(products.sellerName, farmer[0].username), // or sellerId if you add that
          eq(orders.status, "complete")
        )
      );

    // Total earnings
    const totalEarnings = completedOrders.reduce(
      (sum, o) => sum + Number(o.totalAmount),
      0
    );

    // Current and previous month boundaries
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const thisMonthRevenue = completedOrders
      .filter(
        (o) =>
          new Date(o.createdAt) >= startOfThisMonth &&
          new Date(o.createdAt) < startOfNextMonth
      )
      .reduce((sum, o) => sum + Number(o.totalAmount), 0);

    const lastMonthRevenue = completedOrders
      .filter(
        (o) =>
          new Date(o.createdAt) >= startOfLastMonth &&
          new Date(o.createdAt) < startOfThisMonth
      )
      .reduce((sum, o) => sum + Number(o.totalAmount), 0);

    const growthText = calcGrowthText(thisMonthRevenue, lastMonthRevenue);

    // Product stats
    const allProducts = await db
      .select()
      .from(products)
      .where(eq(products.sellerName, farmer[0].username));

    const totalProducts = allProducts.length;
    const activeProducts = allProducts.filter((p) => p.isAvailable).length;

    res.json({
      farmerId,
      totalEarnings,
      thisMonthRevenue,
      growthText,
      totalProducts,
      activeProducts,
    });
  } catch (err) {
    console.error("Error in getFarmerProfileStats:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Buyer Profile Stats
export const getBuyerProfileStats = async (req, res) => {
  try {
    const { buyerId } = req.params;

    // 1. Check buyer exists
    const buyer = await db
      .select()
      .from(users)
      .where(and(eq(users.id, buyerId), eq(users.role, "buyer")));

    if (!buyer.length) {
      return res.status(404).json({ message: "Buyer not found" });
    }


    // 2. Fetch all orders by this buyer
    const buyerOrders = await db
      .select({
        id: orders.id,
        status: orders.status,
        totalAmount: orders.totalAmount,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .where(eq(orders.userId, buyerId));

    // 3. Total spent = sum of complete orders
    const totalSpent = buyerOrders
      .filter((o) => o.status.toLowerCase() === "complete" || o.status.toLowerCase() === "delivered")
      .reduce((sum, o) => sum + Number(o.totalAmount), 0);

    // 4. Count orders by status
    const statusCounts = buyerOrders.reduce((acc, order) => {
      const status = order.status.toLowerCase();
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // 5. Response
    res.json({
      buyerId,
      totalSpent,
      totalOrders: buyerOrders.length,
      statusCounts, // e.g. { pending: 2, shipped: 1, complete: 3 }
    });
  } catch (err) {
    console.error("Error in getBuyerProfileStats:", err);
    res.status(500).json({ message: "Server error" });
  }
};
