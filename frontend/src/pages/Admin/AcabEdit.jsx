import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Anav from './Anav';

const Acabedit = () => {
  const [formData, setFormData] = useState({
    drivername: '',
    carname: '',
    cartype: '',
    carno: '',
    price: '',
    image: '',
  });

  let { id } = useParams();
  let navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://localhost:8000/acar/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        console.log(resp.data);
        setFormData(resp.data);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === 'carImage') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  let formHandle = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    dataToSend.append('drivername', formData.drivername);
    dataToSend.append('carname', formData.carname);
    dataToSend.append('cartype', formData.cartype);
    dataToSend.append('carno', formData.carno);
    dataToSend.append('price', formData.price);
    if (formData.image && typeof formData.image !== 'string') {
      dataToSend.append('image', formData.image);
    }

    try {
      const res = await axios.put(`http://localhost:8000/acaredit/${id}`, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(res);
      alert("Cab updated successfully");
      navigate("/acabs");
    } catch (error) {
      console.error("Error updating car data:", error);
      alert("Failed to update cab. Please try again.");
    }
  };

  return (
    <div className="bg-amber-100 min-h-screen">
      <Anav />
      <br />
      <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg bg-amber-50">
        <h2 className="text-2xl font-semibold mb-4 text-amber-800">Edit Car Data</h2>
        <form onSubmit={formHandle}>
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
            />
            {formData.image && typeof formData.image === 'string' && (
              <img src={formData.image} alt="Current Car" className="mt-2 w-24 h-24 object-cover rounded" />
            )}
          </div>
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-700 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" // Changed button colors to amber
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Acabedit;