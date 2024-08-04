
import GuideinLogo from '../../../assets/GuideinLogo.png'
import { useEffect, useState, useRef } from 'react';
import { IoAlarmOutline } from "react-icons/io5";
import { MdOutlineModelTraining } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { logoutUser } from "../Slices/loginSlice";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLaptop } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useSelector } from 'react-redux';
import { IoMdSearch } from "react-icons/io";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const log = useSelector(state => state.log);
  const token = log.data.token;
  

  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const modalRef = useRef(null);
  const [logoutConfirmation, setLogoutConfirmation] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };




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

  const logoutModal = () => {
    toggleSidebar();
    setLogoutConfirmation(true);
  }

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
      <div ref={sidebarRef} className={`fixed top-0 left-0 h-full w-2/4 md:w-2/5 xl:w-1/5 z-40 transition-transform ${isOpen ? '' : '-translate-x-full'} bg-white xl:shadow-2xl xl:translate-x-0 dark:bg-gray-800`} aria-label="Sidebar">
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
                onClick={logoutModal}
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

      {logoutConfirmation && (
        <div ref={modalRef} className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center px-2">
          <div className="bg-white p-5 rounded shadow-md w-full max-w-md relative">
            <div className="text-center mt-2">
              <p>Are you sure you want to logout?</p>
              <div className='my-2'>
             
              <button className="border border-black  px-4 py-1.5 rounded mr-2" onClick={() => setLogoutConfirmation(false)}>Close</button>
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded mr-2" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default NavBar;
