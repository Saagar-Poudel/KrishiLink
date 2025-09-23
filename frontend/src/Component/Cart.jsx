import React, { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";
import { useCart } from "../contexts/CartContex";
import { useToast } from "../hooks/use-toast";
import { useLanguage } from "../contexts/LanguageContext";
import Bill from "./Bill";

export const Cart = ({ onClose, isOpen }) => {
  const { cartItems, updateCartQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showBill, setShowBill] = useState(false);

  if (showBill) {
    return (
      <Bill
        isOpen={true}
        onClose={() => {
          setShowBill(false);
          onClose();
        }}
        cartItems={cartItems}
        onOrderComplete={() => {
          clearCart();
          setShowBill(false);
          onClose();
        }}
      />
    );
  }

  const handleCheckout = () => setShowBill(true);

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    toast({
      title: t("itemRemoved"),
      description: t("allItemsRemoved"),
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: t("cartCleared"),
      description: t("allItemsRemoved"),
    });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartQuantity(productId, newQuantity);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40"
     onClick={onClose} 
    >
      {/* Drawer */}
      <div className="w-full sm:max-w-lg h-full bg-white dark:bg-[#0B1A12] shadow-lg flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#1F2937]">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-[#F9FAFB]">
            <ShoppingBag className="w-5 h-5" />
            {t("cartTitle")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="px-4 py-2 text-sm text-gray-500 dark:text-[#9CA3AF] border-b border-gray-200 dark:border-[#1F2937]">
          {cartItems.length === 0
            ? t("cartEmpty")
            : `${cartItems.length} ${t("cartItems")}`}
        </p>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
            <ShoppingBag className="w-16 h-16 text-gray-400 dark:text-[#374151] mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-[#F9FAFB]">
              {t("cartEmpty")}
            </h3>
            <p className="text-gray-500 dark:text-[#9CA3AF] mb-4">
              {t("addProductsMessage")}
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700
                         dark:bg-[#34D399] dark:hover:bg-[#059669] dark:text-[#0B1A12]"
            >
              {t("continueShopping")}
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 py-4 border-b border-gray-200 dark:border-[#1F2937]"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 dark:bg-[#12241A]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h4 className="text-sm font-medium truncate text-gray-800 dark:text-[#F9FAFB]">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-[#9CA3AF]">
                      {item.category}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-semibold text-green-600 dark:text-[#34D399]">
                        Rs. {item.price}/{item.unit}
                      </span>
                      <span className="px-2 py-0.5 text-xs border rounded text-gray-600 dark:text-[#D1D5DB] dark:border-[#374151]">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end space-y-2">
                    {/* Quantity */}
                    <div className="flex items-center space-x-1">
                      <button
                        className="h-8 w-8 border rounded flex items-center justify-center 
                                   dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
                        onClick={() => handleQuantityChange(item.id, item.cartQuantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-gray-800 dark:text-[#F9FAFB]">
                        {item.cartQuantity}
                      </span>
                      <button
                        className="h-8 w-8 border rounded flex items-center justify-center 
                                   dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
                        onClick={() => handleQuantityChange(item.id, item.cartQuantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price & Remove */}
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800 dark:text-[#F9FAFB]">
                        Rs. {(item.price * item.cartQuantity).toFixed(2)}
                      </p>
                      <button
                        className="text-red-500 hover:text-red-600 dark:hover:text-[#DC2626] p-1"
                        onClick={() => handleRemoveItem(item.id, item.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-[#1F2937] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-800 dark:text-[#F9FAFB]">
                  {t("total")}
                </span>
                <span className="text-lg font-bold text-green-600 dark:text-[#34D399]">
                  Rs. {getTotalPrice().toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700
                           dark:bg-[#34D399] dark:hover:bg-[#059669] dark:text-[#0B1A12]"
              >
                {t("checkoutStarted")}
              </button>

              <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border rounded-lg text-gray-800 dark:text-[#D1D5DB] 
                             dark:border-[#374151] dark:hover:bg-[#12241A]"
                >
                  {t("continueShopping")}
                </button>
                <button
                  onClick={handleClearCart}
                  className="px-4 py-2 text-red-600 hover:text-red-700 dark:hover:text-[#DC2626]"
                >
                  {t("clearCart")}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
