// src/components/Navbar.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // your logout logic here
    console.log('Logging out…');
    // e.g. clear tokens, then:
    navigate('/login');
  };
  const Homepage = () => {
    // your logout logic here
    // e.g. clear tokens, then:
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md fixed top-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: Brand */}
          <div className="flex-shrink-0 flex items-center ml-[-145px]">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Banerjee’s Restaurant Admin
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              to="/menuview"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/reservationview"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Reservations
            </Link>
          </nav>

          {/* Right: Logout (desktop) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
             <button
              onClick={Homepage}
              className="text-gray-700 hover:text-red-600 transition-colors ml-4"
            >
              HomePage
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/menuview"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/reservation"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Reservations
            </Link>
            <button
              onClick={() => {
                setMobileOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          <div>
            
          </div>
          </div>
          
        </nav>
      )}
    </header>
  );
};

export default Navbar;
