import { db } from "../dbConnection/dbConnection.js";
import { orders, orderItems, products, transaction } from "../models/schema.js";
import { eq } from "drizzle-orm";
import crypto from "crypto";

// ✅ Create new order
export const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;
    // items = [{ productId: 1, quantity: 2 }, ...]

    if (!userId || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "User ID and items are required" });
    }

    let formData;

    // ✅ Run everything inside a transaction
    const result = await db.transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData = [];

      for (const item of items) {
        if (!item.productId || !item.quantity || item.quantity <= 0) {
          throw new Error("Invalid product or quantity");
        }

        // ✅ Fetch product price from DB (don’t trust client price)
        const [product] = await tx
          .select()
          .from(products)
          .where(eq(products.id, item.productId));

        if (!product) throw new Error("Product not found");

        const itemTotal = Number(product.price) * item.quantity;
        totalAmount += itemTotal;

        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price, // snapshot from DB
        });
      }

      // ✅ Insert order
      const [newOrder] = await tx
        .insert(orders)
        .values({
          userId,
          totalAmount,
          contactName: req.body.contactName,
          phone: req.body.phone,
          email: req.body.email,
          location: req.body.location,
          notes: req.body.notes || null,
        })
        .returning();

      // ✅ Attach orderId to items
      const itemsWithOrderId = orderItemsData.map((oi) => ({
        ...oi,
        orderId: newOrder.id,
      }));
      const signature = createRequestSignature(newOrder.totalAmount, newOrder.id, process.env.MERCHANT_ID);

      formData = {
      amount: newOrder.totalAmount,
      failure_url: process.env.FAILURE_URL,
      product_delivery_charge: "0",
      product_service_charge: "0",
      product_code: process.env.MERCHANT_ID,
      signature: signature,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: process.env.SUCCESS_URL,
      tax_amount: "0",
      totalAmount: newOrder.totalAmount,
      transaction_uuid: newOrder.id,
    }

      await tx.insert(orderItems).values(itemsWithOrderId);
      return newOrder;
    });

    res
      .status(201)
      .json({ message: "Order placed successfully", order: result, formData: formData });
  } catch (err) {
    console.error(err);
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

// ✅ Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const [updatedOrder] = await db
      .update(orders)
      .set("paid")
      .where(eq(orders.id, Number(req.transaction_uuid)))
      .returning();

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

// For request (when you send to eSewa)
export const createRequestSignature = (totalAmount, transactionId, productCode) => {
  const amountStr = Number(totalAmount).toFixed(2);
  const message = `total_amount=${amountStr},transaction_uuid=${transactionId},product_code=${productCode}`;
  
  const hmac = crypto.createHmac("sha256", process.env.SECRET.trim());
  hmac.update(message);
  return hmac.digest("base64");
};

// For response (when verifying eSewa’s callback)
export const verifyResponseSignature = (message) => {
  const hmac = crypto.createHmac("sha256", process.env.SECRET.trim());
  hmac.update(message);
  return hmac.digest("base64");
};