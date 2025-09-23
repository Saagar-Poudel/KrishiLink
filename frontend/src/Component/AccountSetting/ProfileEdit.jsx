import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { supabase } from "../../lib/supabaseClient";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../contexts/Authcontext";

const ProfileEdit = ({
  isOpen,
  onClose,
  onSave,
  currentName,
  currentPic,
  currentAddress,
  userId,
}) => {
  const [username, setUsername] = useState(currentName || "");
  const [address, setAddress] = useState(currentAddress || "");
  const [profilePic, setProfilePic] = useState(currentPic || "");
  const [uploading, setUploading] = useState(false);
  const { updateUser } = useAuth();
 
  if (!isOpen) return null;

  async function handleImageUpload(file) {
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuid()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(filePath, file, { upsert: true, cacheControl: "3600" });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(filePath);

      setProfilePic(data.publicUrl);
      toast.success("Profile picture updated");
    } catch (err) {
      toast.error(err.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/users/profile/${userId}`,
        {
          username,
          address,
          image: profilePic,
        }
      );
      if (data.user) {
        updateUser(data.user); // <-- update context + localStorage
        toast.success("Profile updated successfully!");
        onClose();
      }

      toast.success("Profile updated successfully!");
      onSave(data.user);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update profile");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profilePic || "https://via.placeholder.com/120"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
          />
          <label className="mt-3 cursor-pointer px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
            Change Picture
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files && handleImageUpload(e.target.files[0])
              }
              className="hidden"
            />
          </label>
          {uploading && (
            <p className="text-xs text-gray-500 mt-1">Uploading...</p>
          )}
        </div>

        {/* Username */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500 text-sm"
          />
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500 text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={uploading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
