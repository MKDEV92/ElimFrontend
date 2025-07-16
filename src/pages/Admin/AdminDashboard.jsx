import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MaterialList from "./MaterialList";
import Purchases from "./Purchases";
import UploadMaterials from "./UploadMaterials";
import Settings from "./Settings";
import TopBar from "./TopBar"; // Top header with user, time, date

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("upload");

  const renderContent = () => {
    switch (activeTab) {
      case "upload":
        return <UploadMaterials />;
      case "materials":
        return <MaterialList />;
      case "purchases":
        return <Purchases />;
      case "settings":
        return <Settings />;
      default:
        return <UploadMaterials />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* TopBar always at top */}
      <TopBar />

      {/* Sidebar + Content below */}
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
