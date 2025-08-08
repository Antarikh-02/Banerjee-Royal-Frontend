// src/pages/MenuPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoyalNavbar from './RoyalNavbar';
import RoyalFooter from './RoyalFooter';
// Import the PDF so Webpack will bundle it
import menuPdf from '../User/Royal_Menu.pdf';

const RoyalMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState([]);

  // Fetch all menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://banerjee-royal-backend.onrender.com/menu'
        );
        const allItems = response.data.menus || [];

        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(allItems.map(item => item.category))];
        setCategories(uniqueCategories);

        setMenuItems(allItems);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to load menu. Please try again later.');
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter items by category
  const filteredItems =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="font-serif bg-amber-50 text-gray-800 min-h-screen">
      <RoyalNavbar />

      {/* Hero Section */}
      <div className="relative py-24 sm:py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div
          className="bg-[url('https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/content12415.jpg')] bg-cover bg-center absolute inset-0"
          aria-hidden="true"
        ></div>

        <div className="relative z-20 text-center px-4 max-w-4xl mt-[120px]">
          <h1 className="text-3xl sm:text-5xl font-bold text-amber-100 mb-3 sm:mb-4 tracking-wider">
            Royal Menu
          </h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-5"></div>
          <p className="text-lg sm:text-xl text-amber-100 max-w-2xl mx-auto mb-6 sm:mb-8">
            Explore our exquisite collection of royal dishes crafted with centuries-old recipes
          </p>
          {/* Download link using imported PDF */}
          <a
            href={menuPdf}
            download="Royal_Menu.pdf"
            className="inline-block mt-2 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-medium"
          >
            Download PDF Menu
          </a>
        </div>
      </div>

      {/* Menu Content */}
      <section className="py-16 sm:py-20 px-2 sm:px-4 max-w-7xl mx-auto">
        {/* Category Filter */}
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-amber-900 mb-6 sm:mb-8">
            Culinary Treasures
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-sm sm:text-lg font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-amber-700 text-white shadow-md'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12 sm:py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-700 mb-4"></div>
            <p className="text-amber-800 text-lg">Loading royal delicacies...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 sm:py-16">
            <div className="bg-red-100 text-red-800 p-4 sm:p-6 rounded-xl max-w-md mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mx-auto mb-3 sm:mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-lg sm:text-xl">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 sm:mt-4 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg font-medium text-sm sm:text-base"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative h-40 sm:h-60 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="bg-amber-100 border-2 border-amber-200 rounded-xl w-full h-full flex flex-col items-center justify-center p-2 sm:p-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 sm:h-12 sm:w-12 text-amber-700 mb-1 sm:mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-amber-800 text-sm sm:text-base text-center">
                          No image available
                        </p>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 flex gap-1 sm:gap-2">
                      <div
                        className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                          item.vegType === 'Veg'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.vegType === 'Veg' ? '🥬 Veg' : '🍗 Non-Veg'}
                      </div>
                      <div className="bg-amber-700 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                        ₹{item.price}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-3">
                      {item.description || 'A royal delicacy crafted with premium ingredients'}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs sm:text-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 sm:py-16">
                <div className="bg-amber-100 p-4 sm:p-8 rounded-xl max-w-md mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto mb-3 sm:mb-4 text-amber-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-2">
                    No Items Found
                  </h3>
                  <p className="text-amber-800 text-sm sm:text-base">
                    We couldn't find any menu items in this category.
                  </p>
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="mt-3 sm:mt-4 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg font-medium text-sm sm:text-base"
                  >
                    View All Items
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Footer */}
      <RoyalFooter />
    </div>
  );
};

export default RoyalMenu;
