const OrderDetailsDialog = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Order #{order.orderId}</h3>
        <p className="text-sm text-gray-500 mb-2">
          Status: {order.status} • {new Date(order.createdAt).toLocaleDateString()}
        </p>

        <div className="space-y-2">
          {order.products.map((p) => (
            <div key={p.id} className="flex justify-between text-sm">
              <span>{p.name} × {p.quantity}</span>
              <span>₹{p.price}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 font-semibold">
          Total: ₹{order.totalAmount}
        </div>

        <button
          className="mt-4 w-full px-3 py-2 bg-blue-600 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsDialog;