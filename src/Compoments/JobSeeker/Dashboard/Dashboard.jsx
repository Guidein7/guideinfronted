import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import config from '../../../config';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Slices/loginSlice';
import JSFooter from '../NavBar/JSFooter';

function DashBoard() {
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const decoded = token? jwtDecode(token):null;
    const email =decoded? decoded.sub:null;
    const [loading, setLoading] = useState(false);
    const [dashboardDetails, setDashboardDetails] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!token) {
            navigate('/login')
        }
    },[token,navigate])

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };
    const getDashboardDetails = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobSeeker.getDashBoardDetails}${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        }
        ).then(response => {
            setDashboardDetails(response.data)
            console.log(response)
        }).catch(error => {

            if (error.response.status === 403) {
                setErrorMessage('session Expierd')
                setTimeout(() => {
                    setErrorMessage('')
                    handleLogout();
                }, 2000)
            }
            else{
            setErrorMessage('Error while fething dashboard details Try again')
            setTimeout(() => setErrorMessage(''), 2000)
            }
        }).finally(() => setLoading(false))
    }

    useEffect(() => {
        getDashboardDetails();
    }, []);

    let isActiveValue;
    if (dashboardDetails && dashboardDetails.planHistory && dashboardDetails.planHistory.length > 0) {
        isActiveValue = dashboardDetails.planHistory.slice(-1)[0].isActive;
    }



    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between">
            <NavBar />
            {loading ? (<div className="flex flex-col justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                <p className="mt-4 text-gray-900">Loading...</p>
            </div>) : (
                <div className='flex-grow ml-0 xl:ml-[20%] pt-20 lg:pt-2'>
                    {errorMessage && (<p className='text-red-500 fixed left-1/2 transform -translate-x-1/2 bg-white px-4 py-2'>{errorMessage}</p>)}
                    <h1 className='font-bold px-2 lg:ml-5 text-2xl '>Dashboard</h1>

                    {(!isActiveValue) && dashboardDetails.planHistory && (
                        <div className='text-center mb-5'>
                            <h1 className='mb-2'> Your are not subscribed </h1>
                            <Link to='/subscribe' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300   rounded text-sm px-14 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Subscribe</Link>
                        </div>
                    )}
                    <div className='grid grid-cols-1  md:grid-cols-3 gap-4 lg:my-8'>
                        <div className='bg-blue-500 text-white py-5  flex-1 mx-10 rounded-lg'>
                            <h1 className='font-bold text-center text-lg'>Total Referrals</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.totalReferrals}</h1>
                        </div>
                        <div className='bg-blue-500 text-white py-5  flex-1 mx-10 rounded-lg'>
                            <h1 className='font-bold text-center text-lg'>Referrals Available</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.availableReferrals}</h1>
                        </div>
                        <div className='bg-blue-500 text-white py-5  flex-1 mx-10 rounded-lg'>
                            <h1 className='font-bold text-center text-lg'>Referral Requested</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.referralsRequested}</h1>
                        </div>
                        <div className='bg-blue-500 text-white py-5  flex-1 mx-10 rounded-lg'>
                            <h1 className='font-bold text-center text-lg'>Referral in Progress</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.referralsInProgress}</h1>
                        </div>
                        <div className='bg-blue-500 text-white py-5  flex-1 mx-10 rounded-lg'>
                            <h1 className='font-bold text-center text-lg'>Referrals Successful</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.referralsSuccessful}</h1>
                        </div>
                        <div className='bg-blue-500 text-white py-5  flex-1 mx-10 rounded-lg'>
                            <h1 className='font-bold text-center text-lg'> Total Successful Referrals</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.totalReferralSuccessful}</h1>
                        </div>
                       
                    </div>

                    <div className='my-6  '>
                        <h1 className='font-bold mt-2 mx-4'>Plan History</h1>
                        {[...(dashboardDetails?.planHistory ?? [])].reverse().map((item, index) => (
                            <div key={index} className='mx-4 border-b-4 py-2'>

                                <p>Plan: {item.plan}</p>
                                <p>Subscribed On : {item.subscrideOn}</p>
                                <p>Transaction Id: {item.transactionId}</p>
                                <p>planStatus: {item.isActive ? 'active' : 'inactive'}</p>
                            </div>
                        )
                        )}
                    </div>
                </div>
            )}


            <JSFooter/>

        </div>
    );
}

export default DashBoard;
