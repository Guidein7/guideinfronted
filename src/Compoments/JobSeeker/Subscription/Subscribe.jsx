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
import JSFooter from "../NavBar/JSFooter";

function Subscribe() {
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const decoded = token ? jwtDecode(token) : null;
    const email = decoded ? decoded.sub : null;
    const mobile = decoded ? decoded.mobile : null;
    const name = decoded ? decoded.username : null;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorMessage,setErrorMessage] = useState('')
    const [confirmPayment, setConfirmPayment] = useState(false);
    const [confirmPayment1, setConfirmPayment1] = useState(false);
    const [confirmPayment2, setConfirmPayment2] = useState(false);
    const modalRef = useRef(null);
    const [key, setKey] = useState('');
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token, navigate])

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
            key: key, 
            currency: "INR",
            name: "Guidein",
            description: "Plan Subscription",
            image: GuideinLogo,
            order_id: orderId, 
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
                setErrorMessage('session expired ')
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
                setErrorMessage('session expired ')
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
                setErrorMessage('session expired please')
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

    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col ">
            <NavBar />
            <div className={`flex-grow pt-24 ml-0 xl:ml-[20%]`}>
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
                          
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 text-center">Standard</h2>
                                <p className="mb-2">2 referral credits</p>
                                <p className="mb-2">Access to Job listings</p>
                                <p className="mb-1">Starts at</p>
                                <p className="font-bold "><span className="">&#8377;1199</span></p>
                                <p className="text-xs font-bold"><s className=" me-1">&#8377;1499</s><span className="text-green-700">20% off</span></p>
                                <div className="text-center">
                                    <button onClick={paymentButton} className="bg-blue-700 text-white py-2 px-4 rounded ">
                                        Buy Now
                                    </button>
                                </div>
                            </div>

                          
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 text-center">Premium</h2>
                                <p className="mb-2">5 referral credits</p>
                                <p className="mb-2">Access to Job listings</p>
                                <p className="mb-1">Starts at</p>
                                <p className="font-bold "><span className="">&#8377;2899</span></p>
                                <p className="text-xs font-bold"><s className=" me-1">&#8377;3865</s><span className="text-green-700">25% off</span></p>
                                <div className="text-center">
                                    <button onClick={paymentButton1} className="bg-blue-700 text-white py-2 px-4 rounded ">
                                        Buy Now
                                    </button>
                                </div>
                            </div>

                            
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4 text-center">Ultimate</h2>
                                <p className="mb-2">10 referral credits</p>
                                <p className="mb-2">Access to Job listings</p>
                                <p className="mb-1">Starts at</p>
                                <p className="font-bold "><span className="">&#8377;5399</span></p>
                                <p className="text-xs font-bold"><s className=" me-1">&#8377;7712</s><span className="text-green-700">30% off</span></p>

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
                            <p>Price: <span className="font-bold">&#8377;1199</span></p>
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
                            <p>Price: <span className="font-bold">&#8377;2899</span></p>
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
                            <p>Price: <span className="font-bold">&#8377;5399</span></p>
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
            <JSFooter />
        </div>
    );
}

export default Subscribe;
