// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RoyalNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Initial auth check on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const rawUser = localStorage.getItem('user');
        const user = rawUser ? JSON.parse(rawUser) : null;
        const token = localStorage.getItem('token');
        const authenticated = !!(token || user?.email);
        setIsAuthenticated(authenticated);
      } catch (e) {
        console.warn('Error reading auth info from localStorage', e);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Listen for auth changes and storage events (other tabs)
  useEffect(() => {
    const handleAuthChange = () => {
      try {
        const rawUser = localStorage.getItem('user');
        const user = rawUser ? JSON.parse(rawUser) : null;
        const token = localStorage.getItem('token');
        const authenticated = !!(token || user?.email);
        setIsAuthenticated(authenticated);
      } catch (e) {
        setIsAuthenticated(false);
      }
    };

    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

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
    setIsMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    // Clear the same keys set by login component
    localStorage.removeItem('user');
    localStorage.removeItem('usertype');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');

    // Notify other components (same tab)
    window.dispatchEvent(new Event('authChange'));

    // Close menu if open
    setIsMenuOpen(false);

    // Navigate to home (or login if you prefer)
    navigate('/', { replace: true });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-amber-900/95 shadow-xl py-2' : 'bg-amber-900/80 py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex flex-col items-center justify-center relative text-center mt-[3rem] ml-[-4.5rem]">
              <NavLink to="/">
                <img
                  src={require('../Images/Royal logo.png')}
                  alt="Banerjee Royals interior"
                  className="w-[180px] lg:w-[200px] h-auto mb-4"
                />
              </NavLink>
            </div>
            <NavLink to="/">
              <h1 className="max-lg:hidden text-xl font-bold text-[#eca427] mt-[0.1rem] ml-[-2.5rem]">
                BANERJEE ROYALS
              </h1>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <button
                onClick={() => document.getElementById('Home')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-amber-100 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-300"
              >
                Home
              </button>

              <Link to="/royalabout" className="text-amber-100 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-300">
                About
              </Link>

              <Link to="/royalmenu" className="text-amber-100 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-300">
                Menu
              </Link>

              <button
                onClick={() => navigate('/myroyalreservations')}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300"
              >
                My Reservation
              </button>

              {isAuthenticated ? (
                <StyledWrapper>
      <button className="Btn" onClick={handleLogout}>
        <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg></div>
        <div className="text">Logout</div>
      </button>
    </StyledWrapper>
              ) : (
                
                <StyledWrapper>
      <button className="Btn" onClick={() => navigate('/userlogin')}>
        <div className="sign"><svg viewBox="0 0 512 512"><path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" /></svg></div>
        <div className="text">Login</div>
      </button>
    </StyledWrapper>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-200 hover:text-white focus:outline-none"
              aria-expanded={isMenuOpen}
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
        className={`${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-amber-800 shadow-xl`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="text-amber-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Home
          </Link>
          <Link to="/about" className="text-amber-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            About
          </Link>
          <Link to="/royalmenu" className="text-amber-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Menu
          </Link>
          <Link to={'/myroyalreservations'}
          className="text-amber-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            My Reservations
          </Link>

          <div className="px-3">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white block px-3 py-2 rounded-md text-base font-medium text-center"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/userlogin"
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white block px-3 py-2 rounded-md text-base font-medium text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const StyledWrapper = styled.div`
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: #eca427;
  }

  /* plus sign */
  .sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sign svg {
    width: 17px;
  }

  .sign svg path {
    fill: white;
  }
  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 600;
    transition-duration: .3s;
  }
  /* hover effect on button width */
  .Btn:hover {
    width: 125px;
    border-radius: 40px;
    transition-duration: .3s;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
    padding-left: 20px;
  }
  /* hover effect button's text */
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 10px;
  }
  /* button click effect*/
  .Btn:active {
    transform: translate(2px ,2px);
  }`;

export default RoyalNavbar;
