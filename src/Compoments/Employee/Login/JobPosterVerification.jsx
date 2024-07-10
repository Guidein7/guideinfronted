


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import axios from 'axios';
import config from '../../../config';

function JobPosterVerification(){
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const validateMobile = (mobile) => {
    const re = /^\d{10}$/; // Check if the input is exactly 10 digits
    return re.test(String(mobile));
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    setLoading(true);

    let email = '';
    let mobile = '';

    if (validateEmail(input)) {
      email = input;
    } else if (validateMobile(input)) {
      mobile = `+91${input}`; 
    } else {
      setError('Please enter a valid email or 10-digit mobile number');
      setLoading(false);
      return;
    }
    setError(null);
    const role = "JOB_POSTER";
    const formdata = { email, mobile, role };
    console.log(formdata);
       axios.post(`${config.api.baseURL}${config.api.jobPoster.resendOtp}`,formdata)
       .then(response => {
         console.log(response)
         setLoading(false);
         navigate(`/Job-poster-otp-authentication`, { state: { email, mobile } });
    }).catch(error => 
     {
      setLoading(false);
      setError(error.response ? error.response.data.message : 'An error occurred');
    })
  }
  

  return (
    <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between">
      <nav className="bg-[#f8f9fa] py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="lg:block">
            <Link to='/employee-landingpage'>
              <img src={GuideinLogo} alt="Logo" className="h-8" />
            </Link>
          </div>
        </div>
      </nav>
      <div className="w-full max-w-xs mx-auto">
        <form onSubmit={handleSubmit} className='bg-white p-4 rounded'>
          <label className="block mb-2" htmlFor="input">
            Email or Mobile
          </label>
          <input
            type="text"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email or mobile number"
          />
          {error && (
            <div className="text-red-500 text-sm mb-2">{error}</div>
          )}
          <div className='text-center'>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-orange-700 text-white p-2 mt-4 rounded"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
            <div className='mt-4'>
              <Link to='/employee-login' className='text-blue-500'>Back</Link>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-[#00145e] w-full p-4 my-2">
        <footer className='sm:mx-auto max-w-screen-lg'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='text-white justify-self-start'>
              <h2>Company</h2>
              <p>About us</p>
            </div>
            <div className='text-white justify-self-end'>
              <h2>Help & Support</h2>
              <p>Contact Us</p>
            </div>
          </div>
          <div className='text-white text-center mt-4'>
            <p>Copyright &copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </div>
  );



}
export default JobPosterVerification;