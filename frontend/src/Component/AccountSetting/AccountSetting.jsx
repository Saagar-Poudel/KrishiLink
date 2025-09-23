import React, { useState } from "react";
import ProfileEdit from "./ProfileEdit";
import ChangePassword from "./ChangePassword"; // import your ChangePassword component
import { useAuth } from "../../contexts/Authcontext";

const AccountSettings = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isChangeOpen, setIsChangeOpen] = useState(false); // state for change password modal
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    username: user.username,
    pic: user.image,
    address: user.address,
    userId: user.id,
  });

  const handleSaveProfile = (updatedData) => {
    setUserData({
      name: updatedData.username,
      pic: updatedData.profilePic || userData.pic,
    });
    alert("Profile updated successfully!");
  };

  const handleSavePassword = (newPassword) => {
    // you can handle password update logic here
    alert("Password changed successfully!");
  };

  const handleTwoFactor = () => {
    alert("Opening Two-Factor Authentication settings...");
  };

  const handleEmailPreferences = () => {
    alert("Opening Email Preferences...");
  };

  const handleSMSPreferences = () => {
    alert("Opening SMS Notifications settings...");
  };

  const handleExportData = () => {
    alert("Your data export has started...");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      alert("Your account has been deleted.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

      {/* Profile */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Profile</h3>
        <button
          onClick={() => setIsEditOpen(true)}
          className="w-full text-left px-4 py-2 mb-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Edit Profile
        </button>
      </div>

      {/* Security */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Security</h3>
        <button
          onClick={() => setIsChangeOpen(true)}
          className="w-full text-left px-4 py-2 mb-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Change Password
        </button>
        <button
          onClick={handleTwoFactor}
          className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Two-Factor Authentication
        </button>
      </div>

      {/* Notifications */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
        <button
          onClick={handleEmailPreferences}
          className="w-full text-left px-4 py-2 mb-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Email Preferences
        </button>
        <button
          onClick={handleSMSPreferences}
          className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          SMS Notifications
        </button>
      </div>

      {/* Data */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Data</h3>
        <button
          onClick={handleExportData}
          className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Export My Data
        </button>
      </div>

      {/* Delete */}
      {/* <button
        onClick={handleDeleteAccount}
        className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
      >
        Delete Account
      </button> */}

      {/* Profile Edit Modal */}
      <ProfileEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={(updatedUser) => setUserData(updatedUser)}
        currentUsername={userData?.username}
        currentPic={userData?.image}
        currentAddress={userData?.address}
        userId={userData?.userId}
      />

      {/* Change Password Modal */}
      <ChangePassword
        isOpen={isChangeOpen}
        onClose={() => setIsChangeOpen(false)}
        onSave={handleSavePassword}
      />
    </div>
  );
};

export default AccountSettings;
