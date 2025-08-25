import { Request, Response } from "express";
import { db } from "../dbConnection/dbConnection";
import { orders, orderItems } from "../models/schema";
import { eq } from "drizzle-orm";

// ✅ Create new order
export const createOrder = async (req: Request, res: Response):Promise<any> => {
  try {
    const { userId, items } = req.body; 
    // items = [{ productId: 1, quantity: 2, price: 500 }, ...]

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ message: "User ID and items are required" });
    }

    const totalAmount = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

    const [newOrder] = await db.insert(orders).values({
      userId,
      totalAmount,
    }).returning();

    const orderItemsData = items.map((item: any) => ({
      orderId: newOrder.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    await db.insert(orderItems).values(orderItemsData);

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating order" });
  }
};

// ✅ Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await db.query.orders.findMany({
      with: { user: true, items: { with: { product: true } } },
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// ✅ Get order by ID
export const getOrderById = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id } = req.params;

    const order = await db.query.orders.findFirst({
      where: eq(orders.id, Number(id)),
      with: { user: true, items: { with: { product: true } } },
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order" });
  }
};

// ✅ Update order status
export const updateOrderStatus = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const [updatedOrder] = await db.update(orders)
      .set({ status })
      .where(eq(orders.id, Number(id)))
      .returning();

    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: "Error updating order" });
  }
};

// ✅ Delete order
export const deleteOrder = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id } = req.params;

    await db.delete(orderItems).where(eq(orderItems.orderId, Number(id)));
    const deletedOrder = await db.delete(orders).where(eq(orders.id, Number(id))).returning();

    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting order" });
  }
};
