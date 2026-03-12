import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Unav';

function Mybookings() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios
        .get(`http://localhost:8000/getrides/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setCars(response.data))
        .catch((error) => console.error('Error fetching tasks: ', error));
    } else {
      console.log('ERROR');
    }
  }, []);

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
      <div className="px-6 py-8">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">My Bookings</h1>
        <div className="space-y-6">
          {cars.map((car) => {
            const { status, color } = getStatusAndColor(car);
            return (
              <div
                key={car._id}
                className={`w-full mx-auto bg-white border-l-8 ${color} rounded-xl shadow-md p-6`}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm text-gray-700">
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
