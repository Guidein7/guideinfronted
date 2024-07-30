import { useEffect, useState } from 'react';
import { logoutEmployee } from '../slices/employeeLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import config from '../../../config';
import SideBar from '../SideBar/SideBar';
import Footer from '../SideBar/Footer';

function ReferrelsRequested() {
    const log = useSelector(state => state.emplog);
    const token = log.data.token;
    const decoded = token ?jwtDecode(token):null;
    const claim = decoded? decoded.sub:null;
    const [referrals, setReferrals] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogout = () => {
        dispatch(logoutEmployee());
        navigate('/employee-login');
    };

   useEffect(() => {
        if(!token){
            navigate('/employee-login')
        }
   },[token,navigate]);

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
        getRequests();
    }, [])

    const handleClick = (candidate) => {
        navigate('/candidate-details', { state: { candidate } });
    };

    return (
        <div className='flex flex-col min-h-screen bg-[#f5faff]'>
            <SideBar />
            <div className=' flex flex-col flex-grow pt-16 lg:pt-2 p-4 ml-0 xl:ml-[20%]'>
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-gray-900">Loading...</p>
                    </div>
                ) : (
                    <div className='flex flex-col flex-grow'>
                        <h1 className='font-bold bg-red mb-3'>Referrals Requested</h1>
                        {errorMessage && (<p className='text-red-500 p-2 fixed left-1/2 transform -translate-x-1/2 text-center bg-white'>{errorMessage}</p>)}
                        {referrals.length === 0 ? (
                            <div className='flex items-center justify-center flex-grow h-full'>
                                <p className='font-bold text-center'>No referrals are available at the moment</p>
                            </div>
                        ) : (
                            <div>
                                {referrals.map((candidate,index) => (
                                    <div
                                        key={index}
                                        className='bg-white p-4 rounded shadow-md mb-2 cursor-pointer'
                                        onClick={() => handleClick(candidate)}
                                    >
                                        <p className='font-bold'> Requested By: <span>{candidate.candidateName}</span></p>
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
            <Footer/>
        </div>
    );
}

export default ReferrelsRequested;
