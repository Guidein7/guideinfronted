import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutUser } from "../Slices/loginSlice";
import { jwtDecode } from "jwt-decode";
import NavBar from "../NavBar/NavBar";
import config from "../../../config";
import JSFooter from "../NavBar/JSFooter";
import { Buffer } from 'buffer';
import SBookmarkIcon from "./Sbookmark";

function SearchJobs() {
    const dispatch = useDispatch();
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const decoded = token ? jwtDecode(token) : null;
    const email = decoded ? decoded.sub : null;
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ jobTitle: '', experience: '', location: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;
    const [errorMessage,setErrorMessage] = useState('');
    const filterExperience = (experienceRequired, selectedExperience) => {
        experienceRequired = experienceRequired.toLowerCase();
        selectedExperience = selectedExperience.toLowerCase();
        const oldExperienceRanges = {
            '0-1 years': ['0-1 years', '0+ years', '1+ years'],
            '1-3 years': ['1-3 years', '1+ years', '2+ years', '3+ years'],
            '3-5 years': ['3-5 years', '3+ years', '4+ years', '5+ years'],
            '5-7 years': ['5-7 years', '5+ years', '6+ years', '7+ years'],
            '7-9 years': ['7+ years', '8+ years', '9+ years'],
            '9-11 years': ['9+ years', '10+ years', '11+ years'],
            '12+ years': ['12+ years'],
        };
        if (oldExperienceRanges[selectedExperience]) {
            return oldExperienceRanges[selectedExperience].some(exp => experienceRequired === exp);
        }
        if (selectedExperience.includes('+')) {
            const selectedYears = parseInt(selectedExperience);
            const jobYears = parseInt(experienceRequired);
            if (experienceRequired.includes('+')) {
                return jobYears >= selectedYears;
            }
            const rangeMatch = experienceRequired.match(/(\d+)-(\d+)/);
            if (rangeMatch) {
                const [_, min, max] = rangeMatch.map(Number);
                return selectedYears >= min && selectedYears <= max;
            }
        }
        return false;
    };
    
    const filteredJobs = jobs.filter(job =>
        (filters.jobTitle ? job.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase()) : true) &&
        (filters.experience ? filterExperience(job.experienceRequired, filters.experience) : true) &&
        (filters.location ? job.jobLocation.toLowerCase().includes(filters.location.toLowerCase()) : true)
    );
    
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const [saveJobMessage, setSaveJobMessage] = useState('');

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        localStorage.setItem('currentPage', newPage);
    };

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token, navigate])

    useEffect(() => {
        fetchJobs();
    }, []);

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
            setJobs(response.data.reverse());
          

        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSaveJobMessage('session Expired');
                setTimeout(() => {
                    setSaveJobMessage('');
                    handleLogout();
                }, 2000);
            } else {
                setSaveJobMessage('Error while fetching jobs');
                setTimeout(() => setSaveJobMessage(''), 2000);
               
            }
        } finally {
            setLoading(false);
        }


    };

    const handleLogout = () => {
        navigate('/login');
        dispatch(logoutUser());
    };


    const handleSaveJob = async (jobId) => {
        setJobs(prevJobs => 
            prevJobs.map(job =>
                job.jobId === jobId ? { ...job, saved: true } : job
            )
        );
    
        try {
            await axios.post(`${config.api.baseURL}${config.api.jobSeeker.saveJob}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                params: { jobId: jobId, email: email }
            });
        } catch (error) {
            setJobs(prevJobs => 
                prevJobs.map(job =>
                    job.jobId === jobId ? { ...job, saved: false } : job
                )
            );
            setSaveJobMessage('Error while saving job');
            setTimeout(() => setSaveJobMessage(''), 2000);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const updatedFilters = {
            ...filters,
            [name]: value
        };

        setFilters(updatedFilters);
        localStorage.setItem('filters', JSON.stringify(updatedFilters));
        localStorage.setItem('currentPage', 1); // Reset page to 1 when filters change
        setCurrentPage(1);
    };



    useEffect(() => {
        const savedFilters = JSON.parse(localStorage.getItem('filters'));
        const savedPage = parseInt(localStorage.getItem('currentPage'), 10);

        if (savedFilters) {
            setFilters(savedFilters);
        }
        if (savedPage) {
            setCurrentPage(savedPage);
        }

    }, []);

    const handleClearFilters = () => {
        setFilters({ jobTitle: '', experience: '', location: '' });
        localStorage.removeItem('filters');
        localStorage.setItem('currentPage', 1);
        setCurrentPage(1);
    };

    const handleRemoveSavedJob = (jobId) => {
       
        setJobs(prevJobs => 
            prevJobs.map(job =>
                job.jobId === jobId ? { ...job, saved: false } : job
            )
        );
    
        axios.delete(`${config.api.baseURL}${config.api.jobSeeker.removeSavedJobs}`, {
            headers: { 
                Authorization: `Bearer ${token}`, 
                "ngrok-skip-browser-warning": "69420" 
            },
            params: { jobId: jobId, email: email }
        })
        .then(response => {
            // Optionally, you can fetch jobs again if needed
            // fetchJobs();
        })
        .catch(error => {
            // Handle error: revert the optimistic update if there's an error
            setJobs(prevJobs => 
                prevJobs.map(job =>
                    job.jobId === jobId ? { ...job, saved: true } : job
                )
            );
            setErrorMessage('Error while removing the job');
            setTimeout(() => {
                setErrorMessage('');
            }, 2000);
        })
        .finally(() => setLoading(false));
    };

    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between pt-14 lg:pt-0">
            <NavBar />
            {jobs.length > 0 && (
                <div className="flex flex-row pl-0 lg:pl-10 fixed w-full ml-0 lg:ml-[20%] z-10 bg-[#f5faff] mb-2 py-2 overflow-x-auto">
                    <input
                        type="text"
                        name="jobTitle"
                        placeholder="Search by Job Title"
                        value={filters.jobTitle}
                        onChange={handleFilterChange}
                        className="p-2 border rounded mr-2 flex-shrink-0 min-w-[200px]"
                    />
                    <select
                        name="experience"
                        value={filters.experience}
                        onChange={handleFilterChange}
                        className="p-2 border rounded mr-2 flex-shrink-0 min-w-[150px]"
                    >
                        <option value="">Experience</option>
                        <option value="0-1 Years">0-1 Years</option>
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5-7 Years">5-7 Years</option>
                        <option value="7-9 Years">7-9 Years</option>
                        <option value="9-11 Years">9-11 Years</option>
                        <option value="12+ Years">12+ Years</option>
                    </select>
                    <select
                        name="location"
                        value={filters.location}
                        onChange={handleFilterChange}
                        className="p-2 border rounded mr-2 flex-shrink-0 min-w-[200px]"
                    >
                       <option value="">Location</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Pune">Pune</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Noida">Noida</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Kochi">Kochi</option>
                        <option value="Indore">Indore</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Visakhapatnam">Visakhapatnam</option>
                        <option value="Surat">Surat</option>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Bhubaneswar">Bhubaneswar</option>
                        <option value="Patna">Patna</option>
                        <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                        <option value="Vadodara">Vadodara</option>
                        <option value="Guwahati">Guwahati</option>
                    </select>
                    <button
                        onClick={handleClearFilters}
                        className="p-2 bg-gray-700 text-white rounded flex-shrink-0 min-w-[150px]"
                    >
                        Clear Filters
                    </button>
                </div>


            )}
            {loading ? (
                <div className="flex flex-col justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-900">Loading...</p>
                </div>
            ) : (
                <div className=" flex flex-grow flex-col  ml-0 lg:ml-[20%] pt-20 ">
                    {saveJobMessage && (<p className="text-red-500 fixed left-1/2 transform -translate-x-1/2 bg-white px-4 py-2">{saveJobMessage}</p>)}

                    {jobs.length > 0 && (
                        <h1 className=" mb-2 mx-2 md:text-left  lg:pt-0">
                            {filteredJobs.length} results
                        </h1>
                    )}
                    {filteredJobs.length === 0 ? (<h1 className="flex  flex-grow h-full  items-center justify-center">No Jobs Found</h1>) :
                        (<div>
                            {currentJobs.map((job, index) => (
                                <div key={index} className="bg-white p-4 rounded shadow-md mb-2 flex flex-col md:flex-row justify-between items-start md:items-center">
                                    <div className="mb-4 md:mb-0">
                                        <Link
                                            to={`/job-details/${Buffer.from(job.jobPostedBy).toString('base64')}/${job.jobId}?title=${job.jobTitle}`}
                                            className="text-lg font-semibold block  cursor-pointer md:text-left"
                                        >
                                            {job.jobTitle}
                                        </Link>
                                        <p className="text-sm md:text-left">Company: {job.companyName}</p>
                                        <p className="text-sm md:text-left">Location: {
                                            job.jobLocation
                                                .split(',')
                                                .map(location => location.trim())
                                                .filter(location => location.toLowerCase() !== 'others' && location !== '')
                                                .join(', ')
                                        } ({job.workMode})</p>
                                        <p className="text-sm md:text-left">JobType: {job.jobType}</p>
                                        <p className="text-sm md:text-left">Experience: {job.experienceRequired}</p>
                                        <p className="text-sm md:text-left">Posted by: {job.jobPosterName}</p>
                                        <p className="text-sm md:text-left">Posted on: {job.postedOn}</p>
                                    </div>
                                    <div className="flex flex-row">
                                    <div className="flex justify-center items-center me-5 cursor-pointer"  onClick={job.saved ? () => handleRemoveSavedJob(job.jobId) : () =>  handleSaveJob(job.jobId)} >
                                                <SBookmarkIcon saved={job.saved} />
                                    </div>
                                        <Link to={`/job-details/${Buffer.from(job.jobPostedBy).toString('base64')}/${job.jobId}?title=${job.jobTitle}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >{job.status === 'UN_REQUESTED' ? 'Request Referral' : 'Referral Requested'}</Link>
                                    </div>
                                </div>
                            ))}

                        </div>)}


                </div>
            )}
            {jobs.length > 10 && (
                <div className="flex justify-center my-3 ml-0 xl:ml-[20%]">
                    {currentPage > 1 && (
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-4 py-2 mx-1 bg-gray-300 rounded"
                        >
                            Previous
                        </button>
                    )}
                    {Array.from({ length: totalPages }, (_, index) => {
                        if (index + 1 === currentPage || (index + 1 >= currentPage - 1 && index + 1 <= currentPage + 1)) {
                            return (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                >
                                    {index + 1}
                                </button>
                            );
                        }
                        return null;
                    })}
                    {currentPage < totalPages && (
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-4 py-2 mx-1 bg-gray-300 rounded"
                        >
                            Next
                        </button>
                    )}
                </div>
            )}

            <JSFooter />
        </div>
    );

}

export default SearchJobs;
