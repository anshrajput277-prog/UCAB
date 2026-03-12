import { useState, useEffect } from 'react';
import axios from 'axios';
import Anav from './Anav';
import { useNavigate } from 'react-router-dom';


function Addcar() {
  const [formData, setFormData] = useState({
    drivername: '',
    carname: '',
    cartype: '',
    carno: '',
    price: ''
  });

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/alogin'); // Redirect unauthorized users to login
    }
  }, [navigate]);

  const handleChange = (e) => {
    if (e.target.name === 'carImage') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('drivername', formData.drivername);
      formDataToSend.append('carname', formData.carname);
      formDataToSend.append('cartype', formData.cartype);
      formDataToSend.append('carno', formData.carno);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('carImage', formData.carImage);

      await axios.post('http://localhost:8000/cars', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Car added successfully');
      navigate('/acabs');
    } catch (error) {
      console.error('Error adding car : ', error);
      alert('Failed to add car. Check console for details.');
    }
  };

  return (
    <div className="bg-amber-100 min-h-screen"> {/* Overall page background to amber-100 */}
      <Anav />
      <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg bg-amber-50"> {/* Form background to amber-50 */}
        <h2 className="text-2xl font-semibold mb-4 text-amber-800">Add Car</h2> {/* Heading text color to amber-800 */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="drivername"
              placeholder='Driver Name'
              value={formData.drivername}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="carname"
              placeholder='Car Model'
              value={formData.carname}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="cartype"
              placeholder='Car Type'
              value={formData.cartype}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="carno"
              placeholder='Car No'
              value={formData.carno}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="price"
              placeholder='Price'
              value={formData.price}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Car Image</label>
            <input
              type="file"
              name="carImage"
              accept="image/*"
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-700 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" // Button colors changed to amber
          >
            Submit
          </button>
        </form>

      </div>
    </div>
  );
}

export default Addcar;