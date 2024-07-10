

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import { logoutUser } from "../Slices/loginSlice";
import { useDispatch } from 'react-redux';

const NavBar = () => {
    const [showSideNav, setShowSideNav] = useState(false);
    const sideNavRef = useRef(null);
    const buttonRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const NavLinks = ({ className }) => (
        <div className={className}>
            <Link to='/dashboard' className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Dashboard</Link>
            <Link to='/search-jobs' className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Search Jobs</Link>
            <Link to='/saved-jobs' className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Saved Jobs</Link>
            <Link to='/applied-referrals' className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Applied Referrals</Link>
            <Link to='/profile' className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Profile</Link>
            <button onClick={handleLogout} className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg text-start'>Logout</button>

        </div>
    );

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');  
    };

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

    return (
        <div className='bg-[#f5faff]'>
            <nav className="bg-[#f8f9fa] py-4  fixed w-full z-50">
                <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>
                    <div className='block lg:hidden'>
                        <button
                            ref={buttonRef}
                           className='text-dark focus:outline-none fixed top-4 left-4 z-50'
                            onClick={() => setShowSideNav(!showSideNav)}
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                    <div className='lg:block'>
                        <Link to='/home'>
                            <img src={GuideinLogo} alt='logo' className='h-8' />
                        </Link>
                    </div>
                    <NavLinks className='nav-links hidden lg:flex' />
                </div>
            </nav>
            <div
                ref={sideNavRef}
                className={`side-nav fixed top-0 left-0 h-full w-48 bg-[#f8f9fa] shadow-lg z-40 flex flex-col transform transition-transform duration-300 ${showSideNav ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className='p-4 pt-16'> {/* Adjusted padding to push content down */}
                    <NavLinks className='flex flex-col' />
                </div>
            </div>
        </div>
    )
}
export default NavBar;