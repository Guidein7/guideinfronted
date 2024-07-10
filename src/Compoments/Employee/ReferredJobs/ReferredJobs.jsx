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
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";
import config from '../../../config';
import SideBar from '../SideBar/SideBar';




function ReferredJobs() {
    const log = useSelector(state => state.emplog);
    const token = log.data.token;
    const decoded = jwtDecode(token);
    const claim = decoded.sub;
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false)
    const handleLogout = () => {
        // Dispatch the logout action
        dispatch(logoutEmployee());
        // Redirect to the login page after logout
        navigate('/employee-login');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const getReferredJobs = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobPoster.getAllReferredStatus}${claim}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        }).then(response => {
            console.log(response);
            setJobs(response.data.reverse())

        }).catch(error => console.log(error))
            .finally(() => setLoading(false));
    }




    useEffect(() => {
        getReferredJobs();

    }, [])

    const handleClick = (referredJob) => {
        navigate('/referred-job-details', { state: { referredJob } });
    };
    return (
        <div className='flex flex-col min-h-screen bg-[#f5faff]'>
            <SideBar/>
            <div className='flex-grow flex flex-col justify-between p-4 ml-0 xl:ml-[20%]'>
                <div className='flex-grow'>
                    <h1 className='font-bold mt-10'>Referred Jobs</h1>
                    {loading ? (
                        <div className="flex flex-col justify-center items-center h-screen">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                            <p className="mt-4 text-gray-900">Loading...</p>
                        </div>
                    ) : (
                        <div>
                            {jobs.length === 0 ? (
                                <p className='h-screen flex items-center justify-center font-bold'>No Referred jobs available at this moment.</p>
                            ) : (
                                <div>
                                    {jobs.map(referredJob => (
                                        <div key={referredJob.referralId} className='flex flex-col md:flex-row justify-between bg-white my-2 cursor-pointer p-4 md:p-6' onClick={() => handleClick(referredJob)} >
                                            <div className='flex flex-col space-y-2 md:space-y-0'>
                                                <p className='text-base md:text-lg'>{referredJob.candidateName}</p>
                                                <p className='text-sm md:text-base'>Referral For: {referredJob.referralFor}</p>
                                                <p className='text-sm md:text-base'>Experience: {referredJob.candidateExperience}</p>
                                            </div>
                                            <div className='flex flex-col space-y-2 md:space-y-0'>
                                                <p className='text-sm md:text-base'>Referral Requested On: {referredJob.requestedOn}</p>
                                                <p className='text-sm md:text-base'>Current Status: {referredJob.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}


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
    )
}

export default ReferredJobs;