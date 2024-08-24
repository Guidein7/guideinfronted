import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminNavBar from '../NavBar/AdminNavBar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import config from '../../../config';

function PostedJobs() {
  const log = useSelector(state => state.adminlog);
  const token = log.data.token;
  const [showSideNav, setShowSideNav] = useState(false);
  const sideNavRef = useRef(null);
  const buttonRef = useRef(null);
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  
  const jobsPerPage = 10;
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (
      sideNavRef.current &&
      !sideNavRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowSideNav(false);
    }
  };

  useEffect(() => {
    if (showSideNav) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSideNav]);

  const getPostedJobs = () => {
    setLoading(true);
    axios.get(`${config.api.baseURL}${config.api.admin.postedJobs}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420"
      },
    }).then(response => {
      setPostedJobs(response.data.reverse());
    }).catch(error => {
      console.log(error);
    }).finally(() => setLoading(false));
  }

  useEffect(() => {
    // Restore state from localStorage
    const savedSearchTerm = localStorage.getItem('searchTerm');
    const savedSelectedJobTitle = localStorage.getItem('selectedJobTitle');
    if (savedSearchTerm) setSearchTerm(savedSearchTerm);
    if (savedSelectedJobTitle) setSelectedJobTitle(savedSelectedJobTitle);
    getPostedJobs();
  }, []);

  useEffect(() => {
    // Save state to localStorage
    localStorage.setItem('searchTerm', searchTerm);
    localStorage.setItem('selectedJobTitle', selectedJobTitle);
    localStorage.setItem('currentPage', currentPage.toString());
  }, [searchTerm, selectedJobTitle]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleJobTitleChange = (event) => {
    setSelectedJobTitle(event.target.value);
    setCurrentPage(1);
  };

  const filteredJobs = postedJobs.filter(job =>
    job.jobPostedBy.toLowerCase().includes(searchTerm.toLowerCase()) &&
    job.jobTitle.toLowerCase().includes(selectedJobTitle.toLowerCase())
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClick = (job) => {
    navigate('/posted-jobdetails', { state: { job } });
  };

  return (
    <div className='bg-[#f5faff] min-h-screen flex flex-col'>
      <AdminNavBar />
      <div className='flex-grow mb-3'>
        {loading ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-900">Loading...</p>
          </div>
        ) : (
          <div>
            <h1 className='font-bold my-2 mx-5'>Jobs Posted</h1>
            <div className='mx-5 my-2 text-end'>
              <input
                type="text"
                placeholder="Search by Job Posted By"
                value={searchTerm}
                onChange={handleSearch}
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
               <input
                type="text"
                placeholder="Search by Job Role"
                value={selectedJobTitle}
                onChange={handleJobTitleChange}
                className="px-4 py-2 border border-gray-300 rounded-md ml-2"
              />
            </div>
            <p className='mx-7 my-1'>{filteredJobs.length} results</p>
            <div className="overflow-x-auto px-4 sm:px-6 lg:px-8">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/12 py-3 px-6 uppercase font-semibold text-sm text-left">S.No</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Name</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Job Posted By</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Job Role</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {currentJobs.map((item, index) => (
                    <tr key={index}>
                      <td className="w-1/12 py-3 px-6 border-b border-gray-200">{indexOfFirstJob + index + 1}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.jobPosterName}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.jobPostedBy}</td>
                      <td onClick={() => handleClick(item)} className="w-2/12 py-3 px-6 border-b border-gray-200 text-blue-500 cursor-pointer">{item.jobTitle}</td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              jobsPerPage={jobsPerPage}
              totalJobs={filteredJobs.length}
              paginate={paginate}
              currentPage={currentPage}
            />
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
    </div>
  );
}

const Pagination = ({ jobsPerPage, totalJobs, paginate, currentPage }) => {
  const pageNumbers = [];
  const pagesToShow = 4; // Number of pages to show at a time

  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Calculate the range of pages to display
  const startIndex = Math.max(currentPage - Math.floor(pagesToShow / 2), 0);
  const endIndex = Math.min(startIndex + pagesToShow, pageNumbers.length);

  const visiblePages = pageNumbers.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div className='flex justify-center'>
      <ul className='inline-flex'>
        <li>
          <button
            onClick={handlePrevious}
            className={`px-3 py-1 ${currentPage === 1 ? 'text-gray-400' : 'text-blue-500'} cursor-pointer`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>
        {visiblePages.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 ${currentPage === number ? 'bg-blue-500 text-white' : 'text-blue-500'} cursor-pointer`}
            >
              {number}
            </button>
          </li>
        ))}
        {endIndex < pageNumbers.length && (
          <li>
            <button className='px-3 py-1 text-blue-500 cursor-default'>...</button>
          </li>
        )}
        <li>
          <button
            onClick={handleNext}
            className={`px-3 py-1 ${currentPage === pageNumbers.length ? 'text-gray-400' : 'text-blue-500'} cursor-pointer`}
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PostedJobs;
