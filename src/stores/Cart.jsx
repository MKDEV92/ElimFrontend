import React from "react";
import { useCartStore } from "../stores/useCartStore";
import { X } from "react-feather";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = total * 0.16;
  const grandTotal = total + tax;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-gray-500 mb-2">Your cart is empty</p>
          <p className="text-gray-400 text-sm">Add items to get started</p>
        </div>
      ) : (
        <>
          <ul className="space-y-4 mb-8">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-start p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-white transition-all duration-200"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-50 border border-emerald-100 w-14 h-14 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-600 font-bold text-sm">
                        {item.title.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">{item.title}</p>
                      <p className="text-sm text-gray-600 truncate">{item.description}</p>
                      <p className="text-emerald-700 font-medium mt-1">KSh {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    toast.success("Item removed");
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 -mt-1 -mr-1"
                  aria-label="Remove item"
                >
                  <X size={18} />
                </button>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Subtotal</span>
              <span>KSh {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-3 text-gray-600">
              <span>Tax (16%)</span>
              <span>KSh {tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span className="text-emerald-700">KSh {grandTotal.toLocaleString()}</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  if (cart.length > 0) {
                    navigate("/checkout"); // navigate to ProceedToCheckout page
                  }
                }}
                className={`w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 ${
                  cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => {
                  clearCart();
                  toast.success("Cart cleared");
                }}
                className="w-full text-sm font-medium text-red-600 hover:underline"
              >
                Clear All
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
