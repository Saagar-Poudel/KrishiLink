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
  Save,
  MessageCircle,
  ShoppingCart,
} from "lucide-react";
import { useAuth } from "../../contexts/Authcontext";
import { useCart } from "../../contexts/CartContex";
import toast from "react-hot-toast";
import axios from "axios";
import DeliveryPartnerDialog from "./DeliveryPartnerDialog";
import FarmerChatbox from "../FarmerChatbox";

import ProductModal from "../Markets/ProductModal";


export default function FarmerProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { username } = useParams();
  const { addToCart } = useCart();

  const [deleteModal, setDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const defaultAvatar =
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=400&fit=crop&crop=face";

  const [farmer, setFarmer] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatFarmer, setChatFarmer] = useState(null);

  const handleStartChatWithFarmer = () => {
    setChatFarmer(farmer);
    setChatOpen(true);
  };

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [deliveryDialogOpen, setDeliveryDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSeller = async () => {
    try {
      if (isSaved) {
        await axios.delete(
          `http://localhost:3000/api/saved-farmers/unsave/${farmer.id}/${user.id}`, {
            buyerId: user.id,
          }
        );
        toast.success("Seller removed from saved list");
        setIsSaved(false);
      } else {
        await axios.post("http://localhost:3000/api/saved-farmers/save", {
          farmerId: farmer.id,
          buyerId: user.id,
        });
        toast.success("Seller saved successfully");
        setIsSaved(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving seller");
    }
  };

  const isFarmerOwner =
    user?.role === "farmer" && (!username || user?.username === username);

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
    const fetchStats = async () => {
      try {
        // get farmerId from fetched farmer data or logged-in user
        const farmerId = isFarmerOwner ? user?.id : farmer?.id;
        if (!farmerId) return;

        const { data } = await axios.get(
          `http://localhost:3000/api/profile/${farmerId}/stats`
        );
        console.log("fetch:", data);
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
        toast.error("Failed to load profile stats!");
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [user, farmer, isFarmerOwner]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/products");
        let farmerProducts;
        if (isFarmerOwner) {
          farmerProducts = data.filter(
            (p) => p.sellerName?.toLowerCase() === user?.username?.toLowerCase()
          );
        } else {
          farmerProducts = data.filter(
            (p) => p.sellerName?.toLowerCase() === username?.toLowerCase()
          );
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

  const [activeTab, setActiveTab] = useState("products");
  const [openMenu, setOpenMenu] = useState(null);

  const handleOpenDeliveryDialog = (orderId) => {
    setSelectedOrderId(orderId);
    setDeliveryDialogOpen(true);
  };

  const handleConfirmDeliveryPartner = async (orderId, partner) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/orders/${orderId}/delivery`,
        {
          partner,
        }
      );
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? { ...o, status: "shipping", deliveryPartner: partner }
            : o
        )
      );
      toast.success(`Order sent with ${partner} 🚚`);
    } catch (err) {
      console.error("Error setting delivery partner:", err);
      toast.error("Failed to assign delivery partner.");
    } finally {
      setDeliveryDialogOpen(false);
      setSelectedOrderId(null);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${productId}`);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      toast.success("product deleted sucessfully");
    } catch (err) {
      console.log("error deleting product:", err);
      toast.error("failed to delete product.");
    } finally {
      setDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handleAcceptOrder = async (orderId) => {
    try {
      await axios.patch(`http://localhost:3000/api/orders/${orderId}/status`, {
        action: "accept",
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "accepted" } : o))
      );
      toast.success("Order accepted ✅");
    } catch (err) {
      console.error("Error accepting order:", err);
      toast.error("Failed to accept order.");
    }
  };

  const handleDeclineOrder = async (orderId) => {
    try {
      await axios.patch(`http://localhost:3000/api/orders/${orderId}/status`, {
        action: "declined",
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "declined" } : o))
      );
      toast.success("Order declined ❌");
    } catch (err) {
      console.error("Error declining order:", err);
      toast.error("Failed to decline order.");
    }
  };

  const handleShipOrder = async (orderId) => {
    try {
      await axios.patch(`http://localhost:3000/api/orders/${orderId}/status`, {
        action: "ship",
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "shipping" } : o))
      );
      toast.success("Order sent to shipping 🚚");
    } catch (err) {
      console.error("Error shipping order:", err);
      toast.error("Failed to update order.");
    }
  };

  const handleDeliverOrder = async (orderId) => {
    try {
      await axios.patch(`http://localhost:3000/api/orders/${orderId}/status`, {
        action: "deliver",
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "delivered" } : o))
      );
      toast.success("Order delivered 📦");
    } catch (err) {
      console.error("Error delivering order:", err);
      toast.error("Failed to update order.");
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const [filterStatus, setFilterStatus] = useState("all");

  const filteredOrders = orders.filter((o) =>
    filterStatus === "all" ? true : o.status === filterStatus
  );
const [selectedProduct, setSelectedProduct] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

const handleProductClick = (product) => {
  setSelectedProduct(product);
  setIsModalOpen(true);
};



  if (!farmer) return <p className="p-6">Loading farmer profile...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6 mx-20">
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
          {!isFarmerOwner && user?.role === "buyer" && (
            <div>
              <button
                onClick={handleStartChatWithFarmer}
                className="bg-white text-green-700 px-4 py-2 rounded flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Chat with Farmer
              </button>
              <button
                onClick={handleSaveSeller}
                className={`px-4 py-2 rounded flex items-center gap-2 border ${
                  isSaved
                    ? "bg-green-700 text-white"
                    : "bg-white text-green-700 border-green-700"
                }`}
              >
                <Save className="w-4 h-4" />
                {isSaved ? "Saved" : "Save Seller"}
              </button>
            </div>
          )}
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

      {isFarmerOwner && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded shadow p-6">
            <p className="text-sm text-gray-500">Total Earnings</p>
            <p className="text-3xl font-bold text-green-600">
              {statsLoading
                ? "..."
                : `₹${stats?.totalEarnings?.toLocaleString()}`}
            </p>
          </div>
          <div className="bg-white rounded shadow p-6">
            <p className="text-sm text-gray-500">Monthly Revenue</p>
            <p className="text-3xl font-bold">
              {statsLoading
                ? "..."
                : `₹${stats?.thisMonthRevenue?.toLocaleString()}`}
            </p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              {statsLoading ? "..." : stats?.growthText}
            </p>
          </div>
          <div className="bg-white rounded shadow p-6">
            <p className="text-sm text-gray-500">Active Products</p>
            <p className="text-3xl font-bold">
              {statsLoading ? "..." : stats?.activeProducts}
            </p>
            <p className="text-xs text-gray-500">
              {statsLoading ? "..." : `${stats?.totalProducts} total products`}
            </p>
          </div>
        </div>
      )}

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
                onClick={() => !isFarmerOwner && handleProductClick(p)}
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
                              navigate("/editproduct", {
                                state: { product: p },
                              })
                            }
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left text-sm"
                          >
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={() => {
                              setProductToDelete(p);
                              setDeleteModal(true);
                              setOpenMenu(null);
                            }}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left text-sm text-red-600"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                         e.stopPropagation();
                        handleAddToCart(p)}}
                      className="bg-green-600 text-white px-3 py-2 rounded"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2 inline" />
                      Add to Cart
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {isFarmerOwner && activeTab === "orders" && (
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Order Management</h3>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded px-3 py-1 text-sm"
            >
              <option value="all">All</option>
              {/* <option value="pending">Pending</option> */}
              {/* <option value="accepted">Accepted</option> */}
              <option value="shipping">Shipping</option>
              <option value="delivered">Delivered</option>
              <option value="paid">Paid</option>
              {/* <option value="declined">Declined</option> */}
            </select>

            {ordersLoading ? (
              <p className="text-gray-500">Loading orders...</p>
            ) : filteredOrders.length === 0 ? (
              <p className="text-gray-500">No orders found.</p>
            ) : (
              filteredOrders.map((o) => (
                <div
                  key={o.id}
                  className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold">
                      #{o.id} - {o.product}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Buyer: {o.buyer} • Qty: {o.quantity}kg • Total: ₹{o.total}{" "}
                      • Date: {o.date}
                    </p>
                    <p
                      className={`text-xs mt-1 font-medium ${
                        o.status === "pending"
                          ? "text-yellow-600"
                          : o.status === "accepted" || o.status === "packing"
                          ? "text-green-600"
                          : o.status === "shipping"
                          ? "text-blue-600"
                          : o.status === "delivered"
                          ? "text-purple-600"
                          : "text-red-600"
                      }`}
                    >
                      Status: {o.status}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {o.status === "paid" && (
                      <>
                        <button
                          onClick={() => handleAcceptOrder(o.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDeclineOrder(o.id)}
                          className="border px-3 py-1 rounded hover:bg-gray-200"
                        >
                          Decline
                        </button>
                      </>
                    )}

                    {o.status === "packing" || o.status === "accepted" ? (
                      <button
                        onClick={() => handleOpenDeliveryDialog(o.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Choose Delivery Partner
                      </button>
                    ) : null}

                    {o.status === "shipping" && (
                      <button
                        onClick={() => handleDeliverOrder(o.id)}
                        className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </div>
                  {deliveryDialogOpen && (
                    <DeliveryPartnerDialog
                      orderId={selectedOrderId}
                      onClose={() => setDeliveryDialogOpen(false)}
                      onConfirm={handleConfirmDeliveryPartner}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {deleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
              <h2 className="text-lg font-semibold mb-2">Confirm Deletion</h2>
              <p className="text-sm text-gray-600">
                Are you sure you want to delete{" "}
                <span className="font-bold">{productToDelete?.name}</span>? This
                action cannot be undone.
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setDeleteModal(false)}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(productToDelete?.id)}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
       {isModalOpen && selectedProduct && (
  <ProductModal
    product={selectedProduct}
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onAddToCart={handleAddToCart}
    // onToggleWishlist={handleToggleWishlist} // optional if you support wishlist
    isWishlisted={false} // you can pass real data later
    onChatWithSeller={() => {}} // pass your chat function if available
  />
)}


      </div>
      {chatOpen && chatFarmer && (
        <FarmerChatbox
          currentUser={user} // 👈 logged-in buyer from useAuth
          otherUser={chatFarmer} // 👈 the farmer profile being viewed
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  );
}
