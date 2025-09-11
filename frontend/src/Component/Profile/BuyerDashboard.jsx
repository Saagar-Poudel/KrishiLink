import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
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
  Edit2
} from "lucide-react";

const mockData = {
  buyer: {
    name: "Sita Sharma",
    email: "sita@example.com",
    location: "Kathmandu, Nepal",
  },
  orderHistory: [
    { id: 'ORD001', farmer: 'Rajesh Patel', product: 'Organic Tomatoes', quantity: 10, total: 1200, status: 'delivered', date: '2024-01-15' },
    { id: 'ORD002', farmer: 'Sunita Sharma', product: 'Fresh Wheat', quantity: 25, total: 1125, status: 'shipped', date: '2024-01-18' },
    { id: 'ORD003', farmer: 'Amit Kumar', product: 'Green Vegetables', quantity: 5, total: 400, status: 'confirmed', date: '2024-01-20' },
    { id: 'ORD004', farmer: 'Priya Singh', product: 'Organic Rice', quantity: 15, total: 750, status: 'pending', date: '2024-01-22' },
  ],
  wishlist: [
    { id: '1', name: 'Premium Basmati Rice', farmer: 'Kiran Farms', price: 85, rating: 4.8 },
    { id: '2', name: 'Organic Carrots', farmer: 'Green Valley', price: 60, rating: 4.6 },
    { id: '3', name: 'Fresh Spinach', farmer: 'Organic Oasis', price: 40, rating: 4.9 },
  ],
  savedSellers: [
    { id: '1', name: 'Rajesh Patel', farmName: 'Sunshine Farms', rating: 4.9, location: 'Punjab', products: 12 },
    { id: '2', name: 'Sunita Sharma', farmName: 'Golden Harvest', rating: 4.7, location: 'Haryana', products: 8 },
    { id: '3', name: 'Amit Kumar', farmName: 'Fresh Fields', rating: 4.8, location: 'Uttar Pradesh', products: 15 },
  ]
};

const BuyerProfile = () => {
  const { buyer, orderHistory, wishlist, savedSellers } = mockData;
  const [activeTab, setActiveTab] = useState("orders");
  const { user } = useAuth();

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-200 text-yellow-800';
      case 'confirmed': return 'bg-gray-200 text-gray-800';
      case 'shipped': return 'bg-blue-200 text-blue-800';
      case 'delivered': return 'bg-green-200 text-green-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <Package className="w-4 h-4" />;
      default: return null;
    }
  };

  const totalSpent = orderHistory
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0);

  const pendingOrders = orderHistory.filter(order => order.status === 'pending').length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Buyer Info */}
      <div className="bg-white dark:bg-zinc-800 shadow-md rounded-2xl p-6 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-800">
          {user?.username }
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
        <button className="bg-yellow-300 hover:bg-yellow-400 px-4 py-2 rounded-lg flex items-center gap-2">
          <Edit2 size={16} /> Edit Profile
        </button>
      </div>

      {/* Purchase Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 shadow rounded bg-white dark:bg-zinc-800">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Total Spent</h3>
            <ShoppingCart className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">₹{totalSpent.toLocaleString()}</div>
        </div>

        <div className="p-4 shadow rounded bg-white dark:bg-zinc-800">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Active Orders</h3>
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold">{pendingOrders}</div>
          <p className="text-xs text-gray-500 mt-1">{orderHistory.length} total orders</p>
        </div>

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
      <div>
        <div className="flex space-x-4 border-b">
          <button
            className={`pb-2 ${activeTab === 'orders' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </button>
          <button
            className={`pb-2 ${activeTab === 'wishlist' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            Wishlist
          </button>
          <button
            className={`pb-2 ${activeTab === 'sellers' ? 'border-b-2 border-blue-600 font-semibold' : ''}`}
            onClick={() => setActiveTab('sellers')}
          >
            Saved Sellers
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold">Your Orders</h3>
            <div className="grid gap-4">
              {orderHistory.map(order => (
                <div key={order.id} className="p-6 shadow rounded bg-white dark:bg-zinc-800">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold">#{order.id}</h4>
                        <span className={`flex items-center gap-1 px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                        <span>Farmer: {order.farmer}</span>
                        <span>Product: {order.product}</span>
                        <span>Quantity: {order.quantity} kg</span>
                        <span>Total: ₹{order.total}</span>
                        <span>Date: {new Date(order.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border rounded flex items-center gap-2">
                        <Eye className="w-4 h-4" /> View Details
                      </button>
                      {order.status === 'delivered' && (
                        <button className="px-3 py-1 border rounded">Rate & Review</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold">Your Wishlist</h3>
            <div className="grid gap-4">
              {wishlist.map(item => (
                <div key={item.id} className="p-6 shadow rounded bg-white dark:bg-zinc-800">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg">{item.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>by {item.farmer}</span>
                        <span>₹{item.price}/kg</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border rounded">Add to Cart</button>
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

        {/* Saved Sellers Tab */}
        {activeTab === 'sellers' && (
          <div className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold">Your Favorite Sellers</h3>
            <div className="grid gap-4">
              {savedSellers.map(seller => (
                <div key={seller.id} className="p-6 shadow rounded bg-white dark:bg-zinc-800">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-lg">{seller.name}</h4>
                        <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">🌾 Farmer</span>
                      </div>
                      <p className="text-green-600 font-medium">{seller.farmName}</p>
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
                      <button className="px-3 py-1 border rounded">View Products</button>
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
    </div>
  );
};

export default BuyerProfile;


