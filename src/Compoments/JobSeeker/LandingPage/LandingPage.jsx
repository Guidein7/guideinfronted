import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import guideinLandingPage from '../../../assets/guideinLandingPage.png';

const LandingPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleEarnMoneyClick = () => {
        window.open('/employee-landingpage', '_blank');
    };

    const NavLinks = ({ handleEarnMoneyClick }) => (
        <>
            <button
                onClick={handleEarnMoneyClick}
                className="bg-blue-700 text-white p-2 rounded-lg "
            >
                Earn Money
            </button>
            <Link
                to="/register"
                className="bg-blue-700 text-white p-2 rounded-lg "
            >
                Join Now
            </Link>
            <Link
                to="/login"
                className="bg-blue-700 text-white p-2 rounded-lg "
            >
                Sign In
            </Link>
        </>
    );

    return (
        <div>
            <nav className="bg-[#f8f9fa] py-4">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <div className="block lg:hidden">
                        <button
                            className="text-dark focus:outline-none"
                            onClick={toggleNavbar}
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button>
                        {isOpen && (
                            <div className="flex flex-col mt-2 space-y-1">
                                <NavLinks handleEarnMoneyClick={handleEarnMoneyClick} />
                            </div>
                        )}
                    </div>
                    <div className="lg:block">
                        <Link to="/">
                            <img src={GuideinLogo} alt="Logo" className="h-8" />
                        </Link>
                    </div>
                    <div className="lg:flex items-center hidden space-x-4">
                        <NavLinks handleEarnMoneyClick={handleEarnMoneyClick} />
                    </div>
                </div>
            </nav>
            <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between pt-16">
                <div className='flex flex-col justify-between items-center'>
                    <div className='text-center  lg:p-6'>
                        <h1 className='font-bold text-lg mb-1'>To Get Referral</h1>
                        <Link to='/subscribe' className='bg-blue-700 text-white p-2 rounded-lg'>Subscribe Now</Link>
                    </div>
                    <div className="flex justify-center items-center  lg:p-6 ">
                        <img src={guideinLandingPage} alt="Landing Page" className=" h-auto max-w-full" />
                    </div>
                </div>

                <footer className="bg-[#00145e] w-full p-4">
                    <div className="sm:mx-auto max-w-screen-lg">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-white justify-self-start">
                                <h2>Company</h2>
                                <p>About us</p>
                            </div>
                            <div className="text-white justify-self-end">
                                <h2>Help & Support</h2>
                                <p>Contact Us</p>
                            </div>
                        </div>
                        <div className="text-white text-center mt-4">
                            <p>Copyright &copy; 2024</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
};

export default LandingPage;


