import React from "react";
import {
  FiFileText,
  FiShoppingCart,
  FiLogOut,
} from "react-icons/fi";
import { useClerk } from "@clerk/clerk-react";

const UserSidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const { signOut } = useClerk();

  const menuItems = [
    { id: "materials", label: "My Materials", icon: <FiFileText /> },
    { id: "purchases", label: "Purchases", icon: <FiShoppingCart /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white shadow-md p-5 flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-violet-700 mb-8">Elimu</h1>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition ${
                  activeTab === item.id
                    ? "bg-violet-200 text-violet-800 font-semibold"
                    : "hover:bg-violet-50 text-gray-700"
                }`}
              >
                {item.icon}
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-100 p-3 rounded-md w-full"
        >
          <FiLogOut />
          Logout
        </button>
      </aside>

      {/* Mobile Drawer Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30 lg:hidden">
          <div className="w-64 bg-white shadow-md h-full p-5 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-violet-700 mb-8">Elimu</h1>
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition ${
                      activeTab === item.id
                        ? "bg-violet-200 text-violet-800 font-semibold"
                        : "hover:bg-violet-50 text-gray-700"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => {
                signOut();
                setSidebarOpen(false);
              }}
              className="flex items-center gap-2 text-sm text-red-500 hover:bg-red-100 p-3 rounded-md w-full"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSidebar;
