import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiFile, FiDownload, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";

const MaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get("https://vercel.com/densir-tech-solutions/elimuis/api/materials");
        setMaterials(res.data);
      } catch (err) {
        console.error("Failed to fetch materials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this material?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/materials/${id}`);
      setMaterials((prev) => prev.filter((mat) => mat._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete material");
    }
  };

  if (loading) {
    return <p className="text-center py-8">Loading materials...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="bg-gray-900 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Uploaded Materials</h2>
        <p className="text-emerald-300 text-sm mt-1">Manage your educational resources</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b border-gray-200">
        <div className="relative w-full md:w-80 mb-4 md:mb-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <FiSearch />
          </div>
          <input
            type="text"
            placeholder="Search materials..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>All Subjects</option>
            <option>Mathematics</option>
            <option>Biology</option>
            <option>Chemistry</option>
            <option>Physics</option>
            <option>English</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Most Downloaded</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Material</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Upload Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Downloads</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {materials.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <FiFile className="h-12 w-12 text-gray-300 mb-2" />
                    <p className="text-lg">No materials uploaded yet</p>
                    <p className="text-sm mt-1">Start by uploading your first educational resource</p>
                  </div>
                </td>
              </tr>
            ) : (
              materials.map((mat) => (
                <tr key={mat._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                        <FiFile className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{mat.title}</div>
                        <div className="text-xs text-gray-500">{mat.fileUrl.split("/").pop().slice(0, 30)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      mat.subject === 'Mathematics' ? 'bg-blue-100 text-blue-800' :
                      mat.subject === 'Biology' ? 'bg-green-100 text-green-800' :
                      mat.subject === 'Chemistry' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {mat.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">KSh {mat.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(mat.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FiDownload className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm">{mat.downloads || 0}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <a
                        href={mat.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-800 p-1.5 rounded hover:bg-emerald-50 transition"
                      >
                        <FiDownload className="h-5 w-5" />
                      </a>
                      <button className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 transition">
                        <FiEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(mat._id)}
                        className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialList;
