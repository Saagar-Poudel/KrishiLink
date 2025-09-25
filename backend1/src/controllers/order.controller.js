import { db } from "../dbConnection/dbConnection.js";
import {
  orders,
  orderItems,
  products,
  notifications,
  users,
} from "../models/schema.js";
import { eq, inArray, or } from "drizzle-orm";
import crypto from "crypto";
import { sendNotification } from "../utils/notification.service.js";
import { callKhalti } from "./khalti.controller.js";

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

        createdOrders.push({ ...newOrder, sellerId });
        const signature = createSignature(
          `total_amount=${newOrder.totalAmount},transaction_uuid=${newOrder.id},product_code=EPAYTEST`
        );
        if (payment_method === "esewa") {
          const formData = {
            amount: newOrder.totalAmount,
            failure_url: "http://localhost:5173",
            product_delivery_charge: "0",
            product_service_charge: "0",
            product_code: "EPAYTEST",
            signature: signature,
            signed_field_names: "total_amount,transaction_uuid,product_code",
            success_url: "http://localhost:3000/api/esewa/success",
            tax_amount: "0",
            total_amount: newOrder.totalAmount,
            transaction_uuid: newOrder.id,
          };
          res.json({
            message: "Order Created Sucessfully",
            newOrder,
            payment_method: "esewa",
            formData,
          });
        } else if (payment_method === "khalti") {
          const formData = {
            return_url: "http://localhost:3000/api/khalti/callback",
            website_url: "http://localhost:3000",
            amount: totalAmount * 100, // in paisa
            purchase_order_id: newOrder.id,
            purchase_order_name: "test",
          };
          callKhalti(formData, req, res);
        }
      }
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

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    // fetch orders with joined items & products
    const rows = await db
      .select({
        orderId: orders.id,
        status: orders.status,
        totalAmount: orders.totalAmount,
        createdAt: orders.createdAt,
        sellerName: products.sellerName,
        productId: products.id,
        productName: products.name,
        quantity: orderItems.quantity,
        price: orderItems.price,
      })
      .from(orders)
      .innerJoin(orderItems, eq(orderItems.orderId, orders.id))
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orders.userId, Number(userId)));

    // group orders
    const grouped = {};
    rows.forEach((row) => {
      if (!grouped[row.orderId]) {
        grouped[row.orderId] = {
          orderId: row.orderId,
          status: row.status,
          totalAmount: row.totalAmount,
          createdAt: row.createdAt,
          sellerName: row.sellerName,
          products: [],
          totalQuantity: 0,
        };
      }

      grouped[row.orderId].products.push({
        id: row.productId,
        name: row.productName,
        quantity: row.quantity,
        price: row.price,
      });

      grouped[row.orderId].totalQuantity += row.quantity;
    });

    res.json(Object.values(grouped));
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

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

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { action } = req.body; // "accept", "decline", "ship", "deliver"
  console.log(action);

  try {
    // Get order first
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId));

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    console.log(order.status);
    let newStatus;
    let notificationMessage;

    switch (action) {
      case "accept":
        if (order.status !== "paid")
          return res
            .status(400)
            .json({ error: "Only pending orders can be accepted" });
        newStatus = "packing";
        notificationMessage =
          "Your order has been accepted and is being packed.";
        break;

      case "decline":
        if (order.status !== "pending")
          return res
            .status(400)
            .json({ error: "Only pending orders can be declined" });
        newStatus = "declined";
        notificationMessage = "Unfortunately, your order has been declined.";
        break;

      case "ship":
        if (order.status !== "packing")
          return res
            .status(400)
            .json({ error: "Only packing orders can be shipped" });
        newStatus = "shipped";
        notificationMessage = "Your order is on the way 🚚.";
        break;

      case "deliver":
        if (order.status !== "shipping")
          return res
            .status(400)
            .json({ error: "Only shipped orders can be delivered" });
        newStatus = "delivered";
        notificationMessage = "Your order has been delivered ✅.";
        break;

      default:
        return res.status(400).json({ error: "Invalid action" });
    }

    // Update order status
    const updated = await db
      .update(orders)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(eq(orders.id, orderId))
      .returning();

    // 🔔 Send notification to the buyer
    await sendNotification({
      userId: order.userId, // buyer ID
      type: "order",
      title: "Order Update",
      message: notificationMessage,
    });

    return res.json({
      message: "Order updated successfully",
      order: updated[0],
    });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: "Internal server error" });
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
      .set({ status: "paid", updatedAt: new Date() })
      .where(eq(orders.id, Number(req.transaction_uuid)))
      .returning();
    console.log(updatedOrder);

    await sendNotification({
      userId: updatedOrder.userId,
      type: "order",
      title: "Order Update",
      message: `Your order #${updatedOrder.id} Payment is Successful.`,
    });

    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.redirect("http://localhost:5173");
  } catch (error) {
    return res.status(400).json({ error: error?.message || "No Orders Found" });
  }
};

export const createSignature = (message) => {
  const secret = "8gBm/:&EnhH.1/q";
  // Create an HMAC-SHA256 hash
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);

  // Get the digest in base64 format
  const hashInBase64 = hmac.digest("base64");
  return hashInBase64;
};

export const assignDeliveryPartner = async (req, res) => {
  const { orderId } = req.params;
  const { partner } = req.body;

  try {
    await db
      .update(orders)
      .set({ deliveryPartner: partner, status: "shipping" })
      .where(eq(orders.id, orderId));

    res.json({ success: true, message: "Delivery partner assigned" });
  } catch (err) {
    console.error("Error assigning delivery partner:", err);
    res.status(500).json({ error: "Failed to assign delivery partner" });
  }
};
