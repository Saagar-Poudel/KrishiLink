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

        createdOrders.push(newOrder);

        // Add notification for buyer
        await sendNotification({
          userId,
          type: "order",
          title: "Order Placed",
          message: `Your order #${newOrder.id} has been placed successfully.`,
        });

        // Add notification for seller(s)
        await sendNotification({
          userId: sellerItems[0].product.sellerId, // if sellerId exists
          type: "order",
          title: "New Order",
          message: `You have a new order for ${sellerItems.length} items.`,
        });

        // 4c. Prepare payment payload only once
        if (!paymentPayload) {
          if (payment_method === "esewa") {
            const transaction_uuid = `order-${newOrder.id}-${Date.now()}`;
            const amountStr = Number(totalAmount).toFixed(2);
            const message = `total_amount=${amountStr},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`;

            const hmac = crypto.createHmac("sha256", process.env.SECRET.trim());
            hmac.update(message);
            const signature = hmac.digest("base64");

            paymentPayload = {
              esewa: {
                amount: amountStr,
                transaction_uuid,
                signature,
                product_code: "EPAYTEST",
                success_url: process.env.SUCCESS_URL,
                failure_url: process.env.FAILURE_URL,
              },
            };
          } else if (payment_method === "khalti") {
            paymentPayload = {
              khalti: {
                return_url: "http://localhost:3000/api/khalti/callback",
                website_url: "http://localhost:3000",
                amount: totalAmount * 100, // in paisa
                purchase_order_id: newOrder.id,
                purchase_order_name: "test",
              },
            };
          }
        }
      }
    });

    // ✅ Final response
    res.status(201).json({
      message: "Orders created successfully",
      orders: createdOrders,
      ...paymentPayload, // attach outside orders
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: err.message || "Error creating order" });
  }
};