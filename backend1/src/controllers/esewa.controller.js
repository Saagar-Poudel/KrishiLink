import { verifyResponseSignature } from "../controllers/order.controller.js";

export const handleEsewaSuccess = async (req, res, next) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ message: "Missing payment data" });
    }

    // Decode the base64 data
    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf-8")
    );
    console.log("Decoded Data:", decodedData);

    // Must be complete
    if (decodedData.status !== "COMPLETE") {
      return res.status(400).json({ message: "Transaction not complete" });
    }

    // Rebuild message exactly as per signed_field_names
    const message = decodedData.signed_field_names
      .split(",")
      .map((field) => `${field}=${decodedData[field]}`)
      .join(",");

    console.log("Message for Signature:", message);

    // Verify signature
    const signature = verifyResponseSignature(message);
    if (signature !== decodedData.signature) {
      return res.status(400).json({ message: "Integrity error" });
    }

    // Attach to req for the next middleware/controller
    req.transaction_uuid = decodedData.transaction_uuid;
    req.transaction_code = decodedData.transaction_code;

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err?.message || "Verification failed" });
  }
};
