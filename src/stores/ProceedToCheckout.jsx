import React, { useState } from "react";
import axios from "axios";
import { useCartStore } from "../stores/useCartStore";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const ProceedToCheckout = () => {
  const { cart, clearCart } = useCartStore();
  const { user } = useUser();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = Math.round(subtotal);

  const handlePayment = async () => {
    if (!phone || !phone.startsWith("254") || phone.length !== 12) {
      toast.error("Enter a valid Safaricom number starting with 254...");
      return;
    }

    if (grandTotal < 10) {
      toast.error("Minimum payment amount is KES 10");
      return;
    }

    setLoading(true);
    
    try {
      // Prepare payment data
      const paymentData = {
        phone,
        amount: grandTotal,
        account: "091287636292", // Your account number
        paybill: "247247", // Your paybill number
        description: `Payment for ${cart.length} item(s)`,
        reference: `EDU-${Date.now()}`, // Unique transaction reference
        cart: cart.map(item => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          price: item.price
        }))
      };

      // Send payment request to backend
      const res = await axios.post(
        "http://localhost:5000/api/mpesa/stkpush", 
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.id}` // Send user ID for verification
          }
        }
      );

      if (res.data.success) {
        toast.success("STK Push sent! Complete payment on your phone...");
        
        // Check payment status every 10 seconds (simulated)
        const checkInterval = setInterval(async () => {
          try {
            // In a real app, this would check your backend which verifies with Safaricom
            const statusRes = await axios.get(
              `https://your-api-domain.com/api/payment/status/${res.data.transactionId}`
            );
            
            if (statusRes.data.status === "success") {
              clearInterval(checkInterval);
              completePurchase(res.data.transactionId);
            }
          } catch (error) {
            console.error("Payment check error:", error);
          }
        }, 10000);

        // Fallback timeout if payment isn't confirmed in 5 minutes
        setTimeout(() => {
          clearInterval(checkInterval);
          toast.error("Payment timed out. Please try again.");
          setLoading(false);
        }, 300000);
      } else {
        throw new Error(res.data.message || "Payment initiation failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.response?.data?.message || "Payment failed. Try again.");
      setLoading(false);
    }
  };

  const completePurchase = (mpesaCode) => {
    // Save purchase to localStorage
    const purchaseItems = cart.map(item => ({
      ...item,
      purchaseId: `PUR-${Date.now()}-${item.id}`,
      paymentStatus: "confirmed",
      purchaseDate: new Date().toISOString(),
      mpesaCode,
      fileType: item.fileType || "pdf",
      downloadUrl: item.downloadUrl || "#",
    }));

    const userPurchasesKey = `purchases_${user.id}`;
    const stored = localStorage.getItem(userPurchasesKey);
    const existing = stored ? JSON.parse(stored) : [];

    const updatedPurchases = [...existing, ...purchaseItems];
    localStorage.setItem(userPurchasesKey, JSON.stringify(updatedPurchases));

    // Clear cart and navigate
    clearCart();
    toast.success("Payment confirmed! Download your resources.");
    navigate("/user/purchases");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Complete Your Purchase</h2>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">KES {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-2">
        </div>
        <div className="flex justify-between pt-3 border-t border-gray-200">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-lg font-bold text-emerald-600">
            KES {grandTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-medium">
          M-Pesa Number
        </label>
        <input
          type="tel"
          placeholder="2547XXXXXXXX"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <p className="mt-1 text-sm text-gray-500">
          Enter your Safaricom number starting with 254
        </p>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="font-bold text-blue-800 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Payment Instructions
        </h3>
        <ol className="text-sm text-blue-700 list-decimal pl-5 space-y-1">
          <li>Enter your Safaricom number</li>
          <li>Click "Pay with M-Pesa"</li>
          <li>Check your phone for STK push prompt</li>
          <li>Enter your M-Pesa PIN when prompted</li>
          <li>Payment will process automatically</li>
        </ol>
        <p className="mt-2 text-xs text-blue-900">
          Till: <span className="font-mono">6428608</span> | Name: <span className="font-mono">OTIENO</span>
        </p>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading || grandTotal === 0}
        className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center transition ${
          loading || grandTotal === 0
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl"
        }`}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Payment...
          </>
        ) : (
          "Pay with M-Pesa"
        )}
      </button>
    </div>
  );
};

export default ProceedToCheckout;