import React, { useState, useEffect } from "react";
import { FiDownload, FiSearch, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import { useUser } from "@clerk/clerk-react";

const UserPurchases = () => {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [purchasedMaterials, setPurchasedMaterials] = useState([]);

  // Simulate loading purchased materials from storage/API
  useEffect(() => {
    if (!user) return;
    
    // Load user-specific purchases
    const userPurchasesKey = `purchases_${user.id}`;
    const storedPurchases = localStorage.getItem(userPurchasesKey);
    
    if (storedPurchases) {
      setPurchasedMaterials(JSON.parse(storedPurchases));
    } else {
      // Default empty state
      setPurchasedMaterials([]);
    }
  }, [user]);

  const filtered = purchasedMaterials.filter(
    (mat) =>
      mat.title.toLowerCase().includes(search.toLowerCase()) ||
      mat.subject.toLowerCase().includes(search.toLowerCase())
  );

  const getPaymentStatusBadge = (status) => {
    switch(status) {
      case "confirmed":
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center">
            <FiCheckCircle className="mr-1" /> Paid
          </span>
        );
      case "pending":
        return (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center">
            <FiClock className="mr-1" /> Pending
          </span>
        );
      default:
        return (
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center">
            <FiXCircle className="mr-1" /> Failed
          </span>
        );
    }
  };

  const getFileIcon = (fileType) => {
    switch(fileType) {
      case "pdf":
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">PDF</span>;
      case "doc":
      case "docx":
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">DOC</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">FILE</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Purchased Materials</h2>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search purchased materials..."
          className="pl-10 w-full p-3 border border-gray-300 rounded-md shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Materials List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 border border-gray-200 rounded-lg">
          <div className="bg-gray-100 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
          <p className="mt-4 text-gray-500">No purchased materials found</p>
          <p className="text-sm text-gray-400 mt-1">
            {purchasedMaterials.length === 0 
              ? "You haven't purchased any materials yet" 
              : "Try a different search term"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((mat) => (
            <div 
              key={mat.id} 
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-violet-300 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-800 truncate">{mat.title}</h4>
                    {getFileIcon(mat.fileType)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{mat.subject}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-3">
                    <div>
                      <span className="font-medium">Purchased:</span> {mat.purchaseDate}
                    </div>
                    <div>
                      <span className="font-medium">Price:</span> KSh {mat.price.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Reference:</span> {mat.mpesaCode}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Status:</span>
                    {getPaymentStatusBadge(mat.paymentStatus)}
                  </div>
                  
                  <button
                    onClick={() => window.open(mat.downloadUrl, '_blank')}
                    disabled={mat.paymentStatus !== "confirmed"}
                    className={`flex items-center px-4 py-2 rounded transition ${
                      mat.paymentStatus === "confirmed"
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <FiDownload className="mr-2" />
                    Download
                  </button>
                </div>
              </div>
              
              {mat.paymentStatus !== "confirmed" && (
                <div className="mt-3 p-2 bg-yellow-50 text-yellow-700 text-sm rounded">
                  {mat.paymentStatus === "pending"
                    ? "Your payment is being processed. Download will be available once confirmed."
                    : "Payment failed. Please contact support to resolve payment issues."}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Stats Summary */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">{purchasedMaterials.length}</p>
            <p className="text-sm text-gray-600">Total Purchases</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">
              {purchasedMaterials.filter(mat => mat.paymentStatus === "confirmed").length}
            </p>
            <p className="text-sm text-gray-600">Confirmed Payments</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">
              {purchasedMaterials.reduce((sum, mat) => sum + mat.price, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Spent (KSh)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPurchases;