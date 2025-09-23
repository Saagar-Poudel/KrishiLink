import React, { useState } from "react";
import { useAuth } from "../../contexts/Authcontext";
import axios from "axios";

const ChangePassword = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useAuth();

  if (!isOpen) return null; // don’t render if not open

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    try {
      await axios.put(
        `http://localhost:3000/api/users/change-password/${user.id}`,
        { currentPassword, newPassword }
      );

      alert("Password changed successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to change password");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#0B1A12] rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-[#F9FAFB]">
          Change Password
        </h2>

        {/* Current Password */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-[#E5E7EB] mb-1 text-sm">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-[#12241A] dark:text-white text-sm"
          />
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-[#E5E7EB] mb-1 text-sm">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-[#12241A] dark:text-white text-sm"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-[#E5E7EB] mb-1 text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-[#12241A] dark:text-white text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-[#1F2937] dark:text-[#E5E7EB]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
