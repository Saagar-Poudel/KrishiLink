import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../contexts/Authcontext";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // backend

export default function AddProduct() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: 0,
    sellerName: user.username,
    location: "Chitwan",
    category: "",
    image: "",
    estimatedDelivery: "",
  });

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  async function handleImageUpload(file) {
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuid()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file, { upsert: true, cacheControl: "3600" });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      setFormData((f) => ({ ...f, image: data.publicUrl }));
      setPreview(data.publicUrl);
    } catch (err) {
      toast.error(err.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const categories = [
    "Vegetables",
    "Fruits",
    "Grains",
    "Dairy",
    "Organic",
    "Herbs",
    "Other",
  ];

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/products", {
        ...formData,
        price: String(formData.price),
        stock: Number(formData.stock),
      });

      // ✅ Ask backend to notify buyers
      socket.emit("send-notification", {
        userId: "all_buyers", // your backend can treat this specially
        type: "product",
        title: "New Product",
        message: `${user.username} added a new product: ${formData.name}`,
      });

      toast.success("Product created");
      navigate("/farmerprofile");
    } catch (err) {
      toast.error("Failed to create product");
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/farmerprofile")}
            className="flex items-center gap-2 px-3 py-1 border rounded-md bg-white hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold">Add Product</h1>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <div>
            <label className="font-medium">Product Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              rows={3}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={onChange}
              placeholder="Price per kg"
              required
              className="border rounded-md px-3 py-2"
            />
            <input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={onChange}
              placeholder="Stock Quantity"
              required
              className="border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="font-medium">Category *</label>
            <select
              value={formData.category}
              onChange={onChange}
              name="category"
              required
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
             <label className="font-medium">Delivery *</label>
            <input name="estimatedDelivery" placeholder="Estimated Delivery (e.g. 2-3 days)" onChange={onChange} className="border p-2 w-full" />
          </div>
          <div>
             <label className="flex items-center gap-2">
          <input name="isBulkAvailable" type="checkbox" onChange={onChange} /> Chat
        </label>
         <label className="flex items-center gap-2">
          <input name="hasDelivery" type="checkbox" onChange={onChange} /> Delivery
        </label>
          </div>
          <div>
            <label className="font-medium">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files && handleImageUpload(e.target.files[0])
              }
            />
            {uploading && <div>Uploading…</div>}
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="h-32 object-cover rounded"
              />
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/farmerprofile")}
              className="flex-1 border px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
