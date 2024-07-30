
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import { useDispatch } from 'react-redux';
import JFooter from './JFooter';

const ReferralFAQ = () => {
  const faqs = [
    {
      question: "How do I request a referral?",
      answer: "When you find a job that is suitable to you, click on the 'Request Referral' button, fill in the required information, and submit your request."
    },
    {
      question: "How do I know if my referral request has been accepted?",
      answer: "Go to the 'Jobs applied' option to track the status of your requests. You will also receive SMS notifications about any updates."
    },
    {
      question: "Can I request multiple referrals at once?",
      answer: "Yes, you can request referrals for multiple job openings, but ensure you have referral credits and meet the requirements for each job."
    },
    {
      question: "Is my job selection guaranteed after getting a referral?",
      answer: "No, referrals are only to increase your chances of getting noticed by the employer. Shortlisting for interviews and selection is not guaranteed."
    },
    {
      question: "Within how many days will I get referred by an employee?",
      answer: "If the employee does not refer you within 5 days, your referral credits will be added back to your account."
    },
  ];

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
    <div className="max-w-4xl  mx-auto lg:mx-10   pt-24">
      <h1 className="text-2xl font-bold mb-6 pl-5">Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
    <JFooter/>
    </div>
  );
};

export default ReferralFAQ;
