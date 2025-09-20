import { db } from "../dbConnection/dbConnection.js";
import {
  orders,
  orderItems,
  products,
  notifications,
  users
} from "../models/schema.js";
import { eq, inArray } from "drizzle-orm";
import crypto from "crypto";
import { type } from "os";
import { sendNotification } from "../utils/notification.service.js";

// ✅ Create new order
export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      contactName,
      phone,
      email,
      location,
      notes,
      payment_method,
    } = req.body;

    if (!userId || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "User ID and items are required" });
    }

    const productIds = items.map((i) => i.productId);

    // 1. Fetch products
    const fetchedProducts = await db
      .select()
      .from(products)
      .where(inArray(products.id, productIds));

    if (fetchedProducts.length === 0) {
      return res.status(400).json({ message: "Invalid product IDs" });
    }

    // 2. Merge items with product
    const itemsWithSeller = items.map((i) => {
      const product = fetchedProducts.find((p) => p.id === i.productId);
      if (!product) throw new Error(`Product not found: ${i.productId}`);
      return { ...i, product };
    });

    // 3. Group by sellerName
    const groupedBySeller = itemsWithSeller.reduce((acc, item) => {
      if (!acc[item.product.sellerName]) acc[item.product.sellerName] = [];
      acc[item.product.sellerName].push(item);
      return acc;
    }, {});

    const createdOrders = [];
    let paymentPayload = null;

    // 4. Transaction
    await db.transaction(async (tx) => {
      for (const [sellerName, sellerItems] of Object.entries(groupedBySeller)) {
        const totalAmount = sellerItems.reduce(
          (sum, item) => sum + Number(item.product.price) * item.quantity,
          0
        );

        const [sellerUser] = await tx
          .select()
          .from(users)
          .where(eq(users.username, sellerName));

        if (!sellerUser) {
          throw new Error(`Seller with username "${sellerName}" not found`);
        }

        const sellerId = sellerUser.id;

        // 4a. Insert into orders
        const [newOrder] = await tx
          .insert(orders)
          .values({
            userId,
            totalAmount,
            contactName,
            phone,
            email,
            location,
            notes,
            paymentMethod: payment_method,
            status: "pending",
          })
          .returning();

        // 4b. Insert order items
        for (const item of sellerItems) {
          await tx.insert(orderItems).values({
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          });
        }

        createdOrders.push({...newOrder,sellerId});

        // Add notification for buyer
        await sendNotification({
          userId,
          type: "order",
          title: "Order Placed",
          message: `Your order #${newOrder.id} has been placed successfully.`,
        });

        // Add notification for seller(s)
        await sendNotification({
          userId: sellerId, // if sellerId exists
          type: "order",
          title: "New Order",
          message: `You have a new order for ${sellerItems.length} items.`,
        });
      }
    });

    res.status(201).json({
      message: "Orders created successfully",
      orders: createdOrders,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: err.message || "Error creating order" });
  }
};

// ✅ Get all orders
export const getAllOrders = async (req, res) => {
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
export const getOrderById = async (req, res) => {
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

// controllers/order.controller.js
export const getAllOrdersBySellerName = async (req, res) => {
  try {
    const { sellerName } = req.params;
    const result = await db.query.orders.findMany({
      with: {
        user: true,
        items: {
          with: { product: true },
        },
      },
      where: (orders, { eq }) => eq(orders.id, orders.id), // placeholder, Drizzle requires condition
    });

    // Filter only orders where any item belongs to this seller
    const filtered = result
      .map((order) => {
        const sellerItems = order.items.filter((item) => {
          return (
            item.product?.sellerName.toLowerCase() &&
            item.product.sellerName.toLowerCase() === sellerName.toLowerCase()
          );
        });

        if (sellerItems.length === 0) return null;

        return sellerItems.map((item) => ({
          id: order.id,
          buyer: order.user.username,
          product: item.product.name,
          quantity: item.quantity,
          total: Number(item.price) * item.quantity,
          status: order.status,
          date: order.createdAt,
        }));
      })
      .flat()
      .filter(Boolean);

    res.json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching seller orders" });
  }
};

// ✅ Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const [updatedOrder] = await db
      .update(orders)
      .set("paid")
      .where(eq(orders.id, Number(req.transaction_uuid)))
      .returning();

    await sendNotification({
      userId: updatedOrder.userId,
      title: "Order Update",
      message: `Your order #${updatedOrder.id} is now marked as ${updatedOrder.status}.`,
    });

    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.redirect("http://localhost:5173");
  } catch (err) {
    res.status(500).json({ message: "Error updating order" });
  }
};

// ✅ Delete order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await db.delete(orderItems).where(eq(orderItems.orderId, Number(id)));
    const deletedOrder = await db
      .delete(orders)
      .where(eq(orders.id, Number(id)))
      .returning();

    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting order" });
  }
};

export const updateOrderAfterPayment = async (req, res, next) => {
  try {
    console.log(req.body);
    const [updatedOrder] = await db
      .update(orders)
      .set("paid")
      .where(eq(orders.id, Number(req.transaction_uuid)))
      .returning();

    await sendNotification({
      userId: updatedOrder.userId,
      title: "Order Update",
      message: `Your order #${updatedOrder.id} is now marked as ${updatedOrder.status}.`,
    });

    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.redirect("http://localhost:5173");
  } catch (error) {
    return res.status(400).json({ error: err?.message || "No Orders Found" });
  }
};

export const createSignature = (totalAmount, transactionId, productCode) => {
  // ensure exactly 2 decimal places
  const amountStr = Number(totalAmount).toFixed(2);

  // build string exactly in order of signed_field_names
  const message = `total_amount=${amountStr},transaction_uuid=${transactionId},product_code=${productCode}`;

  const hmac = crypto.createHmac("sha256", process.env.SECRET.trim());
  hmac.update(message);
  return hmac.digest("base64").toString();
};
