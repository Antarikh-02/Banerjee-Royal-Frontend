// src/components/MobileBottomNav.jsx
import React from 'react';
import { FaHome, FaUtensils, FaCalendarAlt } from 'react-icons/fa';

const navItems = [
  { id: 'Home', label: 'Home', icon: <FaHome /> },
  { id: 'menu', label: 'Menu', icon: <FaUtensils /> },
  { id: 'reservation', label: 'Reserve', icon: <FaCalendarAlt /> },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-100 border-t border-amber-200 shadow-inner z-50 md:hidden">
      <ul className="flex justify-around">
        {navItems.map(item => (
          <li key={item.id} className="w-full">
            <button
              onClick={() =>
                document
                  .getElementById(item.id)
                  .scrollIntoView({ behavior: 'smooth' })
              }
              className="w-full flex flex-col items-center py-2 text-amber-700 hover:text-amber-900 transition"
            >
              <div className="text-2xl">{item.icon}</div>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
