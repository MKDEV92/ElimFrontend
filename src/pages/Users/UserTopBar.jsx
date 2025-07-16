import React, { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { FiMenu } from "react-icons/fi";

const UserTopBar = ({ setSidebarOpen }) => {
  const { user } = useUser();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white px-4 py-3 shadow flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
          <FiMenu className="text-2xl text-violet-700" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-violet-700">
            Welcome, {user?.firstName || "Student"}
          </h2>
          <p className="text-sm text-gray-600">
            {time.toLocaleDateString()} • {time.toLocaleTimeString()}
          </p>
        </div>
      </div>
      <UserButton />
    </div>
  );
};

export default UserTopBar;
