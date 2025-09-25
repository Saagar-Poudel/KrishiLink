import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash2, Search } from "lucide-react";
import axios from "axios";

const BuyersManagement = () => {
  const [buyersData, setBuyersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    fetchBuyersData();
  }, []);

  const fetchBuyersData = async () => {
    const { data } = await axios.get("http://localhost:3000/api/admin/buyers");
    setBuyersData(data);
  };

  const handleEditClick = (buyer) => {
    setSelectedBuyer(buyer);
    setIsDrawerOpen(true);
  };

  const handleSave = async () => {
    await axios.put(
      `http://localhost:3000/api/admin/buyers/${selectedBuyer.id}`,
      {
        username: selectedBuyer.username,
        email: selectedBuyer.email,
        status: selectedBuyer.status,
      }
    );
    setIsDrawerOpen(false);
    fetchBuyersData();
  };

  const handleDelete = async () => {
    await axios.delete(
      `http://localhost:3000/api/admin/buyers/${selectedBuyer.id}`
    );
    setIsDeleteConfirmOpen(false);
    fetchBuyersData();
  };

  const filteredBuyers = buyersData.filter((buyer) => {
    const username = buyer.username?.toLowerCase() || "";
    const email = buyer.email?.toLowerCase() || "";
    return (
      username.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Buyers Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor all buyer accounts
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100">
        <div className="p-6 border-b border-blue-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search buyers..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100/50">
              <tr>
                <th className="text-left py-4 px-6">Username</th>
                <th className="text-left py-4 px-6">Email</th>
                <th className="text-left py-4 px-6">Join Date</th>
                <th className="text-left py-4 px-6">Orders</th>
                <th className="text-left py-4 px-6">Status</th>
                <th className="text-left py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuyers.map((buyer) => (
                <tr
                  key={buyer.id}
                  className="border-b border-blue-50 hover:bg-blue-50/30"
                >
                  <td className="py-4 px-6">{buyer.username}</td>
                  <td className="py-4 px-6">{buyer.email}</td>
                  <td className="py-4 px-6">{buyer.joinDate}</td>
                  <td className="py-4 px-6">{buyer.orderCount}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        buyer.status
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {buyer.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex space-x-2">
                    <button
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                      onClick={() => handleEditClick(buyer)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                      onClick={() => {
                        setSelectedBuyer(buyer);
                        setIsDeleteConfirmOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 flex justify-end bg-black/50 z-50">
          <div className="w-96 bg-white p-6 shadow-lg h-full">
            <h2 className="text-xl font-semibold mb-4">Edit Buyer</h2>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={selectedBuyer.username}
                onChange={(e) =>
                  setSelectedBuyer({
                    ...selectedBuyer,
                    username: e.target.value,
                  })
                }
              />
              <input
                type="email"
                className="w-full border p-2 rounded"
                value={selectedBuyer.email}
                onChange={(e) =>
                  setSelectedBuyer({ ...selectedBuyer, email: e.target.value })
                }
              />
              <select
                className="w-full border p-2 rounded"
                value={selectedBuyer.status}
                onChange={(e) =>
                  setSelectedBuyer({
                    ...selectedBuyer,
                    status: e.target.value === "true",
                  })
                }
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
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
            <p>Are you sure you want to delete this buyer?</p>

            {/* Dropdown for reason */}
            <select
              className="w-full border p-2 rounded"
              value={selectedBuyer?.deleteReason || ""}
              onChange={(e) =>
                setSelectedBuyer({
                  ...selectedBuyer,
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
                      name: selectedBuyer.username,
                      email: selectedBuyer.email,
                      type: "Buyer",
                      reason: selectedBuyer.deleteReason,
                    }
                  );
                  setIsDeleteConfirmOpen(false);
                  fetchBuyersData();
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

export default BuyersManagement;
