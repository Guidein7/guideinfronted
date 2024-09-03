import { useState, useEffect, useRef } from 'react';
import { logoutEmployee } from '../slices/employeeLoginSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import '../JobsPosted/JobsPosted.css'
import config from '../../../config';
import SideBar from '../SideBar/SideBar';
import Pagination from './Pagenation';
import Footer from '../SideBar/Footer';
import JobPostForm from './JopPostForm';

const cities = [
    { value: 'Others', label: 'Others' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'KolKata', label: 'Kolkata' },
    { value: 'Ahmedabad', label: 'Ahmedabad' },
    { value: 'Gurgaon', label: 'Gurgaon' },
    { value: 'Noida', label: 'Noida' },
    { value: 'Jaipur', label: 'Jaipur' },
    { value: 'Chandigarh', label: 'Chandigarh' },
    { value: 'Kochi', label: 'Kochi' },
    { value: 'Indore', label: 'Indore' },
    { value: 'Lucknow', label: 'Lucknow' },
    { value: 'Bhopal', label: 'Bhopal' },
    { value: 'Visakhapatanam', label: 'Visakhapatanam' },
    { value: 'Surat', label: 'Surat' },
    { value: 'Nagpur', label: 'Nagpur' },
    { value: 'Coimbatore', label: 'Coimbatore' },
    { value: 'Bhubaneswar', label: 'Bhubaneswar' },
    { value: 'Patna', label: 'Patna' },
    { value: 'Thiruvananthapuram', label: 'Thiruvananthapuram' },
    { value: 'Vadorara', label: 'Vadorara' },
    { value: 'Guwahati', label: 'Guwahati' },

]

function JobsPosted() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const log = useSelector(state => state.emplog);
    const token = log.data.token;
    useEffect(() => {
        if (!token) {
            navigate('/employee-login');
        }

    }, [token, navigate])
    const decoded = token ? jwtDecode(token) : null;
    const claim = decoded ? decoded.sub : null;
    const [editJobId, setEditJobId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        jobTitle: '',
        companyName: '',
        jobLocation: '',
        jobType: '',
        jobDescriptionLink: '',
        educationLevel: '',
        experienceRequired: '',
        workMode: '',
        jobPostedBy: claim,
        otherJobTitle: '',
        customCity: ''
    });
    const [jobs, setJobs] = useState([]);
    const [profileComplete, setProfileComplete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [completeProfileMessage, setProfileCompleteMessage] = useState('');
    const [profileError, setProfileError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const [isTouched, setIsTouched] = useState({});
    const [errors, setErrors] = useState({});

    const jobTitleRef = useRef(null);
    const otherJobTitleRef = useRef(null);
    const companyNameRef = useRef(null);
    const jobLocationRef = useRef(null);
    const customCityRef = useRef(null);
    const jobTypeRef = useRef(null);
    const workModeRef = useRef(null);
    const jobDescriptionLinkRef = useRef(null);
    const educationLevelRef = useRef(null);
    const experienceRequiredRef = useRef(null);

   
    useEffect(() => {
        fetchJobs();
        fetchProfile();
    }, []);



    const fetchProfile = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobPoster.getProfile}${claim}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        })
            .then(response => {
                if (response.status === 200) {
                    setFormData(prevdata => ({
                        ...prevdata,
                        companyName: response.data.currentCompany
                    }))
                    setProfileComplete(true);
                }
                else if (response.status === 204) {
                    setProfileCompleteMessage('Complete profile to post a job')
                }
            })
            .catch(error => {
                if (error.response.status === 403) {
                    setErrorMessage('session Expired')
                    setTimeout(() => {
                        setErrorMessage('')
                        handleLogout();
                    }, 2000);
                }
                else {
                    setErrorMessage('Error occured')
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 2000);
                }
            }).finally(() => setLoading(false));
    }
    const fetchJobs = async () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobPoster.postedJobs}${claim}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        }).then(response => {
            setJobs(response.data.reverse())
            
           
        }).catch(error => {
            if (error.response.status === 403) {
                setErrorMessage('session Expired')
                setTimeout(() => {
                    setErrorMessage('')
                    handleLogout();
                }, 2000);
            }
            else {
                setErrorMessage('Error While fetching jobs')
                setTimeout(() => {
                    setErrorMessage('')
                }, 2000);
            }
        }).finally(() => setLoading(false));
    };
    const handleLogout = () => {
        dispatch(logoutEmployee());
        navigate('/employee-login');
    };

    const toggleForm = () => {
        if (profileComplete) {
            setIsFormOpen(!isFormOpen);
            setFormData({
                jobTitle: '',
                companyName: formData.companyName,
                jobLocation: '',
                jobType: '',
                jobDescriptionLink: '',
                educationLevel: '',
                experienceRequired: '',
                workMode: '',
                jobPostedBy: claim,
                otherJobTitle: '',

            });
        } else {
            setProfileError(true);
            setTimeout(() => {
                setProfileError(false);
            }, 3000)
        }
    };
    const handleEdit = (jobId) => {
        setIsEditing(true);
        setEditJobId(jobId);
        const jobToEdit = jobs.find(job => job.jobId === jobId);
        const jobLocationArray = jobToEdit.jobLocation.split(', ').map(city => city.trim());
        const citiesValues = cities.map(city => city.value);
        const customCities = jobLocationArray.filter(city => !citiesValues.includes(city));
        if (customCities.length > 0) {
            jobToEdit.customCity = customCities.join(', ');
            jobToEdit.jobLocation = jobLocationArray
                .filter(city => !customCities.includes(city))
                .concat('Others')
                .join(', ');
        } else {
            jobToEdit.customCity = '';
        }
        setFormData({ ...jobToEdit });
        setIsFormOpen(true);
    };

    const validate = () => {
      
        let newErrors = {};
        if (!formData.jobTitle) {
            newErrors.jobTitle = 'Job title is required';
        }
        if (formData.jobTitle === 'Others' && !formData.otherJobTitle) {
            newErrors.otherJobTitle = 'Please specify the job title';
        }
        if (!formData.companyName) {
            newErrors.companyName = 'Company name is required';
        }
        if (!formData.jobLocation) {
            newErrors.jobLocation = 'Job location is required';
        }
        if (formData.jobLocation.includes('Others') && !formData.customCity) {
            newErrors.customCity = 'Please specify the city';
        }
        if (!formData.jobType) {
            newErrors.jobType = 'Job type is required';
        }
        if (!formData.workMode) {
            newErrors.workMode = 'Work mode is required';
        }
        if (!formData.jobDescriptionLink) {
            newErrors.jobDescriptionLink = 'Job description link is required';
        }
        if (!formData.educationLevel) {
            newErrors.educationLevel = 'Education level is required';
        }
        if (!formData.experienceRequired) {
            newErrors.experienceRequired = 'Experience required is required';
        }
        setErrors(newErrors);
        return newErrors;
    };

    const scrollToFirstError = (errorFields) => {
        const refs = {
            jobTitle: jobTitleRef,
            otherJobTitle: otherJobTitleRef,
            companyName: companyNameRef,
            jobLocation: jobLocationRef,
            customCity: customCityRef,
            jobType: jobTypeRef,
            workMode: workModeRef,
            jobDescriptionLink: jobDescriptionLinkRef,
            educationLevel: educationLevelRef,
            experienceRequired: experienceRequiredRef,
        };
        for (const field in errorFields) {
            if (refs[field] && refs[field].current) {
                refs[field].current.scrollIntoView({ behavior: 'smooth' });
                break;
            }
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
       
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            if (isEditing) {
                const updateDdata = { ...formData, jobId: editJobId };
                if (formData.jobTitle === 'Others') {
                    updateDdata.jobTitle = formData.otherJobTitle;
                }
                if (formData.jobLocation.includes('Others')) {
                    const customCities = formData.customCity.split(',').map(city => city.trim());
                    updateDdata.jobLocation = formData.jobLocation.replace('Others', customCities.join(', '));
                }
                setLoading(true);
                axios.put(`${config.api.baseURL}${config.api.jobPoster.updateJob}`, JSON.stringify(updateDdata), {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    setUpdateMessage('Job updated successfully');
                    setTimeout(() => {
                        setUpdateMessage('');
                    }, 2000);
                    fetchJobs();
                }).catch(error => {
                    if (error.response.status === 403) {
                        setErrorMessage('session Expired')
                        setTimeout(() => {
                            setErrorMessage('')
                            handleLogout();
                        }, 2000);
                    }
                    else {
                        setErrorMessage('Failed to update Job');
                        setTimeout(() => {
                            setErrorMessage('');
                        }, 2000);
                    }
                }).finally(() => setLoading(false));

            } else {
                const updatedFormData = { ...formData };
                if (formData.jobTitle === 'Others') {
                    updatedFormData.jobTitle = formData.otherJobTitle;
                }
                if (formData.jobLocation.includes('Others')) {
                    const customCities = formData.customCity.split(',').map(city => city.trim());
                    updatedFormData.jobLocation = formData.jobLocation.replace('Others', customCities.join(', '));
                }
                
                setLoading(true);
                axios.post(`${config.api.baseURL}${config.api.jobPoster.saveJob}`, JSON.stringify(updatedFormData), {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    setUpdateMessage('Job posted successfully');
                    setTimeout(() => {
                        setUpdateMessage('');
                    }, 2000);
                    fetchJobs();
                    toggleForm();
                }).catch(error => {
                    if (error.response.status === 403) {
                        setErrorMessage('session Expired')
                        setTimeout(() => {
                            setErrorMessage('')
                            handleLogout();
                        }, 2000);
                    }
                    else {
                        setErrorMessage('Failed to post a job')
                        setTimeout(() => {
                            setErrorMessage('')
                        }, 2000);
                    }
                }).finally(() => setLoading(false));
            }
            setIsEditing(false);
            setEditJobId(null)
            toggleForm();
        }
        else {
            setIsTouched({
                jobTitle: true,
                otherJobTitle: formData.jobTitle === 'Others',
                companyName: true,
                jobLocation: true,
                customCity: formData.jobLocation.includes('Others'),
                jobType: true,
                workMode: true,
                jobDescriptionLink: true,
                educationLevel: true,
                experienceRequired: true,
            });
            scrollToFirstError(validationErrors);
           
        }

    };

    const handleDisableEnable = async (jobId, enabled) => {
        
        if (enabled) {

            setJobs(prev => 
                prev.map(job => job.jobId === jobId?{...job,enabled:false}:job)
            )
            axios.put(`${config.api.baseURL}${config.api.jobPoster.disableJob}${jobId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
                .then(response => {

                    fetchJobs();
                })
                .catch(error => {
                    setJobs(prev => 
                        prev.map(job => job.jobId === jobId?{...job,enabled:true}:job)
                    )
                    if (error.response.status === 403) {
                        setErrorMessage('session Expired')
                        setTimeout(() => {
                            setErrorMessage('')
                            handleLogout();
                        }, 2000);
                    }
                    else {
                        setErrorMessage('Error occured')
                        setTimeout(() => {
                            setErrorMessage('')
                        }, 2000);
                    }
                })
                .finally(() => setLoading(false));
        }
        else {
            setJobs(prev => 
                prev.map(job => job.jobId === jobId?{...job,enabled:true}:job)
            )
            axios.put(`${config.api.baseURL}${config.api.jobPoster.enableJob}${jobId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
                .then(response => {
                    
                })
                .catch(error => {
                    setJobs(prev => 
                        prev.map(job => job.jobId === jobId?{...job,enabled:false}:job)
                    )
                    if (error.response.status === 403) {
                        setErrorMessage('session Expired')
                        setTimeout(() => {
                            setErrorMessage('')
                            handleLogout();
                        }, 2000);
                    }
                    else {
                        setErrorMessage('Error occured')
                        setTimeout(() => {
                            setErrorMessage('')
                        }, 2000);
                    }
                })
                .finally(() => setLoading(false));
        }
    };

    useEffect(() => {
        if (isFormOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isFormOpen]);

    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(10);
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(jobs.length / jobsPerPage);
    return (
        <div className='flex flex-col min-h-screen bg-[#f5faff]'>
            <SideBar />
            <div className=' flex flex-col flex-grow pt-16 lg:pt-2 p-4 ml-0 xl:ml-[20%]'>
                {profileError && (
                    <p className='text-red-500 text-center'>{completeProfileMessage}</p>
                )}
                {errorMessage && (
                    <p className='text-red-500 fixed inset-0  flex justify-center bg-white  text-center'>{errorMessage}</p>
                )}
                {updateMessage && (
                    <p className='text-green-500 fixed left-1/2 transform -translate-x-1/2 p-2  bg-white font-bold'>
                        {updateMessage}
                    </p>

                )}
                <div className='flex justify-between items-center mb-2  '>
                    <h1 className='text-xl font-semibold'>Jobs Posted</h1>
                    <button
                        className='bg-blue-700 text-white px-4 py-2 rounded flex'
                        onClick={toggleForm}
                    >
                        <FaPlus className='mt-1 mx-2' /> Post a Job
                    </button>
                </div>
                {jobs.length > 0 && (<p className='text-xs mb-2'> Showing {jobs.length} results</p>)}
                {isFormOpen && (
                    <div className='modal-overlay'>
                        <div className='modal-content'>
                            <h2 className='text-2xl font-semibold mb-4'>{isEditing ? 'Edit Job' : 'Post a New Job'}</h2>
                           <JobPostForm formData={formData} setFormData={setFormData} handleFormSubmit={handleFormSubmit} errors={errors} setErrors={setErrors}
                                isEditing={isEditing} setIsEditing={setIsEditing} toggleForm={toggleForm} handleEdit={handleEdit}  isTouched={isTouched} setIsTouched={setIsTouched}
                                jobTitleRef={jobTitleRef} otherJobTitleRef={otherJobTitleRef} companyNameRef={companyNameRef} jobLocationRef={jobLocationRef} customCityRef={customCityRef}
                                jobTypeRef={jobTypeRef} workModeRef={workModeRef} jobDescriptionLinkRef={jobDescriptionLinkRef} educationLevelRef={educationLevelRef} experienceRequiredRef={experienceRequiredRef}
                           />
                        </div>
                    </div>
                )}
                <div className='flex flex-col flex-grow'>
                    {loading ? (
                        <div className="flex flex-col justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                            <p className="mt-4 text-gray-900">Loading...</p>
                        </div>
                    ) : (
                        <div className='flex flex-col flex-grow'>
                            {currentJobs.length > 0 ? (
                                currentJobs.map(job => (
                                    <div key={job.jobId} className='bg-white p-4 rounded shadow-md mb-2 flex flex-col md:flex-row gap-2 justify-between'>
                                        <div>
                                            <h2 className='text-lg font-semibold'>{job.jobTitle}</h2>
                                            <p className='text-sm'>Company: {job.companyName}</p>
                                            <p className='text-sm'>Location:   {
                                                job?.jobLocation
                                                    .split(',')
                                                    .map(location => location.trim())
                                                    .filter(location => location.toLowerCase() !== 'others' && location !== '')
                                                    .join(', ')
                                            } {`(${job.workMode})`}</p>
                                            <p className='text-sm'>Experience: {job.experienceRequired}</p>
                                            <p className='text-sm'>Posted on: {job.postedOn}</p>
                                            <a className='text-sm underline' href={job.jobDescriptionLink || "#"} target="_blank"  rel="noopener noreferrer">JobDescription Link</a>
                                            {job.disabledByAdmin && (<p className='text-xsm text-red-500'>This job was disabled by admin</p>)}
                                        </div>
                                        <div className='flex items-center space-x-2'>
                                            <button className='bg-blue-700 text-white h-8 px-2 rounded' onClick={() => handleEdit(job.jobId)}>Edit</button>
                                            <button className={`${job.enabled ? 'bg-red-500' : 'bg-green-500'} text-white h-8 px-2 rounded ${job.disabledByAdmin ? 'cursor-not-allowed' : ''}`} onClick={() => handleDisableEnable(job.jobId, job.enabled)} disabled={job.disabledByAdmin}>
                                                {job.enabled ? 'Disable' : 'Enable'}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='flex flex-grow items-center justify-center h-full'>
                                    <p className='font-bold text-center'>No Jobs Posted yet</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div >
            <Pagination
                totalJobs={jobs.length}
                jobsPerPage={jobsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <Footer />
        </div >
    );
}

export default JobsPosted;
