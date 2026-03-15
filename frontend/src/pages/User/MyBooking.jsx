import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Unav';
import API_BASE_URL from '../../constants';
import Modal from '../../components/Modal';
import { FiMoreVertical, FiTrash2 } from 'react-icons/fi';

function Mybookings() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Modal state
  const [modal, setModal] = useState({ isOpen: false, type: 'info', title: '', message: '', onConfirm: null, onCancel: null, confirmText: 'OK', cancelText: 'Cancel' });
  
  // Dropdown state
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  const showModal = (config) => setModal({ isOpen: true, confirmText: 'OK', cancelText: 'Cancel', ...config });
  const closeModal = () => setModal((m) => ({ ...m, isOpen: false }));

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios
        .get(`${API_BASE_URL}/getrides/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setCars(response.data))
        .catch((error) => console.error('Error fetching tasks: ', error));
    }
  }, []);

  const handleCancel = (bookingId) => {
    showModal({
      type: 'confirm',
      title: 'Cancel Booking',
      message: 'Are you sure you want to cancel this booking? This action cannot be undone.',
      confirmText: 'Yes, Cancel',
      cancelText: 'Keep Booking',
      onCancel: closeModal,
      onConfirm: async () => {
        closeModal();
        try {
          await axios.delete(`${API_BASE_URL}/cancelride/${bookingId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCars((prev) => prev.filter((c) => c._id !== bookingId));
          showModal({
            type: 'success',
            title: 'Booking Cancelled',
            message: 'Your booking has been successfully cancelled.',
            onConfirm: closeModal,
          });
        } catch (error) {
          console.error('Error cancelling booking:', error);
          showModal({
            type: 'error',
            title: 'Cancellation Failed',
            message: 'Failed to cancel your booking. Please try again.',
            onConfirm: closeModal,
          });
        }
      },
    });
  };

  const handleRemoveHistory = (bookingId) => {
    setActiveMenu(null);
    showModal({
      type: 'confirm',
      title: 'Remove from History',
      message: 'Are you sure you want to permanently delete this booking from your history? This action cannot be undone.',
      confirmText: 'Yes, Remove',
      cancelText: 'Cancel',
      onCancel: closeModal,
      onConfirm: async () => {
        closeModal();
        try {
          await axios.delete(`${API_BASE_URL}/removehistory/${bookingId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCars((prev) => prev.filter((c) => c._id !== bookingId));
        } catch (error) {
          console.error('Error removing from history:', error);
          showModal({
            type: 'error',
            title: 'Action Failed',
            message: 'Failed to remove booking. Please try again.',
            onConfirm: closeModal,
          });
        }
      },
    });
  };

  const getStatusAndColor = (car) => {
    const currentDate = new Date();
    const pickupDate = new Date(car.pickupdate);
    const dropDate = new Date(car.dropdate);

    if (currentDate < pickupDate) return { status: 'Not Started', color: 'text-red-600 border-red-400' };
    if (currentDate >= pickupDate && currentDate <= dropDate) return { status: 'On the Way', color: 'text-orange-600 border-amber-400' };
    return { status: 'Completed', color: 'text-green-600 border-black' };
  };

  return (
    <div className="min-h-screen bg-amber-100">
      <Navbar />

      <Modal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
        onCancel={modal.onCancel}
        confirmText={modal.confirmText}
        cancelText={modal.cancelText}
      />

      <div className="px-6 py-8">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">My Bookings</h1>
        <div className="space-y-6">
          {cars.map((car) => {
            const { status, color } = getStatusAndColor(car);
            return (
              <div
                key={car._id}
                className={`w-full mx-auto bg-white border-l-8 ${color} rounded-xl shadow-md p-6 relative`}
              >
                {/* 3-Dots Menu */}
                <div className="absolute top-4 right-4 z-50">
                  <button
                    onClick={() => setActiveMenu(activeMenu === car._id ? null : car._id)}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors shadow-sm border border-gray-200"
                  >
                    <FiMoreVertical size={20} className="text-gray-800" />
                  </button>
                  {activeMenu === car._id && (
                    <div 
                      ref={menuRef}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 z-10 animate-fade-in"
                    >
                      <button
                        onClick={() => handleRemoveHistory(car._id)}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-medium flex items-center transition-colors rounded-lg"
                      >
                        <FiTrash2 size={16} className="mr-2" />
                        Remove from History
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm text-gray-700 pr-8">
                  <div>
                    <p className="font-semibold">Cab Booked Date</p>
                    <p>{car.bookeddate}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Trip</p>
                    <p>{car.selectedPickupCity} → {car.selectedDropCity}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Pickup</p>
                    <p>{car.pickuptime}, {car.pickupdate}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Drop</p>
                    <p>{car.droptime}, {car.dropdate}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Driver</p>
                    <p>{car.drivername}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Car</p>
                    <p>{car.carname}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Car Type</p>
                    <p>{car.cartype}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Car No</p>
                    <p>{car.carno}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Amount Paid</p>
                    <p>₹{car.fare}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Status</p>
                    <p className={`font-bold ${color}`}>{status}</p>
                  </div>
                </div>
                {status === 'Not Started' && (
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleCancel(car._id)}
                      className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors duration-200"
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          {cars.length === 0 && (
            <p className="text-center text-gray-500">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mybookings;
