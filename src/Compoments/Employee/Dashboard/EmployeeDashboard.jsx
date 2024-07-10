import GuideinLogo from '../../../assets/GuideinLogo.png'
import { useEffect, useState } from 'react';
import { MdOutlineCurrencyRupee, MdPolicy } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { IoAlarmOutline } from "react-icons/io5";
import { MdOutlineModelTraining } from "react-icons/md";
import { PiGlobe } from "react-icons/pi";
import { IoFlashOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { logoutEmployee } from '../slices/employeeLoginSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLaptop } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import axios from 'axios';
import config from '../../../config';
import SideBar from '../SideBar/SideBar';

function EmployeeDashboard() {
    const log = useSelector(state => state.emplog);
    const token = log.data.token;
    const decoded = jwtDecode(token);
    const claim = decoded.sub;
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[loading,setLoading] = useState(false)
    const[dashboardDetails,setDashboardDetails] =useState({})

    const handleLogout = () => {
        dispatch(logoutEmployee());
        navigate('/employee-login');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const getDashboardDetails = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobPoster.getDashBoardDetails}${claim}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        }
        ).then(response => {
            console.log(response)
            setDashboardDetails(response.data)
        }).catch(error => {
            console.log(error)
        })
            .finally(() => setLoading(false))
    }
    useEffect(() => {
getDashboardDetails();
    },[])

    return (
        <div className='flex flex-col min-h-screen bg-[#f5faff]'>
        <SideBar/>
                <div className='flex-grow flex flex-col justify-between p-4 ml-0 xl:ml-[20%]'>
                <h1 className='font-bold ml-24 text-2xl'>Dashboard</h1>
                {loading ? ( <div className="flex flex-col justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                <p className="mt-4 text-gray-900">Loading...</p>
            </div>): (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center items-center lg:my-5'>
        <div className='bg-white p-5 mx-2'>
            <h1 className='font-bold text-center text-lg'>Total Jobs Posted</h1>
            <h1 className='font-bold text-center text-lg'>{dashboardDetails.totalJobPosted}</h1>
            
        </div>
        <div className='bg-white p-5 mx-2'>
            <h1 className='font-bold text-center text-lg'>Active Jobs</h1>
            <h1 className='font-bold text-center text-lg'>{dashboardDetails.activeJobs}</h1>
        </div>
        <div className='bg-white p-5 mx-2'>
            <h1 className='font-bold text-center text-lg'>Jobs Expired</h1>
            <h1 className='font-bold text-center text-lg'>{dashboardDetails.jobsExpired}</h1>
        </div>
        <div className='bg-white p-5 mx-2'>
            <h1 className='font-bold text-center text-lg'>Total Referral Requests</h1>
            <h1 className='font-bold text-center text-lg'>{dashboardDetails.totalReferralRequests}</h1>
        </div>
        <div className='bg-white p-5 mx-2'>
            <h1 className='font-bold text-center text-lg'>Referred Successful</h1>
            <h1 className='font-bold text-center text-lg'>{dashboardDetails.referralSuccessful}</h1>
        </div>
        <div className='bg-white p-5 mx-2'>
            <h1 className='font-bold text-center text-lg'>Referral Rejected</h1>
            <h1 className='font-bold text-center text-lg'>{dashboardDetails.referralRejected}</h1>
        </div>
    </div>
                )}
    <div className='text-center'>
    <p className='font-bold text-lg mb-1'>To Earn Money</p>
    <Link  to='/job-post'className='bg-blue-700 p-2 text-white rounded'>Post a Job</Link>
    </div>
                </div>
                <footer className="bg-[#00145e]  p-4 ml-0 xl:ml-[20%]">
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
        
    );
}

export default EmployeeDashboard;
