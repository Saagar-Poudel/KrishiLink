import axios from 'axios';
import React,{useState} from 'react'
import { useEffect } from 'react';

const DeletedUsers = () => {
  const [deletedUsersData, setDeletedUsersData] = useState([]);
  useEffect(() => {
    const fetchDeletedUsers = async () => {
      const { data } = await axios.get("http://localhost:3000/api/admin/users/delete");
      setDeletedUsersData(data);
    }
    fetchDeletedUsers();
  },[]);

  return(
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Deleted Users</h1>
        <p className="text-gray-600 mt-2">View and manage deleted user accounts</p>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100/50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Username</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Email</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Type</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Deleted Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Reason</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deletedUsersData.map((user) => (
                <tr key={user.id} className="border-b border-blue-50 hover:bg-blue-50/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{user.name}</td>
                  <td className="py-4 px-6 text-gray-600">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.type === 'Buyer'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                      }`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{user.deletedDate}</td>
                  <td className="py-4 px-6 text-gray-600">{user.reason}</td>
                  <td className="py-4 px-6">
                    <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-sm font-medium">
                      Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default DeletedUsers