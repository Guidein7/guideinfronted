import { Link } from "react-router-dom";
import GuideinLogo from '../../../assets/GuideinLogo.png';
import { useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { employeeLogin } from "../slices/employeeLoginSlice";

const EmployeeLogin = () => {
    const [type, setType] = useState('password');
    const [buttonName, setButtonName] = useState('Show');
    const [errors, setErrors] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const log = useSelector(state => state.emplog);
    const navigate = useNavigate();
    const [loger, setLoger] = useState('');
    const[isVerifedUser,setIsVerifiedUser] = useState(false);
    const[errorMessage, setErrorMessage]  = useState('')
    const modalRef = useRef(null);

    if (log.isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                <p className="mt-4 text-gray-900">Loading...</p>
            </div>
        );
    }

    const isValidEmail = (value) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
    };

    const isValidMobile = (value) => {
        const mobilePattern = /^\+?[1-9]\d{1,14}$/;
        return mobilePattern.test(value);
    };

    const validateForm = () => {
        const errors = {};
        if (!inputValue.trim()) {
            errors.inputValue = 'Email or Mobile number is required';
        } else if (!isValidEmail(inputValue) && !isValidMobile(inputValue)) {
            errors.inputValue = 'Invalid email or mobile number format';
        }
        if (!password.trim()) {
            errors.password = 'Password is required';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const passwordView = (e) => {
        e.preventDefault();
        setType(type === 'password' ? 'text' : 'password');
        setButtonName(type === 'password' ? 'Hide' : 'Show');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const role = "JOB_POSTER";
            let formData;
    
            if (isValidEmail(inputValue)) {
                formData = { email: inputValue, mobile: '', password, role };
            } else {
                const formattedMobile = inputValue.startsWith('+91') ? inputValue : `+91${inputValue}`;
                formData = { email: '', mobile: formattedMobile, password, role };
            }
    
            console.log(formData);
    
            try {
                const action = employeeLogin(formData);
                const resultAction = await dispatch(action);
                const response = resultAction.payload;
    
                if (response.status === 200) {
                    console.log('login success');
                    navigate('/employee-home');
                }
                else if(response.status === 403){
                        setLoger("Invalid email or password");
                }
                else if(response.status === 401){
                    setIsVerifiedUser(true);
                }
            } catch (error) {
                setErrorMessage('Error while submitting your request. Please try again.');
                setTimeout(() => {
                  setErrorMessage('');
                }, 3000);
                console.error("Error:", error);
            }
        }
    };
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
            {errorMessage && (<p>{errorMessage}</p>)}
            <div className="w-full max-w-xs mx-auto">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <h1 className="font-bold text-center text-2xl">Sign in</h1>
                    <p className="p-0 mt-0 mb-6 text-xs text-center">Stay updated on your professional world</p>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputValue">
                            Email or Mobile
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="inputValue"
                            name="inputValue"
                            onChange={(e) => setInputValue(e.target.value)}
                            type="text"
                            placeholder="Enter Email or Mobile"
                        />
                        {errors.inputValue && (
                            <p className="text-red-500 text-xs italic">{errors.inputValue}</p>
                        )}
                    </div>
                    <div className="relative mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            type={type}
                            placeholder="Password"
                        />
                        <p onClick={passwordView} className="absolute top-0 right-0 mt-7 mr-2 px-3 py-2 text-blue-700 cursor-pointer">
                            {buttonName}
                        </p>
                        {errors.password && (
                            <p className="text-red-500 text-xs italic">{errors.password}</p>
                        )}
                    </div>
                    <Link to='/employee-forgot-password' className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mb-6">
                        Forgot Password?
                    </Link>
                    <div>
                        <p className="text-red-500">{loger}</p>
                    </div>
                    <div className="text-center">
                        <button className="bg-blue-700 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-6" type="submit">
                            Sign In
                        </button>
                    </div>
                    <p className="text-xs">New to Guidein? <Link to='/employee-register' className="text-blue-500">Join now</Link></p>
                </form>
            </div>
            {isVerifedUser && (
                        <div
                            className="fixed top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center"
                            ref={modalRef}
                        >
                            <div className="relative bg-white p-5 rounded shadow-md w-full max-w-md">
                                <span
                                    className="absolute top-2 right-2 text-xl cursor-pointer"
                                    onClick={() => isVerifedUser(false)}
                                >
                                    &times;
                                </span>
                                <p className="text-red-700">
                                    You are not the verified user please verify your details.
                                </p>
                                <div className="text-center mt-2">
                                    <Link to="/job-poster-verification" className="bg-blue-700 text-white p-2 rounded">
                                        verify
                                    </Link>
                                </div>
                            </div>
                        </div>


                    )}

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
};

export default EmployeeLogin;
