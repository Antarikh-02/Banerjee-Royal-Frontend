// src/Admin/EditMenu.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const EditMenu = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [vegType, setVegType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem('id') || '');
    setName(localStorage.getItem('name') || '');
    setDescription(localStorage.getItem('description') || '');
    setPrice(localStorage.getItem('price') || '');
    setImage(localStorage.getItem('image') || '');
    setCategory(localStorage.getItem('category') || '');
    setVegType(localStorage.getItem('vegType') || '');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://banerjee-royal-backend.onrender.com/menu/${id}`, {
        name,
        description,
        price,
        image,
        category,
        vegType
      });
      navigate('/');
    } catch (err) {
      console.error('Error updating menu item:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Edit Menu Item</h2>

        <div>
          <label className="block mb-1 font-medium">Item Name</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border px-4 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Price (₹)</label>
          <input
            type="number"
            className="w-full border px-4 py-2 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          {image && (
            <img src={image} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded" />
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            className="w-full border px-4 py-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Starter">Starter</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Veg Type</label>
          <select
            className="w-full border px-4 py-2 rounded"
            value={vegType}
            onChange={(e) => setVegType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Update
          </button>
          <Link to="/">
            <button
              type="button"
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
            >
              Home
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditMenu;
