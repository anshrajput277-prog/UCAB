import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Anav from './Anav';

function Acabs() {
  const [cars, setCars] = useState([]);
  const [searchCarName, setSearchCarName] = useState('');
  const [searchCarType, setSearchCarType] = useState('');
  const [sortPriceAscending, setSortPriceAscending] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await axios.get('http://localhost:8000/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars: ', error);
      }
    }
    fetchCars();
  }, []);

  const deletecar = (id) => {
    axios.delete(`http://localhost:8000/cardelete/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then(() => {
        alert('Car deleted');
        setCars((prev) => prev.filter(car => car._id !== id));
      })
      .catch(err => console.error('Delete error:', err));
  };

  const handleSortPrice = () => {
    setSortPriceAscending(!sortPriceAscending);
  };

  const sortedCars = [...cars].sort((a, b) => {
    return sortPriceAscending ? a.price - b.price : b.price - a.price;
  });

  const filteredCars = sortedCars.filter((car) => {
    const carNameMatch = car.carname.toLowerCase().includes(searchCarName.toLowerCase());
    const carTypeMatch = car.cartype.toLowerCase().includes(searchCarType.toLowerCase());
    return carNameMatch && carTypeMatch;
  });

  return (
    <div className="min-h-screen bg-amber-100">
      <Anav />
      <div className="px-6 py-10">
        <h1 className="text-4xl text-center font-bold text-amber-900 mb-10">Car List</h1>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by car name"
            value={searchCarName}
            onChange={(e) => setSearchCarName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg w-52"
          />
          <input
            type="text"
            placeholder="Search by car type"
            value={searchCarType}
            onChange={(e) => setSearchCarType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg w-52"
          />
          <button
            onClick={handleSortPrice}
            className="px-6 py-2 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-500 transition"
          >
            Sort Price {sortPriceAscending ? '↑' : '↓'}
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {filteredCars.map((car) => (
            <div
              key={car._id}
              className="bg-amber-200 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 w-72 p-4"
            >
              <img
                src={`http://localhost:8000/uploads/${car.carImage}`}
                alt={`${car.carname}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p><strong>Driver:</strong> {car.drivername}</p>
              <p><strong>Model:</strong> {car.carname}</p>
              <p><strong>Type:</strong> {car.cartype}</p>
              <p><strong>Number:</strong> {car.carno}</p>
              <p><strong>Price:</strong> ₹{car.price}/Km</p>

              <div className="flex justify-between mt-4">
                <Link
                  to={`/acabedit/${car._id}`}
                  className="bg-black text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletecar(car._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Acabs;
