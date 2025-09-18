import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { supabase } from "../../lib/supabaseClient";

export default function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;
  const onUpdate = location.state?.onUpdate;

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    stock: product?.stock || 0,
    category: product?.category || "",
    image: product?.image || "",
  });

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(product?.image || "");

  const categories = [
    "Vegetables",
    "Fruits",
    "Grains",
    "Dairy",
    "Organic",
    "Herbs",
    "Other",
  ];

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
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/products/${product._id}`,
        {
          ...formData,
          price: String(formData.price),
          stock: Number(formData.stock),
        }
      );

      toast.success("✅ Product updated successfully");

      if (onUpdate) onUpdate(res.data); // update locally without refetch

      navigate("/farmerprofile");
    } catch (err) {
      toast.error("❌ Failed to update product");
      console.error(err);
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <p className="text-gray-700">Product not found</p>
          <button
            onClick={() => navigate("/farmerprofile")}
            className="mt-4 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/farmerprofile")}
            className="flex items-center gap-2 px-3 py-1 border rounded-md bg-white hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold">Edit Product</h1>
          </div>
        </div>

        {/* Form */}
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
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
