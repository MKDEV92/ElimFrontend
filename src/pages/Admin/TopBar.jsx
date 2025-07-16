import React, { useEffect, useState } from "react";
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";
import { FiLogOut } from "react-icons/fi";

const TopBar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full sticky top-0 z-50 bg-white shadow-sm border-b px-6 py-3 flex justify-between items-center">
      <div className="text-lg font-semibold text-violet-700">
        Elimu Admin Panel
      </div>

      <div className="flex items-center space-x-6 text-sm text-gray-600">
        <span className="font-medium">👤 {user?.fullName || "Admin"}</span>
        <span>{currentTime.toLocaleDateString()}</span>
        <span>{currentTime.toLocaleTimeString()}</span>

        {/* Combined User Avatar and Logout */}
        <div className="flex items-center gap-4">
          <UserButton 
            afterSignOutUrl="/" 
            appearance={{ 
              elements: { 
                avatarBox: "h-8 w-8" 
              } 
            }} 
          />
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
            aria-label="Logout"
          >
            <FiLogOut className="text-base" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;