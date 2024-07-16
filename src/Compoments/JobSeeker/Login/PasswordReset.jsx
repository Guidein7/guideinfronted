import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import GuideinLogo from '../../../assets/GuideinLogo.png'
import config from '../../../config';

const PasswordReset = () => {
    const [type, setType] = useState('password');
    const [buttonName, setButtonName] = useState('Show');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { email, mobile } = location.state;

    const passwordView = (e) => {
        e.preventDefault();
        setType(type === 'password' ? 'text' : 'password');
        setButtonName(type === 'password' ? 'Hide' : 'Show');
    };

    const validateForm = () => {
        const errors = {};
    
        // Password validation
        if (!password.trim()) {
            errors.password = 'Password is required';
        } else if (password.trim().length < 8) {
            errors.password = 'Password should be at least 8 characters long';
        } else if (!/(?=.*[a-z])/.test(password)) {
            errors.password = 'Password should contain at least one lowercase letter';
        } else if (!/(?=.*[A-Z])/.test(password)) {
            errors.password = 'Password should contain at least one uppercase letter';
        } else if (!/(?=.*\d)/.test(password)) {
            errors.password = 'Password should contain at least one digit';
        } else if (!/(?=.*[@$!%*?&])/ .test(password)) {
            errors.password = 'Password should contain at least one special character';
        }
    
        // Confirm Password validation
        if (!confirmPassword.trim()) {
            errors.confirmPassword = 'Confirm Password is required';
        } else if (confirmPassword !== password) {
            errors.confirmPassword = 'Passwords do not match';
        }
    
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const role = "JOB_SEEKER";
            const newPassword = password;
            const formData = { email, mobile, role, newPassword };

            axios.post(`${config.api.baseURL}${config.api.jobSeeker.resetPassword}`, formData)
                .then(response => {
                    setSuccessMessage('Password reset successful');
                    setTimeout(() => {
                        setSuccessMessage('');
                        navigate('/login');
                    }, 2000);
                })
                .catch(error => {
                    setErrors({ form: 'An error occurred while resetting the password. Please try again.' });
                });
        }
    };

    return (
        <div className="min-h-screen bg-[#f5faff] flex flex-col justify-between ">
            <nav className="bg-[#f8f9fa] py-4 w-full">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <div className="lg:block">
                        <Link to='/'>
                            <img src={GuideinLogo} alt="Logo" className="h-8" />
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Your Password</h2>
            </div>
            <div className="mt-8 w-full max-w-xs mx-auto ">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600" id="password-error">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        </div>
                        
                        <div className="relative mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                              Confirm  Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="confirm-password"
                                    name="confirm-password"
                                    type={type}
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <p onClick={passwordView} className="absolute top-0 right-0 mt-7 mr-2 px-3 py-2 text-blue-700 cursor-pointer">
                                {buttonName}
                            </p>
                            {errors.confirmPassword && (
                                    <p className="mt-2 text-sm text-red-600" id="confirm-password-error">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                        </div>

                        {errors.form && (
                            <div className="text-red-500 text-sm mb-2">{errors.form}</div>
                        )}
                        {successMessage && (
                            <div className="text-green-500 text-sm mb-2">{successMessage}</div>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Reset Password
                            </button>
                            <div className='text-center mt-6'>
                                <Link to='/forgot-password' className='text-blue-500'>back</Link>
                            </div>
                        </div>
                    </form>
                </div>
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
};

export default PasswordReset;

