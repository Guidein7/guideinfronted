import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import guideinLandingPage from '../../../assets/guideinLandingPage.png';
import { useDispatch } from 'react-redux';

const LandingPage = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  const sideNavRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleClickOutside = (event) => {
    if (
      sideNavRef.current &&
      !sideNavRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowSideNav(false);
    }
  };

  useEffect(() => {
    if (showSideNav) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSideNav]);

  const handleEarnMoneyClick = () => {
    window.open('/employee-landingpage', '_blank');
  };

  const NavLinks = ({ className = '' }) => (
    <>
      <button
        onClick={handleEarnMoneyClick}
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`}
      >
        Earn Money
      </button>
      <Link
        type=""
        to="/register"
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`}
      >
        Join Now
      </Link>
      <Link
        to="/login"
        className={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ${className}`}
      >
        Sign In
      </Link>
    </>
  );

  return (
    <div className='bg-[#f5faff] min-h-screen flex flex-col justify-between'>
      <nav className="bg-[#f8f9fa] py-4 w-full fixed z-50">
        <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>
          <div className='block lg:hidden'>
            <button
              ref={buttonRef}
              className='text-dark focus:outline-none z-50'
              onClick={() => setShowSideNav(!showSideNav)}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          <div className='lg:block'>
            <Link to='/'>
              <img src={GuideinLogo} alt='logo' className='h-8 lg:h-8' />
            </Link>
          </div>
          <div className='hidden lg:flex space-x-4'>
            <NavLinks />
          </div>
        </div>
      </nav>
      <div
        ref={sideNavRef}
        className={`side-nav fixed top-0 left-0 h-full w-38 bg-[#f8f9fa] shadow-lg z-40 flex flex-col transform transition-transform duration-300 ${showSideNav ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='p-4 pt-16'>
          <NavLinks className='flex flex-col my-4' />
        </div>
      </div>
      <div className='flex-grow justify-center items-center pt-24'>
        <div className='text-center hidden lg:block  p-10 lg:p-2'>
          <h1 className='font-bold text-xl my-2'>To Get Referral</h1>
          <Link to='/subscribe' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-10 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Subscribe Now</Link>
        </div>
        <div className='my-4 p-4' >
          <img src={guideinLandingPage} alt="Landing Page" className="h-auto max-w-full" />
        </div>
        <div className='text-center  p-10 lg:p-2 mb-2'>
          <h1 className='font-bold text-xl my-2'>To Get Referral</h1>
          <Link to='/subscribe' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-10 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Subscribe Now</Link>
        </div>
      </div>

      {/* <div className="flex flex-col justify-between items-center pt-16 flex-grow">
       
        <div className="flex justify-center items-center lg:p-6">
          
        </div>
      </div> */}

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

export default LandingPage;
