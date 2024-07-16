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
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLaptop } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { CgProfile } from "react-icons/cg";
import config from '../../../config';
import SideBar from '../SideBar/SideBar';

function EmployeeHome() {
    const log = useSelector(state => state.emplog);
    const token = log.data.token;
    const decoded = jwtDecode(token);
    const claim = decoded.sub;
    const [isOpen, setIsOpen] = useState(false);
    const [referrals, setReferrals] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogout = () => {
        dispatch(logoutEmployee());
        navigate('/employee-login');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const getRequests = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobPoster.getRequestedReferrals}${claim}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },

        }).then(response => {
            setReferrals(response.data)

        }).catch(error => {
            if (error.response.status === 403) {
                setError('session Expired');
                setTimeout(() => {
                    setError('');
                    handleLogout();
                }, 2000)

            }
            else {
                setError('Error occured')
                setTimeout(() => {
                    setError('');
                    handleLogout();
                }, 2000)
            }
        })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getRequests();
    }, [])

    const handleClick = (candidate) => {
        navigate('/candidate-details', { state: { candidate } });
    };

    return (
        <div className='flex flex-col min-h-screen bg-[#f5faff]'>
            <SideBar />
            <div className='flex-grow flex flex-col  pt-20 lg:pt-10 ml-0 xl:ml-[20%]'>

                {loading ? (
                    <div className="flex flex-col justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-gray-900">Loading...</p>
                    </div>
                ) : (
                    <div>
                        <div className='text-center mb-6 '>
                            {error && (<p className='text-red-500 text-center fixed w-full bg-white z-10'>{error}</p>)}
                            <h1 className='font-bold text-lg mb-2'>To Earn Money</h1>
                            <Link to='/job-post' className='bg-blue-700 hover:bg-blue-800 text-white px-10 py-2 rounded mr-2'>Post a Job</Link>
                        </div>
                        <h1 className='font-bold bg-red mb-3 mx-2'>Referrals Requested</h1>
                        {referrals.length === 0 ? (
                            <p className='flex items-center justify-center h-screen font-bold'>No referrals are available at the moment</p>
                        ) : (
                            <div>
                                {referrals.map((candidate,index) => (
                                    <div
                                        key={index}
                                        className='bg-white p-4 rounded shadow-md mb-2 mx-2 cursor-pointer'
                                        onClick={() => handleClick(candidate)}
                                    >
                                        <p className='font-bold'>Requested by: {candidate.candidateName}</p>
                                        <p>Referral for: <span className=''>{candidate.referralFor}</span></p>
                                        <p>Candidate experience: {candidate.candidateExperience}</p>
                                        <p>Requested On: {candidate.requestedOn}</p>

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <footer className="bg-[#00145e]  p-1 ml-0 xl:ml-[20%]">
                <div className="sm:mx-auto max-w-screen-lg">
                    <div className="grid grid-cols-2 gap-4 ">
                        <div className="text-white justify-self-start">

                        </div>
                        <div className="text-white justify-self-end">
                            <h2 className='pr-2'>Help & Support</h2>
                            <Link to='/econtactus' className='pl-2'>Contact Us</Link>
                        </div>
                    </div>
                    <div className="text-white text-center ">
                        <p>Copyright &copy; 2024</p>
                    </div>
                </div>
            </footer>

        </div>
    )
}
export default EmployeeHome;