import { Request, Response } from "express";
import { db } from "../dbConnection/dbConnection";
import { users, products, orders, orderItems } from "../models/schema";
import { sql } from "drizzle-orm";

export const getSummary = async (_req:Request, res: Response):Promise<any> => {
  try {
    const [totals] = await db.execute(
    sql`SELECT 
      COUNT(DISTINCT ${users.id}) as total_users,
      COUNT(DISTINCT ${orders.id}) as total_orders,
      SUM(${orders.totalAmount}) as total_revenue,
      COUNT(DISTINCT ${products.id}) as total_products
    FROM ${orders}
    LEFT JOIN ${users} ON ${orders.userId} = ${users.id}
    LEFT JOIN ${orderItems} ON ${orderItems.orderId} = ${orders.id}
    LEFT JOIN ${products} ON ${orderItems.productId} = ${products.id};`
  );

  const topProducts = await db.execute(
    sql`SELECT p.name, SUM(oi.quantity) as total_sold
        FROM ${orderItems} oi
        JOIN ${products} p ON p.id = oi.product_id
        GROUP BY p.name
        ORDER BY total_sold DESC
        LIMIT 5;`
  );

  res.json({ totals, topProducts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch summary" });
  }
};