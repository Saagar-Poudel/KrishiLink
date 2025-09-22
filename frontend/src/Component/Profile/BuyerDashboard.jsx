import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/Authcontext";
import { useCart } from "../../contexts/CartContex";
import {
  ShoppingCart,
  Heart,
  Package,
  Clock,
  CheckCircle,
  Star,
  Truck,
  Eye,
  User,
  Mail,
  MapPin,
  Edit2,
} from "lucide-react";
import OrderDetailsDialog from "./OrderDetailsDialog";

const BuyerProfile = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("orders");
  const [showAllOrders, setShowAllOrders] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart();

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
        console.log("data", data);
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
        return "bg-yellow-200 text-yellow-800";
      case "confirmed":
        return "bg-gray-200 text-gray-800";
      case "shipped":
        return "bg-blue-200 text-blue-800";
      case "delivered":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
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
    toast({
      title: "Added to Cart",
      description: `${quantity} ${product.unit} of ${product.name} added to cart.`,
    });
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await fetch("http://localhost:3000/api/wishlist/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId }),
      });
      setWishlist((prev) => prev.filter((item) => item.id !== productId));
      toast({
        title: "Removed from Wishlist",
        description: "The product was removed from your wishlist.",
      });
    } catch (err) {
      console.error("Failed to remove wishlist item:", err);
    }
  };

  return (
    <div className="mx-20 p-6 space-y-6">
      {/* Buyer Info */}
      <div className="bg-white dark:bg-zinc-800 shadow-md rounded-2xl p-6 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-800">
          {user?.username}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{user?.username} </h2>
          <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Mail size={16} /> {user?.email}
          </p>
          <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <MapPin size={16} /> {user?.location}
          </p>
        </div>
      </div>

      {/* Purchase Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Spent */}
        <div className="p-4 shadow rounded bg-white dark:bg-zinc-800">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Total Spent</h3>
            <ShoppingCart className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            ₹{(stats.totalSpent || 0).toLocaleString()}
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-4 shadow rounded bg-white dark:bg-zinc-800">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Total Orders</h3>
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold">{stats.totalOrders}</div>
          <p className="text-xs text-gray-500 mt-1">
            {Object.entries(stats.statusCounts || {})
              .map(([status, count]) => `${status}: ${count}`)
              .join(", ")}
          </p>
        </div>

        {/* Wishlist Items */}
        <div className="p-4 shadow rounded bg-white dark:bg-zinc-800">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Wishlist Items</h3>
            <Heart className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-2xl font-bold">{wishlist.length}</div>
          <p className="text-xs text-gray-500 mt-1">Saved for later</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded shadow">
        <div className="flex border-b">
          <button
            className={`flex-1 p-3  ${
              activeTab === "orders"
                ? "border-b-2 border-blue-600 font-semibold"
                : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Order History
          </button>
          <button
            className={`flex-1 p-3  ${
              activeTab === "wishlist"
                ? "border-b-2 border-blue-600 font-semibold"
                : ""
            }`}
            onClick={() => setActiveTab("wishlist")}
          >
            Wishlist
          </button>
          <button
            className={`flex-1 p-3  ${
              activeTab === "sellers"
                ? "border-b-2 border-blue-600 font-semibold"
                : ""
            }`}
            onClick={() => setActiveTab("sellers")}
          >
            Saved Sellers
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold ml-3">Your Orders</h3>
            <div className="grid gap-4">
              {displayedOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="p-6 shadow rounded bg-white dark:bg-zinc-800"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold">#{order.orderId}</h4>
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
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
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
                        className="px-3 py-1 border rounded flex items-center gap-2"
                        onClick={() => setSelectedOrder(order)} // open dialog
                      >
                        <Eye className="w-4 h-4" /> View Details
                      </button>
                      {order.status === "delivered" && (
                        <button className="px-3 py-1 border rounded">
                          Rate & Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* See All / See Less */}
            {orderHistory.length > 5 && (
              <button
                className="ml-3 mt-2 text-sm text-blue-600 font-medium cursor-pointer hover:underline hover:text-blue-700 transition-colors bg-transparent border-none outline-none"
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
            <h3 className="text-lg font-semibold ml-3">Your Wishlist</h3>
            {wishlist.length === 0 ? (
              <p className="text-gray-500 ml-3">No items in wishlist.</p>
            ) : (
              <div className="grid gap-4">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 shadow rounded bg-white dark:bg-zinc-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded object-cover"
                      />
                      <div className="space-y-1">
                        <h4 className="font-semibold text-lg">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          Seller: {item.sellerName}
                        </p>
                        <p className="text-sm text-green-600 font-medium">
                          ₹{item.price} / {item.unit}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 border rounded flex items-center gap-2"
                        onClick={() => handleAddToCart(item, 1)}
                      >
                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                      </button>
                      <button
                        className="px-3 py-1 border rounded flex items-center"
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
            <h3 className="text-lg font-semibold">Your Favorite Sellers</h3>
            <div className="grid gap-4">
              {savedSellers.map((seller) => (
                <div
                  key={seller.id}
                  className="p-6 shadow rounded bg-white dark:bg-zinc-800"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-lg">{seller.name}</h4>
                        <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">
                          🌾 Farmer
                        </span>
                      </div>
                      <p className="text-green-600 font-medium">
                        {seller.farmName}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{seller.location}</span>
                        <span>{seller.products} products</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{seller.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border rounded">
                        View Products
                      </button>
                      <button className="px-3 py-1 border rounded flex items-center">
                        <Heart className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
