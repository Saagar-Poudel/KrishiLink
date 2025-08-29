import React from 'react'

function Cart() {
  return (
     <div className="absolute right-0 mt-2 w-72 bg-white text-black shadow-lg rounded-lg p-4 z-50">
            <h3 className="font-semibold mb-2">Your Cart</h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-2 border-b pb-1"
                >
                  <span>
                    {item.name} ({item.quantity} {item.unit})
                  </span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onRemoveFromCart(item.id)}
                  >
                    ❌
                  </button>
                </div>
              ))
            )}
          </div>
  )
}

export default Cart