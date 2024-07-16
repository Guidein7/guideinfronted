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

function ReferrelsRequested() {

    const log = useSelector(state => state.emplog);
    const token = log.data.token;
    const decoded = jwtDecode(token);
    const claim = decoded.sub;

    const [isOpen, setIsOpen] = useState(false);
    const [referrals, setReferrals] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const[errorMessage,setErrorMessage] = useState('')

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
                if(error.response.status === 403){
                    setErrorMessage('session expired')
                    setTimeout(() => {
                        setErrorMessage('');
                        handleLogout();
                    }, 2000);
                }
                else{
                    setErrorMessage('Error fetching data')
                    setTimeout(() => {
                        setErrorMessage('');
                       
                    }, 2000);
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
        <SideBar/>
            <div className='flex-grow pt-16 lg:pt-2 p-4 ml-0 xl:ml-[20%]'>

            {loading ? (
    <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-900">Loading...</p>
    </div>
) : (
    <div>
        <h1 className='font-bold bg-red mb-3'>Referrals Requested</h1>
        {errorMessage &&(<p className='text-red-500 p-2 fixed text-center bg-white'>{errorMessage}</p>)}
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

    );
}

export default ReferrelsRequested;
