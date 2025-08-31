import React from "react";
import { useToast } from "../hooks/use-toast";
import { useLanguage } from "../contexts/LanguageContext";
import {User, X} from "lucide-react";
import { useState } from "react";

const Bill=  ({isOpen, onClose, cartItems,onOrderComplete})=>{
    const { t } = useLanguage();
    const {toast}=useToast();
    const [customerInfo, setCustomerInfo]= useState({
        name:"",
        phone:"",
        address:"",
        email:""
    });
     const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    // const [cartItems, setCartItems] = useState(false);

    if (!isOpen) return null;
const subtotal= cartItems.reduce(
    (total, item)=>total +item.price * item.quantity,0
);
const deliveryFee= 100;
const taxRate = 0.13;
const tax= subtotal * taxRate;
const grandTotal = subtotal + deliveryFee + tax;


    const handleInputChange = (field, value) => {
        setCustomerInfo((prev)=>({
            ...prev,
            [field]: value
        }))
    }
    const handlePlaceOrder=()=>{
        if (!customerInfo.name || !customerInfo.phone || !customerInfo.address){
            toast({
                title: t("missingInfoTitle"),
                description: t("missingInfoDesc"),
                variant: "destructive"
            });
            return;
    }
    if (customerInfo.phone.length < 10) {
        toast({
            title: t("invalidPhoneTitle"),
            description: t("invalidPhoneDesc"),
            variant: "destructive"
        });
        return;
    }
    if (customerInfo.email && !/\S+@\S+\.\S+/.test(customerInfo.email)) {
        toast({
            title: t("invalidEmailTitle"),
            description: t("invalidEmailDesc"),
            variant: "destructive"
        });
        return;
    }
    setTimeout(() => {
        setIsOrderPlaced(true);
        toast({
            title: t("Order Placed Successfully"),
            description: t("Your order has been placed successfully."),
        });
        setTimeout(()=>{
            onOrderComplete();
        }, 3000);
    }, 2000);
    };

   return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm overflow-y-auto p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">{t("Invoice")} - Krishi Link</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Customer Info */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <User className="w-5 h-5" />
              {t("Customer Information")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number *
                </label>
                <input
                  type="text"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter your complete address"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("Order Summary")}</h3>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} {item.unit} × {t("Rs.")} {item.price}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    {t("Rs.")} {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bill Summary */}
          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between">
              <span>{t("Subtotal")}</span>
              <span>{t("Rs.")} {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("Delivery Fee")}</span>
              <span>{t("Rs.")} {deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("Tax (13%)")}</span>
              <span>{t("Rs.")} {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-2">
              <span>{t("Grand Total")}</span>
              <span className="text-green-600">
                {t("Rs.")} {grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 border rounded-lg px-4 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handlePlaceOrder}
              className="flex-1 rounded-lg px-4 py-2 text-white bg-green-600 hover:bg-green-700"
            >
              {t("Place Order")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bill