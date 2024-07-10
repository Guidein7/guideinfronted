import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import config from '../../../config';
import AdminNavBar from '../NavBar/AdminNavBar';

function WalletDetails() {
  const log = useSelector(state => state.adminlog);
  const token = log.data.token;
  const [showSideNav, setShowSideNav] = useState(false);
  const sideNavRef = useRef(null);
  const buttonRef = useRef(null);
  const [walletDetails, setWalletDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [withdrawFilter, setWithdrawFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const walletsPerPage = 10;
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

  const getAllwallets = () => {
    setLoading(true);
    axios.get(`${config.api.baseURL}${config.api.admin.allWalletDetails}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420"
      },
    }).then(response => {
      setWalletDetails(response.data);
    }).catch(error => {
      console.log(error);
    }).finally(() => setLoading(false));
  }

  useEffect(() => {
    getAllwallets();
  }, []);

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleWithdrawFilterChange = (event) => {
    setWithdrawFilter(event.target.value);
    setCurrentPage(1);
  };

  const filteredWallets = walletDetails.filter(wallet =>
    (nameFilter ? wallet.name.includes(nameFilter) : true) &&
    (withdrawFilter === "inProgress" ? wallet.withdrawInProgress > 0 : true)
  );

  const indexOfLastWallet = currentPage * walletsPerPage;
  const indexOfFirstWallet = indexOfLastWallet - walletsPerPage;
  const currentWallets = filteredWallets.slice(indexOfFirstWallet, indexOfLastWallet);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClick = (wallet) => {
    navigate('/emp-wallet-details', { state: { wallet } });
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
            <h1 className='font-bold my-2 mx-5'>Wallet Details</h1>
            <div className='mx-5 my-2 text-end'>
              <select
                value={nameFilter}
                onChange={handleNameFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-md  mb-2"
              >
                <option value="">Filter by name</option>
                {walletDetails.map(wallet => (
                  <option key={wallet.name} value={wallet.name}>{wallet.name}</option>
                ))}
              </select>
              <select
                value={withdrawFilter}
                onChange={handleWithdrawFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-md mx-2"
              >
                <option value="">All</option>
                <option value="inProgress">Withdraw In Progress</option>
              </select>
            </div>
            <div className="overflow-x-auto px-4 sm:px-6 lg:px-8">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/12 py-3 px-6 uppercase font-semibold text-sm text-left">S.No</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Name</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Mobile No</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Total Referrals</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Total Earned</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Amount Withdrawn</th>
                    <th className="w-2/12 py-3 px-6 uppercase font-semibold text-sm text-left">Withdraw In Progress</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {currentWallets.map((item, index) => (
                    <tr key={index}>
                      <td className="w-1/12 py-3 px-6 border-b border-gray-200">{indexOfFirstWallet + index + 1}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.name}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.mobile}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.totalReferrals}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.totalEarned}</td>
                      <td className="w-2/12 py-3 px-6 border-b border-gray-200">{item.amountWithdrawn}</td>
                      <td onClick={() => handleClick(item)} className="w-2/12 py-3 px-6 border-b border-gray-200 text-blue-500 cursor-pointer">{item.withdrawInProgress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              itemsPerPage={walletsPerPage}
              totalItems={filteredWallets.length}
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

export default WalletDetails;
