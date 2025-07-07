import { Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { TbTool } from "react-icons/tb";

export default function TopNavbar({ toggleSidebar }) {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin/dashboard':
        return 'Dashboard';
      case '/admin/profile':
        return 'Profile';
      case '/admin/map':
        return 'Alumni Map';
      default:
        return '';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white shadow-md px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">

        <button onClick={toggleSidebar}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Page Title */}
        <h1 className="text-xl font-semibold text-gray-800">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right Section (User) */}
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600 hidden sm:block">Welcome, Admin!</div>
        <div className="w-9 h-9 bg-gray-600 text-white flex items-center justify-center rounded-full font-semibold">
          <TbTool />
        </div>
      </div>
    </header>
  );
}
