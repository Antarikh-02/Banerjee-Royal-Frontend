// src/components/UserLogin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserLogin() {
  const [toggleSignUp, setToggleSignUp] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem('user');
      const user = rawUser ? JSON.parse(rawUser) : null;
      if (user?.email && location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    } catch (e) {
      console.warn('Error reading user from localStorage', e);
    }
  }, []);

  const handleToggle = () => setToggleSignUp(prev => !prev);

  const handleLoginSubmit = async e => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error('Please fill in all login fields.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/userlogin', {
        email: loginEmail,
        password: loginPassword,
      });
      const { status, data } = response;
      if (status === 201 || (status >= 200 && status < 300)) {
        const user = data.user ?? data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('usertype', 'user');
        localStorage.setItem('userEmail', user.email ?? loginEmail);
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        window.dispatchEvent(new Event('authChange'));
        const redirectTo = localStorage.getItem('redirectTo');
        if (redirectTo) {
          navigate(redirectTo, { replace: true });
          localStorage.removeItem('redirectTo');
        } else {
          navigate('/', { replace: true });
        }
      } else {
        toast.error('Invalid email or password.');
      }
    } catch (err) {
      console.error('Login error', err);
      if (err.response?.status === 401) {
        toast.error('Invalid email or password.');
      } else {
        toast.error(err.response?.data?.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async e => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) {
      toast.error('Please fill in all signup fields.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/userssignup', {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success('Sign up successful!');
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
        setTimeout(() => setToggleSignUp(false), 300);
      } else {
        toast.error('Sign up failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error', err);
      if (err.response?.status === 409) {
        toast.error('User exists already, please login instead.');
      } else {
        toast.error(err.response?.data?.message || 'Sign up failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 font-serif flex flex-col items-center justify-center p-4">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar toastClassName="bg-amber-100 text-amber-900 border border-amber-300" />
      
      <div className="w-full max-w-md mb-10 flex justify-center">
        <div className="bg-gradient-to-br from-amber-700 to-amber-900 p-4 rounded-full border-4 border-amber-500/50 shadow-xl">
          <img 
            src={require('../Images/Banerjee Royals.png')}
            alt="Banerjee Royals Logo" 
            className="w-32 h-32 object-contain"
          />
        </div>
      </div>
      
      <div className="w-full max-w-lg bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-2xl border border-amber-300 overflow-hidden">
        {/* Royal Toggle */}
        <div className="flex bg-amber-900">
          <button 
            onClick={() => setToggleSignUp(false)}
            className={`flex-1 py-5 text-center text-xl font-bold transition-all duration-300 ${!toggleSignUp ? 'bg-amber-700 text-amber-50' : 'bg-amber-900/50 text-amber-200 hover:bg-amber-800'}`}
          >
            Log in
          </button>
          <button 
            onClick={() => setToggleSignUp(true)}
            className={`flex-1 py-5 text-center text-xl font-bold transition-all duration-300 ${toggleSignUp ? 'bg-amber-700 text-amber-50' : 'bg-amber-900/50 text-amber-200 hover:bg-amber-800'}`}
          >
            Sign up
          </button>
        </div>
        
        {/* Login Form */}
        {!toggleSignUp && (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">Royal Login</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block text-amber-800 font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Your royal email"
                  className="w-full px-4 py-3 rounded-lg border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  autoComplete="username"
                />
              </div>
              
              <div>
                <label className="block text-amber-800 font-medium mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Your royal password"
                  className="w-full px-4 py-3 rounded-lg border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white py-4 rounded-lg text-xl font-semibold transition duration-300 shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Accessing Royalty...
                    </div>
                  ) : "Enter the Palace"}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Signup Form */}
        {toggleSignUp && (
          <div className="p-8">
            <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">Royal Registration</h2>
            <form onSubmit={handleSignupSubmit} className="space-y-6">
              <div>
                <label className="block text-amber-800 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your royal name"
                  className="w-full px-4 py-3 rounded-lg border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              
              <div>
                <label className="block text-amber-800 font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Your royal email"
                  className="w-full px-4 py-3 rounded-lg border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              
              <div>
                <label className="block text-amber-800 font-medium mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Create royal password"
                  className="w-full px-4 py-3 rounded-lg border border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white py-4 rounded-lg text-xl font-semibold transition duration-300 shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Joining Royalty...
                    </div>
                  ) : "Become Royalty"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      
      <div className="mt-12 text-center text-amber-800 max-w-md">
        <p className="text-lg">
          "Experience the regal dining journey reserved for our esteemed guests"
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto my-4"></div>
        <p className="text-sm">
          By accessing our royal services, you agree to our terms of nobility and privacy decree
        </p>
      </div>
    </div>
  );
}