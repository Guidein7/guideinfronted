import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../Slices/loginSlice';
import { useDispatch } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import config from '../../../config';

function SavedJobs() {
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true); // Initially set to true
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const decoded = jwtDecode(token);
    const email = decoded.sub;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchSavedJobs();
    }, []);

    const handleLogout = () => {
        navigate('/login');
        dispatch(logoutUser());
    };

    const fetchSavedJobs = () => {
        axios.get(`${config.api.baseURL}${config.api.jobSeeker.savedJobs}${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            }
        })
            .then(response => {
                setSavedJobs(response.data);
            })
            .catch(error => {
                if (error.response.status === 403) {
                    setErrorMessage('session expired ')
                    setTimeout(() => {
                        setErrorMessage('');
                        handleLogout();
                    }, 2000);
                }
                else {
                    setErrorMessage('Error while fetching saved jobs')
                    setTimeout(() => {
                        setErrorMessage('');
                        handleLogout();
                    }, 2000);

                }
            }).finally(() => setLoading(false))
    };

    const handleRemoveSavedJob = (jobId) => {
        setLoading(true);
        axios.delete(`${config.api.baseURL}${config.api.jobSeeker.removeSavedJobs}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
            params: {
                jobId: jobId,
                email: email
            }
        })
            .then(response => {
                setSavedJobs(savedJobs.filter(job => job.jobId !== jobId));
            })
            .catch(error => {
                setErrorMessage('Error while removing the job');
                setTimeout(() => {
                    setErrorMessage('');
                }, 2000);

            }).finally(() => setLoading(false))
    };
    const handleClick = (job) => {
        navigate('/job-details', { state: { job } });
    };

    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between">
            <NavBar />
            <div className="flex flex-grow flex-col pt-24">
                {errorMessage && (<p className='text-red-500 text-center'>{errorMessage}</p>)}
                <h1 className="text-xl mb-2 px-2 font-bold">Saved Jobs</h1>
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-gray-900">Loading...</p>
                    </div>
                ) : (
                    savedJobs.length > 0 ? (
                        savedJobs.map((job, index) => (
                            <div key={index} className="bg-white p-4 rounded shadow-md mb-2 flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div className="mb-4 md:mb-0">
                                    <p
                                        onClick={() => handleClick(job)}
                                        className="text-lg font-semibold block underline cursor-pointer md:text-left"
                                    >
                                        {job.jobTitle}
                                    </p>
                                    <p className="text-sm md:text-left">Company: {job.companyName}</p>
                                    <p className="text-sm md:text-left">Location: {job.jobLocation} ({job.workMode})</p>
                                    <p className="text-sm md:text-left">JobType: {job.jobType}</p>
                                    <p className="text-sm md:text-left">Experience: {job.experienceRequired}</p>
                                    <p className="text-sm md:text-left">Posted by: {job.jobPostedBy}</p>
                                    <p className="text-sm md:text-left">Posted on: {job.postedOn}</p>
                                </div>
                                <div className="flex flex-row">
                                    <button
                                        onClick={() => handleRemoveSavedJob(job.jobId)}
                                        className='bg-red-500 text-white p-2 rounded'

                                    >
                                        Remove from savedJobs
                                    </button>
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 mx-1 rounded" onClick={() => handleClick(job)}>Request For Referral</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='h-screen flex items-center justify-center'>No saved jobs found.</p>
                    )
                )}
            </div>

            <div className="bg-[#00145e] w-full p-4">
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

export default SavedJobs;

