import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [cart, setCart] = useState([]);
  const [mpesaCode, setMpesaCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!mpesaCode.trim()) {
      alert("Please enter a valid M-Pesa confirmation code.");
      return;
    }

    // Submit payment logic here, e.g., send to backend

    // Clear cart
    localStorage.removeItem("cart");
    setCart([]);
    setMpesaCode("");

    alert("Payment confirmed successfully!");
    navigate("/user"); // Redirect to user dashboard
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-violet-700 mb-6 text-center">Payment Page</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cart.map((item, index) => (
              <li key={index} className="py-4 flex justify-between">
                <span>{item.title}</span>
                <span>KSh {item.price}</span>
              </li>
            ))}
            <li className="py-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>KSh {totalAmount}</span>
            </li>
          </ul>
        )}
      </div>

      {cart.length > 0 && (
        <form onSubmit={handlePaymentSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label htmlFor="mpesa" className="block text-gray-700 font-medium mb-2">
              M-Pesa Confirmation Code
            </label>
            <input
              id="mpesa"
              type="text"
              value={mpesaCode}
              onChange={(e) => setMpesaCode(e.target.value)}
              placeholder="e.g. QJ56TR98D"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            Confirm Payment
          </button>
        </form>
      )}
    </div>
  );
};

export default Payment;
