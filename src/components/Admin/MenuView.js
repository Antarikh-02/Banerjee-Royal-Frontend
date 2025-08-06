// src/Admin/MenuView.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const DETAIL_KEYS = [
  'id',
  'name',
  'description',
  'price',
  'image',
  'category',
  'vegType'
];

const MenuView = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // Fetch all menu items
  const fetchData = async () => {
    try {
      const res = await axios.get('https://banerjee-royal-backend.onrender.com/menu');
      setItems(res.data.menus || []);
    } catch (err) {
      console.error('Error fetching menu items:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Prepare for edit
  const handleEditPrep = item => {
    // clear old keys
    DETAIL_KEYS.forEach(k => localStorage.removeItem(k));
    // set new
    localStorage.setItem('id', item._id);
    localStorage.setItem('name', item.name);
    localStorage.setItem('description', item.description);
    localStorage.setItem('price', item.price);
    localStorage.setItem('image', item.image);
    localStorage.setItem('category', item.category);
    localStorage.setItem('vegType', item.vegType);
    navigate('/editmenu');
  };

  // Delete an item
  const handleDelete = async id => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      await axios.delete(`https://banerjee-royal-backend.onrender.com/${id}`);
      fetchData();
    } catch (err) {
      console.error('Error deleting menu item:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-16">
       <Navbar />

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          
          <Link to="/addmenu">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add Menu Item
            </button>
          </Link>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">VegType</th>
                <th className="px-4 py-2 text-center">Update</th>
                <th className="px-4 py-2 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">₹{item.price}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.vegType}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleEditPrep(item)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-4 text-gray-500"
                  >
                    No menu items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenuView;
