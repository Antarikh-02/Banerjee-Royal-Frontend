// src/pages/MyReservations.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoyalNavbar from './RoyalNavbar';
import RoyalFooter from './RoyalFooter';
import BottomNav from './BottomNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

export default function MyRoyalReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingActionId, setLoadingActionId] = useState(null);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState({});
//   const navigate = useNavigate();

  const BASE_URL = 'https://banerjee-royal-backend.onrender.com';
  const RESERVATION_PATH = '/reservation';

  // read stored user info
  const rawUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const localUser = rawUser ? (() => { try { return JSON.parse(rawUser); } catch { return null; } })() : null;
  const localUserId = localUser && (localUser._id || localUser.id || null);
  const localUserEmail = (localUser && localUser.email) || localStorage.getItem('userEmail') || null;

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    } catch { return iso; }
  };

  const filterByLocalUser = (items) => {
    if (!items || !Array.isArray(items)) return [];
    // If we have userId prefer it; else fall back to email
    if (localUserId) {
      return items.filter(it => {
        if (!it) return false;
        // reservation.user may be id string or populated object
        if (typeof it.user === 'string') return String(it.user) === String(localUserId);
        if (it.user && (it.user._id || it.user.id)) {
          return String(it.user._id || it.user.id) === String(localUserId);
        }
        // fallback to email match if user object missing
        if (localUserEmail && it.email && it.email.toLowerCase() === localUserEmail.toLowerCase()) return true;
        return false;
      });
    }
    if (localUserEmail) {
      return items.filter(it => {
        if (!it) return false;
        if (it.email && it.email.toLowerCase() === localUserEmail.toLowerCase()) return true;
        if (it.user && it.user.email && it.user.email.toLowerCase() === localUserEmail.toLowerCase()) return true;
        return false;
      });
    }
    // No local identifier — return empty (don't show others)
    return [];
  };

  const sortByDateAndSlot = (items) => {
    return (items || []).slice().sort((a, b) => {
      const da = new Date(a.date), db = new Date(b.date);
      if (da < db) return -1;
      if (da > db) return 1;
      return (a.timeSlot || '').localeCompare(b.timeSlot || '');
    });
  };

  const fetchReservations = async () => {
    setError('');
    setLoading(true);

    // 1) If we have userId call /reservation/user/:userId
    if (localUserId) {
      try {
        const url = `${BASE_URL}${RESERVATION_PATH}/user/${encodeURIComponent(localUserId)}`;
        const res = await axios.get(url);
        const items = res.data?.reservations ?? [];
        setReservations(sortByDateAndSlot(items));
        return;
      } catch (err) {
        // If 404 or other error, don't show all — try fallbacks but always filter
        console.warn('GET /reservation/user/:userId failed', err?.response?.status, err?.message);
        // continue to fallback below
      } finally {
        setLoading(false);
      }
    }

    // 2) Try GET /reservation and then filter by local user (defensive)
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}${RESERVATION_PATH}`);
      const items = res.data?.reservations ?? [];
      // IMPORTANT: always filter by local user (so we never show other users' reservations)
      const filtered = filterByLocalUser(items);
      setReservations(sortByDateAndSlot(filtered));
      return;
    } catch (err) {
      console.error('Final fallback GET /reservation failed', err);
      setError(err.response?.data?.message || 'No Reservations found ');
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
    const onAuthChange = () => fetchReservations();
    window.addEventListener('authChange', onAuthChange);
    return () => window.removeEventListener('authChange', onAuthChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;
    setLoadingActionId(id);
    try {
      await axios.patch(`${BASE_URL}${RESERVATION_PATH}/${id}`, { status: 'Cancelled' });
      toast.success('Reservation cancelled.');
      setReservations(prev => prev.map(r => r._id === id ? { ...r, status: 'Cancelled' } : r));
    } catch (err) {
      console.error('Cancel failed', err);
      toast.error(err.response?.data?.message || 'Failed to cancel reservation.');
    } finally {
      setLoadingActionId(null);
    }
  };

  return (
    <div className="font-serif bg-amber-50 text-gray-800 min-h-screen flex flex-col ">
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar toastClassName="bg-amber-100 text-amber-900 border border-amber-300" />
      <RoyalNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-16 mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900">My Reservations</h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto my-4"></div>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">Only reservations made by the current user are shown here.</p>
        </div>

        
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700 mb-4"></div>
            <p className="text-amber-800 text-lg">Loading your reservations...</p>
          </div>
        )}

        {error && (
          <div className="max-w-3xl mx-auto mb-6">
            <div className="p-4 rounded-lg bg-red-50 text-red-800 border border-red-100">
              <strong className="block">Log in</strong>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        {!loading && (!reservations || reservations.length === 0) && !error && (
          <div className="bg-white rounded-xl shadow p-8 text-center mx-auto max-w-3xl">
            <h3 className="text-xl font-semibold text-amber-900 mb-2">No reservations found</h3>
            <p className="text-amber-800 mb-6">You don't have any reservations yet.</p>
            <div className="flex justify-center gap-4">
              <a href="/#reservation" className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-lg font-semibold">Reserve a table</a>
              <button onClick={fetchReservations} className="bg-transparent border border-amber-700 text-amber-700 px-6 py-2 rounded-lg">Refresh</button>
            </div>
          </div>
        )}

        {!loading && reservations && reservations.length > 0 && (
          <div className="grid grid-cols-1 gap-6">
            {reservations.map(r => {
              const isCancelled = r.status === 'Cancelled';
              const isPending = r.status === 'Pending';
              const isConfirmed = r.status === 'Confirmed';
              const actionLoading = loadingActionId === r._id;
              return (
                <div key={r._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-2xl font-semibold text-amber-900">{r.name}</h3>
                          <div className="text-sm text-gray-600">{r.email}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Booked on</div>
                          <div className="font-medium text-amber-700">{formatDate(r.createdAt)}</div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <div className="text-xs text-gray-500">Date</div>
                          <div className="font-semibold text-amber-800">{formatDate(r.date)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Time Slot</div>
                          <div className="font-semibold text-amber-800">{r.timeSlot}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Guests</div>
                          <div className="font-semibold text-amber-800">{r.guests} {r.guests === 1 ? 'person' : 'people'}</div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isConfirmed ? 'bg-green-100 text-green-800' : isPending ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {r.status}
                        </span>
                        <span className="ml-3 text-xs text-gray-500">Reservation ID: {r._1d || r._id}</span>
                      </div>

                      {expanded[r._id] && (
                        <div className="mt-4 border-t pt-4 text-sm text-gray-700">
                          <p className="mb-2"><strong>Phone:</strong> {r.phone}</p>
                          <p className="mb-2"><strong>Special requests:</strong> {r.specialRequest || <span className="text-gray-400">None</span>}</p>
                          <p className="mb-0 text-xs text-gray-500">Last updated: {formatDate(r.updatedAt || r.createdAt)}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-stretch sm:items-end gap-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleToggleExpand(r._id)} className="px-4 py-2 bg-amber-50 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-100 transition">
                          {expanded[r._id] ? 'Hide details' : 'View details'}
                        </button>

                        <button onClick={() => handleCancel(r._id)} disabled={isCancelled || actionLoading} className={`px-4 py-2 rounded-lg font-semibold transition ${isCancelled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-amber-700 hover:bg-amber-800 text-white'}`}>
                          {actionLoading ? 'Processing...' : isCancelled ? 'Cancelled' : 'Cancel Reservation'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
      <RoyalFooter />
    </div>
  );
}
