import GuideinLogo from '../../../assets/GuideinLogo.png'
import { useEffect, useState,useRef } from 'react';
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
import axios from 'axios';
import config from '../../../config';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { MdError } from "react-icons/md";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const log = useSelector(state => state.emplog);
  const token = log.data.token;
  const [logoutConfirmation, setLogoutConfirmation] = useState(false);
  const modalRef = useRef(null);
  useEffect(() => {
    if(!token){
        navigate('/employee-login');
    }
},[token,navigate])

const decoded = token ? jwtDecode(token) : null;
const claim = decoded ? decoded.sub : null;
  const toggleSidebar = () => {
  setIsOpen(!isOpen);
};

const[errorMessage,setErrorMessage] = useState('');
const[completeProfileMessage,setProfileCompletionMessage] = useState('')
const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const fetchProfileMessage = () => {
    axios.get(`${config.api.baseURL}${config.api.jobPoster.getProfile}${claim}`, {
      headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
      },
  })
      .then(response => {
          if (response.status === 200) {
            setProfileCompletionMessage('') 
          }
          else if(response.status === 204){
            setProfileCompletionMessage('Complete profile to post a job')
          }
      })
      .catch(error => {
             if(error.response.status === 403) {
                setErrorMessage('session Expired')
                setTimeout(()=> {
                    setErrorMessage('');
                    handleLogout();
                },3000)
             }
             else {
                setErrorMessage('Error Fetching Data')
                setTimeout(()=> {
                    setErrorMessage('');
                },3000)
             }
          

      })
      
  }


  const fetchProfile = () => {
    axios.get(`${config.api.baseURL}${config.api.jobPoster.getProfile}${claim}`, {
      headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
      },
  })
      .then(response => {
          if (response.status === 200) {
            navigate('/wallet')
              
          }
          else if(response.status === 204){
           setErrorMessage(' Please complete profile before go to wallet');
           setTimeout(()=> {
            setErrorMessage('');
           },3000)

          }
      })
      .catch(error => {
         
             if(error.response.status === 403) {
                setErrorMessage('session Expired')
                handleLogout();
                setTimeout(()=> {
                    setErrorMessage('');
                },3000)
             }
             else {
                setErrorMessage('Error Fetching Data')
                setTimeout(()=> {
                    setErrorMessage('');
                },3000)
             }
          

      })
      
  }

const handleLogout = () => {
  dispatch(logoutEmployee());
  navigate('/employee-login');
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
fetchProfileMessage();
  },[])

  

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
return(
  <div className='bg-[#f8f9fa]  w-full fixed top-0 sm:left-0 py-8 md:bg-transparent md:relative md:py-0'>
     <button
        ref={buttonRef}
                className="absolute top-2 left-2 z-20 p-2 text-gray-900 bg-white rounded-md shadow-md xl:hidden"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            <div  ref={sidebarRef} className={`fixed top-0 left-0 h-full w-2.5/4 md:w-2/5 xl:w-1/5 transition-transform ${isOpen ? '' : '-translate-x-full'} bg-white xl:shadow-2xl xl:translate-x-0 dark:bg-gray-800`} aria-label="Sidebar">
                <div className="h-full p-5 pb-4 overflow-y-auto bg-white">
                    <div>
                        <Link to='/employee-home' ><img src={GuideinLogo} alt="logo"  className='h-8 mx-auto hidden lg:block'/></Link>
                    </div>
                    <ul className="space-y-5 font-medium pt-20">
                        <li>
                            <Link to='/employee-profile'
                                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg  border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">

                                <span> <CgProfile className='mx-2' /></span>
                                <span >Profile </span>
                               
                            </Link>
                            <div className='text-center'>
                              {completeProfileMessage && (  <p className='text-xs text-red-500 flex justify-center items-center mt-1'><MdError /><span>{completeProfileMessage}</span> </p>)}
                              </div>
                        </li>


                        <li>
                            <Link to='/employee-dashboard'
                                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg  border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="text-xl mr-1">
                                    <IoMdLaptop />
                                </span>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/job-post'
                                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg  border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="text-xl mr-1">
                                    <TiTickOutline />
                                </span>
                                <span>Jobs Posted</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/referrels-requested'
                                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg  border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="text-xl mr-1">
                                    <IoAlarmOutline />
                                </span>
                                <span>Referrals requested</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/referred-jobs'
                                className="flex items-center p-2 pl-2 text-gray-900 rounded-lg  border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="text-xl mr-1">
                                    <MdOutlineModelTraining />
                                </span>
                                <span>Referred jobs</span>
                            </Link>
                        </li>
                        <li>
                            <button onClick={fetchProfile}
                                className="flex items-center w-full p-2 pl-2 text-gray-900 rounded-lg  border shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span className="text-xl mr-1">
                                    <MdOutlineCurrencyRupee />
                                </span>
                                <span>Wallet</span>
                            </button>
                            {errorMessage && <span className='text-xsm text-red-500'>{errorMessage}</span>}
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
        <Link to='/employee-home'>
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
  export default SideBar;