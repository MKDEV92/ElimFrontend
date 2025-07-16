import React, { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";

const Settings = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [tillNumber, setTillNumber] = useState("123456");
  const [commission, setCommission] = useState(20);
  const [allowUploads, setAllowUploads] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [contactEmail, setContactEmail] = useState("support@elimu.co.ke");
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form with Clerk user data
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Update Clerk user information
      if (user) {
        await user.update({ fullName });
      }
      
      // TODO: Send platform settings to backend API
      alert("Settings saved successfully!");
    } catch (err) {
      alert(`Error saving settings: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    
    if (confirm && user) {
      try {
        // Delete Clerk user account
        await user.delete();
        signOut();
        alert("Account deleted successfully. You will be signed out.");
      } catch (err) {
        alert(`Error deleting account: ${err.message}`);
      }
    }
  };

  // For password management, we'll use Clerk's pre-built components
  const handlePasswordChange = () => {
    // Clerk will handle password change through their user profile flow
    if (user) {
      user.openUserProfile({
        appearance: { 
          elements: { 
            rootBox: "z-[1000]",
            card: "shadow-xl rounded-lg"
          } 
        }
      });
    }
  };

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow space-y-10">
      <h2 className="text-2xl font-semibold text-gray-800">Admin Settings</h2>

      {/* Profile */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Profile Info</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full border bg-gray-100 rounded px-3 py-2 mt-1 text-sm cursor-not-allowed"
            />
          </div>
        </div>

        {/* Password change using Clerk's built-in flow */}
        <div>
          <button
            onClick={handlePasswordChange}
            className="text-sm text-violet-600 hover:underline"
          >
            Change Password
          </button>
          <p className="text-xs text-gray-500 mt-1">
            You'll be redirected to Clerk's secure password management
          </p>
        </div>
      </div>

      {/* Payment */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Payment Settings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700">M-Pesa Till/Paybill</label>
            <input
              type="text"
              value={tillNumber}
              onChange={(e) => setTillNumber(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700">Admin Commission (%)</label>
            <input
              type="number"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Platform */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Platform Settings</h3>

        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={allowUploads}
            onChange={(e) => setAllowUploads(e.target.checked)}
            id="allowUploads"
            className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
          />
          <label htmlFor="allowUploads" className="text-sm cursor-pointer">
            Allow student material uploads
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={maintenanceMode}
            onChange={(e) => setMaintenanceMode(e.target.checked)}
            id="maintenanceMode"
            className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
          />
          <label htmlFor="maintenanceMode" className="text-sm cursor-pointer">
            Enable maintenance mode
          </label>
        </div>

        <div>
          <label className="text-sm text-gray-700">Support Contact Email</label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handleDelete}
          className="text-red-600 text-sm hover:underline"
        >
          Delete Admin Account
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded ${
            isSaving ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Settings;