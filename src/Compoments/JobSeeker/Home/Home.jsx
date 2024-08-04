import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { FaArrowRight } from "react-icons/fa";
import config from '../../../config';
import { logoutUser } from '../Slices/loginSlice';
import JSFooter from '../NavBar/JSFooter';

function Home() {
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const decoded = token ? jwtDecode(token) : null;
    const email = decoded ? decoded.sub : null;
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        fetchJobs();
        checkSubscription();
    }, []);

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token, navigate]);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    const checkSubscription = () => {
        axios.get(`${config.api.baseURL}${config.api.jobSeeker.checkSubscription}${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            }

        }).then(response => {
            if (response.status === 200) {
                setIsSubscribed(true)
            }
            else if (response.status === 204) {
                setIsSubscribed(false);
            }
        }).catch(error => {
            if (error.response.status === 403) {
                setErrorMessage('Session Expired');
                setTimeout(() => {
                    setErrorMessage('')
                    handleLogout();
                }, 2000)
            }
            else {
                setErrorMessage('Error while fetchig subscription data');
                setTimeout(() => {
                    setErrorMessage('')
                }, 2000)
            }
        })

    }

    const fetchJobs = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobSeeker.fetchJobs}${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            }
        }).then(response => {
            const lastFourItems = response.data.slice(-3);
            setJobs(lastFourItems.reverse());
        }).catch(error => {
            if (error.response.status === 403) {
                setErrorMessage('Session Expired');
                setTimeout(() => {
                    setErrorMessage('')
                    handleLogout();
                }, 2000)
            }
            else {
                setErrorMessage('Error while fetchig the data Try again');
                setTimeout(() => {
                    setErrorMessage('')
                }, 2000)
            }
        }).finally(() => setLoading(false))
    };

    const handleClick = (job) => {
        navigate('/job-details', { state: { job } });
    };


    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between">
            <NavBar />
            <div className=' flex flex-col flex-grow  ml-0 xl:ml-[20%] pt-20 lg:pt-5'>
                {loading ? (
                    <div className="flex flex-col justify-center items-center  h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-gray-900">Loading...</p>
                    </div>
                ) : (
                    <div className='flex flex-col flex-grow'>
                        {errorMessage && (<p className='text-red-400 fixed left-1/2 transform -translate-x-1/2 bg-white px-4 py-2'>{errorMessage}</p>)}
                        {!isSubscribed && (
                            <div className='text-center mb-3'>
                                <h1 className='font-bold my-3'>To Get an Employee Referral</h1>
                                <Link to='/subscribe' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Subscribe Now</Link>
                            </div>
                        )}
                        <h1 className='mx-5 font-bold mb-2 text-lg'>Jobs Posted by Employees</h1>
                        {jobs.length === 0 ? (
                            <p className='h-full flex  items-center justify-center flex-grow'>No jobs avaliable at this moment</p>)
                            : (
                                <div>
                                    {jobs.map((job, index) => (
                                        <div key={index} className="bg-white p-1 rounded shadow-md mb-1 flex flex-col md:flex-row justify-between items-start md:items-center mx-5 cursor-pointer" onClick={() => handleClick(job)}>
                                            <div className="mb-4 md:mb-0">
                                                <p
                                                    className="text-lg font-semibold block  cursor-pointer md:text-left"
                                                >
                                                    {job.jobTitle}
                                                </p>
                                                <p className="text-sm md:text-left">Company: {job.companyName}</p>
                                                <p className="text-sm md:text-left">Location: {
                                                    job.jobLocation
                                                        .split(',')
                                                        .map(location => location.trim())
                                                        .filter(location => location.toLowerCase() !== 'others' && location !== '')
                                                        .join(', ')} ({job.workMode})</p>
                                                <p className="text-sm md:text-left">Experience: {job.experienceRequired}</p>
                                                <p className="text-sm md:text-left">Posted by: {job.jobPostedBy}</p>
                                                <p className="text-sm md:text-left">Posted on: {job.postedOn}</p>
                                            </div>
                                        </div>

                                    ))}
                                </div>)}
                        {jobs.length > 0 && (
                            <div className='text-center m-5'>
                                <Link to='/search-jobs' className='cursor-pointer flex justify-center'><span className='mx-2 font-bold'>Show all Jobs</span> <FaArrowRight className='mt-1' />
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <JSFooter />
        </div>

    )

}
export default Home;