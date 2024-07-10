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
    const[upiMessage,setUpiMessage] = useState('');
    const[lowBalanceMessage,setLowBalanceMessage] = useState('');
    const [withdrawInProgress,setWithDrawInProgress] = useState('')


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
        console.log('Updated value:', inputValue);
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
            console.log(response);
            getwalletDetails();
        }).catch(error => {
            console.log(error);
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
            console.log(response);
            setWalletData(response.data)

            if (response.data.upiId) {
                setIsEditing(false);
                setInputValue(response.data.upiId)
            }
            else {
                setIsEditing(true);
            }
        }).catch(error => {
            console.log(error)
        }).finally(() => setLoading(false))


    }


    const requestWithDraw = () => {
        if(!inputValue){
            setUpiMessage('please fill bank datails to request withdraw')
            setTimeout(() => {
                setUpiMessage('');
            },2000);
            return;

        }
        if(walletData.withdrawInProgress > 0){
            setWithDrawInProgress('your previous withdraw request is already in progress');
            setTimeout(() => {
                setWithDrawInProgress('');
            },2000);
            return; 
        }

        if(walletData.currentBalance > 0) {
            setLoading(true);
            axios.put(`${config.api.baseURL}${config.api.jobPoster.requestWithdraw}${claim}`,{},{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                console.log(response);
                getwalletDetails();
            }).catch(error => {
                console.log(error);
            }).finally(() => setLoading(false));
        }
        else {
            setLowBalanceMessage('your current balance is low')
            setTimeout(() => {
                setLowBalanceMessage('');
               
            },2000);

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
            <div className='flex-grow  ml-0 xl:ml-[20%] px-0 lg:px-10 mt-8 xl:mt-0'>
                <h1 className='font-bold  mt-5 ml-2'>wallet</h1>

                {loading ? (<div className="flex flex-col justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-900">Loading...</p>
                </div>) : (
                    <div>
                        {lowBalanceMessage && (<p className='text-red-500 text-center'>{lowBalanceMessage}</p>)}
                        {upiMessage && (<p className='text-red-500 text-center'>{upiMessage}</p>)}
                        {withdrawInProgress && (<p className='text-red-500 text-center'>{withdrawInProgress}</p>)}

                        <div className='ml-1 my-5  flex flex-col justify-center'>

                            <div className='my-3'>
                                <div className='grid grid-cols-2 gap-10 xl:gap-0'>
                                    <p className='w-full'>Total referrals:</p>
                                    <span className=''>{walletData.totalReferrals}</span>
                                </div>
                            </div>
                            <div className='my-3'>
                                <div className='grid grid-cols-2 gap-10 xl:gap-0'>
                                    <p className='w-full'>Total Money Earned:</p>
                                    <span className=''>{walletData.totalEarned}</span>
                                </div>
                            </div>
                            <div className='my-3'>
                                <div className='grid grid-cols-2 gap-10 xl:gap-0'>
                                    <p className='w-full'>Amount Withdrawn:</p>
                                    <span className=''>{walletData.amountWithdrawn}</span>
                                </div>
                            </div>
                            <div className='my-3'>
                                <div className='grid grid-cols-2 gap-10 xl:gap-0'>
                                    <p className='w-full'>Current balance:</p>
                                    <div className=''>
                                        <span className=''>{walletData.currentBalance}</span>
                                        <button onClick={requestWithDraw} className='mx-5 bg-gray-700 text-white p-2 rounded-lg '><span className='mr-2'>&#8377;</span>
                                            Withdraw</button>
                                    </div>
                                </div>
                            </div>
                            <div className='my-3'>
                                <div className='grid grid-cols-2 gap-10 xl:gap-0'>
                                    <p className='w-full '>Withdrawn in progress:</p>
                                    <span className=''>{walletData.withdrawInProgress}</span>
                                </div>
                            </div>
                        </div>
                        <h1 className='font-bold'>Bank details</h1>
                        <div className='grid  grid-cols-2'>
                            <p className='m-0'>UPI Id/PhonePe/Gpay No</p>
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
                                        className='ml-2 p-1 border rounded'
                                        onClick={handleSaveClick}
                                    >
                                        Save
                                    </button>
                                    {error && <span className="ml-2 text-red-600">{error}</span>}
                                </div>
                            ) : (
                                <div className='flex items-center'>
                                    <span className='ml-4'>{inputValue}</span>
                                    <button
                                        className='ml-2 p-1 border rounded'
                                        onClick={handleEditClick}
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
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

            </div>
            <footer className="bg-[#00145e]  p-4 ml-0 xl:ml-[20%]">
                <div className="sm:mx-auto max-w-screen-lg">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-white justify-self-start">
                            <h2>Company</h2>
                            <p>About us</p>
                        </div>
                        <div className="text-white justify-self-end">
                            <h2>Help & Support</h2>
                            <p>Contact Us</p>
                        </div>
                    </div>
                    <div className="text-white text-center mt-4">
                        <p>Copyright &copy; 2024</p>
                    </div>
                </div>
            </footer>
        </div>

    )
}

export default Wallet;