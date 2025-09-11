import React, { useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import toast, { Toaster } from "react-hot-toast";
import ConfirmDialog from "../ConfirmDialog";

export default function Dashboard() {

  // const [products, setProducts] = useState([]);
  // const [orders, setOrders] = useState([]);
  // const [summary, setSummary] = useState({ totals: {}, topProducts: [] });
  // const [revenueTrend, setRevenueTrend] = useState({ labels: [], datasets: [] });

  // Edit modal states
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, title: "", price: "" });

   // For Delete
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Delete Product
  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  // const handleDelete = async () => {
  //   try {
  //     const res = await fetch(`https://fakestoreapi.com/products/${deleteId}`, {
  //       method: "DELETE",
  //     });
  //     if (!res.ok) throw new Error("Delete failed");

  //     setProducts((prev) => prev.filter((p) => p.id !== deleteId));
  //     toast.success("Product deleted!");
  //   } catch (err) {
  //     console.error("Delete error:", err);
  //     toast.error("Failed to delete");
  //   } finally {
  //     setIsConfirmOpen(false);
  //     setDeleteId(null);
  //   }
  // };

  // // Open edit modal
  // const handleEdit = (product) => {
  //   setCurrentProduct({ id: product.id, title: product.title, price: product.price });
  //   setIsEditing(true);
  // };

  // // Save Edited Product
  // const saveEdit = async () => {
  //   try {
  //     const res = await fetch(`https://fakestoreapi.com/products/${currentProduct.id}`, {
  //       method: "PUT",
  //       body: JSON.stringify({
  //         title: currentProduct.title,
  //         price: currentProduct.price,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!res.ok) throw new Error("Update failed");

  //     const updatedProduct = await res.json();
  //     setProducts((prev) =>
  //       prev.map((p) => (p.id === currentProduct.id ? updatedProduct : p))
  //     );

  //     setIsEditing(false);
  //     toast.success("Product updated!");
  //   } catch (err) {
  //     console.error("Edit error:", err);
  //     toast.error("Failed to update product");
  //   }
  // };


  // Dummy data (pretend it's from backend)
  const summary = {
    totals: {
      total_users: 1200,
      total_orders: 350,
      total_revenue: 14500,
      total_products: 85,
    },
    topProducts: [
      { name: "Organic Apples", total_sold: 120 },
      { name: "Brown Rice", total_sold: 95 },
      { name: "Fresh Milk", total_sold: 80 },
      { name: "Almonds", total_sold: 60 },
      { name: "Olive Oil", total_sold: 45 },
    ],
  };

  const products = [
    { id: 1, name: "Organic Apples", price: 3.5, quantity: 40, isAvailable: true },
    { id: 2, name: "Brown Rice", price: 20, quantity: 0, isAvailable: false },
    { id: 3, name: "Fresh Milk", price: 1.5, quantity: 15, isAvailable: true },
    { id: 4, name: "Olive Oil", price: 15, quantity: 8, isAvailable: true },
  ];

  const orders = [
    { id: 101, status: "Delivered", totalAmount: 150, createdAt: "2025-09-01" },
    { id: 102, status: "Pending", totalAmount: 75, createdAt: "2025-09-02" },
    { id: 103, status: "Cancelled", totalAmount: 50, createdAt: "2025-09-03" },
    { id: 104, status: "Shipped", totalAmount: 200, createdAt: "2025-09-04" },
    { id: 105, status: "Delivered", totalAmount: 300, createdAt: "2025-09-05" },
  ];

  const revenueTrend = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [2500, 4000, 3500, 5000, 4500],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">📊 Business Dashboard</h1>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Users" value={summary.totals.total_users} color="bg-blue-500" />
        <Card title="Total Orders" value={summary.totals.total_orders} color="bg-green-500" />
        <Card title="Revenue" value={`$${summary.totals.total_revenue}`} color="bg-yellow-500" />
        <Card title="Products" value={summary.totals.total_products} color="bg-purple-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Selling Products */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-bold mb-4 text-lg">Top Selling Products</h2>
          <Bar
            data={{
              labels: summary.topProducts.map(p => p.name),
              datasets: [
                {
                  label: "Units Sold",
                  data: summary.topProducts.map(p => p.total_sold),
                  backgroundColor: "#2563eb",
                },
              ],
            }}
          />
        </div>

        {/* Product Availability */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-bold mb-4 text-lg">Product Availability</h2>
          <Pie
            data={{
              labels: ["Available", "Unavailable"],
              datasets: [
                {
                  data: [
                    products.filter(p => p.isAvailable).length,
                    products.filter(p => !p.isAvailable).length,
                  ],
                  backgroundColor: ["#4ade80", "#f87171"],
                },
              ],
            }}
          />
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition mb-8">
        <h2 className="font-bold mb-4 text-lg">Revenue Trend (Last 5 Months)</h2>
        <Line data={revenueTrend} />
      </div>

      {/* Products Table */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition mb-8">
        <h2 className="font-bold mb-4 text-lg">Manage Products</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{p.name}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">{p.quantity}</td>
                <td className="p-3 flex gap-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Orders Table */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h2 className="font-bold mb-4 text-lg">Recent Orders</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3">Order ID</th>
              <th className="p-3">Status</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{o.id}</td>
                <td className={`p-3 font-semibold ${o.status === "Delivered" ? "text-green-600" : o.status === "Pending" ? "text-yellow-600" : o.status === "Cancelled" ? "text-red-600" : "text-blue-600"}`}>
                  {o.status}
                </td>
                <td className="p-3">${o.totalAmount}</td>
                <td className="p-3">{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`p-6 rounded-xl shadow text-white ${color} hover:shadow-lg transition`}>
      <span className="text-2xl font-bold">{title}:</span>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );
}
