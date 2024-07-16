

// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import GuideinLogo from '../../../assets/GuideinLogo.png';
// import { logoutUser } from "../Slices/loginSlice";
// import { useDispatch } from 'react-redux';

// const NavBar = () => {
//     const [showSideNav, setShowSideNav] = useState(false);
//     const sideNavRef = useRef(null);
//     const buttonRef = useRef(null);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const NavLinks = ({ className }) => (
//         <div className={className}>
//             <Link to='/dashboard' className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Dashboard</Link>
//             <Link to='/search-jobs' className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Search Jobs</Link>
//             <Link to='/saved-jobs' className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Saved Jobs</Link>
//             <Link to='/applied-referrals' className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Applied Referrals</Link>
//             <Link to='/profile' className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Profile</Link>
//             <button onClick={handleLogout} className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg text-start'>Logout</button>

//         </div>
//     );

//     const handleLogout = () => {
//         dispatch(logoutUser());
//         navigate('/login');  
//     };

//     const handleClickOutside = (event) => {
//         if (
//             sideNavRef.current &&
//             !sideNavRef.current.contains(event.target) &&
//             !buttonRef.current.contains(event.target)
//         ) {
//             setShowSideNav(false);
//         }
//     };

//     useEffect(() => {
//         if (showSideNav) {
//             document.addEventListener('mousedown', handleClickOutside);
//         } else {
//             document.removeEventListener('mousedown', handleClickOutside);
//         }
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [showSideNav]);

//     return (
//         <div className='bg-[#f5faff]'>
//             <nav className="bg-[#f8f9fa] py-4  fixed w-full z-50">
//                 <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>
//                     <div className='block lg:hidden'>
//                         <button
//                             ref={buttonRef}
//                            className='text-dark focus:outline-none fixed top-4 left-4 z-50'
//                             onClick={() => setShowSideNav(!showSideNav)}
//                         >
//                             <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//                             </svg>
//                         </button>
//                     </div>
//                     <div className='lg:block'>
//                         <Link to='/home'>
//                             <img src={GuideinLogo} alt='logo' className='h-8' />
//                         </Link>
//                     </div>
//                     <NavLinks className='nav-links hidden lg:flex' />
//                 </div>
//             </nav>
//             <div
//                 ref={sideNavRef}
//                 className={`side-nav fixed top-0 left-0 h-full w-48 bg-[#f8f9fa] shadow-lg z-40 flex flex-col transform transition-transform duration-300 ${showSideNav ? 'translate-x-0' : '-translate-x-full'}`}
//             >
//                 <div className='p-4 pt-16'> {/* Adjusted padding to push content down */}
//                     <NavLinks className='flex flex-col' />
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default NavBar;


import GuideinLogo from '../../../assets/GuideinLogo.png'
import { useEffect, useState,useRef } from 'react';
import { MdOutlineCurrencyRupee, MdPolicy } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { IoAlarmOutline } from "react-icons/io5";
import { MdOutlineModelTraining } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { logoutUser } from "../Slices/loginSlice";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLaptop } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowRoundDown } from "react-icons/io";
import axios from 'axios';
import config from '../../../config';
import { useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import { IoMdSearch } from "react-icons/io";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const log = useSelector(state => state.log);
  const token = log.data.token;
  const decoded = jwtDecode(token);
  const claim = decoded.sub;

  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [errorMessage, setErrorMessage] = useState('');

  const fetchProfile = () => {
    axios.get(`${config.api.baseURL}${config.api.jobPoster.getProfile}${claim}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      },
    })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          navigate('/wallet')
        }
        else if (response.status === 204) {
          setErrorMessage(' please complete profile before go to wallet');
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current && 
      !sidebarRef.current.contains(event.target) && 
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className='bg-[#f8f9fa] z-40 md:z-0 w-full fixed top-0 sm:left-0 py-8 md:bg-transparent md:relative md:py-0'>
      <button
      ref={buttonRef}
        className="fixed top-2 left-2 z-50 p-2  text-gray-900 bg-white rounded-md  shadow-md xl:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <div  ref={sidebarRef} className={`fixed top-0 left-0 h-full w-2/4 md:w-2/5 xl:w-1/5 z-40 transition-transform ${isOpen ? '' : '-translate-x-full'} bg-white xl:shadow-2xl xl:translate-x-0 dark:bg-gray-800`} aria-label="Sidebar">
        <div className="h-full p-5  pb-4 overflow-y-auto bg-white ">
          <div>
            <Link to='/home'><img src={GuideinLogo} alt="logo" className='h-8 mx-auto hidden lg:block' /></Link>
          </div>
          <ul className="space-y-5 font-medium pt-20">
            <li>
              <Link to='/profile'
                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg  border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span><CgProfile className='mx-2' /></span>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to='/dashboard'
                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg  border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="text-xl mr-1">
                  <IoMdLaptop />
                </span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to='/search-jobs'
                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg  border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="text-xl mr-1">
                  <IoMdSearch />
                </span>
                <span>Search Jobs</span>
              </Link>
            </li>
            <li>
              <Link to='/saved-jobs'
                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg  border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="text-xl mr-1">
                  <IoAlarmOutline />
                </span>
                <span>Saved Jobs</span>
              </Link>
            </li>
            <li>
              <Link to='/applied-referrals'
                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg  border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="text-xl mr-1">
                  <MdOutlineModelTraining />
                </span>
                <span>Applied Jobs</span>
              </Link>
            </li>
            <li>
              <a
                onClick={handleLogout}
                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg  border shadow-xl hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700 group">
                <span className="text-xl mr-2">
                  <HiOutlineLogout />
                </span>
                <span>Log Out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="fixed top-2 right-2 z-20 xl:hidden">
        <Link to='/home'>
          <img src={GuideinLogo} alt="logo" className='h-8' />
        </Link>
      </div>
    </div>
  )
}
export default NavBar;
