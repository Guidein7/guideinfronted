import React from 'react';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import moneyicon from '../../../assets/moneyicon.png';
import profileicon from '../../../assets/profileicon.png';
import rewardicon from '../../../assets/rewardicon.png';
import step1 from '../../../assets/step1.png';
import step2 from '../../../assets/step2.png';
import step3 from '../../../assets/step3.png';
import step4 from '../../../assets/step4.png';
import step5 from '../../../assets/step5.png';

import './Landingpage.css'

import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import EFooter from './Footer';
const EmployeeLandingPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
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

    //bg-[#f8f9fa]
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
                to="/employee-register"
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`}
            >
                Join Now
            </Link>
            <Link
                to="/employee-login"
                className={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800  ${className}`}
            >
                Sign In
            </Link>
        </>
    );
    return (
        <div className='bg-[#f5faff] min-h-screen flex flex-col'>
            <nav className="bg-[#f8f9fa] py-4 w-full z-50 fixed">
                <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>
                    <div className='block lg:hidden'>
                        <button
                            ref={buttonRef}
                            className='text-dark focus:outline-none z-50 relative'
                            onClick={() => setShowSideNav(!showSideNav)}
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                    <div className='lg:block'>
                        <Link to='/employee-landingpage'>
                            <img src={GuideinLogo} alt='logo' className='h-8' />
                        </Link>
                    </div>
                    <div className='hidden lg:flex space-x-4'>
                        <NavLinks />
                    </div>
                </div>
            </nav>
            <div
                ref={sideNavRef}
                className={`side-nav fixed top-0 left-0 h-full w-40 bg-[#f8f9fa] shadow-lg z-40 flex flex-col transform transition-transform duration-300 ${showSideNav ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className='p-4 pt-16'>
                    <NavLinks className='flex flex-col my-4' />
                </div>
            </div>
            <div className='flex-grow pt-20'>
                <div className='grid grid-cols-1  lg:grid-cols-1 gap-4 items-center py-10 bg-custom-gradient'>
                    <div className='text-[#3E454B] font-inter py-2 text-center'>
                        <h1 className='text-xl lg:text-3xl font-bold'>
                            Partner with Guidein and earn money
                        </h1>
                        <h1 className='text-xl lg:text-3xl font-bold'>
                            by referring top talent
                        </h1>
                    </div>
                    <div className='text-center flex flex-col md:flex-row justify-center items-center gap-4'>
                        <Link to='/employee-register' className='text-white bg-[#244AD1] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 w-48 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                            Register now
                        </Link>
                        <Link to='/employee-login' className='text-[#244AD1] bg-[#FFFFFF] hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 w-48 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'>
                            Login in to Refer
                        </Link>
                    </div>
                </div>

                <div className='bg-[#F5F7FF] py-16'>
                    <div className='grid grid-cols-1 gap-2 md:gap-12'>
                        <h1 className='text-lg lg:text-2xl text-center'>Why should you  partner with Guidein?</h1>
                        <p className=' lg:text-lg text-center text-[#3E454B] mb-12'>Help job seekers and earn money with successful referrals</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-20">
                        <div className="flex flex-col md:flex-row  items-center p-8 rounded-xl bg-white w-full lg:h-[187px]">
                            <div className="mx-5 mb-2">
                                <img src={moneyicon} alt="money icon" width={64} height={64} />
                            </div>
                            <div className='text-center lg:text-left'>
                                <h1 className="text-lg text-[#244AD1] font-bold">Earn money</h1>
                                <p className='text-[#3E454B] text-base '>Earn money for every successful referral</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center p-8 rounded-xl bg-white w-full lg:h-[187px]">
                            <div className="mx-5 mb-2">
                                <img src={profileicon} alt="money icon" width={64} height={64} />
                            </div>
                            <div className=' text-center lg:text-left'>
                                <h1 className="text-lg text-[#244AD1] font-bold">Help  job seekers</h1>
                                <p className='text-[#3E454B] text-base'>Help deserving candidates find their dream jobs</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row  items-center p-8 rounded-xl bg-white w-full lg:h-[187px]">
                            <div className="mx-5 mb-2">
                                <img src={rewardicon} alt="money icon" width={64} height={64} />
                            </div>
                            <div className='text-center lg:text-left'>
                                <h1 className="text-lg text-[#244AD1] font-bold ">Recognition</h1>
                                <p className='text-[#3E454B] text-base '>Gain recogniton with your company for bringing in qualified talent</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='bg-custom-gradient grid gap-12 grid-cols-1'>
                    <h1 className='text-[#16191C] text-2xl mt-12 text-center font-bold'>How it Works?</h1>
                    <div className='text-base text-[#16191C]'>
                        <p className='text-center'>Ready to start Referring?</p>
                        <p className='text-center'>Sign up now and start earning by helping jobseekers get their dream jobs!  </p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-10 md:mx-20 mb-12'>
                        <div className='bg-white p-8 rounded-xl flex flex-col justify-center  items-center gap-4 lg:h-72'>
                            <div >
                                <img src={step1} alt='step1' width={64} height={64} />
                            </div>
                            <div className='flex flex-col gap-4 justify-center items-center '>
                                <p className='text-lg text-[#3E454B] font-bold' >Step 1</p>
                                <div className='flex flex-col gap-2 justify-center items-center'>
                                    <p className='text-base text-[#3E454B] font-bold' >Sign Up</p>
                                    <p className='text-justify md:text-center text-base text-[#3E454B]' >Create an account and join in network of  professionals</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-8 rounded-xl flex flex-col justify-center  items-center gap-4 lg:h-72'>
                            <div >
                                <img src={step2} alt='step2' width={64} height={64} />
                            </div>
                            <div className='flex flex-col gap-4 justify-center items-center '>
                                <p className='text-lg text-[#3E454B] font-bold' >Step 2</p>
                                <div className='flex flex-col gap-2 justify-center items-center'>
                                    <p className='text-base text-[#3E454B] font-bold' >Post a Job</p>
                                    <p className='text-justify md:text-center text-base text-[#3E454B]' >List job openings from your company on our platfrom for jobseekers to view</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-8 rounded-xl flex flex-col justify-center  items-center gap-4 lg:h-72'>
                            <div >
                                <img src={step3} alt='step3' width={64} height={64} />
                            </div>
                            <div className='flex flex-col gap-4 justify-center items-center'>
                                <p className='text-lg text-[#3E454B] font-bold' >Step 3</p>
                                <div className='flex flex-col gap-2 justify-center items-center'>
                                    <p className='text-base text-[#3E454B] font-bold' >Browse Referral Requests</p>
                                    <p className='text-justify md:text-center text-base text-[#3E454B]' >View requests from job seekers who need referrals to your company</p>
                                </div>
                            </div>
                        </div>
                            <div className='bg-white p-8 rounded-xl flex flex-col justify-center  items-center gap-4 lg:h-72  '>
                                <div >
                                    <img src={step4} alt='step4' width={64} height={64} />
                                </div>
                                <div className='flex flex-col gap-4 justify-center items-center'>
                                    <p className='text-lg text-[#3E454B] font-bold' >Step 4</p>
                                    <div className='flex flex-col gap-2 justify-center items-center'>
                                        <p className='text-base text-[#3E454B] font-bold' >Refer Candidates</p>
                                        <p className='text-justify md:text-center text-base text-[#3E454B]' >Review candidate details and submit referrals to your company's portal or HR. Upload proof of referral to our platform.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white p-8 rounded-xl flex flex-col justify-center   items-center gap-4 lg:h-72   '>
                                <div >
                                    <img src={step5} alt='step5' width={64} height={64} />
                                </div>
                                <div className='flex flex-col gap-4 justify-center items-center'>
                                    <p className='text-lg text-[#3E454B] font-bold' >Step 5</p>
                                    <div className='flex flex-col gap-2 justify-center items-center'>
                                        <p className='text-base text-[#3E454B] font-bold' >Earn Money</p>
                                        <p className='text-justify md:text-center text-base text-[#3E454B]' >Once the referral is validated, money is credited to your Guidein wallet.</p>
                                    </div>
                                </div>
                            </div>
                    </div>
           

                </div>
            </div>


            <EFooter />
        </div>
    )
}

export default EmployeeLandingPage;
