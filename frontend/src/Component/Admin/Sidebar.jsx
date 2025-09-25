import { 
  Users, ShoppingCart, UserX, FileText, 
  Home, Activity, LogOut
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'profile', name: 'Profile', icon: Users },
    { id: 'buyers', name: 'Buyers Management', icon: Users },
    { id: 'sellers', name: 'Seller Management', icon: ShoppingCart },
    { id: 'deleted', name: 'Deleted Users', icon: UserX },
    { id: 'reports', name: 'Report Management', icon: FileText },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-50 to-white border-r border-blue-100 h-screen fixed left-0 top-0 z-10 flex flex-col">
      <div className="p-6 border-b border-blue-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Admin Panel</h1>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button at Bottom */}
      <div className="p-4 border-t border-blue-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;