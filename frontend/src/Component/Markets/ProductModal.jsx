import React, { useState } from "react";
import {
  Star, MapPin, User, Package, Truck, ShoppingCart, Heart,
  Phone, MessageCircle, Shield, X
} from "lucide-react";

const ProductModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!product || !isOpen) return null;

  const displayName =  product.name;
  const totalPrice = product.price * quantity;

  const reviews = [
    { id: 1, user: "Ram Sharma", rating: 5, comment: "Excellent quality products. Fresh and organic!", date: "2 days ago" },
    { id: 2, user: "Sita Gurung", rating: 4, comment: "Good quality but delivery was slightly delayed.", date: "1 week ago" },
    { id: 3, user: "Krishna Thapa", rating: 5, comment: "Best seller in the area. Highly recommended!", date: "2 weeks ago" }
  ];

  const handleChat = () => {
    console.log(product);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white max-w-4xl w-full max-h-[90vh] rounded-lg shadow-lg overflow-y-auto p-6 dark:bg-[#12241A] dark:text-[#F9FAFB]">

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black dark:text-[#D1D5DB] dark:hover:text-[#F9FAFB]"
          onClick={onClose}
        >
          <X size={30} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 dark:text-[#F9FAFB]">{displayName}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left: Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 space-y-2">
              {product.isOrganic && (
                <span className="bg-green-500 text-white text-sm px-2 py-1 rounded">Organic Certified</span>
              )}
              {product.isBulkAvailable && (
                <span className="bg-gray-100 text-sm px-2 py-1 rounded border dark:bg-[#12241A] dark:text-[#F9FAFB] dark:border-[#374151]">Bulk Orders Available</span>
              )}
            </div>
            <div className="absolute top-4 right-4">
              <span className={`text-sm px-2 py-1 rounded ${product.isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {product.isAvailable ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-4">
            <p className="text-gray-500 dark:text-[#D1D5DB]">{product.category}</p>

            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-green-600 dark:text-[#34D399]">
                Rs. {product.price}
                <span className="text-lg font-normal">/{product.unit}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold dark:text-[#F9FAFB]">{product.rating}</span>
                <span className="text-gray-500 dark:text-[#9CA3AF]">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700 dark:text-[#D1D5DB]">
                <Package className="w-5 h-5" />
                <span><strong>{product.quantity} {product.unit}</strong> available</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-[#D1D5DB]">
                <MapPin className="w-5 h-5" />
                <span>{product.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-[#D1D5DB]">
                <User className="w-5 h-5" />
                <span>{product.sellerName}</span>
                {product.isVerified && (
                  <span className="text-sm flex items-center bg-green-100 text-green-700 border border-green-600 px-2 py-1 rounded dark:bg-green-700 dark:text-green-200 dark:border-green-400">
                    <Shield className="w-3 h-3 mr-1" /> Verified Seller
                  </span>
                )}
              </div>
              {product.hasDelivery && (
                <div className="flex items-center gap-3 text-gray-700 dark:text-[#D1D5DB]">
                  <Truck className="w-5 h-5" />
                  <span>Delivery: {product.estimatedDelivery}</span>
                </div>
              )}
            </div>

            <hr className="border-gray-300 dark:border-[#374151]" />

            {/* Order Section */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-[#D1D5DB]">Quantity ({product.unit})</label>
                <input
                  type="number"
                  min="1"
                  max={product.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#34D399] dark:bg-[#0B1A12] dark:border-[#374151] dark:text-[#F9FAFB]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-[#D1D5DB]">Total Price</label>
                <div className="h-10 flex items-center text-lg font-semibold text-blue-600 dark:text-[#34D399]">
                  Rs. {totalPrice.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:text-yellow-300 dark:bg-[#34D399] dark:hover:bg-[#059669]"
                onClick={() => onAddToCart(product, quantity)}
                disabled={!product.isAvailable}
              >
                <ShoppingCart className="w-4 h-4 mr-2 inline" />
                Add to Cart
              </button>
              <button
                className={`border rounded px-3 py-2 dark:border-[#374151] dark:text-[#F9FAFB]`}
                onClick={() => onToggleWishlist(product.id)}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-600 text-red-600' : 'text-gray-600 dark:text-[#D1D5DB]'}`} />
              </button>
            </div>

            {product.isBulkAvailable && (
              <div className="space-y-2">
                <button className="w-full border rounded px-4 py-2 flex items-center justify-center hover:bg-yellow-300 dark:hover:bg-[#FACC15] transition dark:border-[#374151] dark:text-[#F9FAFB]">
                  <Phone className="w-4 h-4 mr-2" /> Contact for Bulk Order
                </button>
                <button onClick={handleChat()} className="w-full border rounded px-4 py-2 flex items-center justify-center hover:bg-yellow-300 dark:hover:bg-[#FACC15] transition dark:border-[#374151] dark:text-[#F9FAFB]">
                  <MessageCircle className="w-4 h-4 mr-2" /> Chat with Seller
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <hr className="my-6 border-gray-300 dark:border-[#374151]" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold dark:text-[#F9FAFB]">Product Description</h3>
          <p className="text-gray-600 dark:text-[#D1D5DB]">
            Fresh {product.name.toLowerCase()} sourced directly from local farmers in {product.location}.
            {product.isOrganic ? " Certified organic and grown without harmful pesticides." : ""}
            Perfect for daily consumption and cooking. Quality guaranteed with proper packaging and handling.
          </p>
        </div>

        {/* Reviews */}
        <hr className="my-6 border-gray-300 dark:border-[#374151]" />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold dark:text-[#F9FAFB]">Customer Reviews</h3>
          {reviews.map((review) => (
            <div key={review.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="font-medium dark:text-[#F9FAFB]">{review.user}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-[#9CA3AF]"}`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-[#9CA3AF]">{review.date}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-[#D1D5DB]">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
