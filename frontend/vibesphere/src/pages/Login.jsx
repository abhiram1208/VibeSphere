import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('https://vibesphere-1-ij68.onrender.com/api/auth/login', {
        email,
        password
      }, { withCredentials: true });

      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        alert('Login Successful!');
        navigate('/');
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="card p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-violet-600 text-white rounded-2xl font-semibold hover:bg-violet-700 transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6">
          Don't have an account? <Link to="/register" className="text-violet-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;