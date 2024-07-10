import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { FaArrowRight } from "react-icons/fa";
import config from '../../../config';


function Home() {
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const decoded = jwtDecode(token);
    const email = decoded.sub;
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [errorMessage,setErrorMessage] = useState('')
    const [subscriptionMessage, setSubscriptionMessage]  = useState('');

    useEffect(() => {
        fetchJobs();
        checkSubscription();

        const savedScrollPosition = localStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition));
        }
        const handleScroll = () => {
            localStorage.setItem('scrollPosition', window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
            setSubscriptionMessage('Error while fetching subscription Status') 
            setTimeout(() => setErrorMessage(''),2000)
        })

    }

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${config.api.baseURL}${config.api.jobSeeker.fetchJobs}${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "ngrok-skip-browser-warning": "69420"
                    }
                }
            );
            const lastFourItems = response.data.slice(-3);
            setJobs(lastFourItems); // Reverse the job list to show the last element first

        } catch (error) {
           setErrorMessage('Error while fetchig the data Try again');
           setTimeout(() => {
            setErrorMessage('')
           },2000)
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (job) => {
        navigate('/job-details', { state: { job } });
    };

   
    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between">
            <NavBar />
            <div className='flex-grow pt-24'>

                {loading ? (
                    <div className="flex flex-col justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-gray-900">Loading...</p>
                    </div>
                ) : (
                    <div>
                        {errorMessage && (<p className='text-red-400'>{errorMessage}</p>)}

                        {!isSubscribed && (
                            <div className='text-center mb-3'>
                                <h1 className='font-bold my-3'>To Get an Employee Referral</h1>
                                <Link to='/subscribe' className='bg-blue-700 text-white rounded p-2 my-3 mb-3'>Subscribe Now</Link>
                            </div>
                        )}
                        <h1 className='mx-5 font-bold mb-2 text-lg'>Jobs Posted by Employees</h1>

                        {jobs.length <= 0 ? (<div className='h-screen flex items-center justify-center'>No jobs avaliable at this moment</div>) : (
                            <div>
                                {jobs.map((job, index) => (
                                    <div key={index} className="bg-white p-1 rounded shadow-md mb-1 flex flex-col md:flex-row justify-between items-start md:items-center mx-5 cursor-pointer" onClick={() => handleClick(job)}>
                                        <div className="mb-4 md:mb-0">
                                            <p
                                                className="text-lg font-semibold block underline cursor-pointer md:text-left"
                                            >
                                                {job.jobTitle}
                                            </p>
                                            <p className="text-sm md:text-left">Company: {job.companyName}</p>
                                            <p className="text-sm md:text-left">Location: {job.jobLocation} ({job.workMode})</p>
                                            <p className="text-sm md:text-left">Experience: {job.experienceRequired}</p>
                                            <p className="text-sm md:text-left">Posted by: {job.jobPostedBy}</p>
                                            <p className="text-sm md:text-left">Posted on: {job.postedOn}</p>
                                        </div>
                                    </div>

                                ))}
                            </div>)}
                        {jobs.length > 0 && (
                            <div className='text-center m-5'>
                                <Link to='/search-jobs' className='cursor-pointer flex justify-center'><span className='mx-2'>see all jobs</span> <FaArrowRight className='mt-1' />
                                </Link>
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
export default Home;