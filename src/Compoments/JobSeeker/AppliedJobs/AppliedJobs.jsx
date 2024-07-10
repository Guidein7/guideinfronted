import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import { logoutUser } from '../Slices/loginSlice';
import { useDispatch } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import config from '../../../config';

function AppliedJobs() {
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const decoded = jwtDecode(token);
    const email = decoded.sub;
    const [job, setJobs] = useState([])
    const [loading, setLoading] = useState(false)

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login');
        dispatch(logoutUser());
    };

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const appliedJobs = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobSeeker.appliedReferralStatus}${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        }
        ).then(response => {
            console.log(response);
            setJobs(response.data)

        })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        appliedJobs();
    }, [])
    const handleClick = (status) => {
        navigate('/applied-referral-details', { state: { status } });//
    };

    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between">
            <NavBar />
            <div className='flex flex-grow flex-col pt-24'>

                <h1 className='font-bold m-2 text-lg'>Applied Jobs</h1>
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-gray-900">Loading...</p>
                    </div>
                ) : (
                    <div>
                        {job.length === 0 ? (
                            <p>No jobs applied yet.</p>
                        ) : (
                            <div>
                                {job.map((status, index) => (
                                    <div key={index} className="bg-white p-4 rounded shadow-md mb-2 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer" onClick={() => handleClick(status)}>
                                        <div className="mb-4 md:mb-0">
                                            <h2 className='text-lg font-semibold'>{status.jobTitle}</h2>
                                            <p className='text-sm'>Company: {status.companyName}</p>
                                            <p className='text-sm'>Location: {status.jobLocation}</p>
                                            <p className='text-sm'>Job Type: {status.jobType}</p>
                                            <p className='text-sm'>Experience: {status.experienceRequired}</p>

                                        </div>
                                        <div>
                                            <p>Referral Requested On: {status.requstedOn}</p>
                                            <p>Current Status: <span className={status.currentStatus === 'REQUESTED' ? 'text-blue-700 font-bold' : status.currentStatus === 'IN_PROGRESS' ? 'text-yellow-500 font-bold' : status.currentStatus === 'REJECTED' ? 'text-red-500 font-bold' : ''}> {status.currentStatus}</span></p>
                                            {status.currentStatus === 'REJECTED' && (
                                                <p>Reason: {status.reason}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}


            </div>
            <div className="bg-[#00145e] w-full p-4 ">
                <footer className='sm:mx-auto max-w-screen-lg'>
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
                        <p>Copyright &copy; {new Date().getFullYear()}</p>
                    </div>
                </footer>
            </div>
        </div>

    )

}
export default AppliedJobs;