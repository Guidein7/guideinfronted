import { useState, useEffect } from 'react';
import { logoutEmployee } from '../slices/employeeLoginSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Select from 'react-select';
import '../JobsPosted/JobsPosted.css'
import config from '../../../config';
import SideBar from '../SideBar/SideBar';
import Pagination from './Pagenation';
import Footer from '../SideBar/Footer';


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
    useEffect(() => {
        if (!token) {
            navigate('/employee-login');
        }

    }, [token, navigate])
    const decoded = token ? jwtDecode(token) : null;
    const claim = decoded ? decoded.sub : null;
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
        otherJobTitle: ''
    });
    const [jobs, setJobs] = useState([]);
    const [profileComplete, setProfileComplete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [completeProfileMessage, setProfileCompleteMessage] = useState('');
    const [profileError, setProfileError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');

    const jobTitles = ["Others",
        "Account Executive", "Account Manager", "Accountant", "Administrative Assistant",
        "Advertising Manager", "Aerospace Engineer", "Agile Coach", "Analyst", "Android Developer",
        "Animator", "Applications Developer", "Architect", "Art Director", "Assistant Manager",
        "Assistant Product Manager", "Associate Professor", "Asset Manager", "Audit Manager",
        "Back-End Developer", "Banking Analyst", "Benefits Coordinator", "Bioinformatics Specialist",
        "Biomedical Engineer", "Blockchain Developer", "Brand Manager", "Business Analyst",
        "Business Consultant", "Business Development Manager", "Business Intelligence Analyst",
        "CAD Designer", "CEO (Chief Executive Officer)", "CFO (Chief Financial Officer)",
        "Call Center Manager", "Campaign Manager", "Carpenter", "Case Manager", "Cashier",
        "Chemical Engineer", "Chief Marketing Officer (CMO)", "Chief Operating Officer (COO)",
        "Chief Technology Officer (CTO)", "Claims Adjuster", "Clinical Research Coordinator",
        "Cloud Architect", "Compliance Officer", "Computer Programmer", "Construction Manager",
        "Content Manager", "Content Writer", "Controller", "Copywriter", "Corporate Trainer",
        "Creative Director", "Credit Analyst", "Customer Service Manager", "Cyber Security Analyst",
        "Cytotechnologist", "Database Administrator", "Data Analyst", "Data Engineer", "Data Scientist",
        "Design Engineer", "Designer", "Development Manager", "DevOps Engineer", "Dietitian",
        "Director of Operations", "Director of Sales", "Distribution Manager", "Doctor",
        "Electrical Engineer", "Elementary School Teacher", "Embedded Systems Engineer",
        "Emergency Medical Technician (EMT)", "Employee Relations Specialist", "Email Marketing Manager",
        "Engineer", "Environmental Engineer", "Environmental Scientist", "Epidemiologist",
        "Event Coordinator", "Executive Assistant", "Facilities Manager", "Family Nurse Practitioner",
        "Fashion Designer", "Finance Manager", "Financial Advisor", "Financial Analyst",
        "Financial Planner", "Firefighter", "Fleet Manager", "Food Scientist", "Forensic Scientist",
        "Front-End Developer", "Full Stack Developer", "Fundraiser", "Game Designer",
        "Genetic Counselor", "Geneticist", "Geologist", "Graphic Designer", "Guidance Counselor",
        "Hardware Engineer", "Health and Safety Manager", "Healthcare Administrator",
        "Help Desk Technician", "High School Teacher", "Hospitality Manager", "Hotel Manager",
        "HR Manager", "Human Resources Specialist", "Hydrologist", "Illustrator",
        "Industrial Designer", "Industrial Engineer", "Information Security Analyst",
        "Information Systems Manager", "Information Technology Manager", "Information Technology Specialist",
        "Insurance Agent", "Instructional Designer", "Interior Designer", "Investment Banker",
        "IT Consultant", "IT Manager", "Java Developer", "Journalist", "Junior Accountant",
        "Laboratory Technician", "Landscape Architect", "Lawyer", "Librarian", "Machine Learning Engineer",
        "Maintenance Manager", "Management Consultant", "Manufacturing Engineer", "Marketing Coordinator",
        "Marketing Manager", "Marketing Specialist", "Mathematician", "Mechanical Engineer",
        "Media Planner", "Medical Assistant", "Medical Laboratory Technician", "Medical Technologist",
        "Mental Health Counselor", "Microbiologist", "Mobile Developer", "Mortgage Broker",
        "Music Producer", "Network Administrator", "Network Engineer", "Neuroscientist",
        "Nurse Practitioner", "Nursing Assistant", "Nutritionist", "Occupational Therapist",
        "Office Manager", "Operations Analyst", "Operations Manager", "Pediatrician",
        "Pharmacist", "Pharmacy Technician", "Physical Therapist", "Physician", "Physicist",
        "Portfolio Manager", "Principal", "Product Manager", "Product Owner", "Professor",
        "Project Coordinator", "Project Manager", "Property Manager", "Psychiatrist",
        "Psychologist", "Public Relations Manager", "Public Relations Specialist",
        "Purchasing Manager", "QA Engineer", "QA Manager", "Quality Assurance Analyst",
        "Recruiter", "Registered Nurse", "Research Analyst", "Research Scientist", "Retail Manager",
        "Risk Manager", "Sales Consultant", "Sales Director", "Sales Manager", "Sales Representative",
        "Scrum Master", "Security Analyst", "SEO Specialist", "Social Media Manager",
        "Software Developer", "Software Engineer", "Solutions Architect", "Speech Therapist",
        "Statistician", "Store Manager", "Strategic Planner", "Structural Engineer",
        "Supply Chain Manager", "Surgeon", "Surveyor", "System Administrator", "Systems Analyst",
        "Tax Advisor", "Teacher", "Technical Writer", "Technology Consultant", "Therapist",
        "Training Manager", "Translator", "Treasury Analyst", "UI Developer", "UI/UX Designer",
        "Underwriter", "User Experience Researcher", "Veterinarian", "Video Game Designer",
        "Warehouse Manager", "Web Designer", "Web Developer", "Writer"
    ];

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

    const handleJobTitleChange = (selectedOption) => {
        if (selectedOption.value === 'Others') {
            setFormData(prevFormData => ({ ...prevFormData, jobTitle: 'Others', otherJobTitle: '' }));
        } else {
            setFormData(prevFormData => ({ ...prevFormData, jobTitle: selectedOption.value, otherJobTitle: '' }));
        }
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            const updateddata = { ...formData, jobId: editJobId };
            if (formData.jobTitle === 'Others') {
                 updateddata.jobTitle = formData.otherJobTitle;
            }
            setLoading(true);
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
            setLoading(true);
            const updatedformData = { ...formData};
            if (formData.jobTitle === 'Others') {
                 updatedformData.jobTitle = formData.otherJobTitle;
            }
            axios.post(`${config.api.baseURL}${config.api.jobPoster.saveJob}`, JSON.stringify(updatedformData), {
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
    const [jobsPerPage] = useState(10);
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);


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

                <div className='flex justify-between items-center mb-2 '>
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
                            <form onSubmit={handleFormSubmit}>
                                <div className='mb-4'>
                                <label htmlFor="jobTitle">Job Title<span className='text-red-500'>*</span></label>
                                <Select
                                    id="jobTitle"
                                    options={jobTitles.map(title => ({ value: title, label: title }))}
                                    onChange={handleJobTitleChange}
                                    value={{ value: formData.jobTitle, label: formData.jobTitle }}
                                    required
                                />
                                </div>

                                {formData.jobTitle === 'Others' && (
                                    <div className='mb-4'>
                                        <label htmlFor="otherJobTitle">Please Specify<span className='text-red-500'>*</span></label>
                                        <input
                                            type="text"
                                            id="otherJobTitle"
                                            placeholder="Enter  job title"
                                            value={formData.otherJobTitle}
                                            onChange={handleChange}
                                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3'
                                            required
                                        />
                                    </div>
                                )}

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
                )
                }
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
           <Footer/>
        </div >
    );
}

export default JobsPosted;