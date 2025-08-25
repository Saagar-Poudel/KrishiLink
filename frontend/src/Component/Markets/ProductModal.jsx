
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
  isWishlisted,
  showInNepali = false
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!product || !isOpen) return null;

  const displayName = showInNepali && product.nameNepali ? product.nameNepali : product.name;
  const totalPrice = product.price * quantity;

  const reviews = [
    { id: 1, user: "Ram Sharma", rating: 5, comment: "Excellent quality products. Fresh and organic!", date: "2 days ago" },
    { id: 2, user: "Sita Gurung", rating: 4, comment: "Good quality but delivery was slightly delayed.", date: "1 week ago" },
    { id: 3, user: "Krishna Thapa", rating: 5, comment: "Best seller in the area. Highly recommended!", date: "2 weeks ago" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto ">
      <div className="relative bg-white max-w-4xl w-full max-h-[90vh] rounded-lg shadow-lg overflow-y-auto p-6 dark:bg-gray-800  dark:text-gray-100">

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X size={30} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6">{displayName}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left: Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 space-y-2">
              {product.isOrganic && (
                <span className="bg-green-500 text-white text-sm px-2 py-1 rounded">Organic Certified</span>
              )}
              {product.isBulkAvailable && (
                <span className="bg-gray-100 text-sm px-2 py-1 rounded border">Bulk Orders Available</span>
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
            <p className="text-gray-500">{product.category}</p>

            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-green-600">
                Rs. {product.price}
                <span className="text-lg font-normal">/{product.unit}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-gray-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <Package className="w-5 h-5" />
                <span><strong>{product.quantity} {product.unit}</strong> available</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5" />
                <span>{product.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <User className="w-5 h-5" />
                <span>{product.sellerName}</span>
                {product.isVerified && (
                  <span className="text-sm flex items-center bg-green-100 text-green-700 border border-green-600 px-2 py-1 rounded">
                    <Shield className="w-3 h-3 mr-1" /> Verified Seller
                  </span>
                )}
              </div>
              {product.hasDelivery && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Truck className="w-5 h-5" />
                  <span>Delivery: {product.estimatedDelivery}</span>
                </div>
              )}
            </div>

            {/* Separator */}
            <hr />

            {/* Order Section */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Quantity ({product.unit})</label>
                <input
                  type="number"
                  min="1"
                  max={product.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Total Price</label>
                <div className="h-10 flex items-center text-lg font-semibold text-blue-600">
                  Rs. {totalPrice.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                onClick={() => onAddToCart(product, quantity)}
                disabled={!product.isAvailable}
              >
                <ShoppingCart className="w-4 h-4 mr-2 inline" />
                Add to Cart
              </button>
              <button
                className={`border rounded px-3 py-2 ${isWishlisted ? 'text-red-600 fill-red-600' : 'text-gray-600'}`}
                onClick={() => onToggleWishlist(product.id)}
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>

            {product.isBulkAvailable && (
              <div className="space-y-2">
                <button className="w-full border rounded px-4 py-2 flex items-center justify-center">
                  <Phone className="w-4 h-4 mr-2" /> Contact for Bulk Order
                </button>
                <button className="w-full border rounded px-4 py-2 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 mr-2" /> Chat with Seller
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <hr className="my-6" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Product Description</h3>
          <p className="text-gray-600">
            Fresh {product.name.toLowerCase()} sourced directly from local farmers in {product.location}.
            {product.isOrganic ? " Certified organic and grown without harmful pesticides." : ""}
            Perfect for daily consumption and cooking. Quality guaranteed with proper packaging and handling.
          </p>
        </div>

        {/* Reviews */}
        <hr className="my-6" />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Customer Reviews</h3>
          {reviews.map((review) => (
            <div key={review.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="font-medium">{review.user}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
