import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { Users, ShoppingCart, DollarSign, Package } from "lucide-react";
import axios from "axios";

// const categoryData = [
//   { name: "Electronics", value: 4800, growth: 12 },
//   { name: "Fashion", value: 3200, growth: 8 },
//   { name: "Home & Garden", value: 2100, growth: -3 },
//   { name: "Sports", value: 1800, growth: 15 },
//   { name: "Books", value: 1200, growth: 5 },
//   { name: "Others", value: 900, growth: 2 },
// ];

// const monthlyData = [
//   { month: "Jan", buyers: 1200, sellers: 240, revenue: 145000 },
//   { month: "Feb", buyers: 1350, sellers: 280, revenue: 167000 },
//   { month: "Mar", buyers: 1100, sellers: 220, revenue: 134000 },
//   { month: "Apr", buyers: 1800, sellers: 320, revenue: 198000 },
//   { month: "May", buyers: 1600, sellers: 290, revenue: 187000 },
//   { month: "Jun", buyers: 1950, sellers: 380, revenue: 234000 },
// ];

const COLORS = [
  "#3B82F6",
  "#60A5FA",
  "#93C5FD",
  "#BFDBFE",
  "#DBEAFE",
  "#EFF6FF",
];

// Dashboard Component
const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalBuyers: 0,
    totalSellers: 0,
    totalRevenue: 0,
    totalProducts: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/admin/stats"
        );
        
        setDashboardStats({
          totalBuyers: data.totalBuyers,
          totalSellers: data.totalSellers,
          totalRevenue: data.totalRevenue,
          totalProducts: data.totalProducts,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchStats();
    // setDashboardStats({
    //   totalBuyers: data.totalBuyers,
    //   totalSellers: data.totalSellers,
    //   totalProducts: data.totalProducts,
    //   totalRevenue: data.totalRevenue
    // })
  }, []);

  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [revenueTrend, setRevenueTrend] = useState([]);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/admin/charts"
        );
        console.log("data:",data)
        setCategoryData(data.categories);
        setMonthlyData(data.monthly);
        setRevenueTrend(data.revenueTrend);
      } catch (error) {
        console.error("Error fetching charts:", error);
      }
    };
    fetchCharts();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome back, Admin! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Buyers</p>
              <p className="text-3xl font-bold text-blue-600">
                {dashboardStats.totalBuyers}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sellers</p>
              <p className="text-3xl font-bold text-blue-600">
                {dashboardStats.totalSellers}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-blue-600">
                ${dashboardStats.totalRevenue}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Products
              </p>
              <p className="text-3xl font-bold text-blue-600">
                {dashboardStats.totalProducts}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Product Categories
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Monthly Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Bar dataKey="buyers" fill="#3B82F6" radius={4} />
              <Bar dataKey="sellers" fill="#60A5FA" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Revenue Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default Dashboard;
