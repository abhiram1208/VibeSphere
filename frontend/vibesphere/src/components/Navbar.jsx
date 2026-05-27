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
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
          VibeSphere
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-violet-600 transition-colors">Home</Link>
          <Link to="/create" className="flex items-center gap-2 hover:text-violet-600 transition-colors">
            <PenSquare size={18} /> Create
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-red-600 text-white hover:bg-red-700 transition-all"
            >
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 transition-all"
            >
              <User size={18} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;