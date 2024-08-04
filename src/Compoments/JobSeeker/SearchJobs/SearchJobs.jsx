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

function SearchJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ jobTitle: '', experience: '', location: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;
    const filteredJobs = jobs.filter(job =>
        (filters.jobTitle ? job.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase()) : true) &&
        (filters.experience ? job.experienceRequired.toLowerCase().includes(filters.experience.toLowerCase()) : true) &&
        (filters.location ? job.jobLocation.toLowerCase().includes(filters.location.toLowerCase()) : true)
    );

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const [saveJobMessage, setSaveJobMessage] = useState('');
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const dispatch = useDispatch();
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const decoded = token ? jwtDecode(token) : null;
    const email = decoded ? decoded.sub : null;
    const navigate = useNavigate();

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
        setLoading(true);

        axios.post(`${config.api.baseURL}${config.api.jobSeeker.saveJob}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                jobId: jobId,
                email: email
            }

        }).then(response => {
            fetchJobs();
        }).catch(error => {

            setSaveJobMessage('Error while saving job');
            setTimeout(() => setSaveJobMessage(''), 2000)

        }).finally(() => setLoading(false))

    };
    const handleClick = (job) => {
        navigate('/job-details', { state: { job } });
    };
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
        setCurrentPage(1);
    };

    

        
    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between pt-14 lg:pt-0">
            <NavBar />
            {jobs.length > 0 && (
                <div className="flex flex-row pl-0 lg:pl-10 fixed  w-full ml-0 xl:ml-[20%] z-10  bg-[#f5faff]  mb-2 py-2 overflow-x-auto">
                    <input
                        type="text"
                        name="jobTitle"
                        placeholder="Search by Job Title"
                        value={filters.jobTitle}
                        onChange={handleFilterChange}
                        className="p-2 border rounded mr-2"
                    />
                    <select
                        name="experience"
                        value={filters.experience}
                        onChange={handleFilterChange}
                        className="p-2 border rounded mr-2"
                    >
                        <option value="">Experience</option>
                        <option value="0-1 Years">0-1 Years</option>
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5-7 Years">5-7 Years</option>
                        <option value="7+ Years">7+ Years</option>
                    </select>
                    <select
                        name="location"
                        value={filters.location}
                        onChange={handleFilterChange}
                        className="p-2 border rounded"
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
                </div>
            )}
            {loading ? (
                <div className="flex flex-col justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-900">Loading...</p>
                </div>
            ) : (
                <div className=" flex flex-grow flex-col  ml-0 xl:ml-[20%] pt-20 ">
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
                                        <p
                                            onClick={() => handleClick(job)}
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
                                                .join(', ')
                                        } ({job.workMode})</p>
                                        <p className="text-sm md:text-left">JobType: {job.jobType}</p>
                                        <p className="text-sm md:text-left">Experience: {job.experienceRequired}</p>
                                        <p className="text-sm md:text-left">Posted by: {job.jobPosterName}</p>
                                        <p className="text-sm md:text-left">Posted on: {job.postedOn}</p>
                                    </div>
                                    <div className="flex flex-row">
                                        <button
                                            onClick={() => handleSaveJob(job.jobId)}
                                            className={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 `}
                                            disabled={job.saved}
                                        >
                                            {job.saved ? 'Saved' : 'Save'}
                                        </button>
                                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => handleClick(job)}>{job.status === 'UN_REQUESTED' ? 'Request Referral' : 'Referral Requested'}</button>
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
