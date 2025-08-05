// src/Admin/AddMenu.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMenu = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Starter");
  const [vegType, setVegType] = useState("Veg");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name,
        description,
        price,
        image,
        category,
        vegType,
      };

      await axios.post("http://localhost:5000/menu/add", payload);
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setCategory("Starter");
      setVegType("Veg");

      navigate("/");
    } catch (err) {
      console.error("Error submitting menu item:", err.response?.data || err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Menu Item</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter item name"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            rows="3"
            placeholder="Enter item description"
            required
          ></textarea>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Enter image URL"
            required
          />
          {image && (
            <div className="mt-2">
              <img
                src={image}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
            </div>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            required
          >
            <option value="Starter">Starter</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>
        </div>

        {/* VegType */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Veg Type</label>
          <select
            value={vegType}
            onChange={(e) => setVegType(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            required
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Add Menu Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMenu;
