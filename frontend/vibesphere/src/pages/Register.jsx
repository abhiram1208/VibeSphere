import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('https://vibesphere-1-ij68.onrender.com/api/auth/register', formData);

      if (res.data.success) {
        alert('Registration Successful! Please Login.');
        navigate('/login');
      }
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="card p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />

          <textarea
            name="bio"
            placeholder="Short Bio (optional)"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500 h-24"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-semibold transition-all disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account? <Link to="/login" className="text-violet-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;