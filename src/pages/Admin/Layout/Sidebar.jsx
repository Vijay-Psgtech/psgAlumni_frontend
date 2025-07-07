import { Home, User, MapPin, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';

const menuItems = [
  { label: 'Dashboard', icon: Home, path: '/admin/dashboard' },
  { label: 'Profile', icon: User, path: '/admin/profile' },
  { label: 'Alumni Map', icon: MapPin, path: '/admin/map' },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
    
    {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
        />
      )}
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-lg transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:z-10`}>
      <div>
        <div className="p-5 flex items-center gap-2 text-2xl font-bold text-blue-600">
          🎓 <span>Alumni Portal</span>
        </div>

        <nav className="mt-4 flex flex-col gap-2 px-4">
          {menuItems.map(({ label, icon: Icon, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={label}
                to={path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200
                ${active
                  ? 'bg-blue-100 text-blue-700 font-semibold shadow-inner'
                  : 'hover:bg-gray-100 text-gray-700'}`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-4 py-3">
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="flex items-center gap-3 text-red-600 hover:bg-red-50 px-4 py-2 w-full rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
    </>
  );
}
