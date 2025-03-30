
import GuideinLogo from '../../../assets/GuideinLogo.png';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import emailicon from '../../../assets/emailicon.png'
import callicon from '../../../assets/callicon.png'
import JFooter from './JFooter';
function ContactUsJs() {
    const [showSideNav, setShowSideNav] = useState(false);
    const sideNavRef = useRef(null);
    const buttonRef = useRef(null);
   

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

    const handleEarnMoneyClick = () => {
        window.open('/employee-landingpage', '_blank');
    };

    const NavLinks = ({ className = '' }) => (
        <>
            <button
                onClick={handleEarnMoneyClick}
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`}
            >
                Earn Money
            </button>
            <Link
                type=""
                to="/register"
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`}
            >
                Join Now
            </Link>
            <Link
                to="/login"
                className={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ${className}`}
            >
                Sign In
            </Link>
        </>
    );

    return (
        <div className='bg-[#f5faff] min-h-screen flex flex-col justify-between'>
            <nav className="bg-[#f8f9fa] py-4 w-full fixed z-50">
                <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>
                    {/* <div className='block lg:hidden'>
                        <button
                            ref={buttonRef}
                            className='text-dark focus:outline-none z-50'
                            onClick={() => setShowSideNav(!showSideNav)}
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div> */}
                    <div className='lg:block'>
                        <Link to='/'>
                            <img src={GuideinLogo} alt='logo' className='h-8 lg:h-8' />
                        </Link>
                    </div>
                    {/* <div className='hidden lg:flex space-x-4'>
                        <NavLinks />
                    </div> */}
                </div>
            </nav>
            {/* <div
                ref={sideNavRef}
                className={`side-nav fixed top-0 left-0 h-full w-38 bg-[#f8f9fa] shadow-lg z-40 flex flex-col transform transition-transform duration-300 ${showSideNav ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className='p-4 pt-16'>
                    <NavLinks className='flex flex-col my-4' />
                </div>
            </div> */}
            <div className='flex-grow justify-center items-center pt-24'>
                <div className="flex  flex-col justify-center items-center">
                    <h1 className=" text-3xl">We are here to help.</h1>
                    <p className="pt-12 text-center">Have an issue or query or feedback for us? our support team is here to help you 24/7</p>
                    <h1 className="pt-12 ont-bold text-3xl">Contact Us</h1>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-10">
                        <div>
                            <img src={emailicon} alt='emailicon' />
                            <p className='font-bold'>support@guidein.org</p>
                        </div>
                        <div className='hidden lg:block'>
                            <h1 className="text-3xl text-center ">Address</h1>
                            <div className="pt-5 text-center">
                                <p>P. No 27, Sri Ram Nagar Colony</p>
                                <p>Beeramguda, Hyderabad, Medak</p>
                                <p>Telangana, 502032</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto">
                                <img src={callicon} alt='callicon' className="mx-auto" />
                            </div>
                            <p className='font-bold'>+91 9392579230</p>
                            <p></p>
                        </div>
                    </div>

                </div>
            </div>
            {/* <JFooter/> */}
            <div className="">
            <div className="bg-[#00145e] w-full p-2">
                    <footer className="max-w-screen mx-auto">
                        <div className="grid grid-cols-3 md:grid-cols-3 gap-1 md:gap-4 justify-center items-center ">
                            <div className="text-white text-start">
                                {/* <Link to="/referral-faqs" className="text-sm">FAQ</Link> */}
                                <h2>Help & Support</h2>
                                <p className='text-sm md:text-base '>+91 9392579230</p>
                            </div>
                            <div className="text-white text-sm text-center ">
                                <p>Copyright &copy; {new Date().getFullYear()}</p>
                            </div>
                            <div className="text-white text-sm text-end">
                                
                                <Link to="/contact-us" className="">Contact Us</Link>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default ContactUsJs;

