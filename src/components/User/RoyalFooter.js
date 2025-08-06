import React from "react";

const RoyalFooter = () => {
    return (
        <div>
        {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Banerjee Royals</h3>
            <p className="mb-4">
              Preserving the royal culinary heritage of Bengal since 1947
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-200 hover:text-white">
                <span className="sr-only">Facebook</span>
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-amber-200 hover:text-white">
                <span className="sr-only">Instagram</span>
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-amber-200 hover:text-white">
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <ul className="space-y-2">
              <li>Monday - Friday: 11am - 10pm</li>
              <li>Saturday: 10am - 11pm</li>
              <li>Sunday: 10am - 9pm</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic">
              <p className="mb-2">12 Royal Avenue, Kolkata</p>
              <p className="mb-2">West Bengal, India</p>
              <p className="mb-2">Phone: +91 98765 43210</p>
              <p>Email: contact@banerjeeroys.com</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Menu</a></li>
              <li><a href="#" className="hover:text-white transition">Reservations</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-amber-700 text-center">
          <p>&copy; {new Date().getFullYear()} Banerjee Royals. All rights reserved.</p>
        </div>
      </footer>
      </div>
    );
}
export default RoyalFooter;