import GuideinLogo from '../../../assets/GuideinLogo.png'
import { useEffect, useState } from 'react';
import { MdOutlineCurrencyRupee, MdPolicy } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { IoAlarmOutline } from "react-icons/io5";
import { MdOutlineModelTraining } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { logoutEmployee } from '../slices/employeeLoginSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLaptop } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowRoundDown } from "react-icons/io";
import axios from 'axios';
import config from '../../../config';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import SideBar from '../SideBar/SideBar';



function Wallet() {
    const log = useSelector(state => state.emplog);
    const token = log.data.token;
    const decoded = jwtDecode(token);
    const claim = decoded.sub;
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [walletData, setWalletData] = useState({});
    const [upiMessage, setUpiMessage] = useState('');
    const [lowBalanceMessage, setLowBalanceMessage] = useState('');
    const [withdrawInProgress, setWithDrawInProgress] = useState('')
    const [errorMessage, setErrorMessage] = useState('');



    useEffect(() => {
        getwalletDetails();
    }, [])
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {

        const upiPattern = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
        if (!inputValue.trim()) {
            setError('UPI ID cannot be empty');

            return;
        }

        if (!upiPattern.test(inputValue)) {
            setError('Invalid UPI ID format');
            return;
        }
        setError('')
        // Perform save operation with the updated inputValue, e.g., update state, send to server, etc.

        const formData = {
            email: claim,
            upiId: inputValue
        }
        setLoading(true);
        axios.post(`${config.api.baseURL}${config.api.jobPoster.updateUpiId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },

        }).then(response => {

            getwalletDetails();
        }).catch(error => {
            if (error.response.status === 403) {
                setErrorMessage('session Expired');
                setTimeout(() => {
                    setErrorMessage('');
                    handleLogout();
                }, 2000);
            }
            else {
                setErrorMessage('Error fetching data');
                setTimeout(() => {
                    setErrorMessage('');
                }, 2000);
            }
        }).finally(() => setLoading(false))

        setIsEditing(false);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const getwalletDetails = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobPoster.getWalletDetails}${claim}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },

        }).then(response => {

            setWalletData(response.data)

            if (response.data.upiId) {
                setIsEditing(false);
                setInputValue(response.data.upiId)
            }
            else {
                setIsEditing(true);
            }
        }).catch(error => {
            if (error.response.status === 403) {
                setErrorMessage('session Expired');
                setTimeout(() => {
                    setErrorMessage('');
                    handleLogout();
                }, 2000);
            }
            else {
                setErrorMessage('Error fetching data');
                setTimeout(() => {
                    setErrorMessage('');
                }, 2000);
            }
        }).finally(() => setLoading(false))


    }


    const requestWithDraw = () => {
        if (!inputValue) {
            setUpiMessage('please fill bank datails to request withdraw')
            setTimeout(() => {
                setUpiMessage('');
            }, 2000);
            return;

        }
        if (walletData.withdrawInProgress > 0) {
            setWithDrawInProgress('your previous withdraw request is already in progress');
            setTimeout(() => {
                setWithDrawInProgress('');
            }, 2000);
            return;
        }

        if (walletData.currentBalance > 0) {
            setLoading(true);
            axios.put(`${config.api.baseURL}${config.api.jobPoster.requestWithdraw}${claim}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => {

                getwalletDetails();
            }).catch(error => {
                if (error.response.status === 403) {
                    setErrorMessage('session Expired');
                    setTimeout(() => {
                        setErrorMessage('');
                        handleLogout();
                    }, 2000);
                }
                else {
                    setErrorMessage('Error fetching data');
                    setTimeout(() => {
                        setErrorMessage('');
                    }, 2000);
                }
            }).finally(() => setLoading(false));
        }
        else {
            setLowBalanceMessage('your current balance is low')
            setTimeout(() => {
                setLowBalanceMessage('');

            }, 2000);

        }
    }


    const handleLogout = () => {
        // Dispatch the logout action
        dispatch(logoutEmployee());
        // Redirect to the login page after logout
        navigate('/employee-login');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='flex flex-col min-h-screen bg-[#f5faff]'>
            <SideBar />
            <div className='flex-grow pt-10 lg:pt-2  ml-0 xl:ml-[20%] px-0 lg:px-10 mt-8 xl:mt-0'>
                <h1 className='font-bold text-xl   ml-5'>Wallet</h1>

                {loading ? (<div className="flex flex-col justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-900">Loading...</p>
                </div>) : (
                    <div>
                        {lowBalanceMessage && (<p className='text-red-500  text-center'>{lowBalanceMessage}</p>)}
                        {upiMessage && (<p className='text-red-500 text-center'>{upiMessage}</p>)}
                        {withdrawInProgress && (<p className='text-red-500 fixed top-12 lg:top-2 bg-white p-3 text-center'>{withdrawInProgress}</p>)}
                        {errorMessage && (<p className='text-red-500 fixed top-12 lg:top-2 bg-white p-3 text-center'>{errorMessage}</p>)}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:my-5'>
                            <div className='bg-blue-500 text-white text-center py-5 rounded-lg flex-1 mx-10'>

                                <p className=' text-lg'>Total Referrals</p>
                                <span className=' text-lg'>{walletData.totalReferrals}</span>

                            </div>
                            <div className='bg-blue-500 text-white text-center rounded-lg py-5 flex-1 mx-10'>

                                <p className=' text-lg'>Total Money Earned</p>
                                <span className=' text-lg'>&#8377;{walletData.totalEarned}</span>

                            </div>
                            <div className='bg-blue-500 text-white text-center  rounded-lg py-5 flex-1 mx-10'>

                                <p className='text-lg'>Amount Withdrawn</p>
                                <span className='text-lg'>&#8377;{walletData.amountWithdrawn}</span>

                            </div>
                            <div className='bg-blue-500 text-white py-3 text-center rounded-lg flex-1 mx-10'>

                                <p className='f text-lg'>Current balance</p>

                                <div className='text-center'>
                                    <span className=' text-lg'>&#8377;{walletData.currentBalance}</span>
                                    <button onClick={requestWithDraw} className=' bg-green-500 mx-auto text-white p-2  block rounded-lg'>
                                        Withdraw
                                    </button>
                                </div>


                            </div>
                            <div className='bg-blue-500 text-white text-center rounded-lg py-5 flex-1 mx-10'>

                                <p className=' text-lg'>Withdrawn in progress</p>
                                <span className=' text-lg'>&#8377;{walletData.withdrawInProgress}</span>

                            </div>
                        </div>

                        <h1 className='font-bold text-lg mb-1 mt-4 mx-10'>Bank details</h1>
                        <div className='grid  grid-cols-1 mx-10  mb-10'>
                            <p className=''>UPI Id/PhonePe/Gpay No</p>
                            {isEditing ? (
                                <div className='flex items-center'>
                                    <input
                                        type='text'
                                        value={inputValue}
                                        onChange={handleChange}
                                        className='border border-black p-1 rounded-lg w-[50%]'
                                        placeholder='enter upi id '
                                    />
                                    <button
                                        className='ml-2 p-1 border  rounded'
                                        onClick={handleSaveClick}
                                    >
                                        Save
                                    </button>
                                    {error && <span className="ml-2 text-red-600">{error}</span>}
                                </div>
                            ) : (
                                <div className='flex items-center'>
                                    <span className=' border border-black px-10 rounded-lg py-1'>{inputValue}</span>
                                    <button
                                        className='ml-2 p-2 border bg-gray-200 boredr-gray-300 rounded'
                                        onClick={handleEditClick}
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>

                        {walletData.transactionHistory?.length > 0 && (<div>
                            <h1 className='font-bold mt-2'>
                                Transcation history
                            </h1>
                            {walletData?.transactionHistory?.map((item, index) => (
                                <div className='p-2 my-1 inline' key={index}>
                                    <p>Date : {item.transactionOn}</p>
                                    <p>Amount : {item.amount}</p>
                                    <p>Transaction Id : {item.transactionId}</p>
                                </div>
                            ))}
                        </div>)}

                    </div>)}

            </div>
            <footer className="bg-[#00145e]  p-1 ml-0 xl:ml-[20%]">
                <div className="sm:mx-auto max-w-screen-lg">
                    <div className="grid grid-cols-2 gap-4 ">
                        <div className="text-white justify-self-start">

                        </div>
                        <div className="text-white justify-self-end">
                            <h2 className='pr-2'>Help & Support</h2>
                            <Link to='/econtactus' className='pl-2'>Contact Us</Link>
                        </div>
                    </div>
                    <div className="text-white text-center ">
                        <p>Copyright &copy; 2024</p>
                    </div>
                </div>
            </footer>
        </div>

    )
}

export default Wallet;