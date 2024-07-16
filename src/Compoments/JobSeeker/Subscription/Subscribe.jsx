import { Link } from "react-router-dom";
import GuideinLogo from '../../../assets/GuideinLogo.png';
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logoutUser } from "../Slices/loginSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import NavBar from "../NavBar/NavBar";
import config from "../../../config";

function Subscribe() {
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [name, setName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (log.isAuthenticated) {
            if (token !== 'InValid credentials') {
                const decoded = jwtDecode(token);
                const email = decoded.sub;
                const mobile = decoded.mobile;
                const name = decoded.username;
                setEmail(email);
                setMobile(mobile);
                setName(name);
            }
        }
    }, [log.isAuthenticated, token]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmPayment, setConfirmPayment] = useState(false);
    const [confirmPayment1, setConfirmPayment1] = useState(false);
    const [confirmPayment2, setConfirmPayment2] = useState(false);
    const modalRef = useRef(null);
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

    const [key, setKey] = useState('');
    const [orderId, setOrderId] = useState('');

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay(plan) {
        setConfirmPayment(false);
        setConfirmPayment1(false);
        setConfirmPayment2(false);
        const res = await loadScript(`${config.api.jobSeeker.razorPay}`);

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: key, // from server
            currency: "INR",
            name: "Guidein",
            description: "Plan Subscription",
            image: GuideinLogo,
            order_id: orderId, //from server
            handler: function (response) {

                const data = {
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                    razorPaySignature: response.razorpay_signature,
                    plan: plan,
                    email: email,
                    name: name,
                    contact: mobile
                }
                axios.post(`${config.api.baseURL}${config.api.jobSeeker.submitSubscription}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                }).then(response => {

                    setSuccessMessage('Subscription successful');

                    // Clear the success message after 3 seconds
                    setTimeout(() => {
                        setSuccessMessage('');
                        navigate('/home');
                    }, 3000);

                }).catch(error => {
                    setSuccessMessage('subscription failed')
                    setTimeout(() => {
                        setSuccessMessage('');

                    }, 3000);
                })
            },
            prefill: {
                name: name,
                email: email,
                contact: mobile,
            },
            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new Razorpay(options);
        paymentObject.on('payment.failed', function (response) {
        });
        paymentObject.open();
    }


    const standardPayment = async () => {
        setLoading(true);
        const data = {
            email: email,
            name: name,
            contact: mobile,
            plan: "STANDARD"
        };
        axios.post(`${config.api.baseURL}${config.api.jobSeeker.subscribe}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            setKey(response.data.key);
            setOrderId(response.data.orderId);
            setConfirmPayment(true);
        }).catch(error => {
            if (error.response.status === 403) {
                alert('session expired please')
                handleLogout();
            }
            else if (error.response.status === 409) {
                setSuccessMessage('Your current plan is already active');
                // Clear the success message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }

        }).finally(() => setLoading(false))
    };

    const PremiumPayment = async () => {
        setLoading(true)
        const data = {
            email: email,
            name: name,
            contact: mobile,
            plan: "PREMIUM"
        };

        axios.post(`${config.api.baseURL}${config.api.jobSeeker.subscribe}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            setKey(response.data.key);
            setOrderId(response.data.orderId);
            setConfirmPayment1(true);
        }).catch(error => {

            if (error.response.status === 403) {
                alert('session expired please')
                handleLogout();
            }
            else if (error.response.status === 409) {
                setSuccessMessage('Your current plan is already active');
                // Clear the success message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }

        }).finally(() => setLoading(false))
    };

    const UltimatePayment = async () => {
        setLoading(true);
        const data = {
            email: email,
            name: name,
            contact: mobile,
            plan: "ULTIMATE"
        };

        axios.post(`${config.api.baseURL}${config.api.jobSeeker.subscribe}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {


            setKey(response.data.key);
            setOrderId(response.data.orderId);
            setConfirmPayment2(true);


        }).catch(error => {

            if (error.response.status === 403) {
                alert('session expired please')
                handleLogout();
            }
            else if (error.response.status === 409) {
                setSuccessMessage('Your current plan is already active');

                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }

        }).finally(() => setLoading(false))
    };




    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    const paymentButton = () => {
        if (token && token !== 'InValid credentials') {
            standardPayment();
        } else {
            navigate('/login');
        }
    };

    const paymentButton1 = () => {
        if (token && token !== 'InValid credentials') {
            PremiumPayment();
        } else {
            navigate('/login');
        }
    };

    const paymentButton2 = () => {
        if (token && token !== 'InValid credentials') {
            UltimatePayment();
        } else {
            navigate('/login');
        }
    };

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleEarnMoneyClick = () => {
        window.open('/employee-landingpage', '_blank');
    };

    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col ">
            {token && token !== 'InValid credentials' ? (
                <NavBar />
            ) : (
                <div>
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
                </div>
            )}


            <div className={`flex-grow pt-24 ${log.isAuthenticated ? 'ml-0 xl:ml-[20%]':''}`}>

                {successMessage && (
                    <div className="fixed lg:top-0 left-0 w-full text-green-700 font-bold text-2xl text-center py-4 z-20">
                        {successMessage}
                    </div>
                )}

                {loading ? (<div className="flex flex-col justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-900">Loading...</p>
                </div>) : (
                    <div>
                    <h1 className="text-center text-xl font-bold pt-10 lg:pt-0">Subscription Plans</h1>
                    <p className="text-center mb-3"> Choose the plan that best suits your needs</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mx-5 lg:mx-10 mb-2">
                        {/* Standard Plan */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-center">Standard</h2>
                            <p className="mb-2">2 referral credits</p>
                            <p className="mb-2">Access to Job listings</p>
                            <p className="mb-1">Starts at</p>
                            <p className="font-bold "><span className="">&#8377;1299</span></p>
                            <p className="text-xs font-bold"><s className=" me-1">&#8377;1600</s><span className="text-green-700">18% off</span></p>
                          
                            <div className="text-center">
                                <button onClick={paymentButton} className="bg-blue-700 text-white py-2 px-4 rounded ">
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        {/* Professional Plan */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-center">Premium</h2>
                            <p className="mb-2">5 referral credits</p>
                            <p className="mb-2">Access to Job listings</p>
                            <p className="mb-1">Starts at</p>
                            <p className="font-bold "><span className="">&#8377;2999</span></p>
                            <p className="text-xs font-bold"><s className=" me-1">&#8377;4000</s><span className="text-green-700">25% off</span></p>

                            <div className="text-center">
                                <button onClick={paymentButton1} className="bg-blue-700 text-white py-2 px-4 rounded ">
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        {/* Premium Plan */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-center">Ultimate</h2>
                            <p className="mb-2">10 referral credits</p>
                            <p className="mb-2">Access to Job listings</p>
                            <p className="mb-1">Starts at</p>
                            <p className="font-bold "><span className="">&#8377;5999</span></p>
                            <p className="text-xs font-bold"><s className=" me-1">&#8377;8000</s><span className="text-green-700">25% off</span></p>

                            <div className="text-center">
                                <button onClick={paymentButton2} className="bg-blue-700 text-white py-2 px-4 rounded ">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>)}

                {confirmPayment && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold mb-4 text-center">Confirm Payment</h3>
                            <p>Subscription Type: <span className="font-bold">Standard</span></p>
                            <p>Price: <span className="font-bold">&#8377;1299</span></p>
                            <p>Name <span className="font-bold">{name}</span></p>
                            <p>Email <span className="font-bold">{email}</span></p>
                            <div className=" mt-4 flex justify-center">
                                <button onClick={() => setConfirmPayment(false)} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">Cancel</button>
                                <button onClick={() => displayRazorpay("STANDARD")} className="bg-blue-700 text-white py-2 px-4 rounded">Make payment</button>
                            </div>
                        </div>
                    </div>
                )}

                {confirmPayment1 && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold mb-4 text-center">Confirm Payment</h3>
                            <p>Subscription Type: <span className="font-bold">Premium</span></p>
                            <p>Price: <span className="font-bold">&#8377;2999</span></p>
                            <p>Name <span className="font-bold">{name}</span></p>
                            <p>Email <span className="font-bold">{email}</span></p>
                            <div className=" mt-4 flex justify-center">
                                <button onClick={() => setConfirmPayment1(false)} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">Cancel</button>
                                <button onClick={() => displayRazorpay("PREMIUM")} className="bg-blue-700 text-white py-2 px-4 rounded">Make payment</button>
                            </div>
                        </div>
                    </div>
                )}

                {confirmPayment2 && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold mb-4 text-center">Confirm Payment</h3>
                            <p>Subscription Type: <span className="font-bold">Ultimate</span></p>
                            <p>Price: <span className="font-bold">&#8377;5999</span></p>
                            <p>Name <span className="font-bold">{name}</span></p>
                            <p>Email <span className="font-bold">{email}</span></p>
                            <div className=" mt-4 flex justify-center">
                                <button onClick={() => setConfirmPayment2(false)} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">Cancel</button>
                                <button onClick={() => displayRazorpay("ULTIMATE")} className="bg-blue-700 text-white py-2 px-4 rounded">Make payment</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {log.isAuthenticated? (
                      <div className="bg-[#00145e] w-full p-1 ">
                      <footer className='sm:mx-auto max-w-screen-lg ml-0 xl:ml-[20%]'>
                          <div className='grid grid-cols-2 gap-4'>
                              <div className='text-white justify-self-start'>
                                 
                              </div>
                              <div className='text-white justify-self-end'>
                                  <h2 className='pr-2'>Help & Support</h2>
                                  <Link to='/contactus' className='pl-2'>Contact Us</Link>
                              </div>
                          </div>
                          <div className='text-white text-center pb-1'>
                              <p>Copyright &copy; {new Date().getFullYear()}</p>
                          </div>
                      </footer>
                  </div>
            ):( <div className="bg-[#00145e] w-full p-1 ">
                <footer className='sm:mx-auto max-w-screen-lg ml-0 xl:ml-[20%]'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-white justify-self-start'>
                           
                        </div>
                        <div className='text-white justify-self-end'>
                            <h2 className="pr-2">Help & Support</h2>
                            <Link to='/contact-us' className="pl-2" >Contact Us</Link>
                        </div>
                    </div>
                    <div className='text-white text-center '>
                        <p>Copyright &copy; {new Date().getFullYear()}</p>
                    </div>
                </footer>
            </div>)}
           
        </div>
    );
}

export default Subscribe;
