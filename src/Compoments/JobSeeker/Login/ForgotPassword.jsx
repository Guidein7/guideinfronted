import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import axios from 'axios';
import config from '../../../config';
import JFooter from '../LandingPage/JFooter';

const ForgetPassword = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateMobile = (mobile) => {
    const re = /^\d{10}$/;
    return re.test(String(mobile));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let mobile = '';
    const email = ''; 
    if (validateMobile(input)) {
      mobile = `+91${input}`;
    } else {
      setError('Please enter a valid  mobile number');
      return;
    }

    setError('');

    const role = "JOB_SEEKER";
    const formdata = { email, mobile, role };
    setLoading(true);
    axios.post(`${config.api.baseURL}${config.api.jobSeeker.forgotPassword}`, formdata)
      .then(response => {
        navigate('/reset-verify', { state: { email, mobile } });
      }).catch(error => {
       
        setError(error.response.data + " check  mobile number");
      }).finally(() => setLoading(false));
  }

  return (
    <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between">
      <nav className="bg-[#f8f9fa] py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="lg:block">
            <Link to='/'>
              <img src={GuideinLogo} alt="Logo" className="h-8" />
            </Link>
          </div>
        </div>
      </nav>
      <div className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto">
        <form onSubmit={handleSubmit} className='bg-white p-4 rounded'>
          <label className="block my-4" htmlFor="input">
            Enter Registered Mobile Number
          </label>
          <input
            type="text"
            id="input"
            maxLength={10}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError(''); 
            }}
            
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Mobile"
          />
          {error && (
            <div className="text-red-500 text-sm mb-2">{error}</div>
          )}
          <div className='text-center'>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-orange-700 text-white py-1 px-2 mt-4 rounded"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send OTP'
              }
            </button>
            <div className='mt-4'>
              <Link to='/login' className='text-blue-500'>Back</Link>
            </div>
          </div>
        </form>
      </div>
      <JFooter/>
    </div>
  );
};

export default ForgetPassword;
