import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <Link to="/" className="font-bold text-blue-600 text-xl">
        ArogyaJyoti
      </Link>

      <div className="relative">
        {isLoggedIn ? (
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold transition"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaUserCircle className="text-xl" />
              My Profile
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg border border-gray-200 z-50">
                <div className="px-4 py-3 text-sm text-gray-700 border-b font-medium">
                  {userEmail || "vedang@gmail.com"}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-100 transition font-medium"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
