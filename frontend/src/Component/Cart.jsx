import React from "react";
import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";
import { useCart } from "../contexts/CartContex";
import { useToast } from "../hooks/use-toast";
import { useLanguage } from "../contexts/LanguageContext";

export const Cart = ({  onClose,isOpen }) => {
  const { cartItems, updateCartQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { t } = useLanguage(); 
   const { toast } = useToast(); 

  const handleRemoveItem = (productId, productName) => {
    removeFromCart(productId);
    toast({
      title: t("itemRemoved"),
      description: t("allItemsRemoved")  
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: t("cartCleared"),
      description: t("allItemsRemoved"),
    });
  };

  const handleCheckout = () => {
    toast({
      title: t("checkoutStarted"),
      description: t("checkoutSoon"),
    });
  };

  if (!isOpen) return null; // hide cart if not open

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm  bg-opacity-50">
      {/* Drawer */}
      <div className="w-full sm:max-w-lg h-full bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingBag className="w-5 h-5" />
            {t("cartTitle")}
          </h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="px-4 py-2 text-sm text-gray-500 border-b">
          {cartItems.length === 0
            ? t("cartEmpty")
            : `${cartItems.length} ${t("cartItems", { count: cartItems.length })}`}
        </p>

        {/* Empty cart */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {t("cartEmpty")}
            </h3>
            <p className="text-gray-500 mb-4">
              {t("addProductsMessage")}
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
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
                  className="flex items-center space-x-4 py-4 border-b"
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-sm font-medium truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-green-600">
                        Rs. {item.price}/{item.unit}
                      </span>
                      <span className="px-2 py-0.5 text-xs border rounded">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-1">
                      <button
                        className="h-8 w-8 border rounded flex items-center justify-center"
                        onClick={() =>
                          handleQuantityChange(item.id, item.cartQuantity - 1)
                        }
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.cartQuantity}
                      </span>
                      <button
                        className="h-8 w-8 border rounded flex items-center justify-center"
                        onClick={() =>
                          handleQuantityChange(item.id, item.cartQuantity + 1)
                        }
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        Rs. {(item.price * item.cartQuantity).toFixed(2)}
                      </p>
                      <button
                        className="text-red-500 hover:text-red-600 p-1"
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
            <div className="p-4 border-t space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">
                  {t("total")}
                </span>
                <span className="text-lg font-bold text-green-600">
                  Rs. {getTotalPrice().toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                {t("checkoutStarted")}
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border rounded-lg"
                >
                  {t("continueShopping")}
                </button>
                <button
                  onClick={handleClearCart}
                  className="px-4 py-2 text-red-600 hover:text-red-700"
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

// New file: src/components/Cart.jsx (create this file)
// This is a simple sidebar cart component. You can style it further as needed.
// import React from "react";
// import { X, Minus, Plus, ShoppingCart } from "lucide-react";
// import { useCart } from "../contexts/CartContex";
// import { useLanguage } from '../contexts/LanguageContext';


// const Cart = ({ onClose }) => {
//   const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
//   const { t } = useLanguage();

//   if (cartItems.length === 0) {
//     return (
//       <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-6 flex flex-col items-center justify-center dark:bg-gray-800 dark:text-gray-100">
//         <button onClick={onClose} className="absolute top-4 right-4">
//           <X className="h-6 w-6" />
//         </button>
//         <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
//         <p className="text-lg font-semibold">{t("Your cart is empty")}</p>
//         <p className="text-sm text-gray-500 mt-2">{t("Add some products to get started")}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-6 overflow-y-auto dark:bg-gray-800 dark:text-gray-100">
//       <button onClick={onClose} className="absolute top-4 right-4">
//         <X className="h-6 w-6" />
//       </button>
//       <h2 className="text-xl font-bold mb-6">{t("Your Cart")}</h2>
//       <div className="space-y-4">
//         {cartItems.map((item) => (
//           <div key={item.id} className="flex items-center justify-between border-b pb-4">
//             <div className="flex-1">
//               <h3 className="font-semibold">{item.name}</h3>
//               <p className="text-sm text-gray-500">
//                 Rs. {item.price} / {item.unit} × {item.quantity}
//               </p>
//             </div>
//             <div className="flex items-center gap-2">
//               <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
//                 <Minus className="h-4 w-4" />
//               </button>
//               <span>{item.quantity}</span>
//               <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
//                 <Plus className="h-4 w-4" />
//               </button>
//               <button onClick={() => removeFromCart(item.id)} className="text-red-600">
//                 {t("Remove")}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="mt-6">
//         <div className="flex justify-between text-lg font-bold">
//           <span>{t("Total")}</span>
//           <span>Rs. {getTotalPrice().toLocaleString()}</span>
//         </div>
//         <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-700">
//           {t("Checkout")}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart; 