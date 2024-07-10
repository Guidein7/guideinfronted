import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import AdminNavBar from '../NavBar/AdminNavBar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import config from '../../../config';

const AdminHome = () => {
  const log = useSelector(state => state.adminlog);
  const token = log.data.token;
  const [showSideNav, setShowSideNav] = useState(false);
  const sideNavRef = useRef(null);
  const buttonRef = useRef(null);
  const[data,setdata] = useState({});
  const[loading,setLoading] = useState(false);

  const NavLinks = ({ className }) => (
    <div className={className}>
      <button className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Referrals</button>
      <button className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Wallet</button>

    </div>
  );

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

  const getDashboardDetails = () => {
    setLoading(true);
    axios.get(`${config.api.baseURL}${config.api.admin.adminDashboard}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420"
      },
    }).then(response => {
      console.log(response)
      setdata(response.data)
    }).catch(error => {
      console.log(error)
    }).finally(() => setLoading(false))
  }

  useEffect(() => {
    getDashboardDetails();
  },[])
 

  return (
    <div className='bg-[#f5faff] min-h-screen flex flex-col'>
      <AdminNavBar/>
      <div className='flex  justify-center  '>
        {loading ? ( <div className="flex flex-col justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                <p className="mt-4 text-gray-900">Loading...</p>
            </div>):(
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-36 mt-5 lg:mt-20'>
          <div className='bg-white rounded-lg p-4 my-2 h-auto'>
            <h1 className='font-bold text-lg text-center'>Jobseeker</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:space-x-10 mt-5'>
              <div className='text-center'>
                <Link to='/registered-users' className='font-bold text-center text-purple-500 cursor-pointer my-2'>Registered Users</Link>
                <p className='bg-purple-200 w-10 h-10 rounded-full flex justify-center items-center mx-auto'>{data.totalRegisteredJobSeekers}</p>
              </div>
              <div className='text-center'>
                <Link to='/subscribed-users' className='font-bold text-center text-purple-500 cursor-pointer my-2'>Subscribed Users</Link>
                <p className='bg-purple-200 w-10 h-10 rounded-full flex justify-center items-center mx-auto'>{data.totalSubscribedUsers}</p>
              </div>
            </div>
          </div>
          <div className='bg-white p-4 my-2 h-auto'>
            <h1 className='font-bold text-lg text-center'>Employee</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:space-x-10 mt-5 h-auto'>
              <div className='text-center my-2'>
                <Link to='/registered-employees' className='font-bold text-purple-500 cursor-pointer '>Registered Users</Link>
                <p className='bg-purple-200 rounded-full w-10 h-10 flex justify-center items-center mx-auto'>{data.totalRegisteredJobPosters}</p>
              </div>
              <div className='text-center my-2'>
                <Link to='/jobs-posted' className='font-bold text-purple-500 cursor-pointer'>Jobs Posted</Link>
                <p className='bg-purple-200 rounded-full w-10 h-10 flex justify-center items-center mx-auto'>{data.totalJobPosted}</p>

              </div>
             
            </div>
            <div className=' mt-2'>
              <div className='text-center'>
              <Link to='/disabled-jobs' className='font-bold text-purple-500 cursor-pointer text-center'>Disabled Jobs</Link>
                <p className='bg-purple-200 rounded-full w-10 h-10 flex justify-center items-center mx-auto'>{data.totalDisabledJobs}</p>
                </div>

             </div>
            
          </div>
          
        </div>)}

</div>
<div className='flex flex-grow'>

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
  );
};

export default AdminHome;
