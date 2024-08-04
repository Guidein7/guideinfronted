import { useEffect, useState } from 'react';
import { logoutEmployee } from '../slices/employeeLoginSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import axios from 'axios';
import config from '../../../config';
import SideBar from '../SideBar/SideBar';
import Footer from '../SideBar/Footer';

function ReferredJobs() {
    const log = useSelector(state => state.emplog);
    const token = log.data.token;
    const decoded = token ? jwtDecode(token) : null;
    const claim = decoded ? decoded.sub : null;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (!token) {
            navigate('/employee-login')
        }
    }, [token, navigate])

    const handleLogout = () => {
        dispatch(logoutEmployee());
        navigate('/employee-login');
    };

    const getReferredJobs = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobPoster.getAllReferredStatus}${claim}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        }).then(response => {
            setJobs(response.data.reverse())
        }).catch(error => {
            if (error.response.status === 403) {
                setErrorMessage('session expired')
                setTimeout(() => {
                    setErrorMessage('');
                    handleLogout();
                }, 2000);
            }
            else {
                setErrorMessage('Error fetching data')
                setTimeout(() => {
                    setErrorMessage('');

                }, 2000);
            }
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        getReferredJobs();

    }, [])
    
    const handleClick = (referredJob) => {
        navigate('/referred-job-details', { state: { referredJob } });
    };

    return (
        <div className='flex flex-col min-h-screen bg-[#f5faff]'>
            <SideBar />
            <div className='flex flex-col flex-grow pt-10  lg:pt-4 p-4 ml-0 xl:ml-[20%]'>
                <div className=' flex flex-col flex-grow'>
                    <h1 className='font-bold mt-10 lg:mt-0'>Referred Jobs</h1>
                    {errorMessage && (<p className='text-red-500 px-4 py-2 fixed left-1/2 transform -translate-x-1/2   bg-white'>{errorMessage}</p>)}
                    {loading ? (
                        <div className="flex flex-col justify-center items-center h-screen">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                            <p className="mt-4 text-gray-900">Loading...</p>
                        </div>
                    ) : (
                        <div className='flex flex-col flex-grow'>
                            {jobs.length === 0 ? (
                                <div className='flex flex-grow items-center justify-center h-full'>
                                    <p className='font-bold text-center'>No Referred jobs </p>
                                </div>) : (
                                <div>
                                    {jobs.map(referredJob => (
                                        <div key={referredJob.referralId} className='flex flex-col md:flex-row justify-between bg-white my-2 cursor-pointer p-4 md:p-6' onClick={() => handleClick(referredJob)} >
                                            <div className='flex flex-col space-y-2 md:space-y-0'>
                                                <p className='text-base md:text-base'>Requested by: {referredJob.candidateName}</p>
                                                <p className='text-sm md:text-base'>Referral For: {referredJob.referralFor}</p>
                                                <p className='text-sm md:text-base'>Experience: {referredJob.candidateExperience}</p>
                                            </div>
                                            <div className='flex flex-col space-y-2 md:space-y-0'>
                                                <p className='text-sm md:text-base'>Referral Requested On: {referredJob.requestedOn}</p>
                                                <p className={`text-sm `}>Current Status: <span className={` ${referredJob.status === 'IN_VERIFICATION' ? 'text-yellow-500 font-bold' : referredJob.status === 'REFERRED' ? 'text-green-700 font-bold' : 'text-red-500 font-bold'}`}>{referredJob.status}</span></p>
                                                {referredJob?.status === 'REJECTED' || referredJob?.status === 'VERIFICATION_FAILED' && (
                                                <p>Reason: {referredJob?.reason}</p>
                                            )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>
          <Footer/>
        </div>
    )
}

export default ReferredJobs;