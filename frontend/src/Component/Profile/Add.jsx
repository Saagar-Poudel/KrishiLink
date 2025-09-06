import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct({ onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !stock) return;

    const newProduct = {
      id: Date.now().toString(),
      name,
      price: Number(price),
      stock: Number(stock),
      sold: 0,
      status: Number(stock) > 0 ? "active" : "out_of_stock",
      image: image || "https://via.placeholder.com/60?text=Product"
    };

    onAdd(newProduct);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price per kg"
          className="w-full p-2 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock (kg)"
          className="w-full p-2 border rounded"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          className="w-full p-2 border rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}
