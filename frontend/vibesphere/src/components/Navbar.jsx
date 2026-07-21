import { Link, useNavigate } from 'react-router-dom';
import { User, PenSquare, LogOut } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent"
        >
          VibeSphere
        </Link>

        {/* User */}
        <p className="text-sm sm:text-lg font-medium">
          Hello, {user ? JSON.parse(user).name : 'Guest'}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm">
          <Link to="/" className="hover:text-violet-600 transition">
            Home
          </Link>

          <Link
            to="/create"
            className="flex items-center gap-1 hover:text-violet-600 transition"
          >
            <PenSquare size={16} /> Create
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-2 sm:px-4 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700"
            >
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 px-3 py-2 sm:px-4 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
            >
              <User size={16} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;