// components/DeliveryPartnerDialog.jsx
import React, { useState, useEffect } from "react";

const DELIVERY_PARTNERS = [
  "Nepal Can Move",
  "Pathao Parcel",
  "Super Express Courier",
];

export default function DeliveryPartnerDialog({ orderId, onClose, onConfirm }) {
  const [selected, setSelected] = useState("");

  // Prevent scrolling on background when dialog is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Transparent backdrop that blocks interaction */}
      <div
        className="absolute inset-0"
        onClick={onClose} // optional: close when clicking outside
      />

      {/* Dialog box */}
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-96 border z-10">
        <h2 className="text-lg font-semibold mb-4">Choose Delivery Partner</h2>

        <div className="space-y-3">
          {DELIVERY_PARTNERS.map((partner) => (
            <label
              key={partner}
              className={`flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50 ${
                selected === partner ? "border-green-500 bg-green-50" : ""
              }`}
            >
              <input
                type="radio"
                name="deliveryPartner"
                value={partner}
                checked={selected === partner}
                onChange={() => setSelected(partner)}
              />
              {partner}
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Close
          </button>
          <button
            onClick={() => onConfirm(orderId, selected)}
            disabled={!selected}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
          >
            Send to Shipping
          </button>
        </div>
      </div>
    </div>
  );
}
