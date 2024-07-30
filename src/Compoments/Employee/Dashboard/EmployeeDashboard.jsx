import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import config from '../../../config';
import SideBar from '../SideBar/SideBar';
import { useNavigate,Link } from 'react-router-dom';
import Footer from '../SideBar/Footer';

function EmployeeDashboard() {
    const log = useSelector(state => state.emplog);
    const token = log.data.token;
    const decoded = token ? jwtDecode(token):null;
    const claim = decoded?decoded.sub:null;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [dashboardDetails, setDashboardDetails] = useState({})
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogout = () => {
        dispatch(logoutEmployee());
        navigate('/employee-login');
    };

    useEffect(() => {
        if(!token) {
            navigate('/employee-login')
        }
    },[token,navigate])

    const getDashboardDetails = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobPoster.getDashBoardDetails}${claim}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        }
        ).then(response => {
            setDashboardDetails(response.data)
        }).catch(error => {
            if (error.resposne.status === 403) {
                setErrorMessage('session Expired')
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
        }).finally(() => setLoading(false))
    }

    useEffect(() => {
        getDashboardDetails();
    }, [])

    return (
        <div className='flex flex-col min-h-screen bg-[#f5faff]'>
            <SideBar />
            <div className='flex-grow  p-4 ml-0 xl:ml-[20%] pt-16 lg:pt-2'>
                <h1 className='font-bold text-2xl'>Dashboard</h1>
                {errorMessage && (<p className='text-red-500 text-center fixed bg-white p-2'>{errorMessage}</p>)}
                {loading ? (<div className="flex flex-col justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-900">Loading...</p>
                </div>) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:my-5'>
                        <div className='bg-blue-500 text-white py-5 rounded-lg flex-1 mx-10'>
                            <h1 className='font-bold text-center text-lg'>Total Jobs Posted</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.totalJobPosted}</h1>
                        </div>
                        <div className='bg-blue-500 text-white py-5 rounded-lg flex-1 mx-10'>
                            <h1 className='font-bold text-center text-lg'>Active Jobs</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.activeJobs}</h1>
                        </div>
                        <div className='bg-blue-500 text-white py-5 rounded-lg flex-1 mx-10'>
                            <h1 className='font-bold text-center text-lg'>Jobs Expired</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.jobsExpired}</h1>
                        </div>
                        <div className='bg-blue-500 text-white py-5 rounded-lg flex-1 mx-10'>
                            <h1 className='font-bold text-center text-lg'>Total Referral Requests</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.totalReferralRequests}</h1>
                        </div>
                        <div className='bg-blue-500 text-white py-5 rounded-lg flex-1 mx-10'>
                            <h1 className='font-bold text-center text-lg'>Referred Successful</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.referralSuccessful}</h1>
                        </div>
                        <div className='bg-blue-500 text-white py-5 rounded-lg flex-1 mx-10'>
                            <h1 className='font-bold text-center text-lg'>Referral Rejected</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.referralRejected}</h1>
                        </div>
                    </div>

                )}
                <div className='text-center py-5 lg:pt-20'>
                    <p className='font-bold text-lg mb-1'>To Earn Money</p>
                    <Link to='/job-post' className='bg-blue-700 hover:bg-blue-800 text-white px-10 py-2 rounded mr-2'>Post a Job</Link>
                </div>
            </div>
           <Footer/>
        </div>

    );
}

export default EmployeeDashboard;
