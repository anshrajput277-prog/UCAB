import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from "./Unav";

function Cabs() {
  const [cars, setCars] = useState([]);
  const [searchCarName, setSearchCarName] = useState('');
  const [searchCarType, setSearchCarType] = useState('');
  const [sortPriceAscending, setSortPriceAscending] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await axios.get(`${API_BASE_URL}/cars`);
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars: ', error);
      }
    }
    fetchCars();
  }, []);

  const handleSortPrice = () => {
    setSortPriceAscending(!sortPriceAscending);
  };

  const sortedCars = [...cars].sort((a, b) => {
    return sortPriceAscending ? a.price - b.price : b.price - a.price;
  });

  const filteredCars = sortedCars.filter((car) => {
    return (
      car.carname.toLowerCase().includes(searchCarName.toLowerCase()) &&
      car.cartype.toLowerCase().includes(searchCarType.toLowerCase())
    );
  });

  return (
    <div className="bg-amber-100 min-h-screen font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Available Cabs</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 w-full md:w-64"
            type="text"
            placeholder="Search by car name"
            value={searchCarName}
            onChange={(e) => setSearchCarName(e.target.value)}
          />
          <input
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 w-full md:w-64"
            type="text"
            placeholder="Search by car type"
            value={searchCarType}
            onChange={(e) => setSearchCarType(e.target.value)}
          />
          <button
            onClick={handleSortPrice}
            className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-2 rounded-md transition duration-300"
          >
            Sort Price: {sortPriceAscending ? 'Low to High' : 'High to Low'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div
              key={car._id}
              className="bg-amber-200 rounded-xl shadow-lg p-5 transform hover:scale-105 transition-transform duration-300 animate-fade-in"
            >
              <img
                src={`${API_BASE_URL}/uploads/${car?.carImage}`}
                alt={`${car.carname} Image`}
                className="h-48 w-full object-cover rounded-md mb-4"
              />
              <div className="text-gray-700 space-y-1 text-left">
                <p><strong>🚘 Model:</strong> {car.carname}</p>
                <p><strong>Type:</strong> {car.cartype}</p>
                <p><strong>Car No:</strong> {car.carno}</p>
                <p><strong>Driver:</strong> {car.drivername}</p>
                <p><strong>Fare:</strong> ₹{car.price}/Km</p>
              </div>
              <div className="mt-4 text-center">
                <Link
                  to={`/bookcab/${car._id}`}
                  className="inline-block w-full bg-amber-400 hover:bg-amber-700 text-black font-bold py-2 px-4 rounded-md transition duration-200"
                >
                  Book Cab
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cabs;
