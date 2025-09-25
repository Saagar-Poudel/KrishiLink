import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* No Header or Footer - just the admin content */}
      <Outlet />
    </div>
  );
};

export default AdminLayout;