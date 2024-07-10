import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import { logoutUser } from '../Slices/loginSlice';
import { useDispatch } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import { FaArrowRight } from "react-icons/fa";
import config from '../../../config';


function Home() {

    const log = useSelector(state => state.log);
    const token = log.data.token;

    const decoded = jwtDecode(token);
    const email = decoded.sub;
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState(new Set());
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubscribed, setIsSubscribed] = useState(false)
    const handleLogout = () => {
        navigate('/login');
        dispatch(logoutUser());
    };

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        fetchJobs();
        checkSubscription();

        const savedScrollPosition = localStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition));
        }

        // Save scroll position on page unload
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
            console.log(response);
           if(response.status === 200){
            setIsSubscribed(true)
           }
           else if(response.status === 204){
            setIsSubscribed(false);

           }
        }).catch(error => {
            console.log(error);
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
            console.log(response)

        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("Token expired");
            } else {
                console.log(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (job) => {
        navigate('/job-details', { state: { job } });
    };

    const handleSaveJob = async (jobId) => {
        setLoading(true);
        try {
            const response = await axios.post(
                'https://burro-up-panda.ngrok-free.app/api/guidein/v1/job_seeker/saveJob',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        jobId: jobId,
                        email: email
                    }
                }
            );
            setSavedJobs(prev => new Set(prev).add(jobId)); // Add the saved job ID to the savedJobs set
            console.log('Job saved successfully:', response);
        } catch (error) {
            console.error('Error saving job:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between">
           <NavBar/>
            <div className='flex-grow pt-24'>

                {loading ? (
                    <div className="flex flex-col justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-gray-900">Loading...</p>
                    </div>
                ) : (
                    <div>
                            
                        {!isSubscribed && (
                            <div className='text-center mb-3'>
                                <h1 className='font-bold my-3'>To Get an Employee Referral</h1>
                                <Link to='/subscribe' className='bg-blue-700 text-white rounded p-2 my-3 mb-3'>Subscribe Now</Link>
                            </div>
                        )}
                        <h1 className='mx-5 font-bold mb-2 text-lg'>Jobs Posted by Employees</h1>
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
                                {/* <div className="flex flex-row">
                                <button
                                    onClick={() => handleSaveJob(job.jobId)}
                                    className={`font-bold rounded p-2 mx-1 ${savedJobs.has(job.jobId) ? 'bg-gray-500 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                                    disabled={savedJobs.has(job.jobId)}
                                >
                                    {savedJobs.has(job.jobId) ? 'Saved' : 'Save Job'}
                                </button>
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 mx-1 rounded"  onClick={() => handleClick(job)}>Request For Referral</button>
                            </div> */}
                            </div>
                        ))}
                        <div className='text-center m-5'>
                            <Link to='/search-jobs' className='cursor-pointer flex justify-center'><span className='mx-2'>see all jobs</span> <FaArrowRight  className='mt-1'/>
                            </Link>
                        </div>

                        <div className='text-center mb-3'>
                            <p className='font-bold text-lg'>Didn't find the job?</p>
                            <button className='bg-blue-700 p-2 text-white rounded'>Request a job Referral</button>
                        </div>

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