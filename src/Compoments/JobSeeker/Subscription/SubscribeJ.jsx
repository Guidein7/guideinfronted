import { Link, useNavigate } from "react-router-dom";
import GuideinLogo from '../../../assets/GuideinLogo.png';
import { useState, useRef, useEffect } from "react";
import JFooter from "../LandingPage/JFooter";
function SubscribeJ() {
    const modalRef = useRef(null);
    const [showSideNav, setShowSideNav] = useState(false);
    const sideNavRef = useRef(null);
    const buttonRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

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

    const handleEarnMoneyClick = () => {
        window.open('/employee-landingpage', '_blank');
    };

    const paymentButton = () => {
        navigate('/login')
    }
    const paymentButton1 = () => {
        navigate('/login')
    }
    const paymentButton2 = () => {
        navigate('/login')
    }
    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col ">
            <nav className="bg-[#f8f9fa] py-4 w-full fixed z-50">
                <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>
                    <div className='block lg:hidden'>
                        <button
                            ref={buttonRef}
                            className='text-dark focus:outline-none z-50'
                            onClick={() => setShowSideNav(!showSideNav)}
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                    <div className='lg:block'>
                        <Link to='/'>
                            <img src={GuideinLogo} alt='logo' className='h-8 lg:h-8' />
                        </Link>
                    </div>
                    <div className='hidden lg:flex space-x-4'>
                        <NavLinks />
                    </div>
                </div>
            </nav>
            <div
                ref={sideNavRef}
                className={`side-nav fixed top-0 left-0 h-full w-38 bg-[#f8f9fa] shadow-lg z-40 flex flex-col transform transition-transform duration-300 ${showSideNav ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className='p-4 pt-16'>
                    <NavLinks className='flex flex-col my-4' />
                </div>
            </div>
            <div className="pt-20 flex-grow">
                <h1 className="text-center text-xl font-bold pt-2 lg:pt-2">Subscription Plans</h1>
                <p className="text-center mb-3"> Choose the plan that best suits your needs</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-2  gap-2 lg:gap-6 mx-5 lg:mx-56  mb-2 lg:mb-12 lg:pt-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg  flex flex-col justify-between">
                        <div className=" flex-grow ">
                            <h2 className="text-2xl font-semibold mb-4 text-center">Free</h2>
                            <p className="mb-2">Access to Job listings</p>
                        </div>
                        <div className="text-center mt-4">
                            <Link to='/register' className="bg-blue-700 text-white py-2 px-4 rounded ">
                                Join Now
                            </Link>
                        </div>
                    </div>

                    {/* Standard Plan */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
                        <div className="flex-grow">
                            <h2 className="text-2xl font-semibold mb-4 text-center">Standard</h2>
                            <p className="mb-2">2 referral credits</p>
                            <p className="mb-2">Access to Job listings</p>
                            <p className="mb-1">Starts at</p>
                            <p className="font-bold "><span className="">&#8377;1199</span></p>
                            <p className="text-xs font-bold"><s className=" me-1">&#8377;1499</s><span className="text-green-700">20% off</span></p>

                        </div>
                        <div className="text-center mt-4">
                            <button onClick={paymentButton} className="bg-blue-700 text-white py-2 px-4 rounded ">
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Professional Plan */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
                        <div className="flex-grow">
                            <h2 className="text-2xl font-semibold mb-4 text-center">Premium</h2>
                            <p className="mb-2">5 referral credits</p>
                            <p className="mb-2">Access to Job listings</p>
                            <p className="mb-1">Starts at</p>
                            <p className="font-bold "><span className="">&#8377;2899</span></p>
                            <p className="text-xs font-bold"><s className=" me-1">&#8377;3865</s><span className="text-green-700">25% off</span></p>

                        </div>
                        <div className="text-center mt-4">
                            <button onClick={paymentButton1} className="bg-blue-700 text-white py-2 px-4 rounded ">
                                Buy Now
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
                       <div className="flex-grow">
                       <h2 className="text-2xl font-semibold mb-4 text-center">Ultimate</h2>
                        <p className="mb-2">10 referral credits</p>
                        <p className="mb-2">Access to Job listings</p>
                        <p className="mb-1">Starts at</p>
                        <p className="font-bold "><span className="">&#8377;5399</span></p>
                        <p className="text-xs font-bold"><s className=" me-1">&#8377;7712</s><span className="text-green-700">30% off</span></p>


                       </div>
                        <div className="text-center mt-4">
                            <button onClick={paymentButton2} className="bg-blue-700 text-white py-2 px-4 rounded ">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <JFooter />
        </div>



    )

}
export default SubscribeJ;