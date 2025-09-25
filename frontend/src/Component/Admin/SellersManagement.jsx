import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash2, Search, Plus } from "lucide-react";
import axios from "axios";

// Sellers Management Component
const SellersManagement = () => {
  const [farmersData, setFarmersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    fetchSellersData();
  });
  const fetchSellersData = async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/admin/sellers"
      );
      setFarmersData(data);
    };

  const handleEditClick = (Seller) => {
    setSelectedSeller(Seller);
    setIsDrawerOpen(true);
  };

  const handleSave = async () => {
    await axios.put(
      `http://localhost:3000/api/admin/sellers/${selectedSeller.id}`,
      {
        username: selectedSeller.username,
        email: selectedSeller.email,
        status: selectedSeller.status,
      }
    );
    setIsDrawerOpen(false);
    fetchSellersData();
  };

  const handleDelete = async () => {
    await axios.delete(
      `http://localhost:3000/api/admin/sellers/${selectedSeller.id}`
    );
    setIsDeleteConfirmOpen(false);
    fetchSellersData();
  };

  const filteredSellers = farmersData.filter((seller) => {
    const username = seller.username?.toLowerCase() || "";
    const email = seller.email?.toLowerCase() || "";
    return (
      username.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Sellers Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor all seller accounts
          </p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100">
        <div className="p-6 border-b border-blue-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search sellers..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100/50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Username
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Email
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Join Date
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Products
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Revenue
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSellers.map((seller) => (
                <tr
                  key={seller.id}
                  className="border-b border-blue-50 hover:bg-blue-50/30 transition-colors"
                >
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {seller.username}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{seller.email}</td>
                  <td className="py-4 px-6 text-gray-600">{seller.joinDate}</td>
                  <td className="py-4 px-6 text-gray-600">
                    {seller.productCount}
                  </td>
                  <td className="py-4 px-6 text-gray-600">${seller.revenue}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        seller.status === "Verified"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {seller.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditClick(seller)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSeller(seller);
                          setIsDeleteConfirmOpen(true);
                        }}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 flex justify-end bg-black/50 backdrop-blur-sm z-50">
          <div className="w-96 bg-white shadow-2xl h-full transform transition-transform duration-300 ease-out">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Edit Seller</h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="Username"
                value={selectedSeller.username}
                onChange={(e) =>
                  setSelectedSeller({
                    ...selectedSeller,
                    username: e.target.value,
                  })
                }
              />
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="Email address"
                value={selectedSeller.email}
                onChange={(e) =>
                  setSelectedSeller({
                    ...selectedSeller,
                    email: e.target.value,
                  })
                }
              />
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                value={selectedSeller.status}
                onChange={(e) =>
                  setSelectedSeller({
                    ...selectedSeller,
                    status: e.target.value === "Verified",
                  })
                }
              >
                <option value="Verified">Verified</option>
                <option value="Unverified">Unverified</option>
              </select>
            </div>

            <div className="absolute bottom-0 border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow-lg space-y-4">
            <h2 className="text-lg font-semibold">Confirm Delete</h2>
            <p>Are you sure you want to delete this seller?</p>

            {/* Dropdown for reason */}
            <select
              className="w-full border p-2 rounded"
              value={selectedSeller?.deleteReason || ""}
              onChange={(e) =>
                setSelectedSeller({
                  ...selectedSeller,
                  deleteReason: e.target.value,
                })
              }
            >
              <option value="">Select a reason</option>
              <option value="Account Violation">Account Violation</option>
              <option value="Policy Violation">Policy Violation</option>
              <option value="User Request">User Request</option>
              <option value="Fraudulent Activity">Fraudulent Activity</option>
            </select>

            <div className="flex space-x-2">
              <button
                onClick={async () => {
                  handleDelete();
                  // store deleted user in deleted_users table
                  await axios.post(
                    "http://localhost:3000/api/admin/users/delete",
                    {
                      name: selectedSeller.username,
                      email: selectedSeller.email,
                      type: "Farmer",
                      reason: selectedSeller.deleteReason,
                    }
                  );
                  setIsDeleteConfirmOpen(false);
                  fetchSellersData();
                }}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellersManagement;
