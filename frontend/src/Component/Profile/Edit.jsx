import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Upload, Package } from "lucide-react";

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;
  const onUpdate = location.state?.onUpdate;

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    stock: product?.stock?.toString() || "",
    category: product?.category || "",
    image: product?.image || ""
  });

  const [imagePreview, setImagePreview] = useState(product?.image || "");

  const categories = [
    "Vegetables",
    "Fruits",
    "Grains",
    "Dairy",
    "Organic",
    "Herbs",
    "Other"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    setFormData((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result;
        setImagePreview(result);
        setFormData((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.stock) {
      alert("⚠️ Please fill in all required fields");
      return;
    }

    const updatedProduct = {
      ...product,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category: formData.category,
      image: formData.image,
      status: parseInt(formData.stock) > 0 ? "active" : "out_of_stock"
    };

    if (onUpdate) onUpdate(updatedProduct);

    alert("✅ Product updated successfully");
    navigate("/farmerprofile");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <p className="text-gray-700">Product not found</p>
          <button
            onClick={() => navigate("/farmer-profile")}
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
            onClick={() => navigate("/farmer-profile")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </button>
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Update Product Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Image */}
            <div className="space-y-2">
              <label htmlFor="image" className="font-medium text-gray-700">
                Product Image
              </label>
              <div className="flex items-center gap-4">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-100 overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center text-gray-500 text-sm">
                      <Upload className="w-6 h-6 mx-auto mb-1" />
                      Upload Image
                    </div>
                  )}
                </div>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1 text-sm"
                />
              </div>
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="font-medium text-gray-700">
                Product Name *
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Organic Tomatoes"
                required
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product..."
                rows={3}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="price" className="font-medium text-gray-700">
                  Price per kg (₹) *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="120"
                  min="0"
                  step="0.01"
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="stock" className="font-medium text-gray-700">
                  Stock Quantity (kg) *
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="50"
                  min="0"
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/farmer-profile")}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
