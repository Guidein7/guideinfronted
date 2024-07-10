import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import config from '../../../config';
import axios from 'axios';
import AdminNavBar from '../NavBar/AdminNavBar';

function SubscribedUsers() {
  const log = useSelector(state => state.adminlog);
  const token = log.data.token;
  const [showSideNav, setShowSideNav] = useState(false);
  const sideNavRef = useRef(null);
  const buttonRef = useRef(null);
  const [subscribedUsers, setSubscribedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterPlan, setFilterPlan] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const getSubscribedUsers = () => {
    setLoading(true);
    axios.get(`${config.api.baseURL}${config.api.admin.subscribedUsers}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420"
      },
    }).then(response => {
      setSubscribedUsers(response.data);
    }).catch(error => {
      console.log(error);
    }).finally(() => setLoading(false));
  }

  useEffect(() => {
    getSubscribedUsers();
  }, []);

  const handleFilterChange = (e) => {
    setFilterPlan(e.target.value);
    setCurrentPage(1);
  };

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

  const filteredUsers = subscribedUsers.filter(user => 
    filterPlan === "all" || user.plan === filterPlan
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <div className='flex justify-between items-center mx-5 my-2'>
              <h1 className='font-bold'>Subscribed Users</h1>
              <select
                value={filterPlan}
                onChange={handleFilterChange}
                className='border border-black p-2 rounded-lg'
              >
                <option value="all">All Plans</option>
                <option value="STANDARD">Standard Plan</option>
                <option value="PREMIUM">Premium Plan</option>
                <option value="ULTIMATE">Ultimate Plan</option>
              </select>
            </div>
            <div className="overflow-x-auto px-4 sm:px-6 lg:px-8">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/12 py-3 px-6 uppercase font-semibold text-sm text-left">S.No</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Name</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Mobile No</th>
                    <th className="w-3/12 py-3 px-6 uppercase font-semibold text-sm text-left">Mail ID</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Subscribed Plan</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Date of Subscription</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {currentUsers.map((item, index) => (
                    <tr key={index}>
                      <td className="w-1/12 py-3 px-6 border-b border-gray-200">{indexOfFirstUser + index + 1}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.name}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.mobile}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.email}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.plan}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.subscribedOn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              usersPerPage={usersPerPage}
              totalUsers={filteredUsers.length}
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

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
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

export default SubscribedUsers;
