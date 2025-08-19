// src/Admin/ReservationView.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const DETAIL_KEYS = [
  'id',
  'name',
  'phone',
  'email',
  'date',
  'timeSlot',
  'guests',
  'specialRequest',
  'status'
];

const ReservationView = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Change BASE_URL if needed
  const BASE_URL = 'https://banerjee-royal-backend.onrender.com';
  const RESERVATION_PATH = '/reservation'; // backend path

  // Fetch reservations from backend (no auth)
  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}${RESERVATION_PATH}`);
      const data = res.data && res.data.reservations ? res.data.reservations : res.data;
      setReservations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      // Show a friendly message for the developer -- you can change this to a toast
      alert('Failed to fetch reservations. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Delete a reservation (hard-delete). If you prefer to keep history, change to PATCH status='Cancelled'
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) {
      return;
    }
    try {
      await axios.delete(`${BASE_URL}${RESERVATION_PATH}/${id}`);
      // update UI
      setReservations(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error('Error deleting reservation:', err);
      alert('Failed to cancel reservation. Check console for details.');
    }
  };

  // Prepare for edit
  const handleEditPrep = (r) => {
    // Clear old data
    DETAIL_KEYS.forEach((k) => localStorage.removeItem(k));
    // Store new
    localStorage.setItem('id', r._id);
    localStorage.setItem('name', r.name);
    localStorage.setItem('phone', r.phone);
    localStorage.setItem('email', r.email);
    localStorage.setItem('date', r.date ? new Date(r.date).toISOString().slice(0,10) : '');
    localStorage.setItem('timeSlot', r.timeSlot);
    localStorage.setItem('guests', r.guests);
    localStorage.setItem('specialRequest', r.specialRequest || '');
    localStorage.setItem('status', r.status);
    navigate('/editreservation');
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-6 px-4 mt-16">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Reservations</h1>
          <Link to="/reservation/add">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
              New Reservation
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Phone</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Account Owner</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Time Slot</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Guests</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Requests</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">Edit</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-500">Cancel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading && (
                <tr>
                  <td colSpan="11" className="px-4 py-6 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && reservations.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">{r.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{r.phone}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{r.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {r.user && typeof r.user === 'object' ? (r.user.name || r.user.email || '—') : '—'}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {r.date ? new Date(r.date).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">{r.timeSlot}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{r.guests}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{r.specialRequest || '—'}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`
                        px-2 py-1 rounded-full text-xs font-semibold
                        ${r.status === 'Confirmed' ? 'bg-green-100 text-green-800' : ''}
                        ${r.status === 'Pending'   ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${r.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''}
                      `}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleEditPrep(r)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}

              {!loading && reservations.length === 0 && (
                <tr>
                  <td colSpan="11" className="px-4 py-6 text-center text-gray-500">
                    No reservations found.
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

export default ReservationView;
