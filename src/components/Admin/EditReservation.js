// src/Admin/EditReservation.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const EditReservation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: '',
    guests: '',
    specialRequest: '',
    status: 'Pending'
  });

  useEffect(() => {
    const stored = {
      id: localStorage.getItem('id') || '',
      name: localStorage.getItem('name') || '',
      phone: localStorage.getItem('phone') || '',
      email: localStorage.getItem('email') || '',
      date: localStorage.getItem('date') || '',
      timeSlot: localStorage.getItem('timeSlot') || '',
      guests: localStorage.getItem('guests') || '',
      specialRequest: localStorage.getItem('specialRequest') || '',
      status: localStorage.getItem('status') || 'Pending'
    };
    setFormData(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://banerjee-royal-backend.onrender.com/reservation/${formData.id}`,
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: formData.date,
          timeSlot: formData.timeSlot,
          guests: formData.guests,
          specialRequest: formData.specialRequest,
          status: formData.status
        }
      );
      // clear localStorage keys
      ['id','name','phone','email','date','timeSlot','guests','specialRequest','status']
        .forEach(k => localStorage.removeItem(k));
      // go back to list
      navigate('/reservationview');
    } catch (err) {
      console.error('Error updating reservation:', err);
      alert('Failed to update reservation. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-6 px-4 mt-16">
      <Navbar />
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Reservation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Time Slot</label>
            <input
              type="text"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
              placeholder="e.g. 7:00 PM"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="1"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Special Request */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Special Request</label>
            <textarea
              name="specialRequest"
              value={formData.specialRequest}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/reservationview')}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReservation;
