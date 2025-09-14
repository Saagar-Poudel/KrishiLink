import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Upload, Package } from "lucide-react";
import toast from "react-hot-toast";

export default function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: ""
  });

  const [imagePreview, setImagePreview] = useState("");

  const categories = ["Vegetables","Fruits","Grains","Dairy","Organic","Herbs","Other"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target.result);
        setFormData(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock || !formData.category || !formData.image) {
      toast("Please fill in all required fields");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      status: parseInt(formData.stock) > 0 ? "active" : "out_of_stock",
      sold: 0
    };

    const onAdd = location.state?.onAdd;
    if (onAdd) onAdd(newProduct);

    navigate("/farmerprofile");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/farmerprofile")} className="flex items-center gap-2 px-3 py-1 border rounded-md bg-white hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold">Add Product</h1>
          </div>
        </div>

        <form className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label className="font-medium">Product Name *</label>
            <input name="name" value={formData.name} onChange={handleInputChange} required className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="font-medium">Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="Price per kg" required className="border rounded-md px-3 py-2" />
            <input name="stock" type="number" value={formData.stock} onChange={handleInputChange} placeholder="Stock Quantity" required className="border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="font-medium">Category *</label>
            <select value={formData.category} onChange={handleInputChange} name="category" required className="w-full border rounded-md px-3 py-2">
              <option value="">Select category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="font-medium">Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {imagePreview && <img src={imagePreview} className="w-32 h-32 mt-2 object-cover rounded" />}
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={() => navigate("/farmerprofile")} className="flex-1 border px-4 py-2 rounded">Cancel</button>
            <button onClick={handleSubmit} type="submit" className="flex-1 bg-green-600 text-white px-4 py-2 rounded">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

