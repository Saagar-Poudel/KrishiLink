import React, { useState } from "react";
import { Heart, MapPin, Star, ShoppingCart, User, Package, Truck } from "lucide-react";
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from "../../contexts/CartContex";

const ProductCard = ({ 
  product, 
  onProductClick, 
  onAddToCart, 
  onToggleWishlist,
  isWishlisted,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
 const { t } = useLanguage();
//  const { addToCart } = useCart();
  return (
    <div 
      className=" rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group  dark:bg-gray-800  dark:text-gray-100"
      onClick={() => onProductClick(product)}
    >
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-300 hover:scale-105 ${!imageLoaded && "bg-gray-200 animate-pulse"}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>
        
        {/* Overlay badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isOrganic && (
            <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">
              {t("Organic")}
            </span>
          )}
          {product.isBulkAvailable && (
            <span className="bg-white bg-opacity-90 px-2 py-1 rounded text-sm border dark:bg-gray-800  dark:text-gray-100">
              {t("Bulk Available")}
            </span>
          )}
        </div>

        {/* Availability badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded text-sm ${product.isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {product.isAvailable ? t("Available") : t("Out of Stock")}
          </span>
        </div>

        {/* Wishlist button */}
        <button
          className="absolute bottom-2 right-2 h-8 w-8 bg-white bg-opacity-80 hover:bg-white rounded-full flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
        </button>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{t(product.name)}</h3>
          <p className="text-sm text-gray-500">{t(product.category)}</p>
          
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-green-600">
              {t("Rs.")} {product.price}
              <span className="text-sm font-normal">/{t(product.unit)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{product.rating}</span>
              <span className="text-xs text-gray-500">({product.reviewCount})</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Package className="w-4 h-4" />
            <span>{product.quantity} {t(product.unit)} {t("available")}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{t(product.location)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4" />
            <span>{t(product.sellerName)}</span>
            {product.isVerified && (
              <span className="bg-green-100 text-green-600 border border-green-600 px-2 py-1 rounded text-xs flex items-center">
                ✓ {t("Verified")}
              </span>
            )}
          </div>

          {product.hasDelivery && product.estimatedDelivery && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Truck className="w-4 h-4" />
              <span>{t("Delivery")}: {t(product.estimatedDelivery)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="w-full space-y-2">
          <button 
            className={`w-full bg-green-600 text-white px-4 py-2 rounded-md flex items-center justify-center  ${!product.isAvailable && 'bg-gray-400 cursor-not-allowed'}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={!product.isAvailable}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.isAvailable ? t("Add to Cart") : t("Out of Stock")}
          </button>
         
          
          {product.isBulkAvailable && (
            <button className="w-full border rounded-md px-4 py-2 text-sm hover:bg-yellow-300 transition-colors flex items-center justify-center cursor-pointer">
              {t("Contact for Bulk Order")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;