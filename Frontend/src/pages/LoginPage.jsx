import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// ✅ Correct baseURL (no double slash, and not endpoint-specific)
const API = axios.create({
  baseURL: 'http://localhost:5000/auth',
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('/login', formData);
      const data = res.data;

      if (data.success) {
        alert(data.message || 'Login Successful!');

        // ✅ Store token and user info securely
        localStorage.setItem('user', JSON.stringify({ email: formData.email }));
        localStorage.setItem('token', data.token); // ← using actual token

        navigate('/');
        navigate(0); // Refresh
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded bg-blue-50"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded bg-blue-50"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
