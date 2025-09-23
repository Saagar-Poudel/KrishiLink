import React, { useState } from "react";

const ProfileEdit = ({ isOpen, onClose, onSave, currentName, currentPic, currentAddress }) => {
  const [username, setUsername] = useState(currentName || "Your Username");
  const [address, setAddress] = useState(currentAddress || "Your Address");
  const [profilePic, setProfilePic] = useState(null);

  if (!isOpen) return null; // don’t render if not open

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // pass updated values back to parent
    onSave({ username, address, profilePic });
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
          Edit Profile
        </h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profilePic || currentPic || "https://via.placeholder.com/120"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
          />
          <label className="mt-3 cursor-pointer px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
            Change Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Username Input */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-[#E5E7EB] mb-2 text-sm">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-[#12241A] dark:text-white text-sm"
          />
        </div>

        {/* Address Input */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-[#E5E7EB] mb-2 text-sm">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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

export default ProfileEdit;
