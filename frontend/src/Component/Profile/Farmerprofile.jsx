import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  Edit,
  MapPin,
  Phone,
  Mail,
  Star,
  Plus,
  TrendingUp,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { useAuth } from "../../contexts/Authcontext";
import toast from "react-hot-toast";
import axios from "axios";

export default function FarmerProfile() {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams(); // farmerId if buyer visits /farmer/:username

  const defaultAvatar =
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=400&fit=crop&crop=face";

    const [farmer, setFarmer] = useState(null); 
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

    const isFarmerOwner = user?.role === "farmer" && (!username || user?.username === username);

      // Fetch farmer info
   useEffect(() => {
  const fetchFarmer = async () => {
    try {
      if (isFarmerOwner) {
        setFarmer(user);
      } else {
        const { data } = await axios.get(
          `http://localhost:3000/api/users/by-username/${username}`
        );
        setFarmer(data);
      }
    } catch (err) {
      // console.error(err);
      toast.error("Failed to load farmer info");
    }
  };
  fetchFarmer();
}, [user, username, isFarmerOwner]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
       

        const { data } = await axios.get("http://localhost:3000/api/products");
        let farmerProducts;
        if (isFarmerOwner) {
          farmerProducts = data.filter(p => p.sellerName?.toLowerCase() === user?.username?.toLowerCase());
        } else {
          farmerProducts = data.filter(p => p.sellerName?.toLowerCase() === username?.toLowerCase());
        }
        setProducts(farmerProducts);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products!");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [username, isFarmerOwner, user]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
      console.log("sellerName:", user.username);
      const { data } = await axios.get(
        `http://localhost:3000/api/orders/${user.username}`
      );
      
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to load orders!");
    } finally {
      setOrdersLoading(false);
    }
  };

  fetchOrders();
}, []);

  const earnings = { total: 45280, monthly: 8560, growth: 12.5 };

  const [activeTab, setActiveTab] = useState("products");
  const [openMenu, setOpenMenu] = useState(null);

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast("Product deleted successfully!");
  };

  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart`);
    // integrate with your CartContext here if available
  };
 if (!farmer) return <p className="p-6">Loading farmer profile...</p>;
  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6 mx-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white">
              <img
                src={defaultAvatar}
                alt={farmer?.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{farmer?.username}</h1>
                <span className="px-2 py-1 bg-white/30 rounded text-sm">
                  🌾 Farmer
                </span>
              </div>
              <p className="opacity-80 text-lg">
                @{farmer?.username?.toLowerCase()}
              </p>
              {farmer?.farmName && (
                <p className="font-medium text-lg">{farmer.farmName}</p>
              )}
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-white/40"
                    }`}
                  />
                ))}
                <span className="text-sm opacity-80">4.7 (156 reviews)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/30">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5" /> <span>{farmer?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5" /> <span>{farmer?.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5" /> <span>{farmer?.location}</span>
          </div>
        </div>
      </div>

      {/* Earnings Overview (Farmer only) */}
      {isFarmerOwner && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded shadow p-6">
            <p className="text-sm text-gray-500">Total Earnings</p>
            <p className="text-3xl font-bold text-green-600">
              ₹{earnings.total.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded shadow p-6">
            <p className="text-sm text-gray-500">Monthly Revenue</p>
            <p className="text-3xl font-bold">
              ₹{earnings.monthly.toLocaleString()}
            </p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +{earnings.growth}% from last
              month
            </p>
          </div>
          <div className="bg-white rounded shadow p-6">
            <p className="text-sm text-gray-500">Active Products</p>
            <p className="text-3xl font-bold">
              {products.filter((p) => p.status === "active").length}
            </p>
            <p className="text-xs text-gray-500">
              {products.length} total products
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded shadow">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex-1 p-3 ${
              activeTab === "products"
                ? "border-b-2 border-green-500 font-semibold"
                : ""
            }`}
          >
            {isFarmerOwner ? "My Products" : "Products"}
          </button>

          {isFarmerOwner && (
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-1 p-3 ${
                activeTab === "orders"
                  ? "border-b-2 border-green-500 font-semibold"
                  : ""
              }`}
            >
              Order Requests
            </button>
          )}
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {isFarmerOwner ? "Product Management" : "Available Products"}
              </h3>

              {isFarmerOwner && (
                <button
                  onClick={() => navigate("/addproduct")}
                  className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add New Product
                </button>
              )}
            </div>

            <div className="grid gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-6 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold text-gray-800">{p.name}</h4>
                    <p className="text-sm text-gray-600">{p.description}</p>
                    <p className="text-sm text-gray-500">
                      ₹{p.price}/kg • Stock: {p.stock}kg
                    </p>
                  </div>

                  {isFarmerOwner ? (
                    // Edit/Delete menu for farmer
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === p.id ? null : p.id)
                        }
                        className="p-2 hover:bg-gray-200 rounded-full"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>

                      {openMenu === p.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                          <button
                            onClick={() =>
                              navigate("/editproduct", { state: { product: p } })
                            }
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left text-sm"
                          >
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left text-sm text-red-600"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Add to Cart button for buyer
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="bg-green-600 text-white px-3 py-2 rounded"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab (Farmer only) */}
        {isFarmerOwner && activeTab === "orders" && (
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Order Management</h3>
            {
              ordersLoading ? (
              <p className="text-gray-500">Loading orders...</p>
              ) : orders.length === 0 ? (
              <p className="text-gray-500">No orders found.</p>
              ): (
                orders.map((o) => (
              <div
                key={o.id}
                className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold">
                    #{o.id} - {o.product}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Buyer: {o.buyer} • Qty: {o.quantity}kg • Total: ₹{o.total} •
                    Date: {o.date}
                  </p>
                </div>
                {o.status === "pending" && (
                  <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded">
                      Accept
                    </button>
                    <button className="border px-3 py-1 rounded">Decline</button>
                  </div>
                )}
              </div>
            ))
              )
            }
          </div>
        )}
      </div>
    </div>
  );
}
