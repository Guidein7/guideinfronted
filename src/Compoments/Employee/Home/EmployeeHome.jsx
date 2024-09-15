import { useEffect, useState } from 'react';
import { logoutEmployee } from '../slices/employeeLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import config from '../../../config';
import SideBar from '../SideBar/SideBar';
import Footer from '../SideBar/Footer';

function EmployeeHome() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const log = useSelector(state => state.emplog);
    const token = log.data.token;
    const decoded = token ? jwtDecode(token) : null;
    const claim = decoded ? decoded.sub : null;
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/employee-login');
        }
    }, [token, navigate]);

    useEffect(() => {
        getRequests();
    }, [claim]);

    const handleLogout = () => {
        dispatch(logoutEmployee());
        navigate('/employee-login');
    };

    const getRequests = () => {
        if (!claim) return;
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobPoster.getRequestedReferrals}${claim}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        })
        .then(response => {
            setReferrals(response.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                setError('Session Expired');
                setTimeout(() => {
                    setError('');
                    handleLogout();
                }, 2000);
            } else {
                setError('Error occurred');
                setTimeout(() => {
                    setError('');
                    handleLogout();
                }, 2000);
            }
        })
        .finally(() => setLoading(false));
    };
    
    const handleClick = (candidate) => {
        navigate('/candidate-details', { state: { candidate } });
    };

    return (
        <div className='flex flex-col min-h-screen bg-[#f5faff]'>
            <SideBar />
            <div className='flex-grow flex flex-col pt-20 lg:pt-10 ml-0 xl:ml-[20%]'>

                {loading ? (
                    <div className="flex flex-col justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-gray-900">Loading...</p>
                    </div>
                ) : (
                    <div className='flex-grow flex flex-col'>
                        <div className='text-center mb-6'>
                            {error && (<p className='text-red-500  fixed left-1/2 p-2 transform -translate-x-1/2  bg-white'>{error}</p>)}
                            <h1 className='font-bold text-lg mb-2'>To Earn Money</h1>
                            <Link to='/job-post' className='bg-blue-700 hover:bg-blue-800 text-white px-10 py-2 rounded mr-2'>Post a Job</Link>
                        </div>
                        <h1 className='font-bold bg-red mb-3 mx-2'>Referrals Requested</h1>
                        {referrals.length === 0 ? (
                            <div className='flex items-center justify-center flex-grow h-full'>
                                <p className='font-bold text-center'>No referrals are available at the moment</p>
                            </div>
                        ) : (
                            <div>
                                {referrals.map((candidate, index) => (
                                    <div
                                        key={index}
                                        className='bg-white p-4 rounded shadow-md mb-2 mx-2 cursor-pointer'
                                        onClick={() => handleClick(candidate)}
                                    >
                                        <p className='font-bold'>Requested by: {candidate.candidateName}</p>
                                        <p>Referral for: <span className=''>{candidate.referralFor}</span></p>
                                        <p>Candidate experience: {candidate.candidateExperience}</p>
                                        <p>Requested On: {candidate.requestedOn}</p>
                                        <a className='underline' href={candidate.jobDescriptionLink} target='_blank'>JobDescriptionLink</a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
}

export default EmployeeHome;
