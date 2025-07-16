import React, { useState } from "react";
import UserSidebar from "./UserSidebar";
import UserTopBar from "./UserTopBar";
import UserMaterials from "./UserMaterials";
import UserPurchases from "./UserPurchases";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("materials");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "materials":
        return <UserMaterials />;
      case "purchases":
        return <UserPurchases />;
      default:
        return <UserMaterials />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <UserSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex flex-col flex-1">
        <UserTopBar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
