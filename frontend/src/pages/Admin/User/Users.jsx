import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Anav from '../Anav';

const Users = () => {
  const [userbookings, setUserbookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch all users
  useEffect(() => {
    axios
      .get(`http://localhost:8000/getusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error('Failed to fetch users:', error);
        setError('Failed to load users');
      });
  }, []);

  // Delete user
  const deleteData = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/userdelete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('User deleted');
      setUsers(users.filter((u) => u._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

  // Delete car booking
  const deleteCar = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:8000/usercardelete/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Car booking deleted');
      setUserbookings(userbookings.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error('Error deleting car booking:', error);
      alert('Failed to delete car booking.');
    }
  };

  // Fetch user bookings
  const fetchUserBikeData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/getrides/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserbookings(response.data);
      setSelectedUser(userId);
    } catch (error) {
      console.error('Error fetching user bike data:', error);
      setError('Failed to fetch bookings');
    }
  };

  return (
    <div className="bg-amber-100 min-h-screen">
      <Anav />
      <h1 className="text-center text-2xl font-bold my-4">Users</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <table className="w-[90%] mx-auto border border-gray-300 bg-amber-50 text-black">
        <thead className="bg-amber-200 text-black">
          <tr>
            <th className="border px-4 py-2">Sl/No</th>
            <th className="border px-4 py-2">UserId</th>
            <th className="border px-4 py-2">User Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Operation</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={item._id} className="transition">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item._id}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.email}</td>
              <td className="border px-4 py-2">
                <div className="flex items-center justify-center gap-4">
                  <Link to={`/useredit/${item._id}`} className="text-black hover:underline">
                    <FaEdit />
                  </Link>
                  <button onClick={() => deleteData(item._id)} className="text-red-600">
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => fetchUserBikeData(item._id)}
                    className="bg-amber-400 text-black px-2 py-1 rounded hover:bg-amber-500"
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show bookings when a user is selected */}
      {selectedUser && (
        <div className="mt-8">
          <h2 className="text-center text-xl font-bold mb-4">
            Bookings for User: {selectedUser}
          </h2>
          {userbookings.length === 0 ? (
            <p className="text-center">No bookings found for this user.</p>
          ) : (
            <table className="w-[90%] mx-auto border border-gray-300 bg-white text-black">
              <thead className="bg-amber-200">
                <tr>
                  <th className="border px-4 py-2">Car Name</th>
                  <th className="border px-4 py-2">Pickup</th>
                  <th className="border px-4 py-2">Drop</th>
                  <th className="border px-4 py-2">Fare</th>
                  <th className="border px-4 py-2">Operation</th>
                </tr>
              </thead>
              <tbody>
                {userbookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="border px-4 py-2">{booking.carname}</td>
                    <td className="border px-4 py-2">{booking.selectedPickupCity}</td>
                    <td className="border px-4 py-2">{booking.selectedDropCity}</td>
                    <td className="border px-4 py-2">₹{booking.fare}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => deleteCar(booking._id)}
                        className="text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
