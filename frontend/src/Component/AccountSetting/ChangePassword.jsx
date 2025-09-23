import React, { useState } from "react";

const ChangePassword = ({ isOpen, onClose, onSave }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null; // don’t render if not open

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    // pass updated password back to parent
    onSave({ currentPassword, newPassword });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose} // close when clicking outside
    >
      <div
        className="bg-white dark:bg-[#0B1A12] rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // stop close when clicking inside
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
