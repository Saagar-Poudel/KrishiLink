import { createSignature } from "./order.controller.js";

export const handleEsewaSuccess = async (req, res, next) => {
  try {
    const { data } = req.body;
    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf-8")
    );
    console.log("Decoded Data:", decodedData);

    if (decodedData.status !== "COMPLETE") {
      return res.status(400).json({ message: "Transaction not complete" });
    }
    const message = decodedData.signed_field_names
      .split(",")
      .map((field) => `${field}=${decodedData[field]}`)
      .join(",");
    console.log("Message for Signature:", message);
    const signature = createSignature(message,process.env.SECRET);
    if (signature !== decodedData.signature) {
      return res.status(400).json({ message: "Integrity error" });
    }
    req.transaction_uuid = decodedData.transaction_uuid;
    req.transaction_code = decodedData.transaction_code;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err?.message || "No order found" });
  }
};
