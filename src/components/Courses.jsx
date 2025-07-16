import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore";
import axios from "axios";

const Courses = () => {
  const { addToCart, cart } = useCartStore();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
  const fetchMaterials = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/elimuis/api/materials`);
      if (Array.isArray(res.data)) {
        setMaterials(res.data);
      } else {
        console.error("Unexpected response format:", res.data);
        setMaterials([]); // fallback
      }
    } catch (err) {
      console.error("Failed to fetch materials:", err);
      toast.error("Error loading materials");
    }
  };

  fetchMaterials();
}, []);


  const handleAddToCart = (material) => {
    const quantity = quantities[material._id] || 1;
    addToCart({ ...material, id: material._id, quantity });
    toast.success(`Added ${quantity} ${material.title} to cart`);
  };

  const handleQuantityChange = (id, value) => {
    const newValue = Math.max(1, Math.min(10, value));
    setQuantities((prev) => ({ ...prev, [id]: newValue }));
  };

  const handleCartAction = (path) => {
    if (isSignedIn) {
      navigate(path);
    } else {
      toast.error("Please sign in to continue");
      setTimeout(() => {
        navigate(`/sign-in?redirect_url=${path}`);
      }, 1000);
    }
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Educational Resources Catalogue
        </h1>
        <p className="text-gray-600 text-lg">
          Quality study materials for academic success
        </p>
      </div>

      {/* Cart Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4 sticky top-2 z-10 bg-gray-50 py-4">
        <div className="text-2xl font-semibold text-gray-800">Available Resources</div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleCartAction("/cart")}
            className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow hover:bg-gray-700 transition"
          >
            <span>View Cart</span>
            {cartItemCount > 0 && (
              <span className="bg-emerald-500 text-white text-sm px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleCartAction("/checkout")}
            disabled={cartItemCount === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg shadow transition ${
              cartItemCount === 0 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            Proceed to Payment
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Material Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {materials.map((material) => (
          <div
            key={material._id}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="relative">
              <img
                src={material.fileUrl}
                alt={material.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                KSh {material.price}
              </div>
            </div>

            <div className="p-5 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {material.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">
                {material.description}
              </p>

              <div className="flex items-center gap-3 mb-4">
                <label className="text-gray-700 text-sm">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(material._id, (quantities[material._id] || 1) - 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    disabled={(quantities[material._id] || 1) <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantities[material._id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(material._id, parseInt(e.target.value) || 1)
                    }
                    className="w-12 text-center border-x border-gray-300 py-1"
                  />
                  <button
                    onClick={() => handleQuantityChange(material._id, (quantities[material._id] || 1) + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    disabled={(quantities[material._id] || 1) >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(material)}
                className="w-full bg-gray-800 text-white py-2.5 rounded-lg hover:bg-gray-900 transition flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
