// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const RoyalNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-amber-900/95 shadow-xl py-2' : 'bg-amber-900/80 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
           <div className='flex flex-col items-center justify-center relative text-center mt-[3rem] ml-[-4.5rem] '>
            <img 
                src={require('../Images/Royal logo.png')}
                alt="Banerjee Royals interior" 
                className="w-[180px] lg:w-[200px] h-auto mb-4 "
              />
            
            </div>
            <h1 className="max-lg:hidden text-xl font-bold text-[#eca427] mt-[0.1rem] ml-[-2.5rem]">BANERJEE ROYALS</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-amber-100 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-300"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-amber-100 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-300"
              >
                About
              </Link>
              <Link 
                onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
                className="text-amber-100 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-300"
              >
                Menu
              </Link>
              <Link 
                onClick={() => document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' })}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300"
              >
                Reserve
              </Link>
              <Link 
                to="/royalreservation" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300"
              >
                My Reservations
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-200 hover:text-white focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} 
        md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-amber-800 shadow-xl`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/" 
            className="text-amber-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-amber-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link 
            to="/menu" 
            className="text-amber-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Menu
          </Link>
          <Link 
            to="/reservation" 
            className="bg-amber-600 hover:bg-amber-700 text-white block px-3 py-2 rounded-md text-base font-medium text-center mx-4 my-2"
          >
            Reserve Table
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default RoyalNavbar;