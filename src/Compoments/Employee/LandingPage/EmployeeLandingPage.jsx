import React from 'react';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const EmployeeLandingPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between">
            <nav className="bg-[#f8f9fa] py-4">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    {/* Navbar toggle Link for small screens */}
                    <div className="block lg:hidden">
                        <Link
                            className="text-dark focus:outline-none "
                            onClick={toggleNavbar}
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>

                        </Link>
                        {
                            isOpen && (
                                <div className=''>
                                    <div className="flex flex-col">
                                        
                                        <Link to='/employee-register' className="bg-blue-700 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline my-1">
                                            Join Now
                                        </Link>
                                        <Link to='/employee-login' className="bg-blue-700 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    {/* Logo */}
                    <div className=" lg:block">
                        < Link to='/employee-landingpage' > <img src={GuideinLogo} alt="Logo" className="h-8" /> </Link>
                    </div>

                    {/* Navigation links */}
                    <div className="lg:flex items-center hidden ">
                        <div className="flex  flex-row space-x-4">
                           
                            <Link to='/employee-register' className="bg-blue-700 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Join Now
                            </Link>
                            <Link to='/employee-login' className="bg-blue-700 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Sign In
                            </Link>
                        </div>
                    </div>

                </div>
            </nav>
            <div className="sm:mx-auto  max-w-screen-lg  rounded ">

                <p className=" my-2 bg-blue-100 text-justify p-4">
                    while the journey to securing a job call may be fraught with challenges and uncertainties, it is also a testament to the resilience and determination of individuals striving to carve out their place in the professional world. By embracing change, honing their skills, and cultivating a resilient mindset, job seekers can navigate the complexities of today’s job market and ultimately land that transformative call that heralds the beginning of a new chapter in their careers.
                </p>

            </div>
            <div className='flex flex-col justify-center items-center  lg:h-1/2 mb-2'>
                <div>
                    <h1 className='text-2xl font-bold  my-2'>To Earn Money</h1>
                </div>
                <div>
                    <Link to='/employee-login' className="bg-blue-700 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
                        Post  a Job
                    </Link>
                </div>
            </div>
            <div className="bg-[#00145e]  w-full p-4 ">
                <footer className=' sm:mx-auto max-w-screen-lg'>
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
                        <p>Copyright &copy; 2024</p>
                    </div>
                </footer>
            </div>


        </div>
    )
}

export default EmployeeLandingPage;
