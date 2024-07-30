import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminNavBar from '../NavBar/AdminNavBar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import config from '../../../config';

function Referrals() {
  const log = useSelector(state => state.adminlog);
  const token = log.data.token;
  const [showSideNav, setShowSideNav] = useState(false);
  const sideNavRef = useRef(null);
  const buttonRef = useRef(null);
  const [registeredEmployees, setRegisteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const referralsPerPage = 10;
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

  const getReferrals = () => {
    setLoading(true);
    axios.get(`${config.api.baseURL}${config.api.admin.referrals}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420"
      },
    }).then(response => {
      setRegisteredEmployees(response.data.reverse());
    }).catch(error => {
      console.log(error);
    }).finally(() => setLoading(false));
  }

  useEffect(() => {
    getReferrals();
  }, []);

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const filteredReferrals = registeredEmployees.filter(referral =>
    statusFilter ? referral.status === statusFilter : true
  );

  const indexOfLastReferral = currentPage * referralsPerPage;
  const indexOfFirstReferral = indexOfLastReferral - referralsPerPage;
  const currentReferrals = filteredReferrals.slice(indexOfFirstReferral, indexOfLastReferral);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClick = (status) => {
    navigate('/referrals-status', { state: { status } });
  };

  return (
    <div className='bg-[#f5faff] min-h-screen flex flex-col'>
      <AdminNavBar />
      <div className='flex-grow'>
        {loading ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-900">Loading...</p>
          </div>
        ) : (
          <div>
            <h1 className='font-bold my-2 mx-5'>Referrals</h1>
            <div className='mx-5 my-2 text-end'>
              <select
                value={statusFilter}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-md "
              >
                <option value="">All</option>
                <option value="REQUESTED">REQUESTED</option>
                <option value="IN_VERIFICATION">IN_VERIFICATION</option>
                <option value="REFERRED">REFERRED</option>
                <option value="REJECTED">REJECTED</option>
                <option value="VERIFICATION_FAILED">VERIFICATION_FAILED</option>
              </select>
            </div>
            <p className='mx-7 my-1'>{filteredReferrals.length} results</p>
            <div className="overflow-x-auto px-4 sm:px-6 lg:px-8">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/12 py-3 px-6 uppercase font-semibold text-sm text-left">S.No</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Job Role</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Requested by</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Mobile No</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Requested to</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Mobile No</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Requested On</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {currentReferrals.map((item, index) => (
                    <tr key={index}>
                      <td className="w-1/12 py-3 px-6 border-b border-gray-200">{indexOfFirstReferral + index + 1}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.jobRole}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.requestedBy}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.mobileOfrequestedBy}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.jobPostedBy}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.mobileOfJobPostedBy}</td>
                      <td className={`w-2/12 py-3 px-6 border-b border-gray-200 ${(item.status ==='REQUESTED' && item.requestedAgo === 'expired') ? 'text-red-500':''}`}>{item.requestedOn}</td>
                      <td onClick={() => handleClick(item)} className="w-2/12 py-3 px-6 border-b border-gray-200 cursor-pointer text-blue-500">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              itemsPerPage={referralsPerPage}
              totalItems={filteredReferrals.length}
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
            <p>Copyright &copy; 2024</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='flex justify-center mt-4'>
      <ul className='flex space-x-2'>
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Referrals;
