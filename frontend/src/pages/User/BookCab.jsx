import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Unav';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import API_BASE_URL from '../../constants';
import Modal from '../../components/Modal';

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
      <div className="max-w-2xl mx-auto mt-12 p-6 bg-amber-50 rounded-2xl shadow-lg animate-fade-in">
        <div className="relative w-full bg-black h-2 rounded-full mb-6">
          <div
            className="bg-amber-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <h2 className="text-4xl font-bold text-amber-700 text-center mb-8">Book a Ride</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {[
            {
              title: 'Pickup Location',
              state: selectedPickupState,
              setState: (val) => handleStateChange(val, 'Pickup'),
              city: selectedPickupCity,
              setCity: (val) => handleCityChange(val, 'Pickup'),
              pincode: selectedPickupPincode
            },
            {
              title: 'Drop Location',
              state: selectedDropState,
              setState: (val) => handleStateChange(val, 'Drop'),
              city: selectedDropCity,
              setCity: (val) => handleCityChange(val, 'Drop'),
              pincode: selectedDropPincode
            }
          ].map((loc, i) => (
            <div key={i}>
              <h3 className="text-xl font-semibold text-amber-700 mb-2">{loc.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  className="p-2 border rounded-md w-full bg-white text-gray-700"
                  value={loc.state}
                  onChange={(e) => loc.setState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select
                  className="p-2 border rounded-md w-full bg-white text-gray-700"
                  value={loc.city}
                  onChange={(e) => loc.setCity(e.target.value)}
                >
                  <option value="">Select City</option>
                  {cities[loc.state]?.map((city) => (
                    <option
                      key={city.name}
                      value={city.name}
                      disabled={excludedCities.includes(city.name)}
                    >
                      {city.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="p-2 border rounded-md w-full bg-amber-100 text-gray-600"
                  readOnly
                  value={loc.pincode}
                />
              </div>
            </div>
          ))}

          {[
            { label: 'Pickup Date', type: 'date', value: pickupdate, setter: setPickupDate },
            { label: 'Pickup Time', type: 'time', value: pickuptime, setter: setPickupTime },
            { label: 'Drop Date', type: 'date', value: dropdate, setter: setDropDate },
            { label: 'Drop Time', type: 'time', value: droptime, setter: setDropTime }
          ].map((input, i) => (
            <div key={i}>
              <label className="text-amber-700 font-medium block mb-1">{input.label}</label>
              <input
                type={input.type}
                value={input.value}
                onChange={(e) => input.setter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700"
              />
            </div>
          ))}

          <div className="text-center">
            <button
              type="button"
              onClick={calculateFare}
              className="bg-amber-300 hover:bg-amber-400 text-black font-semibold py-2 px-6 rounded-md shadow"
            >
              Calculate Fare
            </button>
          </div>

          {fare !== null && (
            <p className="text-center text-2xl font-semibold text-amber-700">
              Fare: ₹{fare}
            </p>
          )}
          <div className="text-center">
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-10 rounded-md shadow"
            >
              Book Ride
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default BookCab;
