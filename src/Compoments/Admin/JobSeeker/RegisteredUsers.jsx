import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import axios from 'axios';
import { useSelector } from 'react-redux';
import config from '../../../config';
import AdminNavBar from '../NavBar/AdminNavBar';

function RegisteredUsers() {
  const log = useSelector(state => state.adminlog);
  const token = log.data.token;
  const [showSideNav, setShowSideNav] = useState(false);
  const sideNavRef = useRef(null);
  const buttonRef = useRef(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [filterType, setFilterType] = useState('all');

  const getRegisteredUsers = () => {
    setLoading(true);
    axios.get(`${config.api.baseURL}${config.api.admin.registeredUsers}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420"
      },
    }).then(response => {
      console.log(response);
      setRegisteredUsers(response.data)
    }).catch(error => {
      console.log(error)
    }).finally(() => setLoading(false));
  }

  useEffect(() => {
    getRegisteredUsers();
  }, [])

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = registeredUsers.filter(user => {
    if (filterType === 'subscribed') return user.subscribed;
    if (filterType === 'unsubscribed') return !user.subscribed;
    return true;
  });
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
    setCurrentPage(1); // Reset to first page whenever filter changes
  };

  const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav className="flex justify-center mt-4">
        <ul className='flex space-x-2'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <button
                onClick={() => paginate(number)}
                className='page-link bg-blue-200 rounded-full p-2'
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
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
              <h1 className='font-bold'>Registered Users</h1>
              <select
                value={filterType}
                onChange={handleFilterChange}
                className=' p-2 rounded-lg'
              >
                <option value="all">All Users</option>
                <option value="subscribed">Subscribed Users</option>
                <option value="unsubscribed"> Notsubscribed Users</option>
              </select>
            </div>
            <p className='text-sm  mx-7 my-1'>{filteredUsers.length} results</p>
            <div className="overflow-x-auto px-4 sm:px-6 lg:px-8">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/12 py-3 px-6 uppercase font-semibold text-sm text-left">S.No</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Name</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Mobile No</th>
                    <th className="w-3/12 py-3 px-6 uppercase font-semibold text-sm text-left">Mail ID</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Subscribed User</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {currentUsers.map((item, index) => (
                    <tr key={index}>
                      <td className="w-1/12 py-3 px-6 border-b border-gray-200">{indexOfFirstUser + index + 1}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.name}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.mobile}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.email}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.subscribed ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              usersPerPage={usersPerPage}
              totalUsers={filteredUsers.length}
              paginate={paginate}
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
  )
}

export default RegisteredUsers;
