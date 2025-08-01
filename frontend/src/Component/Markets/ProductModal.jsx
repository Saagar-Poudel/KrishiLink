import React, { useState } from "react";
import { Star, MapPin, User, Package, Truck, ShoppingCart, Heart, Phone, MessageCircle, Shield } from "lucide-react";
import { useLanguage } from '../../contexts/LanguageContext';

const ProductModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  onToggleWishlist,
  isWishlisted,
}) => {
const [isDialogOpen, setIsDialogOpen] = useState(false);
const openDialog = () => setIsDialogOpen(true);
const closeDialog = () => setIsDialogOpen(false);

  const [quantity, setQuantity] = useState(1);
 const { t } = useLanguage();
  if (!product) return null;

  const displayName = t(product.name);
  const totalPrice = product.price * quantity;

  const reviews = [
    { id: 1, user: t("Ram Sharma"), rating: 5, comment: t("Excellent quality products. Fresh and organic!"), date: t("2 days ago") },
    { id: 2, user: t("Sita Gurung"), rating: 4, comment: t("Good quality but delivery was slightly delayed."), date: t("1 week ago") },
    { id: 3, user: t("Krishna Thapa"), rating: 5, comment: t("Best seller in the area. Highly recommended!"), date: t("2 weeks ago") }
  ];

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold">{displayName}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="  absolute top-4 left-4 flex flex-col gap-2">
                  {product.isOrganic && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
                      {t("Organic Certified")}
                    </span>
                    
                  )}
                  {product.isBulkAvailable && (
                    <span className="bg-white bg-opacity-90 px-2 py-1 rounded text-sm border">
                      {t("Bulk Orders Available")}
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded text-sm ${product.isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {product.isAvailable ? t("In Stock") : t("Out of Stock")}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <p className="text-gray-500 mb-2">{t(product.category)}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-green-600">
                    {t("Rs.")} {product.price}
                    <span className="text-lg font-normal">/{t(product.unit)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{product.rating}</span>
                      <span className="text-gray-500">({product.reviewCount} {t("reviews")})</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-gray-500" />
                    <span><strong>{product.quantity} {t(product.unit)}</strong> {t("available")}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span>{t(product.location)}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <span>{t(product.sellerName)}</span>
                    {product.isVerified && (
                      <span className="bg-green-100 text-green-600 border border-green-600 px-2 py-1 rounded text-sm flex items-center">
                        <Shield className="w-3 h-3 mr-1" />
                        {t("Verified Seller")}
                      </span>
                    )}
                  </div>
                  
                  {product.hasDelivery && (
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-gray-500" />
                      <span>{t("Delivery")}: {t(product.estimatedDelivery)}</span>
                    </div>
                  )}
                </div>

                <hr className="my-4" />

                {/* Order Section */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="quantity" className="text-sm font-medium">{t("Quantity")} ({t(product.unit)})</label>
                      <input
                        id="quantity"
                        type="number"
                        min="1"
                        max={product.quantity}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">{t("Total Price")}</label>
                      <div className="h-10 flex items-center font-semibold text-lg text-blue-600">
                        {t("Rs.")} {totalPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md flex items-center justify-center disabled:bg-gray-400"
                      onClick={() => onAddToCart(product, quantity)}
                      disabled={!product.isAvailable}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {t("Add to Cart")}
                    </button>
                    <button
                      className={`border rounded-md p-2 ${isWishlisted ? 'text-red-600 fill-red-600' : 'text-gray-600'}`}
                      onClick={() => onToggleWishlist(product.id)}
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>

                  {product.isBulkAvailable && (
                    <div className="space-y-2">
                      <button className="w-full border rounded-md px-4 py-2 flex items-center justify-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {t("Contact for Bulk Order")}
                      </button>
                      <button className="w-full border rounded-md px-4 py-2 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {t("Chat with Seller")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <hr className="my-6" />

          {/* Product Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("Product Description")}</h3>
            <p className="text-gray-500">
              {t("Fresh")} {t(product.name.toLowerCase())} {t("sourced directly from local farmers in")} {t(product.location)}. 
              {product.isOrganic ? t("Certified organic and grown without harmful pesticides.") : ""}
              {t("Perfect for daily consumption and cooking. Quality guaranteed with proper packaging and handling.")}
            </p>
          </div>

          <hr className="my-6" />

          {/* Reviews */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("Customer Reviews")}</h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.user}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-500">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;