import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import GuideinLogo from '../../../assets/GuideinLogo.png'
import { logoutUser } from "../Slices/loginSlice";
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { PiEyeClosedFill } from 'react-icons/pi';
import { FaFilePdf } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import NavBar from '../NavBar/NavBar';
import config from '../../../config';

function JobDetails() {
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const decoded = jwtDecode(token);
    const email = decoded.sub;
    const mobile = decoded.mobile;
    const name = decoded.username;
    const [profileCompletionMessage, setProfileCompletionMessage] = useState('');
    
    const [isOpen, setIsOpen] = useState(false);
    const [requested, setRequested] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const modalRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [resume, setResume] = useState(null);
    const [isProfileCompleted, setIsProfileCompleted] = useState(false);
    const { job } = location.state;
    const jobId = job.jobId;
    const jobPostedBy = job.jobPostedBy;
    const [jobStatus, setJobStatus] = useState('')
    const [formData, setFormData] = useState({
        resume: null,
    });

    const fileInputRef = useRef();
    const [isNewResumeUploaded, setIsNewResumeUploaded] = useState(false)
    const [resumeFileName, setResumeFileName] = useState('')
    const [successMessage, setSuccessMessage] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscribeMessage, setSubscribeMessage] = useState(false);
    const [isCredits, setIscredits] = useState(false);
    const [creditMessage, setCreditMessage] = useState('')
    const[savedJob,setSavedJob] = useState(job.saved)

    useEffect(() => {

        getProfileStatus();
        fetchJobs();
        checkSubscription();

    }, []);

    const getProfileStatus = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobSeeker.getProfile}${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        })
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    setIsProfileCompleted(true)
                    setProfile(response.data)
                }
                else if (response.status === 204) {
                    setIsProfileCompleted(false);
                }
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoading(false));
    }

    const checkSubscription = () => {
        setLoading(true)
        axios.get(`${config.api.baseURL}${config.api.jobSeeker.checkSubscription}${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            }

        }).then(response => {
            console.log(response);
            console.log("subscription status");
            if (response.status === 200) {
                setIsSubscribed(true)
                setProfile(response.data)
            }
            else if (response.status === 204) {
                setIsSubscribed(false);
            }
        }).catch(error => {
            console.log(error);
        }).finally(() => setLoading(false));

    }

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };
    if (!location.state || !location.state.job) {
        return <div>Loading...</div>;
    }

    const dispatch = useDispatch();
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
        navigate('/login');
        dispatch(logoutUser());
    };
    const toggleRequest = () => {
        setRequested(true);
    }

    const confirmDetails = () => {
        setRequested(false);
        if (isProfileCompleted) {
            if (isSubscribed) {
                setShowDetails(true);
            }
            else {
                setSubscribeMessage(true)
            }
        } else {
            setProfileCompletionMessage('Please complete your profile to request for a job referral.');
            setTimeout(() => {
                setProfileCompletionMessage('');
            }, 3000); // Clear the message after 1 second (1000 ms)
        }
    }

    const handleSaveJob =  () => {
        setLoading(true);
        axios.post( `${config.api.baseURL}${config.api.jobSeeker.saveJob}`,{},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    jobId: jobId,
                    email: email
                }

            }
        ).then(response => { 
           fetchJobs();
        }).catch(error => {
            console.log(error)
        }) .finally ( ()=> {
            setLoading(false) 
        }) 
    };

    function base64ToBlob(base64, mime) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mime });
    }
    const handleResumeView = () => {
        const pdfWindow = window.open('');
        pdfWindow.document.write('<iframe width="100%" height="100%" src="data:application/pdf;base64,' + encodeURI(profile.resume) + '"></iframe>');
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type !== 'application/pdf') {
            alert('Please upload a PDF file.');
            return;
        }
        setFormData({
            ...formData,
            resume: file
        });
        if (file) {
            setResumeFileName(file.name);
            setIsNewResumeUploaded(true);  // Set the flag to true when a new file is uploaded
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        
        let formDetails = { jobId: jobId, jobPostedBy: jobPostedBy, requestedBy: email }
        const form = new FormData();
        form.append('jobId', formDetails.jobId);
        form.append('jobPostedBy', formDetails.jobPostedBy);
        form.append('requestedBy', formDetails.requestedBy);
        if (isNewResumeUploaded) {
            if (formData.resume) {
                form.append('resume', formData.resume);
            }
        } else {
            // Convert base64 resume to Blob and append to form
            const oldResumeBlob = base64ToBlob(profile.resume, 'application/pdf');
            form.append('resume', oldResumeBlob, `${formData.name}.resume.pdf`);
        }

        setLoading(true);
        axios.post(`${config.api.baseURL}${config.api.jobSeeker.requestReferral}`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
           
            if (response.status === 200) {
                setShowDetails(false);
                setSuccessMessage(true);
                fetchJobs()
            }

        }).catch(error => {
            if (error.response.status === 400) {
                setShowDetails(false);
                setIscredits(true);
            }
            
        })

            .finally(() => setLoading(false))
    }
   
    const fetchJobs = async () => {
        setLoading(true);

        axios.get(
            `${config.api.baseURL}${config.api.jobSeeker.fetchJobs}${email}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "69420"
                }
            }
        ).then(response => {
            const jobi = response.data.find(jobsi => jobsi.jobId === jobId);
            if (jobi) {
                setJobStatus(jobi.status); 
                setSavedJob(jobi.saved); // Assuming 'status' is the key for job status in the response object
            } 
           
        }).catch(error => {
           
        }).finally(() => setLoading(false))

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
                ) :
                    (
                        <div>

                            <div className='pl-5 lg:px-10'>
                                <IoMdArrowRoundBack onClick={handleBackClick} size={24} className='cursor-pointer my-1' />
                                <h1 className='text-xl lg:text-2xl font-bold underline my-1'>{job.jobTitle}</h1>
                                <p className='font-bold underline underline-offset-1 my-1 lg:my-2'> {job.companyName}</p>
                                <p className='my-1 lg:my-2'> {job.jobLocation} ({job.workMode})</p>
                                <p className='my-1 lg:my-2'>Job Type: {job.jobType}</p>
                                <p className='my-1 lg:my-2'>Experience: {job.experienceRequired}</p>
                                <p className='my-1 lg:my-2'>Posted on: {job.postedOn}</p>
                                <p className='font-bold my-3 lg:my-4'>Know more about the job</p>
                                <a className='text-blue-700 underline break-words my-1' target="_blank" href={job.jobDescriptionLink} style={{ wordWrap: 'break-word' }}>{job.jobDescriptionLink}</a>
                                <h1 className='font-bold my-3 lg:my-4'>Job Posted By</h1>
                                <p> name: <span className='font-bold my-1 lg:my-2'> {job.jobPosterName}</span></p>
                                <p className='my-1 lg:my-2'>company: <span>{job.companyName}</span></p>
                                <div className='my-2 lg:my-4'>
                                    <button
                                        onClick={toggleRequest}
                                        className={`bg-green-700 text-white p-2 rounded mr-2 ${jobStatus !== 'UN_REQUESTED' ? ' cursor-not-allowed' : ''}${jobStatus === 'REQUESTED' && 'bg-blue-700'} ${jobStatus === 'REJECTED' && 'bg-red-500'}`}
                                        disabled={jobStatus !== 'UN_REQUESTED'}
                                    >
                                        {jobStatus === 'UN_REQUESTED' ? 'Request For Referral' : jobStatus}
                                    </button>
                                    {jobStatus === 'UN_REQUESTED' && (
                                        <button
                                            onClick={handleSaveJob}
                                            className={`font-bold rounded p-2 mx-1 ${savedJob?  'bg-gray-500 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                                            disabled={savedJob}
                                        >
                                            {savedJob ? 'Saved' : 'Save Job'}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {profileCompletionMessage && (
                                <div className="text-red-700 font-bold text-center mb-4">
                                    {profileCompletionMessage}
                                </div>
                            )}

                            {requested && (
                                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center px-2">
                                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                                        <h1 className="text-lg font-bold text-center mb-4">You are requesting a job referral for</h1>
                                        <div>
                                            <h1 className='text-xl font-bold underline mb-2'>{job.jobTitle}</h1>
                                            <p className='font-bold underline mb-2'> {job.companyName}</p>
                                            <p className='mb-2'> {job.jobLocation} ({job.workMode})</p>
                                            <p className='mb-2'>Experience: {job.experienceRequired}</p>
                                            <p className='mb-2'>Posted on: {job.postedOn}</p>
                                        </div>
                                        <div className='flex justify-center mt-4'>
                                            <button className='bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded mr-2' onClick={() => setRequested(false)}>Cancel</button>
                                            <button className='bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded' onClick={confirmDetails}>Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {subscribeMessage && (
                                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center px-2">
                                    <div className="bg-white p-5 rounded shadow-md w-full max-w-md relative">
                                        <span className="absolute top-2 right-2 text-xl cursor-pointer" onClick={() => setSubscribeMessage(false)}>&times;</span>
                                        <p className="text-red-700">You are not subscribed with us to get a referral.</p>
                                        <div className="text-center mt-2">
                                            <Link to="/subscribe" className="bg-blue-700 text-white p-2 rounded">Subscribe</Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isCredits && (
                                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center px-2">
                                    <div className="bg-white p-5 rounded shadow-md w-full max-w-md relative">
                                        <span className="absolute top-2 right-2 text-xl cursor-pointer" onClick={() => setIscredits(false)}>&times;</span>
                                        <p className="text-red-700">You have already used all your referral credits.</p>
                                    </div>
                                </div>
                            )}

                            {successMessage && (
                                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center px-2">
                                    <div className="bg-white p-5 rounded shadow-md w-full max-w-md relative">
                                        <p className="text-green-700">Your referral request was submitted successfully. You will be notified via SMS once you are referred.</p>
                                        <div className="text-center mt-2">
                                            <button className="bg-gray-500 text-white p-2 rounded" onClick={() => setSuccessMessage(false)}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showDetails && (
                                <div
                                    className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center px-2"
                                    ref={modalRef}
                                >
                                    <div className="bg-white p-5 rounded shadow-md w-full max-w-md">
                                        <h1 className="text-lg text-center font-bold mb-3">Confirm your Details</h1>
                                        <form onSubmit={handleSubmit}>
                                            <div className='mb-2'>
                                                <label className='block text-gray-700 text-start'><strong>Full Name</strong><span className='text-red-700'>*</span></label>
                                                <input
                                                    type='text'
                                                    value={name}
                                                    className='w-full px-3 py-2 border rounded-md'
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-2'>
                                                <label className='block text-gray-700 text-start'><strong>Email</strong><span className='text-red-700'>*</span></label>
                                                <input
                                                    type='text'
                                                    value={email}
                                                    className='w-full px-3 py-2 border rounded-md'
                                                    readOnly
                                                />
                                            </div>
                                            <div className='mb-2'>
                                                <label className='block text-gray-700 text-start'><strong>Mobile</strong><span className='text-red-700'>*</span></label>
                                                <input
                                                    type='text'
                                                    value={mobile}
                                                    className='w-full px-3 py-2 border rounded-md'
                                                    readOnly
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label className="block text-gray-700 text-start"><strong>Resume</strong></label>
                                                {!isNewResumeUploaded && (

                                                    <p className="cursor-pointer mb-3 flex " onClick={handleResumeView}><FaFilePdf className='mt-1' /> <span className='text-blue-500'>{name}.resume</span></p>
                                                )}
                                                {resumeFileName && (
                                                    <p className="text-gray-700">{resumeFileName}</p>
                                                )}
                                                <div className='' >
                                                    <button
                                                        type="button"
                                                        onClick={() => fileInputRef.current.click()}
                                                        className="bg-blue-700 p-2 text-white  rounded focus:outline-none"
                                                    >
                                                        Update Resume
                                                    </button>
                                                    <input
                                                        type="file"
                                                        name="resume"
                                                        onChange={handleFileChange}
                                                        ref={fileInputRef}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <p className='text-xs text-red-500'> accept .pdf  (5mb)</p>
                                                </div>
                                            </div>
                                            <div className='text-center'>
                                                <button className='w-25 bg-gray-500 text-white p-2 rounded-md mx-2' onClick={() => setShowDetails(false)}>cancel</button>

                                                <button type='submit' className='w-25 bg-blue-500 text-white p-2 rounded-md mx-2'>
                                                    Submit
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            )}


                        </div>
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

        </div >
    );
}

export default JobDetails;