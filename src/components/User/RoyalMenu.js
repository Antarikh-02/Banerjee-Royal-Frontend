// src/pages/MenuPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoyalNavbar from './RoyalNavbar';
import RoyalFooter from './RoyalFooter';

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
        const response = await axios.get('https://banerjee-royal-backend.onrender.com/menu');
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
  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="font-serif bg-amber-50 text-gray-800 min-h-screen">
      <RoyalNavbar />
      
      {/* Hero Section */}
      <div className="relative py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="bg-[url('https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/content12415.jpg')] bg-cover bg-center absolute inset-0"></div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-100 mb-4 tracking-wider">
            Royal Menu
          </h1>
          <div className="w-32 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto mb-8">
            Explore our exquisite collection of royal dishes crafted with centuries-old recipes
          </p>
        </div>
      </div>

      {/* Menu Content */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        {/* Category Filter */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-amber-900 mb-8">Culinary Treasures</h2>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-lg font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-amber-700 text-white shadow-lg'
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
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-700 mb-6"></div>
            <p className="text-amber-800 text-xl">Loading royal delicacies...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="bg-red-100 text-red-800 p-6 rounded-xl max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-xl">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-lg font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div 
                  key={item._id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="relative h-60 overflow-hidden">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    ) : (
                      <div className="bg-amber-100 border-2 border-amber-200 rounded-xl w-full h-full flex flex-col items-center justify-center p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-700 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-amber-800 text-center">No image available</p>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.vegType === 'Veg' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.vegType === 'Veg' ? '🥬 Vegetarian' : '🍗 Non-Vegetarian'}
                      </div>
                      <div className="bg-amber-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                        ₹{item.price}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold text-amber-900">{item.name}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{item.description || "A royal delicacy crafted with premium ingredients"}</p>
                    
                    <div className="flex justify-between items-center mt-6">
                      <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </div>
                      
                      
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="bg-amber-100 p-8 rounded-xl max-w-md mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-amber-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">No Items Found</h3>
                  <p className="text-amber-800">We couldn't find any menu items in this category.</p>
                  <button 
                    onClick={() => setActiveCategory('All')}
                    className="mt-4 bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-lg font-medium"
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
     <RoyalFooter/>
    </div>
  );
};

export default RoyalMenu;