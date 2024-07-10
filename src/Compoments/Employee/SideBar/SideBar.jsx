

import GuideinLogo from '../../../assets/GuideinLogo.png'
import { useEffect, useState } from 'react';
import { MdOutlineCurrencyRupee, MdPolicy } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { IoAlarmOutline } from "react-icons/io5";
import { MdOutlineModelTraining } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { logoutEmployee } from '../slices/employeeLoginSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLaptop } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowRoundDown } from "react-icons/io";
import axios from 'axios';
import config from '../../../config';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const log = useSelector(state => state.emplog);
  const token = log.data.token;
  const decoded = jwtDecode(token);
  const claim = decoded.sub;
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
};

const[errorMessage,setErrorMessage] = useState('')

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
          else if(response.status === 204){
           setErrorMessage(' please complete profile before go to wallet');
           setTimeout(()=> {
            setErrorMessage('');
           },3000)

          }
      })
      .catch(error => {
         
              console.error('Error fetching profile:', error);
          

      })
      
  }

const handleLogout = () => {
  
  dispatch(logoutEmployee());
  navigate('/employee-login');
};
return(
  <div>
     <button
                className="absolute top-2 left-2 z-20 p-2 text-gray-900 bg-white rounded-md shadow-md xl:hidden"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            <div className={`fixed top-0 left-0 h-full w-3/4 md:w-2/5 xl:w-1/5 transition-transform ${isOpen ? '' : '-translate-x-full'} bg-white xl:shadow-2xl xl:translate-x-0 dark:bg-gray-800`} aria-label="Sidebar">
                <div className="h-full p-5 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <div>
                        <Link to='/employee-home' ><img src={GuideinLogo} alt="logo"  className='h-8 mx-auto'/></Link>
                    </div>
                    <ul className="space-y-5 font-medium pt-5">
                        <li>
                            <Link to='/employee-profile'
                                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg dark:text-white border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">

                                <span> <CgProfile className='mx-2' /></span>
                                <span>Profile </span>
                            </Link>
                        </li>


                        <li>
                            <Link to='/employee-dashboard'
                                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg dark:text-white border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="text-xl mr-1">
                                    <IoMdLaptop />
                                </span>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/job-post'
                                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg dark:text-white border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="text-xl mr-1">
                                    <TiTickOutline />
                                </span>
                                <span>Jobs Posted</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/referrels-requested'
                                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg dark:text-white border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="text-xl mr-1">
                                    <IoAlarmOutline />
                                </span>
                                <span>Referrals requested</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/referred-jobs'
                                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg dark:text-white border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="text-xl mr-1">
                                    <MdOutlineModelTraining />
                                </span>
                                <span>Referred jobs</span>
                            </Link>
                        </li>
                        <li>
                            <button onClick={fetchProfile}
                                className="flex items-center w-full p-2 pl-2 text-gray-900 rounded-lg dark:text-white border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="text-xl mr-1">
                                    <MdOutlineCurrencyRupee />
                                </span>
                                <span>Wallet</span>
                            </button>
                            {errorMessage && <span className='text-xsm text-red-500'>{errorMessage}</span>}
                        </li>
                        <li>
                            <a
                                onClick={handleLogout}
                                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg dark:text-white border shadow-xl hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700 group">
                                <span className="text-xl mr-2">
                                    <HiOutlineLogout />
                                </span>
                                <span>Log Out</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
  </div>
)


  }
  export default SideBar;