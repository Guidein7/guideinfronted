import { useState,useEffect,useRef } from 'react';
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import EFooter from './Footer';


const FAQ = () => {
  const faqs = [
    {
      question: "How do I refer a candidate?",
      answer: "Once you find a suitable candidate, click on the 'Refer' button, download their resume, and follow your company’s referral process. Then, upload the referral proof in the 'Submit Referral Proof' section."
    },
    {
      question: "What proof is required for a referral?",
      answer: "You can upload HR email confirmations, screenshots from your company's referral portal showing candidate is referred, or any document that validates your referral. Ensure the proof is genuine, as all referrals will be validated by our internal team."
    },
    {
      question: "How much will I earn for a successful referral?",
      answer: "You will earn ₹450 for every successful referral, irrespective of the candidate's selection status but only upon referral proof is validated."
    },
    {
      question: "Is there a deadline to refer a candidate after receiving a referral request?",
      answer: "Yes, you must refer the candidate within 5 days of receiving the referral request. If you are not able to refer within 7 days referral request will be deleted from your account."
    },
    {
      question: "How can I withdraw my earnings?",
      answer: "In the 'Wallet' section, you can withdraw your earnings at any time. You are allowed one withdrawal per day, and the amount will be transferred only to UPI IDs."
    },
  ];
  const [showSideNav, setShowSideNav] = useState(false);
    const sideNavRef = useRef(null);
    const buttonRef = useRef(null);
   

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
        window.open('/', '_blank');
    };

    const NavLinks = ({ className = '' }) => (
        <>
            <button
                onClick={handleEarnMoneyClick}
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`}
            >
                Get Referral
            </button>
            <Link
                type=""
                to="/employee-register"
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`}
            >
                Join Now
            </Link>
            <Link
                to="/employee-login"
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
                <Link to='/employee-landingpage'>
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
    <div className="max-w-4xl mx-auto lg:mx-10 pt-20">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
    <EFooter/>
    </div>
  );
};

export default FAQ;
