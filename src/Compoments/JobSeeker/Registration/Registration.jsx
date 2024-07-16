import GuideinLogo from '../../../assets/GuideinLogo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Policy from '../../../assets/Policy.pdf';
import { useNavigate } from 'react-router-dom';
import config from '../../../config';

const Registration = () => {
  const [type, setType] = useState('password');
  const [buttonName, setButtonName] = useState('show');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const[unKnownError,setUnKnownError] = useState('')
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '+91',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    mobile: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      if (!value.startsWith('+91')) {
        return;
      }
    }
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
   
  }

   const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'username':
        if (!value) {
          error = 'Name is required';
        }
        else if (!/^[A-Za-z\s]+$/.test(value.trim())) {
          error = 'Name should only contain alphabets';
        }
        break;
      case 'mobile':
        if (!value || value.trim() === '+91') {
          error = 'Mobile is required';
        } else if (value.trim().startsWith('+91') && !/^\+91\d+$/.test(value.trim())) {
          error = 'Mobile should contain only digits';
        }
        else if (value.length !== 13) {
          error = 'Mobile number should be exactly 10 characters long'
        }
        break;
      case 'email':
        if (!value) {
          error = 'Email is required'
        }
        else if (!/\S+@\S+\.\S+/.test(value.trim())) {
          error = 'Email is invalid';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required'
        }
        else if (value.trim().length < 8) {
          error = 'Password should be at least 8 characters long';
        } else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*/.test(value.trim())) {
          error = 'Password should be the combination of digits letters and special characters';
        }
        break;
        default:
        error = ''
    }
    setErrors(prevError => ({
      ...prevError,
      [name]: error,
    }))
  }

  const validateForm = () => {
    let valid = true;
    Object.keys(formData).forEach(item => {
      validateField(item, formData[item]);
      if (formData[item] === '' || errors[item] !== '') {
        valid = false;
      }
    })
    return valid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {   
      const email = formData.email;
      const mobile = formData.mobile;
      const role = "JOB_SEEKER";
      const registrationData = { ...formData, role:role };
      setLoading(true);
      axios.post(`${config.api.baseURL}${config.api.jobSeeker.register}`, registrationData).then(response => {
        const sessionUUID = response.data.sessionUUID
        navigate(`/verification`, { state: { email, mobile, sessionUUID} });
      }).catch(error => {
        if (error.response && error.response.status === 409) {
          setErrorMessage("User already exists. Please try with a different email or mobile.");
        } else {
          setUnKnownError('Error while submitting your request. Please try again.');
          setTimeout(() => {
            setUnKnownError('');
          }, 3000);
        }  
      }).finally(() => setLoading(false))
    }
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const passwordView = () => {
    if (type === 'password') {
      setType('text');
      setButtonName('hide');
    } else {
      setType('password');
      setButtonName('show');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-900">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between">
      <nav className="bg-[#f8f9fa] py-4 mb-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="lg:block">
            <Link to="/">
              <img src={GuideinLogo} alt="Logo" className="h-8" />
            </Link>
          </div>
        </div>
      </nav>
      <div className="w-full max-w-xs mx-auto align-center lg:max-w-lg">
        {unKnownError && (<p className='text-red-500'>{unKnownError}</p>)}
        <form
          className="bg-gray border border-gray-300 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 mt-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <h1 className=" font-bold text-center text-2xl">Sign up</h1>
          <p className="p-0 mt-0 mb-6 text-lg text-center">Let's get your dream Job</p>
          <div className="mb-3">
            <label className="block text-gray-700   mb-2" htmlFor="name">Full Name<span className='text-red-500'>*</span></label>
            <input
              className={`shadow appearance-none border rounded w-full py-3  px-3 text-gray-700 bg-gray leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              name="username"
            />
            {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-gray-700   mb-2" htmlFor="mobile">Mobile<span className='text-red-500'>*</span></label>
            <input
              className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.mobile ? 'border-red-500' : ''}`}
              id="mobile"
              type="text"
              placeholder="Enter Mobile number"
              value={formData.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              name="mobile"
            />
            {errors.mobile && <p className="text-red-500 text-xs italic">{errors.mobile}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-gray-700   mb-2" htmlFor="email">Email<span className='text-red-500'>*</span></label>
            <input
              className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
              id="email"
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="relative mb-2">
            <label className="block text-gray-700   mb-2" htmlFor="password">Password<span className='text-red-500'>*</span></label>
            <input
              className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
              id="password"
              type={type}
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
            />
            <p onClick={passwordView} className="absolute top-0 right-0 mt-8 mr-2 px-3 py-2 text-blue-700 cursor-pointer">{buttonName}</p>
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
          <p className="text-xs">By clicking on Join now, you are agree to the <a href={Policy} className="text-blue-700" target="_blank" rel="noopener noreferrer">Terms and conditions</a></p>
          {errorMessage && <p className="text-red-500 text-sm italic">{errorMessage}</p>}
          <div className="text-center mt-5">
            <button className="bg-blue-700 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-6">Join Now</button>
          </div>
          <p className="">Already have an account? <Link to="/login" className="text-blue-700">Sign in</Link></p>
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
};

export default Registration;
