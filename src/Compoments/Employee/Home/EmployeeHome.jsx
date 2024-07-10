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
            console.log(response)
        }).catch(error => console.log(error))
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
       <SideBar/>
            <div className='flex-grow flex flex-col  p-4 ml-0 xl:ml-[20%]'>

            {loading ? (
    <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-900">Loading...</p>
    </div>
) : (
    <div>
        <div className='text-center mb-2 mt-2'>
        <h1 className='font-bold text-lg mb-2'>To Earn Money</h1>
        <Link to='/job-post' className='bg-blue-700 text-white p-2 rounded'>Post a Job</Link>
        </div>
        <h1 className='font-bold bg-red mb-3'>Referrals Requested</h1>
        {referrals.length === 0 ? (
            <p className='flex items-center justify-center h-screen font-bold'>No referrals are available at the moment</p>
        ) : (
            <div>
                {referrals.map(candidate => (
                    <div 
                        key={candidate.jobId} 
                        className='bg-white p-4 rounded shadow-md mb-2 cursor-pointer'
                        onClick={() => handleClick(candidate)} 
                    >
                        <p>{candidate.candidateName}</p>
                        <p>Referral for: <span className='underline'>{candidate.referralFor}</span></p>
                        <p>Candidate experience: {candidate.candidateExperience}</p>
                        <p>Requested On: {candidate.requestedOn}</p>

                    </div>
                ))}
            </div>
        )}
    </div>
)}
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
export default EmployeeHome;