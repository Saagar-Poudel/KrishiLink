import React, { useEffect, useState } from "react";

import { Eye } from "lucide-react";
import axios from "axios";

const reportsData1 = [
  {
    id: 1,
    reporter: "John Doe",
    reported: "Fake Product Store",
    type: "Product Issue",
    date: "2024-06-20",
    status: "Open",
    priority: "High",
  },
  {
    id: 2,
    reporter: "Jane Smith",
    reported: "BadUser123",
    type: "User Behavior",
    date: "2024-06-19",
    status: "Resolved",
    priority: "Medium",
  },
  {
    id: 3,
    reporter: "Mike Wilson",
    reported: "ScamShop",
    type: "Fraudulent Seller",
    date: "2024-06-18",
    status: "Under Review",
    priority: "High",
  },
  {
    id: 4,
    reporter: "Sarah Johnson",
    reported: "Defective Electronics",
    type: "Product Quality",
    date: "2024-06-17",
    status: "Open",
    priority: "Low",
  },
];

const ReportManagement = () => {
  const [reportsData, setReportsData] = useState([]);
  useEffect(() => {
    const fetchReportsData = async () => {
      const { data } = await axios.get("http://localhost:3000/api/admin/reports");
      setReportsData(data);
    }
    fetchReportsData();
  },)

  return(
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Report Management
        </h1>
        <p className="text-gray-600 mt-2">Handle user reports and issues</p>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100/50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Reporter
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Reported
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Type
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Date
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Priority
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
              {reportsData.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-blue-50 hover:bg-blue-50/30 transition-colors"
                >
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {report.reporter}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{report.reported}</td>
                  <td className="py-4 px-6 text-gray-600">{report.type}</td>
                  <td className="py-4 px-6 text-gray-600">{report.date}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${report.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : report.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                    >
                      {report.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${report.status === "Open"
                          ? "bg-red-100 text-red-800"
                          : report.status === "Resolved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-sm font-medium">
                        Resolve
                      </button>
                    </div>
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

export default ReportManagement;
