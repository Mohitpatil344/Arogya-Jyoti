import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import ProfileModal from "../Profile/ProfileModel";
const Navbar = ({ isLoggedIn, handleLogout, setIsProfileOpen }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <Link
        to="/"
        className="font-bold text-blue-600 text-xl flex items-center"
      >
        <span className="text-blue-700">Arogya</span>
        <span className="text-blue-500">Jyoti</span>
      </Link>

      <div className="relative">
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold transition"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaUserCircle className="text-xl" />
              <span>My Profile</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg border border-gray-200 z-50">
                <div className="px-4 py-3 text-sm text-gray-700 border-b font-medium">
                  {userEmail || "No email found"}
                </div>
                <button
                  onClick={() => {
                    setIsProfileOpen(true);
                    setShowDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
                <button
                onClick={() => {
                  navigate("/doctor-availability");
                  setShowDropdown(false); // optional: closes dropdown after navigation
                }}
                className="w-full text-left px-4 py-2 text-sm text-blue-500 hover:bg-gray-100"
              >
                Doctor Availability
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
