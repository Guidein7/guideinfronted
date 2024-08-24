import React, { useState } from 'react';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import JFooter from '../LandingPage/JFooter';

function OtpAuthentication() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [otpMessage, setOtpMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const { email, mobile } = location.state;
    const navigate = useNavigate();

    const [Loading, setLoading] = useState(false);

    if (Loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                <p className="mt-4 text-gray-900">Loading...</p>
            </div>
        );
    }


    const getLastFourDigits = (mobileNumber) => {
        return mobileNumber.slice(-4);
    };

    const lastFourDigits = getLastFourDigits(mobile);
  


    const resendVerification = () => {
        const role = "JOB_SEEKER";
        const formData = { email, mobile, role }
        setLoading(true);
        axios.post(`${config.api.baseURL}${config.api.jobSeeker.resendOtp}`, formData).then(response => {
            if (response.status === 200) {
                setOtpMessage('Otp sent successfully');
                setTimeout(() => {
                    setOtpMessage('');
                }, 2000)
            }
        }).catch(error => {
            setOtpMessage('Error while sending otp please try again');
            setTimeout(() => {
                setOtpMessage('');
            }, 2000)

        }).finally(() => setLoading(false));
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

        setLoading(true)
        axios.post(`${config.api.baseURL}${config.api.jobSeeker.verification}`, verifyData)
            .then(response => {
                if (response.status === 200) {
                    setSuccess("Successfully registered!");
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    setError('invalid otp')
                    setTimeout(() => {
                        setError('')
                    }, 2000)
                }
                else {
                    setError("An error occurred while verifying the OTP. Please try again.");
                }
            }).finally(() => setLoading(false))
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
            <div className="w-full max-w-sm lg:max-w-md mx-auto flex align-center">


                <form className="bg-white  shadow-md align-center rounded p-6 w-80 lg:w-full mx-auto mb-4" onSubmit={handleSubmit}>
                    <h1 className='font-bold text-center mb-6'>Verification </h1>
                    <p className='text-sm mb-5'>We have sent an OTP to your mobile number xxxxxx<span>{lastFourDigits}</span>.</p>

                    <div className="mb-4">

                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="otp" name="otp" value={otp} onChange={(e) => { setOtp(e.target.value); setErrorMessage(''); }} type="text" placeholder="Enter OTP" maxLength={6} />
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
                    {error && <div className="text-red-500 text-center">{error}</div>}
                    {success && <div className="text-green-500 text-center">{success}</div>}
                </form>
            </div>
            <JFooter />
        </div>
    );
}
export default OtpAuthentication;

