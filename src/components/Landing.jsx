import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FiFile } from "react-icons/fi"; // Added missing import

const Landing = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/elimuis/api/materials`);
        setMaterials(res.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
        setError("Failed to load materials. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  // Added null/empty check before reduce
  const categorizedMaterials = materials && materials.length > 0 
    ? materials.reduce((acc, material) => {
        const category = material.subject?.toUpperCase() || 'UNCATEGORIZED';
        if (!acc[category]) acc[category] = [];
        acc[category].push(material);
        return acc;
      }, {})
    : {};

  const categories = Object.keys(categorizedMaterials);

  // Get file extension for display
  const getFileType = (url) => {
    if (!url) return 'FILE';
    const ext = url.split('.').pop()?.toUpperCase();
    return ext || 'FILE';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-r from-emerald-50 to-transparent"></div>
        </div>
        
        {categories.length > 0 && (
          <div className="relative overflow-hidden py-4 mb-8">
            <div className="whitespace-nowrap animate-scroll flex gap-8">
              {[...categories, ...categories].map((tag, idx) => (
                <motion.div 
                  key={`${tag}-${idx}`} 
                  className="inline-flex" 
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="px-6 py-3 bg-emerald-100 text-emerald-800 font-medium rounded-full hover:bg-emerald-200 transition-colors cursor-pointer">
                    {tag}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Ace Your Exams With <span className="text-emerald-600">Premium</span> Study Materials
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Access KCSE, KASNEB, college past papers, notes, and mock exams curated by top educators to boost your academic journey.
            </motion.p>
            <motion.div
              className="max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="relative rounded-lg shadow-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="Search for KCSE, KASNEB, Notes..."
                  className="w-full py-4 pl-6 pr-40 text-base text-gray-800 placeholder-gray-500 bg-white focus:outline-none"
                />
                <button className="absolute right-2 top-2 bottom-2 px-6 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                  Search Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section - Removed incomplete section */}

      {/* Latest Materials Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Latest Study Materials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out newly added notes, past papers, and revision kits from our growing library.
            </p>
          </div>

          {error ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
                <FiFile className="w-8 h-8" />
              </div>
              <p className="text-red-500 max-w-md mx-auto">{error}</p>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
              </div>
              <p className="mt-4 text-gray-600">Loading materials...</p>
            </div>
          ) : materials?.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                <FiFile className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Materials Found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find any study materials. Check back later or upload your own resources.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {materials.slice(0, 8).map((material) => (
                  <motion.div
                    key={material._id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border hover:border-emerald-500 transition-all"
                    whileHover={{ scale: 1.03 }}
                  >
                    {/* File preview section - fixed image issue */}
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center relative">
                      {material.fileType?.startsWith('image/') ? (
                        <img
                          src={material.fileUrl}
                          alt={material.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentNode.innerHTML = `
                              <div class="flex flex-col items-center">
                                <FiFile class="w-12 h-12 text-gray-400" />
                                <span class="text-gray-500 text-sm mt-2">${getFileType(material.fileUrl)}</span>
                              </div>
                            `;
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <FiFile className="w-12 h-12 text-gray-400" />
                          <span className="text-gray-500 text-sm mt-2">
                            {getFileType(material.fileUrl)}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded">
                        KSh {material.price}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {material.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {material.subject}
                      </p>
                      <p className="mt-2 text-sm text-gray-700 line-clamp-2 min-h-[2.5rem]">
                        {material.description || "No description available"}
                      </p>
                      <div className="mt-4">
                        <a
                          href={material.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full block text-center px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm"
                        >
                          View Material
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-10">
                <a 
                  href="/user" 
                  className="inline-block px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Go to User Dashboard
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  );
};

export default Landing;