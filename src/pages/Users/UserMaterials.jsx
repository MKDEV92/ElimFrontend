import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiDownload, FiSearch } from "react-icons/fi";

const UserMaterials = () => {
  const [search, setSearch] = useState("");
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPurchasedMaterials = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/elimuis/api/purchases/user`);
      setMaterials(res.data);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchasedMaterials();
  }, []);

  const filtered = materials.filter(
    (mat) =>
      mat.title.toLowerCase().includes(search.toLowerCase()) ||
      mat.subject.toLowerCase().includes(search.toLowerCase())
  );

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">PDF</span>;
      case "doc":
      case "docx":
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">DOC</span>;
      case "zip":
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">ZIP</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">FILE</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">My Purchased Materials</h2>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by title or subject..."
          className="pl-10 w-full p-3 border border-gray-300 rounded-md shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Materials List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading materials...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 border border-gray-200 rounded-lg">
          <div className="bg-gray-100 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
          <p className="mt-4 text-gray-500">No purchased materials found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((mat) => (
            <div
              key={mat._id}
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-violet-300 transition-all flex justify-between items-start"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-800 truncate">{mat.title}</h4>
                  {getFileIcon(mat.fileType)}
                </div>
                <p className="text-sm text-gray-600 mb-2">{mat.subject}</p>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>Uploaded: {new Date(mat.uploadDate).toLocaleDateString()}</span>
                  <span className="flex items-center">
                    <FiDownload className="mr-1" /> {mat.downloads || 0} downloads
                  </span>
                </div>
              </div>

              <div className="ml-4">
                <a
                  href={mat.downloadUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                  title="Download"
                >
                  <FiDownload size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Summary */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">{materials.length}</p>
            <p className="text-sm text-gray-600">Total Materials</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">
              {materials.reduce((sum, mat) => sum + (mat.downloads || 0), 0)}
            </p>
            <p className="text-sm text-gray-600">Total Downloads</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMaterials;
