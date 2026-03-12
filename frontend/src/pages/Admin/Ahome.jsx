import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Anav from './Anav';
import API_BASE_URL from '../../constants';

function Ahome() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    axios.get(`${API_BASE_URL}/getusers`,{
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users: ', error));

    axios.get(`${API_BASE_URL}/getrides`,{
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((response) => setBookings(response.data))
      .catch((error) => console.error('Error fetching bookings: ', error));

    axios.get(`${API_BASE_URL}/cars`,{
       headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((response) => setCars(response.data))
      .catch((error) => console.error('Error fetching cars: ', error));
  }, []);

  const totalUsers = users.length;
  const totalCars = cars.length;
  const totalBookings = bookings.length;

  const data = [
    { name: 'Users', value: totalUsers },
    { name: 'Cabs', value: totalCars },
    { name: 'Bookings', value: totalBookings },
  ];

  return (
    <div className="min-h-screen bg-amber-100">
      <Anav />
      <h3 className="text-center text-3xl font-bold text-gray-800 mt-4">Dashboard</h3>
      <Card body className="bg-amber-200 w-[80%] mx-auto mt-6 shadow-lg rounded-lg p-4">
        <div className="flex justify-around items-center p-4 flex-wrap gap-4">
          <Link to="/bookings" className="no-underline">
            <div className="w-64 h-32 bg-amber-400 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800">
              USERS <br /><br />{totalUsers}
            </div>
          </Link>
          <Link to="/acabs" className="no-underline">
            <div className="w-64 h-32 bg-amber-400 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800">
              CABS <br /><br />{totalCars}
            </div>
          </Link>
          <Link to="/bookings" className="no-underline">
            <div className="w-64 h-32 bg-amber-400 rounded-lg shadow-md flex flex-col justify-center items-center text-xl font-bold text-gray-800">
              BOOKINGS <br /><br />{totalBookings}
            </div>
          </Link>
        </div>

        <div className="flex justify-center mt-12">
          <BarChart width={400} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#f59e0b" barSize={50} /> 
          </BarChart>
        </div>
      </Card>
    </div>
  );
}

export default Ahome;
