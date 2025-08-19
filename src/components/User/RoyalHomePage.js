// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoyalNavbar from './RoyalNavbar';
import RoyalFooter from './RoyalFooter';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import BottomNav from './BottomNav';

const RoyalHomePage = () => {
  const [featuredMenu, setFeaturedMenu] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reservationForm, setReservationForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: '18:00-20:00',
    guests: 2,
    specialRequest: ''
  });
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reservationError, setReservationError] = useState('');

  // Backend base URL (change if needed)
  const BASE_URL = 'https://banerjee-royal-backend.onrender.com';
  const RESERVATION_ADD_PATH = '/reservation/add'; // keep same as your original frontend expectation
  const MENU_PATH = '/menu';

  // Fetch featured menu items
  useEffect(() => {
    const fetchFeaturedMenu = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${MENU_PATH}`);
        const allItems = response.data.menus || [];

        // Filter to get featured items (could be based on category or other criteria)
        const featured = allItems
          .filter(item => ['Special Biryani', 'Biryani', 'Specialty'].includes(item.category))
          .slice(0, 4);

        setFeaturedMenu(featured);
      } catch (err) {
        console.error('Error fetching menu items:', err);
      } finally {
        setLoadingMenu(false);
      }
    };

    fetchFeaturedMenu();
  }, []);

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    // ensure guests becomes a number
    setReservationForm(prev => ({
      ...prev,
      [name]: name === 'guests' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  // client-side date validation: returns true if date is today or later
  const isDateValid = (dateStr) => {
    if (!dateStr) return false;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return false;
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    return d >= today;
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    setReservationError('');
    setReservationSuccess(false);

    // simple client-side validation
    const { name, phone, email, date, timeSlot, guests } = reservationForm;
    if (!name || !phone || !email || !date || !timeSlot || !guests) {
      setReservationError('Please fill all required fields.');
      return;
    }
    if (!isDateValid(date)) {
      setReservationError('Please select today or a future date.');
      return;
    }
    if (Number(guests) < 1) {
      setReservationError('Number of guests must be at least 1.');
      return;
    }

    setSubmitting(true);

    try {
      // Construct a robust ISO date from the selected local date (preserve local day)
      // This builds a date at local midnight and then sends the ISO string.
      const [y, m, d] = date.split('-').map(Number);
      const localDate = new Date(y, m - 1, d);
      const formattedDate = localDate.toISOString();

      const payload = {
        name: reservationForm.name.trim(),
        phone: reservationForm.phone.trim(),
        email: reservationForm.email.trim().toLowerCase(),
        date: formattedDate,
        timeSlot: reservationForm.timeSlot,
        guests: Number(reservationForm.guests),
        specialRequest: reservationForm.specialRequest ? reservationForm.specialRequest.trim() : undefined,
        status: 'Pending'
      };

      const response = await axios.post(`${BASE_URL}${RESERVATION_ADD_PATH}`, payload);

      if (response.status === 201 || response.status === 200) {
        setReservationSuccess(true);
        // Reset form
        setReservationForm({
          name: '',
          phone: '',
          email: '',
          date: '',
          timeSlot: '18:00-20:00',
          guests: 2,
          specialRequest: ''
        });
        // auto-clear success after a few seconds
        setTimeout(() => setReservationSuccess(false), 5000);
      } else {
        // unexpected but handle gracefully
        setReservationError('Unexpected server response. Please try again.');
      }
    } catch (err) {
      console.error('Reservation error:', err);
      const serverMessage = err.response?.data?.message || '';
      if (err.response?.status === 409 || /already/i.test(serverMessage)) {
        setReservationError('Selected slot already booked for this phone/date/time. Try a different slot.');
      } else if (serverMessage) {
        setReservationError(serverMessage);
      } else {
        setReservationError('Failed to make reservation. Please try again later.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="font-serif bg-amber-50 text-gray-800">
      <RoyalNavbar />
      <div id="Home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10">
          <div className="flex flex-col items-center justify-center relative z-20 text-white text-center mt-[10rem]">
            <img
              src={require('../Images/Banerjee Royals.png')}
              alt="Banerjee Royals interior"
              className="w-[250px] h-auto mb-4 rounded-full shadow-lg"
            />
          </div>
        </div>

        <div
          className="bg-cover bg-center absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')"
          }}
        ></div>

        <div className="relative z-20 text-center px-4 mt-32 lg:mt-0">
          <h1 className="text-5xl md:text-7xl font-bold text-amber-100 mb-4 tracking-wider">
            Banerjee Royals
          </h1>
          <div className="w-32 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto mb-8">
            Where Royal Heritage Meets Culinary Excellence
          </p>
          <button
            onClick={() => document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' })}
            className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-105"
          >
            Reserve Your Table
          </button>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">Our Royal Heritage</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-amber-600 transform rotate-3"></div>
              <img
                src="https://www.royalorchidhotels.com/images/dining/07_29_2020_03_29_25Indulge_1.jpg"
                alt="Banerjee Royals interior"
                className="relative z-10 w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="md:w-1/2">
            <h3 className="text-3xl font-semibold text-amber-800 mb-6">A Legacy of Culinary Excellence</h3>
            <p className="text-lg mb-4 leading-relaxed">
              Established in 2025, Banerjee Royals traces its origins to the royal kitchens of Bengal.
              Our ancestors served the Nawabs of Bengal, crafting exquisite dishes that blended local
              flavors with Persian influences.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              We serve authentic royal cuisine in an ambiance that reflects
              the grandeur of Bengal's aristocratic past. Each dish tells a story, each spice carries history,
              and every meal is a regal experience.
            </p>
            <div className="flex items-center space-x-4"></div>
          </div>
        </div>
      </section>

      {/* Special Menu Section */}
      <section id="menu" className="py-20 bg-amber-100 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Royal Specialties</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-amber-800 max-w-2xl mx-auto">
              Experience our signature dishes, crafted using recipes passed down through generations of royal chefs.
            </p>
          </div>

          {loadingMenu ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700 mb-4"></div>
              <p className="text-amber-800 text-lg">Loading our royal specialties...</p>
            </div>
          ) : (
            <>
              {/* Mobile Swiper */}
              <div className="block md:hidden">
                <Swiper spaceBetween={16} slidesPerView={1.2} className="h-[400px]">
                  {featuredMenu.map(item => (
                    <SwiperSlide key={item._id} className="h-full flex">
                      <div className="h-full w-full flex flex-col bg-white rounded-lg overflow-hidden shadow-lg transform transition">
                        {/* Image */}
                        <div className="relative h-40 flex-shrink-0 overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="bg-gray-200 flex items-center justify-center h-full">
                              <span className="text-gray-500">No image</span>
                            </div>
                          )}
                          <div className="absolute top-3 right-3 bg-amber-700 text-white px-2 py-1 rounded-full text-xs">
                            {item.vegType === 'Veg' ? '🥬 Veg' : '🍗 Non-Veg'}
                          </div>
                        </div>
                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-lg font-bold text-amber-900">{item.name}</h3>
                            <span className="text-base font-semibold text-amber-700">₹{item.price}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-5 flex-1">
                            {item.description}
                          </p>
                          <div className="text-xs text-amber-600">{item.category}</div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredMenu.map(item => (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 max-w-xs mx-auto"
                  >
                    {/* Image */}
                    <div className="relative h-40 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="bg-gray-200 flex items-center justify-center h-full">
                          <span className="text-gray-500">No image</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-amber-700 text-white px-2 py-1 rounded-full text-xs">
                        {item.vegType === 'Veg' ? '🥬 Veg' : '🍗 Non-Veg'}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-bold text-amber-900">{item.name}</h3>
                        <span className="text-base font-semibold text-amber-700">₹{item.price}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-5">
                        {item.description}
                      </p>
                      <div className="text-xs text-amber-600">{item.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* View Full Menu Button */}
          <div className="text-center mt-12">
            <a
              href="/royalmenu"
              className="inline-block bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300"
            >
              View Full Menu
            </a>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="py-20 px-4 max-w-6xl mx-auto ">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">Reserve Your Royal Experience</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto">
            Book your table for an unforgettable dining experience
          </p>
        </div>

        <div className="bg-amber-50 rounded-xl shadow-xl p-8 max-w-4xl mx-auto">
          {reservationSuccess && (
            <div className="mb-8 p-4 bg-green-100 text-green-800 rounded-lg text-center">
              <p className="font-bold text-lg">Reservation Successful!</p>
              <p>We've received your booking request and will confirm shortly.</p>
            </div>
          )}

          {reservationError && (
            <div className="mb-8 p-4 bg-red-100 text-red-800 rounded-lg text-center">
              <p className="font-bold">Reservation Error</p>
              <p>{reservationError}</p>
            </div>
          )}

          <form onSubmit={handleReservationSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-amber-800 font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={reservationForm.name}
                onChange={handleReservationChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Your full name"
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-amber-800 font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={reservationForm.phone}
                onChange={handleReservationChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Your phone number"
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-amber-800 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={reservationForm.email}
                onChange={handleReservationChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Your email address"
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-amber-800 font-medium mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={reservationForm.date}
                onChange={handleReservationChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                disabled={submitting}
                min={new Date().toISOString().slice(0, 10)}
              />
            </div>

            <div>
              <label className="block text-amber-800 font-medium mb-2">Time Slot</label>
              <select
                name="timeSlot"
                value={reservationForm.timeSlot}
                onChange={handleReservationChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                disabled={submitting}
              >
                <option value="11:00-13:00">11:00 AM - 1:00 PM</option>
                <option value="13:00-15:00">1:00 PM - 3:00 PM</option>
                <option value="18:00-20:00">6:00 PM - 8:00 PM</option>
                <option value="20:00-22:00">8:00 PM - 10:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-amber-800 font-medium mb-2">Number of Guests</label>
              <select
                name="guests"
                value={reservationForm.guests}
                onChange={handleReservationChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                disabled={submitting}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                ))}
                <option value={11}>More than 10 people</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-amber-800 font-medium mb-2">Special Requests</label>
              <textarea
                name="specialRequest"
                value={reservationForm.specialRequest}
                onChange={handleReservationChange}
                className="w-full px-4 py-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 h-32"
                placeholder="Any special requirements or celebrations?"
                disabled={submitting}
              ></textarea>
            </div>

            <div className="md:col-span-2 text-center mt-4">
              <button
                type="submit"
                disabled={submitting}
                className={`bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-lg text-lg font-semibold transition duration-300 w-full max-w-xs ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {submitting ? 'Booking...' : 'Book Your Table'}
              </button>
            </div>
          </form>
        </div>
      </section>

     <section className="py-20 bg-amber-100 px-4 ">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold text-amber-900 mb-4">Online Order</h2>
    <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
  </div>

  <div className="flex justify-center">
    <div className="relative w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
      {/* Status */}
      <div className="flex items-center gap-3 justify-center mb-6">
        
        <span className="text-sm text-amber-700">
          Online ordering currently disabled
        </span>
      </div>

      {/* Button with hover message above */}
      <div className="flex flex-col items-center gap-3 group relative">
        {/* Hover message ABOVE button */}
        <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-amber-700 text-white text-sm px-4 py-2 rounded-lg shadow-md">
          Online ordering is not available now
        </div>

        <button
          disabled
          className="bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold shadow disabled:opacity-70 disabled:cursor-not-allowed group-hover:brightness-95 transition"
        >
          Order Now
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-6 text-center">
        Call us to place an order or visit the restaurant.
      </p>
    </div>
  </div>
</section>


      <BottomNav />
      <RoyalFooter />
    </div>
  );
};

export default RoyalHomePage;
