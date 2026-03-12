import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../components/Navbar';

const Dregister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    licenseNumber: '',
    vehicleModel: '',
    vehicleRegistrationNumber: '',
    vehicleType: 'Sedan' // Default choice
  });
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      const response = await axios.post("http://localhost:8000/driver/register", formData);
      setIsLoading(false);
      
      if (response.data.message === "Driver already exists.") {
        setErrorMsg("An account with this email already exists.");
      } else {
        navigate("/dlogin");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Driver Registration Error:", err);
      setErrorMsg(err.response?.data?.message || err.response?.data?.error || "Failed to create account. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-accent selection:text-gray-900">
      <NavBar />
      
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 z-0 pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-3xl opacity-60"></div>
      </div>
      
      <div className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl w-full animate-slide-up">
          
          <div className="glass-card p-10 mt-12 mb-12 rounded-3xl border-t-4 border-t-emerald-500">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mb-6 shadow-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-display">
                Become a Driver
              </h2>
              <p className="mt-3 text-sm text-gray-500 font-medium">
                Join our network to provide rides and earn on your schedule.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start animate-fade-in">
                <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="text-sm font-medium text-red-800">{errorMsg}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              
              <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input name="name" type="text" required value={formData.name} onChange={handleChange}
                      className="input-premium focus:border-emerald-500 focus:ring-emerald-500" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input name="email" type="email" required value={formData.email} onChange={handleChange}
                      className="input-premium focus:border-emerald-500 focus:ring-emerald-500" placeholder="driver@ucab.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                      className="input-premium focus:border-emerald-500 focus:ring-emerald-500" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <input name="password" type="password" required value={formData.password} onChange={handleChange}
                      className="input-premium focus:border-emerald-500 focus:ring-emerald-500" placeholder="••••••••" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Driver's License Number</label>
                    <input name="licenseNumber" type="text" required value={formData.licenseNumber} onChange={handleChange}
                      className="input-premium focus:border-emerald-500 focus:ring-emerald-500" placeholder="DL-12345678" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Vehicle Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Type</label>
                    <select name="vehicleType" required value={formData.vehicleType} onChange={handleChange}
                      className="input-premium focus:border-emerald-500 focus:ring-emerald-500 cursor-pointer">
                      <option value="Sedan">Sedan (Standard)</option>
                      <option value="SUV">SUV (Spacious)</option>
                      <option value="Luxury">Luxury (Premium)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Model</label>
                    <input name="vehicleModel" type="text" required value={formData.vehicleModel} onChange={handleChange}
                      className="input-premium focus:border-emerald-500 focus:ring-emerald-500" placeholder="e.g., Toyota Camry 2023" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Registration Number (License Plate)</label>
                    <input name="vehicleRegistrationNumber" type="text" required value={formData.vehicleRegistrationNumber} onChange={handleChange}
                      className="input-premium focus:border-emerald-500 focus:ring-emerald-500 uppercase" placeholder="ABC-1234" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-4 text-lg font-bold flex justify-center items-center shadow-lg shadow-emerald-600/20 transition-all duration-200"
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : "Submit Application"}
                </button>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600 mb-4">Already an approved driver?</p>
              <Link to="/dlogin" className="text-emerald-600 hover:text-emerald-800 font-semibold transition-colors">
                Go to Driver Login →
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dregister;
