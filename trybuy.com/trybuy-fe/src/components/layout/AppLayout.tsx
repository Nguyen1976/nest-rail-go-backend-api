
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Compass, Tv, Keyboard, Mouse, Headphones, LogOut } from 'lucide-react';

export const MainSidebar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const categories = [
    { name: 'Monitors', icon: <Tv size={20}/>, link: '/c/monitors' },
    { name: 'Keyboards', icon: <Keyboard size={20}/>, link: '/c/keyboards' },
    { name: 'Mice', icon: <Mouse size={20}/>, link: '/c/mice' },
    { name: 'Headphones', icon: <Headphones size={20}/>, link: '/c/headphones' }
  ];

  return (
    <aside className="w-60 bg-gray-900 text-gray-300 p-4 flex-col hidden lg:flex sticky top-0 h-screen">
      <nav className="flex flex-col gap-1 text-sm">
        <Link to="/" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 font-semibold">
          <Home size={20} /> Home
        </Link>
        <a href="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 font-semibold">
          <Compass size={20} /> Popular
        </a>
      </nav>
      <div className="border-t border-gray-700 my-4"></div>
      <h3 className="text-xs font-bold text-gray-500 uppercase px-2 mb-2">Categories</h3>
      <nav className="flex flex-col gap-1 text-sm">
        {categories.map(cat => (
          <a key={cat.name} href={cat.link} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700">
            {cat.icon} {cat.name}
          </a>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <img src={user?.avatar} alt={user?.name} className="w-9 h-9 rounded-full" />
            <div className="flex-1 overflow-hidden">
              <p className="font-semibold text-sm text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">@{user?.username}</p>
            </div>
            <button onClick={logout} className="p-2 text-gray-400 hover:bg-gray-700 rounded-md" title="Đăng xuất">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-full text-sm">
            Đăng nhập
          </button>
        )}
      </div>
    </aside>
  );
}

export const CategoryInfoSidebar = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <aside className="w-80 p-4 flex-col hidden xl:flex sticky top-0 h-screen">
       <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="bg-indigo-500 h-16"></div>
          <div className="p-4">
            <h2 className="text-lg font-bold text-white">c/Monitors</h2>
            <p className="text-sm text-gray-400 mt-2">
              Community for everything related to monitors. From 4K productivity screens to high-refresh rate gaming displays.
            </p>
            <div className="flex gap-8 mt-4 border-t border-gray-700 pt-4">
              <div>
                <p className="text-lg font-bold text-white">1.2k</p>
                <p className="text-xs text-gray-400">Reviews</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white">4.8k</p>
                <p className="text-xs text-gray-400">Members</p>
              </div>
            </div>
            {isLoggedIn && (
              <Link
                to="/create"
                className="block mt-4 w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-full text-sm"
              >
                Write a Review
              </Link>
            )}
          </div>
       </div>
    </aside>
  );
}