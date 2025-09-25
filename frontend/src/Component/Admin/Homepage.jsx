import React, { useState } from "react";
import LoginPage from './LoginPage';
import Dashboard from './Dashboard'
import ProfilePage from './ProfilePage';
import Sidebar from "./SideBar";
import BuyersManagement from "./BuyersManagement";
import SellersManagement from "./SellersManagement";
import DeletedUsers from "./DeletedUsers";
import ReportManagement from "./ReportManagement";

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <ProfilePage />;
      case 'buyers':
        return <BuyersManagement />;
      case 'sellers':
        return <SellersManagement />;
      case 'deleted':
        return <DeletedUsers />;
      case 'reports':
        return <ReportManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={() => setIsLoggedIn(false)}
      />
      <div className="ml-64">
        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard