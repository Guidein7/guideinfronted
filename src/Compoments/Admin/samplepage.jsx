import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import GuideinLogo from '../../assets/GuideinLogo.png';

function Sample () {
    const [showSideNav, setShowSideNav] = useState(false);
    const sideNavRef = useRef(null);
    const buttonRef = useRef(null);
  
    const NavLinks = ({ className }) => (
      <div className={className}>
        <button className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Dashboard</button>
        <button className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>search Jobs</button>
        <button className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Saved Jobs</button>
        <button className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>applied Referrals</button>
        <button className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Profile</button>
        <button className='mr-4 mb-4 lg:mb-0 bg-blue-700 p-2 text-white rounded-lg'>Wallet</button>
  
      </div>
    );
  
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
      <div className='bg-[#f5faff]'>
        <nav className="bg-[#f8f9fa] py-4 w-full fixed ">
          <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>
            <div className='block lg:hidden'>
              <button
                ref={buttonRef}
                className='text-dark focus:outline-none z-50 fixed '
                onClick={() => setShowSideNav(!showSideNav)}
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
            <div className='lg:block'>
              <Link to='/admin-home'>
                <img src={GuideinLogo} alt='logo' className='h-8' />
              </Link>
            </div>
            <NavLinks className='nav-links hidden lg:flex' />
          </div>
        </nav>
        <div
          ref={sideNavRef}
          className={`side-nav fixed top-0 left-0 h-full w-36 bg-[#f8f9fa] shadow-lg z-40 flex flex-col transform transition-transform duration-300 ${showSideNav ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className='p-4 pt-16'> {/* Adjusted padding to push content down */}
            <NavLinks className='flex flex-col' />
          </div>
        </div>
        <div className='flex-grow'>
            <h1 className='font-bold my-2 mx-5'>Registred users</h1>
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
      <tr>
        <td className="w-1/12 py-3 px-6 border-b border-gray-200">1</td>
        <td className="w-2/12 py-3 px-6 border-b border-gray-200">John Doe</td>
        <td className="w-2/12 py-3 px-6 border-b border-gray-200">123-456-7890</td>
        <td className="w-3/12 py-3 px-6 border-b border-gray-200">john@example.com</td>
        <td className="w-2/12 py-3 px-6 border-b border-gray-200 text-center">Yes</td>
      </tr>
      <tr>
        <td className="w-1/12 py-3 px-6 border-b border-gray-200">1</td>
        <td className="w-2/12 py-3 px-6 border-b border-gray-200">John Doe</td>
        <td className="w-2/12 py-3 px-6 border-b border-gray-200">123-456-7890</td>
        <td className="w-3/12 py-3 px-6 border-b border-gray-200">john@example.com</td>
        <td className="w-2/12 py-3 px-6 border-b border-gray-200 text-center">Yes</td>
      </tr>
     
    </tbody>
  </table>
</div>


        </div>
        <div className="bg-[#00145e]  w-full p-4 ">
        <footer className=' sm:mx-auto max-w-screen-lg'>
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

export default Sample;