import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Package,
  Clock,
  CheckCircle,
  Star,
  Truck,
  Eye
} from "lucide-react";

const mockData = {
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

export function BuyerDashboard({
  orderHistory = mockData.orderHistory,
  wishlist = mockData.wishlist,
  savedSellers = mockData.savedSellers
}) {
  const [activeTab, setActiveTab] = useState("orders");

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
    <div className="space-y-6">
      {/* Purchase Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 shadow rounded bg-white">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Total Spent</h3>
            <ShoppingCart className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">₹{totalSpent.toLocaleString()}</div>
        </div>

        <div className="p-4 shadow rounded bg-white">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Active Orders</h3>
            <Package className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold">{pendingOrders}</div>
          <p className="text-xs text-gray-500 mt-1">{orderHistory.length} total orders</p>
        </div>

        <div className="p-4 shadow rounded bg-white">
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
                <div key={order.id} className="p-6 shadow rounded bg-white">
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
                <div key={item.id} className="p-6 shadow rounded bg-white">
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
                <div key={seller.id} className="p-6 shadow rounded bg-white">
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
}


// import React from "react";
// import {
//   Heart,
//   Package,
//   Star,
//   CreditCard,
//   Truck,
//   ShoppingBag,
//   Eye,
//   MoreHorizontal,
// } from "lucide-react";

// export const BuyerDashboard = () => {
//   // Mock data - in real app this would come from API
//   const stats = {
//     totalOrders: 28,
//     activeOrders: 3,
//     totalSpent: 1240,
//     savedItems: 12,
//     favoriteStores: 8,
//   };

//   const recentOrders = [
//     {
//       id: 1,
//       orderNumber: "#ORD-001",
//       farmer: "Green Valley Farm",
//       items: "Organic Tomatoes, Fresh Lettuce",
//       total: 24.95,
//       status: "delivered",
//       date: "2024-01-15",
//     },
//     {
//       id: 2,
//       orderNumber: "#ORD-002",
//       farmer: "Sunny Acres",
//       items: "Sweet Corn, Carrots",
//       total: 18.9,
//       status: "shipped",
//       date: "2024-01-18",
//     },
//     {
//       id: 3,
//       orderNumber: "#ORD-003",
//       farmer: "Fresh Fields Co",
//       items: "Mixed Vegetables Pack",
//       total: 35.5,
//       status: "processing",
//       date: "2024-01-20",
//     },
//   ];

//   const wishlistItems = [
//     {
//       id: 1,
//       name: "Organic Apples",
//       farmer: "Orchard Hills",
//       price: 5.99,
//       image: "🍎",
//       available: true,
//     },
//     {
//       id: 2,
//       name: "Fresh Spinach",
//       farmer: "Green Leaf Farm",
//       price: 3.49,
//       image: "🥬",
//       available: true,
//     },
//     {
//       id: 3,
//       name: "Farm Eggs",
//       farmer: "Happy Hens",
//       price: 6.99,
//       image: "🥚",
//       available: false,
//     },
//     {
//       id: 4,
//       name: "Organic Milk",
//       farmer: "Dairy Dreams",
//       price: 4.99,
//       image: "🥛",
//       available: true,
//     },
//   ];

//   const favoriteFarmers = [
//     { id: 1, name: "Green Valley Farm", rating: 4.9, products: 15, image: "🌾" },
//     { id: 2, name: "Sunny Acres", rating: 4.7, products: 23, image: "🌻" },
//     { id: 3, name: "Fresh Fields Co", rating: 4.8, products: 18, image: "🥕" },
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "delivered":
//         return "bg-green-100 text-green-700";
//       case "shipped":
//         return "bg-blue-100 text-blue-700";
//       case "processing":
//         return "bg-yellow-100 text-yellow-700";
//       case "cancelled":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//         <div className="p-4 bg-white shadow rounded-lg flex items-center gap-3">
//           <div className="p-2 bg-green-100 rounded-lg">
//             <Package className="w-5 h-5 text-green-600" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Total Orders</p>
//             <p className="text-2xl font-bold">{stats.totalOrders}</p>
//           </div>
//         </div>

//         <div className="p-4 bg-white shadow rounded-lg flex items-center gap-3">
//           <div className="p-2 bg-green-100 rounded-lg">
//             <Truck className="w-5 h-5 text-green-600" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Active Orders</p>
//             <p className="text-2xl font-bold">{stats.activeOrders}</p>
//           </div>
//         </div>

//         <div className="p-4 bg-white shadow rounded-lg flex items-center gap-3">
//           <div className="p-2 bg-green-100 rounded-lg">
//             <CreditCard className="w-5 h-5 text-green-600" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Total Spent</p>
//             <p className="text-2xl font-bold">${stats.totalSpent}</p>
//           </div>
//         </div>

//         <div className="p-4 bg-white shadow rounded-lg flex items-center gap-3">
//           <div className="p-2 bg-green-100 rounded-lg">
//             <Heart className="w-5 h-5 text-green-600" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Wishlist</p>
//             <p className="text-2xl font-bold">{stats.savedItems}</p>
//           </div>
//         </div>

//         <div className="p-4 bg-white shadow rounded-lg flex items-center gap-3">
//           <div className="p-2 bg-green-100 rounded-lg">
//             <Star className="w-5 h-5 text-green-600" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Favorites</p>
//             <p className="text-2xl font-bold">{stats.favoriteStores}</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Orders */}
//         <div className="bg-white shadow rounded-lg">
//           <div className="p-4 border-b font-semibold flex items-center gap-2">
//             <Package className="w-5 h-5" />
//             Recent Orders
//           </div>
//           <div className="p-4 space-y-4">
//             {recentOrders.map((order) => (
//               <div
//                 key={order.id}
//                 className="flex items-center justify-between p-3 border rounded-lg"
//               >
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <p className="font-medium">{order.orderNumber}</p>
//                     <span
//                       className={`px-2 py-1 text-xs rounded ${getStatusColor(
//                         order.status
//                       )}`}
//                     >
//                       {order.status}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-600">{order.farmer}</p>
//                   <p className="text-xs text-gray-500">{order.items}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-medium">${order.total}</p>
//                   <p className="text-xs text-gray-500">{order.date}</p>
//                   <button className="mt-1 text-gray-500 hover:text-gray-700">
//                     <Eye className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Wishlist */}
//         <div className="bg-white shadow rounded-lg">
//           <div className="p-4 border-b font-semibold flex items-center gap-2">
//             <Heart className="w-5 h-5" />
//             Wishlist Items
//           </div>
//           <div className="p-4 space-y-4">
//             {wishlistItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center justify-between p-3 border rounded-lg"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="text-2xl">{item.image}</div>
//                   <div>
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-sm text-gray-500">{item.farmer}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="font-medium">${item.price}</span>
//                   {item.available ? (
//                     <button className="flex items-center gap-1 px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
//                       <ShoppingBag className="w-4 h-4" /> Add
//                     </button>
//                   ) : (
//                     <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
//                       Out of Stock
//                     </span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Favorite Farmers */}
//       <div className="bg-white shadow rounded-lg">
//         <div className="p-4 border-b font-semibold flex items-center gap-2">
//           <Star className="w-5 h-5" />
//           Favorite Farmers
//         </div>
//         <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {favoriteFarmers.map((farmer) => (
//             <div key={farmer.id} className="p-4 border rounded-lg">
//               <div className="flex items-center justify-between mb-3">
//                 <div className="text-3xl">{farmer.image}</div>
//                 <button className="text-gray-500 hover:text-gray-700">
//                   <MoreHorizontal className="w-4 h-4" />
//                 </button>
//               </div>
//               <h4 className="font-medium mb-1">{farmer.name}</h4>
//               <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
//                 <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                 <span>{farmer.rating}</span>
//                 <span>•</span>
//                 <span>{farmer.products} products</span>
//               </div>
//               <button className="w-full px-2 py-1 text-sm border rounded hover:bg-gray-50">
//                 Visit Farm
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

