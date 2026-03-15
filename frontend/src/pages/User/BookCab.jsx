import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Unav';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import API_BASE_URL from '../../constants';
import Modal from '../../components/Modal';
import { FiMapPin, FiCalendar, FiClock, FiCheckCircle, FiChevronRight, FiNavigation, FiTag } from 'react-icons/fi';

const BookCab = () => {
  const [selectedPickupState, setSelectedPickupState] = useState('');
  const [selectedPickupCity, setSelectedPickupCity] = useState('');
  const [selectedPickupPincode, setSelectedPickupPincode] = useState('');
  const [selectedDropState, setSelectedDropState] = useState('');
  const [selectedDropCity, setSelectedDropCity] = useState('');
  const [selectedDropPincode, setSelectedDropPincode] = useState('');
  const [pickupdate, setPickupDate] = useState('');
  const [pickuptime, setPickupTime] = useState('');
  const [dropdate, setDropDate] = useState('');
  const [droptime, setDropTime] = useState('');
  const [excludedCities, setExcludedCities] = useState([]);
  const [fare, setFare] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  // Modal state
  const [modal, setModal] = useState({ isOpen: false, type: 'info', title: '', message: '', onConfirm: null });
  const showModal = (config) => setModal({ isOpen: true, confirmText: 'OK', ...config });
  const closeModal = () => setModal((m) => ({ ...m, isOpen: false }));

  const { id } = useParams();
  const navigate = useNavigate();

  const states = ['Delhi', 'Maharashtra', 'Tamil Nadu', 'Karnataka'];

  const cities = {
    Delhi: [
      { name: 'New Delhi', pincode: '110001' },
      { name: 'Gurgaon', pincode: '122001' },
      { name: 'Noida', pincode: '201301' },
    ],
    Maharashtra: [
      { name: 'Mumbai', pincode: '400001' },
      { name: 'Pune', pincode: '411001' },
      { name: 'Nagpur', pincode: '440001' },
    ],
    'Tamil Nadu': [
      { name: 'Chennai', pincode: '600001' },
      { name: 'Coimbatore', pincode: '641001' },
      { name: 'Madurai', pincode: '625001' },
    ],
    Karnataka: [
      { name: 'Bangalore', pincode: '560001' },
      { name: 'Mysore', pincode: '570001' },
      { name: 'Hubli', pincode: '580001' },
    ],
  };

  const pricingRules = {
    'Noida-Pune': 2000,
    'Pune-Noida': 2000,
    'Delhi-Mumbai': 2500,
    'Mumbai-Delhi': 2500,
    'New Delhi-Mumbai': 2200,
    'Mumbai-New Delhi': 2200,
    'Chennai-Bangalore': 3400,
    'Bangalore-Chennai': 3400,
    'New Delhi-Noida': 600,
    'Noida-New Delhi': 600,
    'Gurgaon-New Delhi': 400,
    'New Delhi-Gurgaon': 400,
    'Mumbai-Pune': 700,
    'Pune-Mumbai': 700,
    'Nagpur-Mumbai': 1200,
    'Mumbai-Nagpur': 1200,
    'Pune-Nagpur': 1200,
    'Nagpur-Pune': 1200,
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/car/${id}`)
      .then((resp) => {
        setCars(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch car details.');
        setLoading(false);
      });
  }, [id]);

  const handleStateChange = (state, type) => {
    if (type === 'Pickup') {
      setSelectedPickupState(state);
      setSelectedPickupCity('');
      setSelectedPickupPincode('');
      setExcludedCities([]);
    } else {
      setSelectedDropState(state);
      setSelectedDropCity('');
      setSelectedDropPincode('');
    }
  };

  const handleCityChange = (city, type) => {
    const state = type === 'Pickup' ? selectedPickupState : selectedDropState;
    const pincode = cities[state].find(c => c.name === city)?.pincode || '';
    if (type === 'Pickup') {
      setSelectedPickupCity(city);
      setSelectedPickupPincode(pincode);
      setExcludedCities([selectedDropCity]);
    } else {
      setSelectedDropCity(city);
      setSelectedDropPincode(pincode);
      setExcludedCities([selectedPickupCity]);
    }
  };

  const calculateFare = () => {
    const route = `${selectedPickupCity}-${selectedDropCity}`;
    const cost = pricingRules[route];
    if (cost) {
      setFare(cost);
      setProgress(66);
    } else {
      showModal({
        type: 'error',
        title: 'Route Unavailable',
        message: 'Pricing information is not available for the selected route. Please choose a different pickup or drop city.',
        onConfirm: closeModal,
      });
      setFare(null);
    }
  };

  const handleSubmit = (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    setProgress(100);
    const user = JSON.parse(localStorage.getItem('user'));
    const data = {
      selectedPickupState, selectedPickupCity, selectedPickupPincode,
      selectedDropState, selectedDropCity, selectedDropPincode,
      pickupdate, pickuptime, dropdate, droptime,
      userId: user.id, userName: user.name,
      ...cars[0], fare
    };

    axios.post(
      `${API_BASE_URL}/rides`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => {
        showModal({
          type: 'success',
          title: '🎉 Cab Booked!',
          message: 'Your cab has been booked successfully. You can track it in My Bookings.',
          confirmText: 'View Bookings',
          onConfirm: () => { closeModal(); navigate('/mybookings'); },
        });
      })
      .catch(() => {
        showModal({
          type: 'error',
          title: 'Booking Failed',
          message: 'We could not complete your booking. Please try again.',
          onConfirm: closeModal,
        });
      });
  };

  return (
    <div className="bg-amber-100 min-h-screen font-sans">
      <Navbar />

      <Modal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
        confirmText={modal.confirmText}
      />
      <div className="max-w-4xl mx-auto mt-12 mb-20 p-8 md:p-12 bg-white/70 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-white relative z-10 overflow-hidden">
        {/* Decorative Top Glow */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-amber-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-30"></div>

        <div className="relative z-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-900 tracking-tight">Reserve Your Car</h2>
            <div className="w-1/3 bg-gray-200 h-2 md:h-3 rounded-full overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-700 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          {error && <p className="text-red-500 bg-red-50 p-4 rounded-xl text-center mb-6 font-semibold border border-red-100 shadow-sm">{error}</p>}

          <form className="space-y-10" onSubmit={handleSubmit}>
            {/* Location section - Premium Card */}
            <div className="bg-white/90 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative group transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm group-hover:scale-110 transition-transform">
                  <FiMapPin size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 tracking-tight">Trip Route</h3>
              </div>
              
              <div className="relative space-y-8">
                {/* Connecting Line */}
                <div className="hidden md:block absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-amber-300 to-amber-500 -z-10"></div>

                {[
                  {
                    title: 'Pick-Up',
                    state: selectedPickupState,
                    setState: (val) => handleStateChange(val, 'Pickup'),
                    city: selectedPickupCity,
                    setCity: (val) => handleCityChange(val, 'Pickup'),
                    pincode: selectedPickupPincode,
                    icon: <div className="w-4 h-4 rounded-full bg-white border-4 border-amber-400 shadow-sm"></div>
                  },
                  {
                    title: 'Drop-Off',
                    state: selectedDropState,
                    setState: (val) => handleStateChange(val, 'Drop'),
                    city: selectedDropCity,
                    setCity: (val) => handleCityChange(val, 'Drop'),
                    pincode: selectedDropPincode,
                    icon: <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-sm shadow-amber-200"></div>
                  }
                ].map((loc, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="md:w-1/4 flex items-center gap-4">
                      <div className="hidden md:flex w-12 justify-center z-10">{loc.icon}</div>
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{loc.title}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-3/4">
                      <select
                        className="appearance-none p-4 rounded-xl w-full bg-gray-50 text-gray-800 font-medium border border-gray-200 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all shadow-sm focus:shadow-md cursor-pointer"
                        value={loc.state}
                        onChange={(e) => loc.setState(e.target.value)}
                      >
                        <option value="" className="text-gray-400">Select State</option>
                        {states.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      
                      <select
                        className="appearance-none p-4 rounded-xl w-full bg-gray-50 text-gray-800 font-medium border border-gray-200 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all shadow-sm focus:shadow-md cursor-pointer disabled:bg-gray-100 disabled:opacity-50"
                        value={loc.city}
                        onChange={(e) => loc.setCity(e.target.value)}
                        disabled={!loc.state}
                      >
                        <option value="" className="text-gray-400">Select City</option>
                        {cities[loc.state]?.map((city) => (
                          <option key={city.name} value={city.name} disabled={excludedCities.includes(city.name)}>
                            {city.name}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        className="p-4 rounded-xl w-full bg-gray-100 text-gray-500 font-medium border border-transparent shadow-inner cursor-not-allowed"
                        readOnly
                        placeholder="Pincode"
                        value={loc.pincode}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule section - Premium Card */}
            <div className="bg-white/90 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm">
                  <FiClock size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 tracking-tight">Schedule Timing</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { label: 'Pick-Up Date', type: 'date', value: pickupdate, setter: setPickupDate, icon: FiCalendar },
                  { label: 'Pick-Up Time', type: 'time', value: pickuptime, setter: setPickupTime, icon: FiClock },
                  { label: 'Drop-Off Date', type: 'date', value: dropdate, setter: setDropDate, icon: FiCalendar },
                  { label: 'Drop-Off Time', type: 'time', value: droptime, setter: setDropTime, icon: FiClock }
                ].map((input, i) => (
                  <div key={i} className="group relative">
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{input.label}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                        <input.icon size={18} />
                      </div>
                      <input
                        type={input.type}
                        value={input.value}
                        onChange={(e) => input.setter(e.target.value)}
                        className="pl-11 pr-4 py-4 w-full rounded-xl bg-gray-50 text-gray-800 font-medium border border-gray-200 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions & Fare */}
            <div className="pt-6 flex flex-col items-center gap-8">
              {!fare && (
                <button
                  type="button"
                  onClick={calculateFare}
                  className="group relative inline-flex items-center justify-center px-10 py-4 bg-white text-amber-700 font-bold tracking-wide rounded-2xl border border-gray-200 shadow-sm hover:border-amber-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <FiTag className="mr-3 text-amber-500 group-hover:scale-110 transition-transform" size={20} />
                  <span>Get Estimated Fare</span>
                </button>
              )}

              {fare !== null && (
                <div className="w-full max-w-md mx-auto relative animate-fade-in group">
                  <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 opacity-30 group-hover:opacity-50 blur-lg transition duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-xl flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all transform translate-x-10 -translate-y-10"></div>
                    <span className="text-xs font-black text-amber-800/60 uppercase tracking-[0.2em] mb-3">Total Estimated Fare</span>
                    <div className="flex items-start">
                      <span className="text-3xl text-amber-500 font-bold mt-2 mr-2">₹</span>
                      <span className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-800 to-gray-900 tracking-tighter">{fare}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full sm:w-2/3 md:w-1/2 group relative inline-flex items-center justify-center overflow-hidden rounded-2xl p-4 px-12 font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl active:scale-95 bg-gradient-to-br from-amber-500 to-orange-600"
              >
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                  <div className="relative h-full w-8 bg-white/30"></div>
                </div>
                <span className="relative z-10 text-xl tracking-wide flex items-center gap-3">
                  Confirm Booking <FiNavigation size={22} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default BookCab;
