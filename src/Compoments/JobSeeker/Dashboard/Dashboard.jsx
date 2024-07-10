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

function DashBoard() {
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const decoded = jwtDecode(token);
    const email = decoded.sub;
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login');
        dispatch(logoutUser());
    };
    const [dashboardDetails, setDashboardDetails] = useState({});


    const toggleNavbar = () => {
        setIsOpen(!isOpen);
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
            console.log(response)
            setDashboardDetails(response.data)
        }).catch(error => {
            console.log(error)
        })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getDashboardDetails();
    }, []);

    let isActiveValue;

    if (dashboardDetails && dashboardDetails.planHistory && dashboardDetails.planHistory.length > 0) {
        isActiveValue = dashboardDetails.planHistory[0].isActive;
    }

    console.log(isActiveValue);

    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between">
            <NavBar />
            {loading ? (<div className="flex flex-col justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                <p className="mt-4 text-gray-900">Loading...</p>
            </div>) : (

                <div className='flex-grow pt-24'>
                    <h1 className='font-bold px-2 lg:ml-24 text-2xl'>Dashboard</h1>

                    {(!isActiveValue) && dashboardDetails.planHistory && (
                        <div className='text-center mb-2'>
                            <h1 className='mb-2'> Your are not subscribed </h1>
                            <Link to='/subscribe' className='bg-blue-700 p-2 rounded text-white'>Subscribe</Link>
                        </div>
                    )}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center items-center lg:my-5'>
                        <div className='bg-white p-5 mx-2'>
                            <h1 className='font-bold text-center text-lg'>Total Referrals</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.totalReferrals}</h1>

                        </div>
                        <div className='bg-white p-5 mx-2'>
                            <h1 className='font-bold text-center text-lg'>Referrals Available</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.availableReferrals}</h1>
                        </div>
                        <div className='bg-white p-5 mx-2'>
                            <h1 className='font-bold text-center text-lg'>Referral Requested</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.referralsRequested}</h1>
                        </div>
                        <div className='bg-white p-5 mx-2'>
                            <h1 className='font-bold text-center text-lg'>Referral in Progress</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.referralsInProgress}</h1>
                        </div>
                        <div className='bg-white p-5 mx-2'>
                            <h1 className='font-bold text-center text-lg'>Referrals Successful</h1>
                            <h1 className='font-bold text-center text-lg'>{dashboardDetails.referralsSucessful}</h1>
                        </div>
                        {/* <div className='bg-white p-5 mx-2'>
            <h1 className='font-bold text-center text-lg'>Referrals Rejected</h1>
            <h1 className='font-bold text-center text-lg'>0</h1>
        </div> */}

                    </div>                    
                    <div className='my-6 '>
                        {dashboardDetails?.planHistory?.map((item, index) => (
                            <div key={index} className='mx-4'>
                                <h1 className='font-bold mt-2'>Plan History</h1>
                                <p>Plan:          {item.plan}</p>
                                <p>Subscribed On : {item.subscrideOn}</p>
                                <p>Transaction Id: {item.transactionId}</p>
                                <p>planStatus: {item.isActive?'active':'inactive'}</p>


                            </div>

                        )

                        )}

                    </div>
                  
                    <div className='text-center my-2'>
                        <p className='font-bold text-lg'>Didn't find the job?</p>
                        <button className='bg-blue-700 p-2 text-white rounded'>Request a job Referral</button>
                    </div>
                </div>
            )}

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
    );
}

export default DashBoard;
