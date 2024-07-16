import React, { useState } from 'react';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';

function OtpAuthentication() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const[otpMessage,setOtpMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const { email, mobile } = location.state;
    const navigate = useNavigate();
    const resendVerification = () => {
    const role = "JOB_SEEKER";
    const formData = {email,mobile,role}
      
      axios.post(`${config.api.baseURL}${config.api.jobSeeker.resendOtp}`,formData).then(response => {
            if(response.status === 200){
                setOtpMessage('Otp sent successfully');
                setTimeout(() => {
                    setOtpMessage('');
                },2000)
            }
      }).catch(error => {
        setOtpMessage('Error while sending otp try again');
        setTimeout(() => {
            setOtpMessage('');
        },2000)
      })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!otp) {
            setErrorMessage('OTP is required');
            return;
        }
        setErrorMessage('');
        const role = "JOB_SEEKER"
        const verifyData = { email, mobile, otp, role };
        
        axios.post(`${config.api.baseURL}${config.api.jobSeeker.verification}`, verifyData)
            .then(response => {
                
                // Check response status to determine if verification was successful
                if (response.status === 200) {
                    setSuccess("Successfully verified!");
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000); // Navigate to login page after 2 seconds
                } else {
                    setError("Invalid OTP. Please try again.");
                }
            })
            .catch(error => {
               
                setError("An error occurred while verifying the OTP. Please try again.");
            });
    };

    return (
        <div className="bg-[#f5faff] min-h-screen  flex flex-col justify-between">
            <nav className="bg-[#f8f9fa] py-4 mb-1">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <div className="lg:block">
                        <Link to="/">
                            {' '}
                            <img src={GuideinLogo} alt="Logo" className="h-8" />{' '}
                        </Link>
                    </div>
                </div>
            </nav>
            {otpMessage && (
                    <p className='text-green-400 text-center'>{otpMessage}</p>
                )}
            <div className="w-full max-w-sm mx-auto flex align-center">
               

                <form className="bg-white  shadow-md align-center rounded p-8 w-80 lg:w-full mx-auto mb-4" onSubmit={handleSubmit}>
                    <h1 className='font-bold text-center mb-6'>Verification </h1>
                    <div className="mb-4">
                        
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} type="text" placeholder="Enter OTP" maxLength={6}  />
                        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                    </div>
                   
                    <div className="text-center">
                        <button className="bg-blue-700 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-6 mx-2" type="submit"   >
                            Verify
                        </button>
                        <button className="bg-orange-400 text-white p-2 rounded" type="button" onClick={resendVerification} >
                        Resend OTP
                        </button>
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    {success && <div className="text-green-500">{success}</div>}
                </form>
            </div>
            <div className="bg-[#00145e] w-full p-1 ">
        <footer className='sm:mx-auto max-w-screen-lg ml-0 xl:ml-[20%]'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='text-white justify-self-start'>

            </div>
            <div className='text-white justify-self-end'>
              <h2 className='pr-2'>Help & Support</h2>
              <Link className='pl-2' to='/contact-us'>Contact Us</Link>
            </div>
          </div>
          <div className='text-white text-center '>
            <p>Copyright &copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
        </div>
    );
}

export default OtpAuthentication;
