import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Anav from './Anav';
import {FaTrash} from "react-icons/fa"
import API_BASE_URL from '../../constants';

function Bookings() {
  const [cars, setCars] = useState([]);

 const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/getrides`,{
          headers: {
             Authorization: `Bearer ${token}`, 
      },
        });
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching tasks: ', error);
      }
    };
    fetchCars();
  }, []); 

  const getStatusAndColor = (car) => {
    const currentDate = new Date();
    const pickupDate = new Date(car.pickupdate);
    const dropDate = new Date(car.dropdate);

    if (currentDate < pickupDate) {
      return { status: 'Not Started', color: 'red' };
    } else if (currentDate >= pickupDate && currentDate <= dropDate) {
      return { status: 'On the Way', color: 'orange' };
    } else {
      return { status: 'Completed', color: 'green' };
    }
  };

  const deletecar = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/usercardelete/${taskId}`,{
         headers: {
        Authorization: `Bearer ${token}`, 
      },
      });
      alert('deleted');
      window.location.assign('/bookings'); 
    } catch (error) {
      console.error('Error deleting car: ', error);
      alert('Error deleting car. Please try again.');
    }
  };

  return (
  <div className="min-h-screen bg-amber-100">
  <Anav />

  <div className="p-4">
    <h1 className="mb-6 text-center text-3xl font-bold">My Booking</h1>

    <div className="flex flex-col gap-6 items-center">
      {cars.map((car) => {
        const { status, color } = getStatusAndColor(car);
        return (
          <Card
            key={car._id}
            className="w-[95%] bg-white shadow rounded-lg border px-6 py-4 flex justify-between items-center"
            style={{ borderColor: color }}
          >
            {/* LEFT SECTION - Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-sm md:text-base">
              <p><span className="font-semibold">Date:</span><br />{car.bookeddate}</p>
              <p><span className="font-semibold">Trip:</span><br />{car.selectedPickupCity} → {car.selectedDropCity}</p>
              <p><span className="font-semibold">Pickup:</span><br />{car.pickuptime}, {car.pickupdate}</p>
              <p><span className="font-semibold">Drop:</span><br />{car.droptime}, {car.dropdate}</p>
              <p><span className="font-semibold">Driver:</span><br />{car.drivername}</p>
              <p><span className="font-semibold">Car:</span><br />{car.carname} ({car.cartype})</p>
              <p><span className="font-semibold">Car No:</span><br />{car.carno}</p>
              <p><span className="font-semibold">Amount:</span><br />₹{car.fare}</p>
              <p><span className="font-semibold">Status:</span><br /><span style={{ color }}>{status}</span></p>
            </div>

            {/* RIGHT SECTION - Delete Button */}
            <button
              onClick={() => deletecar(car._id)}
              className="text-red-600 hover:text-red-800 text-xl ml-4"
              title="Delete"
            >
              <FaTrash />
            </button>
          </Card>
        );
      })}
    </div>
  </div>
</div>


  );
}

export default Bookings;