import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import guideinLandingPage from '../../../assets/guideinLandingPage.png';
import dottedlines from '../../../assets/dottedlines.png'
import { useDispatch } from 'react-redux';
import './Landingpage.css'
import JFooter from './JFooter';

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
    window.open('/employee', '_blank');
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
    <div className='bg-[#f5faff] min-h-screen flex flex-col'>
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
      <div className=' flex flex-col pt-24 flex-grow gradient-container'>
        <div className='text-center  p-2 lg:p-2 mb-2'>
          <h1 className='font-bold text-xl my-2'>To Get Referral</h1>
          <div className='text-center flex  md:flex-row justify-center items-center gap-4'>
            <Link to='/register' className='text-white bg-[#244AD1] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 w-36 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
              Register now
            </Link>
            <Link to='/login' className='text-[#244AD1] bg-[#FFFFFF] hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none w-36 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'>
              Login
            </Link>
          </div>

        </div>

        <div className='grid grid cols-1 gap-5 mt-5 lg:mt-10'>
          <h1 className=' text-center font-bold text-xl lg:text-3xl '>Get Hired Faster with Trusted Referrals</h1>
          <div>
            <p className='text-center text-base m-0 p-0  lg:text-xl paragraph'>Don't wait for connections to get a referral. Get referred instantly <span className='md:hidden'>and
              increase your chances of landing your dream job right away!</span></p> <p className='hidden md:block text-center text-sm lg:text-xl paragraph m-0 p-0'>and
                increase your chances of landing your dream job right away!</p>
          </div>
          <div className='relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 lg:mt-14 mx-10 mb-12'>
            <div className='relative box-gradient rounded-3xl px-6 pb-6 pt-12'>
              <h1 className='numbers'>1</h1>
              <div>
                <h1 className='text-2xl text-[#F5FAFF] font-bold'>Sign Up & Subscribe</h1>
                <p className='text-base text-[#F5FAFF]'>Create an account and choose a subscription plan based on the number of referrals you need.</p>
              </div>
            </div>
            <div className='relative box-gradient rounded-3xl px-6 pb-6 pt-12'>
              <h1 className='numbers'>2</h1>
              <div>
                <h1 className='text-2xl text-[#F5FAFF] font-bold'>Explore Jobs</h1>
                <p className='text-base text-[#F5FAFF]'>Browse through available job postings from employees ready to refer candidates.</p>
              </div>
            </div>

            <div className='relative box-gradient rounded-3xl px-6 pb-6 pt-12 '>
              <h1 className='numbers'>3</h1>
              <div>
                <h1 className='text-2xl text-[#F5FAFF] font-bold'>Request a Referral</h1>
                <p className='text-base text-[#F5FAFF]'>Fill in job details and upload your resume for immediate visibility to our employee network.</p>
              </div>
            </div>
            <div className='relative box-gradient rounded-3xl px-6 pb-6 pt-12'>
              <h1 className='numbers'>4</h1>
              <div>
                <h1 className='text-2xl text-[#F5FAFF] font-bold'>Instant Referral</h1>
                <p className='text-base text-[#F5FAFF]'>Employees in our network will refer you right away. You'll be notified as soon as it’s done.</p>
              </div>
            </div>
            <div className='relative box-gradient rounded-3xl px-6 pb-6 pt-12 '>
              <h1 className='numbers'>5</h1>
              <div>
                <h1 className='text-2xl text-[#F5FAFF] font-bold'>Track & Succeed</h1>
                <p className='text-base text-[#F5FAFF]'>Monitor your referral status in your dashboard, prepare for interviews and land your dream job.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white p-4'>
        <h1 className='font-bold text-3xl text-center mb-4'>Why us</h1>
        <div className='mb-4'>
        <p className='text-center'>The perfect choice for job seekers who value personalized support and real results.</p>
        <p className='text-center'>Trusted referrals and job specific resume refinement.  </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 p-8">
          {/* Box 1 */}
          <div className="bg-[#FFD966] text-black p-6 rounded-lg shadow-lg flex flex-col items-center justify-center w-full sm:w-64 h-40">
            <h2 className="text-3xl font-bold">500+</h2>
            <p className="mt-2 text-center text-sm">Join our growing community of job seekers</p>
          </div>

          {/* Box 2 */}
          <div className="bg-black text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center w-full sm:w-64 h-40">
            <h2 className="text-3xl font-bold">200+</h2>
            <p className="mt-2 text-center text-sm">Happy Subscribers landing their dream job through referrals</p>
          </div>

          {/* Box 3 */}
          <div className="bg-white text-black p-6 rounded-lg shadow-lg flex flex-col items-center justify-center w-full sm:w-64 h-40">
            <h2 className="text-3xl font-bold">85%</h2>
            <p className="mt-2 text-center text-sm">Subscribers received interview calls</p>
          </div>

          {/* Box 4 */}
          <div className="bg-[#7fb38d] text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center w-full sm:w-64 h-40">
            <h2 className="text-3xl font-bold">Our Network</h2>
            <p className="mt-2 text-center text-sm">2000+ Employees, 600+ Companies</p>
          </div>
        </div>
        </div>
        <div className='bg-[#f4f4f4] p-6'>
          <h1 className='text-center font-bold text-2xl mb-4'>People are talking</h1>
          <div className='mb-4'>
            <p className='text-center '>Helping job seekers succeed isn’t just about referrals and resumes. It’s about building trust, </p>
            <p className='text-center'> offering genuine support, and guiding them on their career journey.</p>
          </div>
          <div className="scroll-container">
            <div className="scroll-content">
              {[
               { letter: 'S', name: 'Satya', role: 'Product Manager (starhealth)', text: 'I was skeptical at first, but the referral really worked! I got calls for interviews at my dream companies within a few days.' },
               { letter: 'R', name: 'Ravi Teja', role: 'Finance Professional (Global Data) ', text: 'The support I received from the platform was amazing. They helped me improve my resume and even prepared me with interview questions specific to each company.' },
               { letter: 'P', name: 'Pavitra   K', role: 'Fresher', text: 'The resume refinement and interview tips made a huge difference. I felt more confident going into my interviews, and it paid off!' },
               { letter: 'S', name: 'Santosh', role: 'Business Analyst (DDi)', text: 'Before finding this platform, I applied to so many jobs without hearing back. After joining, things changed quickly.' },
               { letter: 'A', name: 'Amit', role: 'Designer (CreditVidya)', text: 'This platform was really helpful. Through referrals, I got access to roles I could never reach through the usual application process.' }
              ].map((item, index) => (
                <div key={index} className="box bg-white p-4">
                  <p>{item.text}</p>
                  <div className="flex items-center mt-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded">
                      {item.letter}
                    </div>
                    <div className="ml-4">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.role}</p>
                    </div>


                  </div>
                </div>
              ))}
              {[
                { letter: 'S', name: 'Satya', role: 'Product Manager (starhealth)', text: 'I was skeptical at first, but the referral really worked! I got calls for interviews at my dream companies within a few days.' },
                { letter: 'R', name: 'Ravi Teja', role: 'Finance Professional (Global Data) ', text: 'The support I received from the platform was amazing. They helped me improve my resume and even prepared me with interview questions specific to each company.' },
                { letter: 'P', name: 'Pavitra   K', role: 'Fresher', text: 'The resume refinement and interview tips made a huge difference. I felt more confident going into my interviews, and it paid off!' },
                { letter: 'S', name: 'Santosh', role: 'Business Analyst', text: 'Before finding this platform, I applied to so many jobs without hearing back. After joining, things changed quickly.' },
                { letter: 'A', name: 'Amit', role: 'Designer (CreditVidya)', text: 'This platform was really helpful. Through referrals, I got access to roles I could never reach through the usual application process.' }
              ].map((item, index) => (
                <div key={index} className="box bg-white p-4">
                  <p>{item.text}</p>
                  <div className="flex items-center mt-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded">
                      {item.letter}
                    </div>
                    <div className="ml-4">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.role}</p>
                    </div>


                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
      <JFooter />
    </div>
  );
};

export default LandingPage;

