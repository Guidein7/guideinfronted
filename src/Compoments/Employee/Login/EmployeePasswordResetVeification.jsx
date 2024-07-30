

import React, { useState } from 'react';
import { Link,useNavigate,useLocation} from 'react-router-dom';
import GuideinLogo from '../../../assets/GuideinLogo.png'
import axios from 'axios';
import config from '../../../config';
import EFooter from '../LandingPage/Footer';


const EmployeePasswordResetVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate()
   const location = useLocation();
   const {email,mobile} = location.state;

   const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const role = "JOB_POSTER";
    const verifyData = { email, mobile, otp, role };
    axios.post(`${config.api.baseURL}${config.api.jobPoster.verification}`, verifyData)
        .then(response => {
            console.log(response);
            if (response.status === 200) {
                setSuccessMessage("Successfully verified");
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/employee-reset-password',{state:{email,mobile}})
                }, 2000);
            } else {
                setError("Invalid OTP. Please try again.");
            }
        })
        .catch(error => {
            console.log(error);
            setError("An error occurred while verifying the OTP. Please try again.");
        })
        .finally(() => setLoading(false));
};

const handleResendOtp = async () => {
  const role ="JOB_POSTER";
  const formData = {email,mobile,role}
      axios.post(`${config.api.baseURL}${config.api.jobPoster.resendOtp}`,formData).then(response => {
        
            console.log('OTP resent successfully');
              setSuccessMessage("OTP sent successfully");
              setTimeout(() => {
                  setSuccessMessage('');
              }, 2000);
            }).catch(error => {
             setError("Error Occured try again");})
};

  return (
    <div className="bg-[#f5faff] min-h-screen  flex flex-col justify-between">
    <nav className="bg-[#f8f9fa] py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="lg:block">
                <Link to='/employee-landingpage'>
                    <img src={GuideinLogo} alt="Logo" className="h-8" />
                </Link>
            </div>
        </div>
    </nav>
    <div className="w-full max-w-sm  mx-auto p-4 pt-6 md:p-6 lg:p-12">
      
      <form onSubmit={handleSubmit} className='bg-white rounded p-4'>
        <label className="block mb-2" htmlFor="otp">
          Enter OTP
        </label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter the OTP sent to your email"  required maxLength={6}
        />
        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}
           {successMessage && <div className="text-green-500 text-sm mb-2">{successMessage}</div>}
        <div className='mt-4 '>
        <button 
           type="submit"
           className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
           disabled={loading}
         >
           {loading ? 'Verifying...' : 'Verify OTP'}
         </button>
         <button
           type="button"
           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
           onClick={handleResendOtp}
           
         >
           Resend OTP
         </button>
         <div className='text-center mt-4'>
        <Link to='/employee-forgot-password' className='text-blue-500' >back</Link>
        </div>
        </div>
       
      </form>
    </div>
    <EFooter/>
    </div>
  );
};

export default EmployeePasswordResetVerification;