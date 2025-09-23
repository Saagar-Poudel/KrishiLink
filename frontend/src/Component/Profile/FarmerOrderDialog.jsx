import React from "react";

export default function OrderDetailsDialog({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] relative">
        <h2 className="text-lg font-semibold mb-4">Order Details</h2>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Order ID:</span> {order.id}
          </p>
          <div className="space-y-2">
            {order.products.map((p, idx) => (
              <div key={idx} className="flex justify-between">
                <span>
                  {p.product} (x{p.quantity})
                </span>
                <span>₹{p.total}</span>
              </div>
            ))}
          </div>
          <p>
            <span className="font-medium">Buyer:</span> {order.buyer}
          </p>
          <p>
            <span className="font-medium">Status:</span> {order.status}
          </p>
          <p>
            <span className="font-medium">Date:</span> {order.date}
          </p>

          {order.deliveryPartner && (
            <p>
              <span className="font-medium">Delivery Partner:</span>{" "}
              {order.deliveryPartner}
            </p>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
