import React from "react";
import { Link } from "react-router-dom";

const RoyalFooter = () => {
  return (
    <footer className="bg-amber-900 text-amber-100 py-16 px-4 max-lg:hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-bold mb-4">Banerjee Royals</h3>
          <p className="mb-4">
            Preserving the royal culinary heritage of Bengal since 1947
          </p>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-200 hover:text-white"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-200 hover:text-white"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-200 hover:text-white"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Hours</h4>
          <ul className="space-y-2">
            <li>Monday - Friday: 11am - 10pm</li>
            <li>Saturday: 10am - 11pm</li>
            <li>Sunday: 10am - 9pm</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <address className="not-italic space-y-2">
            <p>12 Royal Avenue, Kolkata</p>
            <p>West Bengal, India</p>
            <p>Phone: +91 98765 43210</p>
            <p>Email: contact@banerjeeroys.com</p>
          </address>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/menu" className="hover:text-white transition">Menu</Link></li>
            <li><Link to="/reservations" className="hover:text-white transition">Reservations</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-amber-700 text-center">
        <p>&copy; {new Date().getFullYear()} Banerjee Royals. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default RoyalFooter;
