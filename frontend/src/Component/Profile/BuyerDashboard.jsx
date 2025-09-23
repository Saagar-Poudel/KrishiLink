import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Authcontext";
import { useCart } from "../../contexts/CartContex";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Package,
  Clock,
  CheckCircle,
  Star,
  Truck,
  Eye,
  Mail,
  MapPin,
} from "lucide-react";
import OrderDetailsDialog from "./OrderDetailsDialog";

const BuyerProfile = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("orders");
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [savedSellers, setSavedSellers] = useState([]);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [stats, setStats] = useState({
    totalSpent: 0,
    totalOrders: 0,
    statusCounts: {},
  });

  useEffect(() => {
    if (!user?.id) return;
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/orders/buyer/${user.id}`
        );
        const data = await res.json();
        setOrderHistory(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetchOrders();
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    const fetchSavedSellers = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/saved-Farmers/my-saved/${user.id}`
        );
        const data = await res.json();
        setSavedSellers(data);
      } catch (err) {
        console.error("Failed to fetch saved sellers:", err);
      }
    };
    fetchSavedSellers();
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    const fetchWishlist = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/wishlist/${user.id}`
        );
        const data = await res.json();
        setWishlist(data);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    };
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/profile/buyer/${user.id}/stats`
        );
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch buyer stats:", err);
      }
    };

    fetchWishlist();
    fetchStats();
  }, [user?.id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 dark:bg-yellow-600 text-yellow-800 dark:text-yellow-100";
      case "confirmed":
        return "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100";
      case "shipped":
        return "bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-blue-100";
      case "delivered":
        return "bg-green-200 dark:bg-green-600 text-green-800 dark:text-green-100";
      default:
        return "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <Package className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const displayedOrders = showAllOrders
    ? orderHistory
    : orderHistory.slice(0, 5);

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await fetch("http://localhost:3000/api/wishlist/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId }),
      });
      setWishlist((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      console.error("Failed to remove wishlist item:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 px-6 md:px-20 py-10 space-y-6">
      {/* Buyer Info */}
      <div className="bg-white dark:bg-zinc-800 shadow-md rounded-2xl p-6 flex items-center gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white">
          <img
            src={user.image}
            alt={user?.username}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {user?.username}
          </h2>
          <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Mail size={16} /> {user?.email}
          </p>
          <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <MapPin size={16} /> {user?.address}
          </p>
        </div>
      </div>

      {/* Purchase Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 shadow rounded bg-white dark:bg-zinc-800 transition-colors">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Total Spent
            </h3>
            <ShoppingCart className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            ₹{(stats.totalSpent || 0).toLocaleString()}
          </div>
        </div>

        <div className="p-4 shadow rounded bg-white dark:bg-zinc-800 transition-colors">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Total Orders
            </h3>
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {stats.totalOrders}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {Object.entries(stats.statusCounts || {})
              .map(([status, count]) => `${status}: ${count}`)
              .join(", ")}
          </p>
        </div>

        <div className="p-4 shadow rounded bg-white dark:bg-zinc-800 transition-colors">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Wishlist Items
            </h3>
            <Heart className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {wishlist.length}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Saved for later
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-zinc-800 rounded shadow transition-colors">
        <div className="flex border-b dark:border-gray-700">
          {["orders", "wishlist", "sellers"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 p-3 transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 font-semibold text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "orders"
                ? "Order History"
                : tab === "wishlist"
                ? "Wishlist"
                : "Saved Sellers"}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold ml-3 text-gray-800 dark:text-gray-100">
              Your Orders
            </h3>
            <div className="grid gap-4">
              {displayedOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="p-6 shadow rounded bg-white dark:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                          #{order.orderId}
                        </h4>
                        <span
                          className={`flex items-center gap-1 px-2 py-1 rounded ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>Farmer: {order.sellerName}</span>
                        <span>Total Qty: {order.totalQuantity}</span>
                        <span>Total: ₹{order.totalAmount}</span>
                        <span>
                          Date: {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 border rounded flex items-center gap-2 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="w-4 h-4" /> View Details
                      </button>
                      {order.status === "delivered" && (
                        <button className="px-3 py-1 border rounded text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                          Feedback
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {orderHistory.length > 5 && (
              <button
                className="ml-3 mt-2 text-sm text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline"
                onClick={() => setShowAllOrders(!showAllOrders)}
              >
                {showAllOrders ? "See Less" : "See All"}
              </button>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold ml-3 text-gray-800 dark:text-gray-100">
              Your Wishlist
            </h3>
            {wishlist.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 ml-3">
                No items in wishlist.
              </p>
            ) : (
              <div className="grid gap-4">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 shadow rounded bg-white dark:bg-zinc-800 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded object-cover"
                      />
                      <div className="space-y-1">
                        <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Seller: {item.sellerName}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                          ₹{item.price} / {item.unit}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 border rounded flex items-center gap-2 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => handleAddToCart(item, 1)}
                      >
                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                      </button>
                      <button
                        className="px-3 py-1 border rounded flex items-center text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                      >
                        <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Saved Sellers Tab */}
        {activeTab === "sellers" && (
          <div className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold ml-3 text-gray-800 dark:text-gray-100">
              Your Favorite Sellers
            </h3>
            {savedSellers.length === 0 ? (
              <p className="ml-3 text-gray-500 dark:text-gray-400">
                No saved sellers yet.
              </p>
            ) : (
              <div className="grid gap-4">
                {savedSellers.map((seller) => (
                  <div
                    key={seller.id}
                    className="p-6 shadow rounded bg-white dark:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                            {seller.username}
                          </h4>
                          <span className="bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-blue-100 px-2 py-1 rounded">
                            🌾 Farmer
                          </span>
                        </div>
                        {/* <p className="text-green-600 dark:text-green-400 font-medium">
                          {seller.location || "Location not set"}
                        </p> */}
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {seller.email}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/farmer/${seller.username}`)}
                          className="px-3 py-1 border rounded text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default BuyerProfile;
