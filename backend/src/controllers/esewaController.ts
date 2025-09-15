import { Request, Response } from "express";
import { db } from "../dbConnection/dbConnection"; // your drizzle db instance
import { Transaction } from "../models/schema"; 
import { eq } from "drizzle-orm";

import { loadEsewa } from "../services/esewaClient";


// Initiate Esewa Payment
export const EsewaInitiatePayment = async (req: Request, res: Response): Promise<any> => {
  const { amount, productId } = req.body;
  const { EsewaPaymentGateway } = await loadEsewa();


  try {
    const reqPayment = await EsewaPaymentGateway(
      amount,
      0,
      0,
      0,
      productId,
      process.env.MERCHANT_ID!,
      process.env.SECRET!,
      process.env.SUCCESS_URL!,
      process.env.FAILURE_URL!,
      process.env.ESEWAPAYMENT_URL!,
      undefined,
      undefined
    );

    if (!reqPayment) {
      return res.status(400).json("Error sending data");
    }

    if (reqPayment.status === 200) {
      // Insert into DB
      await db.insert(Transaction).values({
        productId: parseInt(productId), // ensure it's an integer
        amount: amount,
        status: "PENDING",
      });

      console.log("Transaction saved ✅");
      return res.send({
        url: (reqPayment.request as any).res.responseUrl, // depending on esewajs response type
      });
    }
  } catch (error: any) {
    console.error("Esewa Initiate Error:", error);
    return res.status(500).json({ message: "Error sending data", error: error.message });
  }
};

// Check Esewa Payment Status
export const paymentStatus = async (req: Request, res: Response):Promise<any> => {
  const { productId } = req.body;
  const { EsewaCheckStatus } = await loadEsewa();

  try {
    // Find transaction by productId
    const [transaction] = await db
      .select()
      .from(Transaction)
      .where(eq(Transaction.productId, parseInt(productId)));

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check status from Esewa
    const paymentStatusCheck = await EsewaCheckStatus(
      Number(transaction.amount),
      transaction.productId,
      process.env.MERCHANT_ID!,
      process.env.ESEWAPAYMENT_STATUS_CHECK_URL!
    );

    if (paymentStatusCheck.status === 200) {
      // Update transaction in DB
      await db
        .update(Transaction)
        .set({ status: paymentStatusCheck.data.status })
        .where(eq(Transaction.id, transaction.id));

      return res.status(200).json({
        message: "Transaction status updated successfully",
        status: paymentStatusCheck.data.status,
      });
    } else {
      return res.status(400).json({ message: "Esewa status check failed" });
    }
  } catch (error: any) {
    console.error("Error updating transaction status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
