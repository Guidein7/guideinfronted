import { Link } from "react-router-dom";
import GuideinLogo from '../../../assets/GuideinLogo.png';
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../Slices/loginSlice";
import JFooter from "../LandingPage/JFooter";

const EmployeeLogin = () => {
    const log = useSelector(state => state.log);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loger, setLoger] = useState('');
    const [isVerifedUser, setIsVerifiedUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [showValue, setShowValue] = useState(false)
    const modalRef = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const checkEmailMobile = (value) => { 
        if (/^\+?\d+$/.test(value)){ 
            return true; 
        } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(value)){ 
            return true;
        } 
        return false; 
    } 
    const submitForm = async (data) => {
        let { password, emailmobile } = data;
        let subData = { password, role: "JOB_SEEKER" };
        if (/^\+?\d+$/.test(emailmobile)) {
            if (!emailmobile.startsWith('+91')) {
                emailmobile = emailmobile.startsWith('+') ? emailmobile : `+91${emailmobile}`;
            }
            subData = {...subData, mobile: emailmobile, email: ''};
        } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailmobile)) {
            subData = {...subData, email: emailmobile, mobile: ''};
        }
        else {
            setErrorMessage('invalid input')
            setTimeout(() => {
                setErrorMessage('')
            }, 2000);
            return;
        }
        try {
            const action = login(subData);
            const resultAction = await dispatch(action);
            const response = resultAction.payload;
            if (response.status === 200) {
                const intendedPath = localStorage.getItem('intendedPath');
                
            
                if (intendedPath) {
                    localStorage.removeItem('intendedPath');
                    navigate(intendedPath); 
                } else {
                    navigate('/home'); 
                }
            }
            
            
            else if (response.status === 403) {
                setLoger("Invalid email or password");
            }
            else if (response.status === 401) {
                setIsVerifiedUser(true);
            }
         
        } catch (error) {
            setErrorMessage('Error while submitting your request. Please try again.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    }
    if (log.isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                <p className="mt-4 text-gray-900">Loading...</p>
            </div>
        );
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
            {errorMessage && (<p className="text-red-500 text-center">{errorMessage}</p>)}
            <div className="w-full max-w-xs lg:max-w-lg mx-auto">
                <form className="border border-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(submitForm)}>
                    <h1 className="font-bold text-center text-2xl mb-3"> Jobseeker Sign in</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="inputValue">
                            Email or Mobile
                        </label>
                        <input
                            type="text"
                            {...register("emailmobile", { required: true,validate: ({checkEmailMobile: (value) => checkEmailMobile(value) || 'invalid input field '}) })}
                            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter Email or Mobile"
                        />
                        {errors.emailmobile?.type === "required" && (<p className="text-sm text-red-500">Email or Mobile is required</p>)}
                        {<p className="text-red-500">{errors.emailmobile?.message}</p>}
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700  mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showValue ? 'text' : 'password'}
                                {...register('password', { required: true })}
                                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Password"
                                autoComplete="off"

                            />
                            <p onClick={() => setShowValue(!showValue)} className="absolute top-2     right-2  text-blue-700 cursor-pointer">
                                {showValue ? 'hide' : 'show'}
                            </p>
                        </div>
                        {errors.password?.type === 'required' && (<p className="text-sm text-red-500">Password is required</p>)}
                    </div>
                   <Link to='/forgot-password' className="inline-block align-baseline  text-sm text-blue-700 hover:text-blue-800 mb-6">
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
                    <p className="">New to Guidein? <Link to='/register' className="text-blue-500">Join now</Link></p>
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
                            onClick={() => setIsVerifiedUser(false)}
                        >
                            &times;
                        </span>
                        <p className="text-red-700">
                            You are not the verified user please verify your details.
                        </p>
                        <div className="text-center mt-2">
                            <Link to="/user-verification" className="bg-blue-700 text-white p-2 rounded">
                                verify
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            <JFooter />
        </div>
    );
};

export default EmployeeLogin;
