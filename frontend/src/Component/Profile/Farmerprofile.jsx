import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, MapPin, Phone, Mail, Star, Wheat, DollarSign, Package, Plus, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { useAuth } from "../../contexts/Authcontext";

// ---------------- Profile Header ----------------
function ProfileHeader({
  name,
  username,
  email,
  phone,
  location,
  farmName,
  rating = 4.8,
  reviewCount = 156
}) {
  const defaultAvatar =
    "https://www.shutterstock.com/image-photo/lush-rice-paddy-field-neat-600nw-2499404003.jpg";
    const { user } =  useAuth();

  return (
    <div className="p-8 bg-gradient-to-r from-green-100 to-green-50 rounded-xl shadow m-10">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-green-300 bg-gray-200">
            <img src={defaultAvatar} alt={name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-800">{user?.username}</h1>
              <span className="px-2 py-1 rounded text-sm bg-green-200 text-green-800">
                🌾 Farmer
              </span>
            </div>

            <p className="text-gray-500 text-lg">{user?.username}</p>
            {farmName && <p className="text-green-600 font-medium text-lg">{farmName}</p>}

            {/* Ratings */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {rating} ({reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="md:ml-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-300">
        <div className="flex items-center gap-3 text-gray-600">
          <Mail className="w-5 h-5 text-green-500" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Phone className="w-5 h-5 text-green-500" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <MapPin className="w-5 h-5 text-green-500" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}

// ---------------- Farmer Dashboard ----------------
const mockData = {
  earnings: { total: 45280, monthly: 8560, growth: 12.5 },
  products: [
    { id: "1", name: "Organic Tomatoes", price: 120, stock: 50, sold: 245, status: "active", image: "/Images/vegetable" },
    { id: "2", name: "Fresh Wheat", price: 45, stock: 0, sold: 180, status: "out_of_stock", image: "/Images/wheat" },
    { id: "3", name: "Green Vegetables", price: 80, stock: 25, sold: 67, status: "active", image: "/Images/vegetable" },
  ],
  orders: [
    { id: "ORD001", buyer: "Rahul Sharma", product: "Organic Tomatoes", quantity: 10, total: 1200, status: "pending" },
    { id: "ORD002", buyer: "Priya Patel", product: "Green Vegetables", quantity: 5, total: 400, status: "confirmed" },
    { id: "ORD003", buyer: "Arjun Kumar", product: "Fresh Wheat", quantity: 20, total: 900, status: "shipped" },
  ],
};

// ---------------- Farmer Profile (Main) ----------------
export default function FarmerProfile() {
  const [products, setProducts] = useState(mockData.products);
  const [orders] = useState(mockData.orders);
  const earnings = mockData.earnings;
  const [activeTab, setActiveTab] = useState("products");
  const navigate = useNavigate();

  // Helpers
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-white";
      case "out_of_stock":
        return "bg-red-500 text-white";
      case "pending":
        return "bg-yellow-400 text-black";
      case "confirmed":
        return "bg-gray-400 text-black";
      case "shipped":
        return "bg-blue-400 text-white";
      case "delivered":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 inline-block mr-1" />;
      case "confirmed":
      case "delivered":
        return <CheckCircle className="w-4 h-4 inline-block mr-1" />;
      case "shipped":
        return <Package className="w-4 h-4 inline-block mr-1" />;
      default:
        return null;
    }
  };

  // Handlers
  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    const newName = prompt("Edit Product Name", product.name);
    if (newName) {
      setProducts(products.map((p) => (p.id === id ? { ...p, name: newName } : p)));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <ProfileHeader
        name="Ram Bahadur"
        username="ram123"
        email="ram@example.com"
        phone="9801234567"
        location="Chitwan, Nepal"
        farmName="Ram Organic Farm"
        rating={4.7}
        reviewCount={200}
      />

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-10">
        <div className="p-4 bg-white rounded-xl shadow">
          <div className="flex justify-between items-center pb-2">
            <div className="text-sm font-medium">Total Earnings</div>
            <DollarSign className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-500">
            ₹{earnings.total.toLocaleString()}
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <div className="flex justify-between items-center pb-2">
            <div className="text-sm font-medium">Monthly Revenue</div>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold">₹{earnings.monthly.toLocaleString()}</div>
          <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +{earnings.growth}% from last month
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <div className="flex justify-between items-center pb-2">
            <div className="text-sm font-medium">Active Products</div>
            <Wheat className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold">
            {products.filter((p) => p.status === "active").length}
          </div>
          <p className="text-xs text-gray-500 mt-1">{products.length} total products</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-4 m-10">
        <div className="flex gap-6 border-b pb-2">
          <button
            className={`${
              activeTab === "products"
                ? "border-b-2 border-green-600 font-semibold text-green-700 px-4 py-2"
                : "text-gray-600 hover:text-green-600 px-4 py-2"
            }`}
            onClick={() => setActiveTab("products")}
          >
            My Products
          </button>
          <button
            className={`${
              activeTab === "orders"
                ? "border-b-2 border-green-600 font-semibold text-green-700 px-4 py-2"
                : "text-gray-600 hover:text-green-600 px-4 py-2"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Order Requests
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Product Management</h3>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => navigate("/add-product", { state: { onAdd: handleAddProduct } })}
              >
                <Plus className="w-4 h-4" /> Add New Product
              </button>
            </div>

            <div className="grid gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-lg">{product.name}</h4>
                        <span className={`px-2 py-1 rounded ${getStatusColor(product.status)}`}>
                          {product.status === "active" ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span>Price: ₹{product.price}/kg</span>
                        <span>Stock: {product.stock} kg</span>
                        <span>Sold: {product.sold} kg</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recent Order Requests</h3>
            <div className="grid gap-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">#{order.id}</h4>
                      <span className={`px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                      <span>Buyer: {order.buyer}</span>
                      <span>Product: {order.product}</span>
                      <span>Quantity: {order.quantity} kg</span>
                      <span>Total: ₹{order.total}</span>
                    </div>
                  </div>
                  {order.status === "pending" && (
                    <div className="flex gap-2">
                      <button className="px-2 py-1 bg-green-500 text-white rounded text-sm">
                        Accept
                      </button>
                      <button className="px-2 py-1 border rounded text-sm">Decline</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
