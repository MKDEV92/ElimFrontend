import React, { useState } from "react";
import {
  FiUpload,
  FiFileText,
  FiSettings,
  FiShoppingCart,
  FiLogOut,
  FiMoon,
  FiSun,
  FiMenu,
} from "react-icons/fi";
import { useClerk } from "@clerk/clerk-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { signOut } = useClerk();
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: "upload", label: "Upload Material", icon: <FiUpload /> },
    { id: "materials", label: "View Materials", icon: <FiFileText /> },
    { id: "purchases", label: "Purchases", icon: <FiShoppingCart /> },
    { id: "settings", label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <div
      className={`transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } min-h-screen flex flex-col justify-between p-4 ${
        darkMode ? "bg-gray-900" : "bg-white"
      } border-r ${darkMode ? "border-gray-800" : "border-gray-200"}`}
    >
      {/* Header & Collapse Button */}
      <div className="flex justify-between items-center mb-8">
        <h1
          className={`text-2xl font-bold ${
            darkMode ? "text-emerald-400" : "text-gray-900"
          } ${collapsed ? "hidden" : "block"}`}
        >
          E
        </h1>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`text-xl p-2 rounded-md ${
            darkMode
              ? "text-gray-300 hover:bg-gray-800"
              : "text-gray-500 hover:bg-gray-100"
          } transition`}
        >
          <FiMenu />
        </button>
      </div>

      {/* Menu Navigation */}
      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 p-3 rounded-md w-full text-left transition ${
                activeTab === item.id
                  ? darkMode
                    ? "bg-emerald-900 text-emerald-400"
                    : "bg-emerald-50 text-emerald-700"
                  : darkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </button>
          </li>
        ))}
      </ul>

      {/* Bottom Controls */}
      <div className="space-y-2">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`flex items-center gap-3 p-3 rounded-md w-full ${
            darkMode ? "text-emerald-400" : "text-gray-600"
          } ${
            darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
          } transition`}
        >
          {darkMode ? (
            <FiSun className="text-lg" />
          ) : (
            <FiMoon className="text-lg" />
          )}
          {!collapsed && (
            <span className="text-sm">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </button>

        {/* Logout */}
        <button
          onClick={() => signOut()}
          className={`flex items-center gap-3 p-3 rounded-md w-full ${
            darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
          } text-red-500 transition`}
        >
          <FiLogOut className="text-lg" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;