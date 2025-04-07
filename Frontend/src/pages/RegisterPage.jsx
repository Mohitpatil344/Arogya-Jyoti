import React, { useState } from 'react';
import API from '../services/api'; // Axios instance
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Optional: Basic frontend validation
    // if (!formData.email.includes('@') || formData.password.length < 6) {
    //   setError('Please enter a valid email and password (min 6 characters).');
    //   return;
    // }

    try {
      const response = await API.post('/auth/register', formData);
      alert('Registration Successful!');
      console.log('Registered User:', response.data);
      navigate('/login');
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full mb-4 px-3 py-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
