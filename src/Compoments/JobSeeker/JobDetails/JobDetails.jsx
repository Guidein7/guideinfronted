import { useLocation, useNavigate, Link, useParams, useSearchParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { logoutUser } from "../Slices/loginSlice";
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { FaFilePdf } from "react-icons/fa";
import NavBar from '../NavBar/NavBar';
import config from '../../../config';
import JSFooter from '../NavBar/JSFooter';
import { error } from 'jquery';
import { Buffer } from 'buffer';
import { CiShare2 } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa6";
import { MdOutlineShare } from "react-icons/md";
import BookmarkIcon from './Bookmark';

function JobDetails() {
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const decoded = token ? jwtDecode(token) : null;
    const email = decoded ? decoded.sub : null;
    const mobile = decoded ? decoded.mobile : null;
    const name = decoded ? decoded.username : null;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const jobId = Number(params.jobId);
    const jobPostedBy = Buffer.from(params.jobPostedBy, 'base64').toString('ascii');

    const [loading, setLoading] = useState(false);
    const [job, setJob] = useState(null);  // State to hold the specific job
    const [profile, setProfile] = useState(null);
    const [isProfileCompleted, setIsProfileCompleted] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscribeMessage, setSubscribeMessage] = useState(false);
    const [requested, setRequested] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [profileCompletionMessage, setProfileCompletionMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        resume: null,
    });
    const [uploadedResumeURL, setUploadedResumeURL] = useState(null);
    const [isNewResumeUploaded, setIsNewResumeUploaded] = useState(false)
    const [resumeFileName, setResumeFileName] = useState('')
    const [resumeUploadMessge, setResumeUploadMessage] = useState('')
    const [isCredits, setIscredits] = useState(false);
    const modalRef = useRef(null);
    const fileInputRef = useRef();
    const [savedJobMessage, setSavedJobMessage] = useState('');
    useEffect(() => {
        if (!token) {
            if (window.location.pathname !== '/login') { // Prevent overwriting intendedPath
                const intendedPath = window.location.pathname;
                localStorage.setItem('intendedPath', intendedPath);
              
               
            }
            navigate('/login');
        }
    }, [token, navigate]);




    const [searchParams] = useSearchParams();
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000); // Reset the message after 2 seconds
        }).catch((err) => {
            
        });
    };

    const fetchJobs = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobSeeker.fetchJobs}${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            }
        })
            .then(response => {
                const foundJob = response.data.find(item => item.jobId === jobId && item.jobPostedBy === jobPostedBy);
                setJob(foundJob);
                

            })
            .catch(error => {
                if (error.response.status === 403) {
                    setErrorMessage('Session expired');
                    setTimeout(() => {
                        setErrorMessage('');
                        handleLogout();
                    }, 2000);
                } else {
                    setErrorMessage('Error while fetching profile');
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 2000);
                }
            }).finally(() => {
                setLoading(false)


            });
    };

    useEffect(() => {

        fetchJobs();
        getProfileStatus();
        checkSubscription();

    }, [jobId]);


    const getProfileStatus = () => {

        axios.get(`${config.api.baseURL}${config.api.jobSeeker.getProfile}${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        })
            .then(response => {
                if (response.status === 200) {
                    setIsProfileCompleted(true)
                    setProfile(response.data)
                }
                else if (response.status === 204) {
                    setIsProfileCompleted(false);
                }

            })
            .catch(error => {
                if (error.response.status === 403) {
                    setErrorMessage('session Expired');
                    setTimeout(() => {
                        setErrorMessage('')
                        handleLogout();
                    }, 2000);
                }
                else {
                    setErrorMessage('Error while fetching profile');
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 2000);
                }
            })

    }


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
                setErrorMessage('session Expired');
                setTimeout(() => {
                    setErrorMessage('')
                    handleLogout();
                }, 2000);
            }
            else {
                setErrorMessage('Error while fetching subscription status');
                setTimeout(() => {
                    setErrorMessage('')
                }, 2000);
            }
        })
    }

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

    const handleSaveJob = (jobId) => {
        setJob(prevJob => ({
            ...prevJob,saved:true
           }))
        axios.post(`${config.api.baseURL}${config.api.jobSeeker.saveJob}`, {},
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
            setSavedJobMessage('job saved')
            setTimeout(() => {
                setSavedJobMessage('');
            }, 2000);
        }).catch(error => {
            setJob(prevJob => ({
                ...prevJob,saved:false
               }))
            if (error.response.status === 403) {
                setErrorMessage('session Expired');
                setTimeout(() => {
                    setErrorMessage('')
                    handleLogout();
                }, 2000);
            }
            else {
                setErrorMessage('Error saving job');
                setTimeout(() => {
                    setErrorMessage('')
                }, 2000);
            }
        }).finally(() => {
            setLoading(false)
        })
    };

    const handleRemoveSavedJob = (jobId) => {
        setJob(prevJob => ({
            ...prevJob,saved:false
           }))
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
                setSavedJobMessage('job removed');
                setTimeout(() => {
                    setSavedJobMessage('')
                }, 2000);
            })
            .catch(error => {
                setJob(prevJob => ({
                    ...prevJob,saved:true
                   }))
                setErrorMessage('Error while removing the job');
                setTimeout(() => {
                    setErrorMessage('');
                }, 2000);

            }).finally(() => setLoading(false))
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
        if (profile?.resume) {
            const pdfWindow = window.open('');
            pdfWindow.document.write('<iframe width="100%" height="100%" src="data:application/pdf;base64,' + encodeURI(profile.resume) + '"></iframe>');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const maxSize = 5 * 1024 * 1024;
        if (file && file.type !== 'application/pdf') {
            setResumeUploadMessage('please upload a pdf file')
            setTimeout(() => {
                setResumeUploadMessage('')
            }, 2000);
            e.target.value = null;
            return;
        }

        if (file && file.size > maxSize) {
            setResumeUploadMessage('File size exceeds 5 MB');
            setTimeout(() => setResumeUploadMessage(''), 2000);
            e.target.value = null;
            return;
        }
        setFormData({
            ...formData,
            resume: file
        });

        if (file) {
            setResumeFileName(file.name);
            setIsNewResumeUploaded(true);
            const fileURL = URL.createObjectURL(file);
            setUploadedResumeURL(fileURL);
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

            else if (error.response.status === 403) {
                setErrorMessage('session Expired');
                setTimeout(() => {
                    setErrorMessage('')
                    handleLogout();
                }, 2000);
            }
            else {
                setErrorMessage('Error while fetching jobs');
                setTimeout(() => {
                    setErrorMessage('')
                }, 2000);
            }
        })
            .finally(() => setLoading(false))
    }
    const showDetailsClose = () => {
        setIsNewResumeUploaded(false);
        setResumeFileName('');
        setFormData({
            resume: null
        });
        setShowDetails(false);
    }
    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between">
            <NavBar />
            <div className='flex-grow ml-0 lg:ml-[20%]'>
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-gray-900">Loading...</p>
                    </div>
                ) : (
                    <div>
                        {job ? (
                       
                                <div className='pl-5 pt-16 lg:pt-5 '>
                                    
                                        {errorMessage && (<p className='fixed left-1/2 transform -translate-x-1/2 px-4 bg-white py-2 text-red-500'>{errorMessage}</p>)}
                                        <h1 className='text-xl lg:text-2xl font-bold  my-1'>{job?.jobTitle}</h1>
                                        <p className='font-bold  my-1 lg:my-2'> {job?.companyName}</p>
                                        <p className='my-1 lg:my-2'>  {
                                            job?.jobLocation
                                                ?.split(',')
                                                ?.map(location => location.trim())
                                                ?.filter(location => location.toLowerCase() !== 'others' && location !== '')
                                                ?.join(', ')
                                        } ({job?.workMode})</p>
                                        <p className='my-1 lg:my-2'>Job Type: {job?.jobType}</p>
                                        <p className='my-1 lg:my-2'>Experience: {job?.experienceRequired}</p>
                                        <p className='my-1 lg:my-2'>Posted on: {job?.postedOn}</p>
                                        <p className='font-bold my-3 lg:my-4'>Know more about the job</p>
                                        <a className='text-blue-700 underline break-words my-1' target="_blank" href={job?.jobDescriptionLink} style={{ wordWrap: 'break-word' }}>{job?.jobDescriptionLink}</a>
                                        <h1 className='font-bold my-3 lg:my-4'>Job Posted By</h1>
                                        <p> Employee Name: <span className='font-bold my-1 lg:my-2'> {job?.jobPosterName}</span></p>
                                        <p className='my-1 lg:my-2'>Company: <span>{job?.companyName}</span></p>
                                        <div className='my-2 lg:my-4 flex items-center'>
                                            <button
                                                onClick={toggleRequest}
                                                className={` ${job?.status === 'REQUESTED' ? 'bg-blue-500 hover:bg-blue-500 text-white px-4 py-2 rounded' : job?.status === 'REFERRED' ? 'bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded' : job?.status === 'IN_VERIFICATION' ? 'bg-yellow-500 hover:bg-yellow-500 text-white px-4 py-2 rounded' : (job?.status === 'REJECTED' || job?.status === 'VERIFICATION_FAILED') ? 'bg-red-500 hover:bg-red-500 text-white px-4 py-2 rounded' : 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'}`}
                                                disabled={job?.status !== 'UN_REQUESTED'}
                                            >
                                                {job.status === 'UN_REQUESTED' ? 'Request Referral' : job.status}
                                            </button>

                                            <div className="flex flex-col items-center justify-center ml-4">
                                                <div className="flex items-center justify-center cursor-pointer" onClick={job.saved ? () => handleRemoveSavedJob(job.jobId) : () => handleSaveJob(job.jobId)}>
                                                <BookmarkIcon saved={job.saved} />

                                                </div>
                                                
                                            </div>

                                            <div onClick={handleCopyLink} className='cursor-pointer flex flex-col justify-center ml-4'>
                                                <MdOutlineShare size={24} className='tex-black' />
                                                {copied && (
                                                    <p className="text-black-500 mt-2 text-sm lg:mt-0">Link copied!</p>
                                                )}
                                            </div>
                                        </div>

                                    
                                </div>
                            ) : (<div className='min-h-screen flex justify-center items-center'>
                                <p>no job found</p>

                            </div>)}

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
                                        <h1 className='text-xl font-bold  mb-2'>{job.jobTitle}</h1>
                                        <p className='font-bold  mb-2'> {job.companyName}</p>
                                        <p className='mb-2'> {
                                            job.jobLocation
                                                .split(',')
                                                .map(location => location.trim())
                                                .filter(location => location.toLowerCase() !== 'others' && location !== '')
                                                .join(', ')
                                        } ({job.workMode})</p>
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
                                    <p className="text-red-700 text-center">Please subscribe with us to request a referral</p>
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
                                        <button className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded mr-2" onClick={() => setSuccessMessage(false)}>Close</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showDetails && (
                            <div
                                className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center px-2 sm:px-4 md:px-6 modal"
                                ref={modalRef}
                            >
                                <div className="bg-white p-5 rounded shadow-md w-full max-w-md sm:max-w-lg md:max-w-2xl modal-content max-h-[90vh] overflow-y-auto">
                                    <h1 className="text-xl font-bold text-center mb-4">Confirm your Details</h1>
                                    {resumeUploadMessge && (<p className='text-center bg-white p-2 text-red-500 mx-auto'>{resumeUploadMessge}</p>)}
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                                <strong>Full Name</strong><span className="text-red-700">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                className="w-full px-3 py-2 border rounded-md"
                                                readOnly
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                                <strong>Email</strong><span className="text-red-700">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={email}
                                                className="w-full px-3 py-2 border rounded-md"
                                                readOnly
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                                <strong>Mobile</strong><span className="text-red-700">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={mobile}
                                                className="w-full px-3 py-2 border rounded-md"
                                                readOnly
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                                <strong>Resume</strong>
                                            </label>
                                            {!isNewResumeUploaded && (
                                                <p className="cursor-pointer flex items-center text-blue-500 mb-2" onClick={handleResumeView}>
                                                    <FaFilePdf className="mr-2" /> <span>{name}.pdf</span>
                                                </p>
                                            )}
                                            {resumeFileName && (
                                                <a href={uploadedResumeURL} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                                    {resumeFileName}
                                                </a>
                                            )}
                                            <div className="mt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current.click()}
                                                    className="bg-blue-700 text-white px-4 py-2 rounded focus:outline-none"
                                                >
                                                    Update Resume
                                                </button>
                                                <input
                                                    type="file"
                                                    name="resume"
                                                    onChange={handleFileChange}
                                                    ref={fileInputRef}
                                                    accept="application/pdf"
                                                    className="hidden"
                                                />
                                                <p className="text-xs mt-1 mx-2">Only .PDF (5 MB)</p>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button
                                                type="button"
                                                onClick={showDetailsClose}
                                                className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded mr-2"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded mr-2"
                                            >
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

            <JSFooter />

        </div >
    );
}
export default JobDetails;