import { useState, useEffect } from 'react';
import { logoutEmployee } from '../slices/employeeLoginSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLaptop } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Select from 'react-select';
import '../JobsPosted/JobsPosted.css'
import GuideinLogo from '../../../assets/GuideinLogo.png'
import { CgProfile } from "react-icons/cg";
import config from '../../../config';
import SideBar from '../SideBar/SideBar';
import Pagination from './Pagenation';


const cities = [
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
    const decoded = jwtDecode(token);
    const claim = decoded.sub;
    const [editJobId, setEditJobId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
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
    });
    const [jobs, setJobs] = useState([]);
    const [profileComplete, setProfileComplete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [completeProfileMessage, setProfileCompleteMessage] = useState('');
    const [profileError, setProfileError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        fetchJobs();
        fetchProfile();
        setTimeout(() => setLoading(false), 1000)
    }, []);
    const fetchProfile = () => {
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
                    setProfileCompleteMessage('please complete profile to post a job')
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
            });
    }
    const fetchJobs = async () => {
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
        })

    };
    const handleLogout = () => {
        dispatch(logoutEmployee());
        navigate('/employee-login');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
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
            });
        } else {
            setProfileError(true);
            setTimeout(() => {
                setProfileError(false);
            }, 3000)
        }
    };
    const handleEdit = (jobId) => {
        setIsEditing(true)
        setEditJobId(jobId)
        const jobToEdit = jobs.find(job => job.jobId === jobId);
        setFormData({ ...jobToEdit });
        setIsFormOpen(true);
    };

    const cancel = () => {
        toggleForm();
        setIsEditing(false);
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [id]: value
        }));
    };

    const handleCityChange = (selectedOptions) => {
        const selectedCities = selectedOptions ? selectedOptions.map(option => option.value).join(', ') : '';
        setFormData({
            ...formData,
            jobLocation: selectedCities
        });
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (isEditing) {
            const updateddata = { ...formData, jobId: editJobId };
            axios.put(`${config.api.baseURL}${config.api.jobPoster.updateJob}`, JSON.stringify(updateddata), {
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
                setErrorMessage('Failed to update Job');
                setTimeout(() => {
                    setErrorMessage('');
                }, 2000);
            })
                .finally(() => setLoading(false));

        } else {
            axios.post(`${config.api.baseURL}${config.api.jobPoster.saveJob}`, JSON.stringify(formData), {
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
            })
                .finally(() => setLoading(false));
        }
        setIsEditing(false);
        setEditJobId(null)
        toggleForm();

    };

    const handleDisableEnable = async (jobId, enabled) => {
        setLoading(true)
        if (enabled) {
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
            axios.put(`${config.api.baseURL}${config.api.jobPoster.enableJob}${jobId}`, {},
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
    const [jobsPerPage] = useState(10); // Adjust this value as needed

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);


    return (
        <div className='flex flex-col min-h-screen bg-[#f5faff]'>

            <SideBar />
            <div className='flex-grow pt-16 lg:pt-2 p-4 ml-0 xl:ml-[20%]'>
                {profileError && (
                    <p className='text-red-500 text-center'>{completeProfileMessage}</p>
                )}
                {errorMessage && (
                    <p className='text-red-500 fixed inset-0  flex justify-center bg-white  text-center'>{errorMessage}</p>
                )}
                {updateMessage && (
                    <p className='text-green-500 fixed inset-0  flex justify-center bg-white   text-center'>{updateMessage}</p>
                )}
                <div className='flex-grow'>
                    <div className='flex justify-between items-center mb-2 '>
                        <h1 className='text-xl font-semibold'>Jobs Posted</h1>
                        <button
                            className='bg-blue-700 text-white px-4 py-2 rounded flex'
                            onClick={toggleForm}
                        >
                            <FaPlus className='mt-1 mx-2' /> Post a Job
                        </button>
                    </div>
                    {jobs.length >0 && (<p className='text-xs mb-2'> Showing {jobs.length} results</p>)}
                    {isFormOpen && (
                        <div className='modal-overlay'>
                            <div className='modal-content'>
                                <h2 className='text-2xl font-semibold mb-4'>{isEditing ? 'Edit Job' : 'Post a New Job'}</h2>
                                <form onSubmit={handleFormSubmit}>
                                    <div className='mb-4'>
                                        <label htmlFor='jobTitle' className='block text-sm font-medium text-gray-700'>
                                            Job Title<span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='jobTitle'
                                            value={formData.jobTitle}
                                            onChange={handleChange}
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                                            required
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='companyName' className='block text-sm font-medium text-gray-700'>
                                            Company Name<span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='companyName'
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                                            readOnly
                                            required
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='jobLocation' className='block text-sm font-medium text-gray-700'>
                                            Job Location<span className='text-red-500'>*</span>
                                        </label>
                                        <Select
                                            isMulti
                                            id='jobLocation'
                                            options={cities}
                                            value={cities.filter(city => formData.jobLocation.split(', ').includes(city.value))}
                                            onChange={handleCityChange}
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                                            required
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='jobType' className='block text-sm font-medium text-gray-700'>
                                            Job Type<span className='text-red-500'>*</span>
                                        </label>
                                        <select
                                            id='jobType'
                                            value={formData.jobType}
                                            onChange={handleChange}
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                                            required
                                        >
                                            <option value=''>Select</option>
                                            <option value='Full-time'>Full-time</option>
                                            <option value='Part-time'>Part-time</option>
                                            <option value='Contract'>Contract</option>
                                            <option value='Internship'>Internship</option>
                                            <option value='Freelance'>Freelance</option>
                                            <option value='Remote'>Remote</option>
                                            <option value='Consultant'>Consultant</option>
                                            <option value='Apprenticeship'>Apprenticeship</option>
                                        </select>
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='workMode' className='block text-sm font-medium text-gray-700'>
                                            Work Mode<span className='text-red-500'>*</span>
                                        </label>
                                        <select
                                            id='workMode'
                                            value={formData.workMode}
                                            onChange={handleChange}
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                                            required
                                        >
                                            <option value=''>Select</option>
                                            <option value='hybrid'>Hybrid</option>
                                            <option value='onsite'>Onsite</option>
                                            <option value='remote'>Remote</option>
                                        </select>
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='jobDescriptionLink' className='block text-sm font-medium text-gray-700'>
                                            Job Description Link<span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='jobDescriptionLink'
                                            value={formData.jobDescriptionLink}
                                            onChange={handleChange}
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                                            required
                                        />
                                    </div>
                                    <h2 className='text-xl font-semibold mb-4'>Requirements</h2>
                                    <div className='mb-4'>
                                        <label htmlFor='educationLevel' className='block text-sm font-medium text-gray-700'>
                                            Education Level<span className='text-red-500'>*</span>
                                        </label>
                                        <select
                                            id='educationLevel'
                                            value={formData.educationLevel}
                                            onChange={handleChange}
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                                            required
                                        >
                                            <option value=''>Select</option>
                                            <option value='High School'>High School</option>
                                            <option value='Associate Degree'>Associate Degree</option>
                                            <option value="bachelor's degree">Bachelor's Degree</option>
                                            <option value="Master's Degree">Master's Degree</option>
                                            <option value='Doctorate'>Doctorate</option>
                                            <option value='Diploma/Certification'>Diploma/Certification</option>
                                        </select>
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='experienceRequired' className='block text-sm font-medium text-gray-700'>
                                            Experience Required<span className='text-red-500'>*</span>
                                        </label>
                                        <select
                                            id='experienceRequired'
                                            value={formData.experienceRequired}
                                            onChange={handleChange}
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                                            required
                                        >
                                            <option value=''>Select</option>
                                            <option value='0-1 years'>0-1 years</option>
                                            <option value='1-3 years'>1-3 years</option>
                                            <option value='3-5 years'>3-5 years</option>
                                            <option value='5-7 years'>5-7 years</option>
                                            <option value='7+ years'>7+ years</option>
                                        </select>
                                    </div>
                                    <div className='flex justify-end'>
                                        <button
                                            type='button'
                                            onClick={cancel}
                                            className='text-white bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md shadow-md mr-2'
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type='submit'
                                            className='text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md shadow-md'
                                        >
                                            {isEditing ? 'Update Job' : 'Post Job'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    <div>
                        {loading ? (
                            <div className="flex flex-col justify-center items-center h-screen">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                                <p className="mt-4 text-gray-900">Loading...</p>
                            </div>
                        ) : (
                            <div>
                                {currentJobs.length > 0 ? (
                                    currentJobs.map(job => (
                                        <div key={job.jobId} className='bg-white p-4 rounded shadow-md mb-2 flex justify-between'>
                                            <div>
                                                <h2 className='text-lg font-semibold'>{job.jobTitle}</h2>
                                                <p className='text-sm'>Company: {job.companyName}</p>
                                                <p className='text-sm'>Location: {job.jobLocation} {`(${job.workMode})`}</p>
                                                <p className='text-sm'>Experience: {job.experienceRequired}</p>
                                                <p className='text-sm'>Posted on: {job.postedOn}</p>
                                                {job.disabledByAdmin && (<p className='text-xsm text-red-500'>This job was disabled by admin</p>)}
                                            </div>
                                            <div className='flex items-center space-x-2'>
                                                <button className='bg-blue-700 text-white h-8 px-2 rounded' onClick={() => handleEdit(job.jobId)}>Edit</button>
                                                <button className={`${job.enabled ? 'bg-red-500' : 'bg-green-500'} text-white h-8 px-2 rounded   ${job.disabledByAdmin ? 'cursor-not-allowed' : ''}`} onClick={() => handleDisableEnable(job.jobId, job.enabled)} disabled={job.disabledByAdmin}>
                                                    {job.enabled ? 'Disable' : 'Enable'}
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No jobs posted yet.</p>
                                )}
                            </div>
                        )}
                    </div>


                </div>

            </div>
            <Pagination
                totalJobs={jobs.length}
                jobsPerPage={jobsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
              <footer className="bg-[#00145e]  p-1 ml-0 xl:ml-[20%]">
                <div className="sm:mx-auto max-w-screen-lg">
                    <div className="grid grid-cols-2 gap-4 ">
                        <div className="text-white justify-self-start">

                        </div>
                        <div className="text-white justify-self-end">
                            <h2 className='pr-2'>Help & Support</h2>
                            <Link to='/econtactus' className='pl-2'>Contact Us</Link>
                        </div>
                    </div>
                    <div className="text-white text-center ">
                        <p>Copyright &copy; 2024</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default JobsPosted;