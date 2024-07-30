import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import config from "../../../config";
import { useSelector } from "react-redux";
import AdminNavBar from "../NavBar/AdminNavBar";

function EmpWalletDetails() {
    const log = useSelector(state => state.adminlog);

    const token = log.data.token;
    const location = useLocation();
    const { wallet } = location.state;
    const [loading, setLoading] = useState(false);
    const [walletData, setWalletData] = useState({});
    const [transcationId, setTranscationId] = useState('');
    const [showForm, setshowForm] = useState(false);
    const [message, setMessage] = useState('');

    const getempwalletDetails = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.admin.empWalletDetails}${wallet.email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        }).then(response => {
            console.log(response);
            setWalletData(response.data);
        }).catch(error => {
            console.log(error);
        })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getempwalletDetails();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (walletData.withdrawInProgress === 0) {
            setMessage('not sufficient amount to make deposit');
            setTimeout(() => {
                setMessage('')
            }, 2000);
            return;
        }
        const formData = { email: wallet.email, withdrawAmount: walletData.withdrawInProgress, transactionId: transcationId };
        console.log(formData);
        setLoading(true);
        axios.put(`${config.api.baseURL}${config.api.admin.submitDeposit}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,

            },

        }).then(response => {
            console.log(response)
            getempwalletDetails();
            setMessage('successfully submitted deposit')
            setTimeout(() => {
                setMessage('')
            }, 2000);
        }).catch(error => {
            setMessage('error while submitting your request try agian')
            console.log(error);
            setTimeout(() => {
                setMessage('')
            }, 2000);
        }).finally(() => {
            setTranscationId('');
            setshowForm(false);
            setLoading(false)
        });

    }



    return (
        <div className='bg-[#f5faff] min-h-screen flex flex-col'>
            <AdminNavBar />
            <div className="flex-grow mx-0 lg:mx-10">
                <h1 className='font-bold  mt-5 ml-2'>wallet</h1>

                {loading ? (<div className="flex flex-col justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-900">Loading...</p>
                </div>) : (
                    <div>
                        {message && (<p className={` text-center ${message.startsWith('s') ? 'text-green-400' : 'text-red-500'}`}>{message}</p>)}

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

                                    </div>
                                </div>
                            </div>
                            <div className='my-3'>
                                <div className='grid grid-cols-2 gap-10 xl:gap-0'>
                                    <p className='w-full '>Withdrawn in progress:</p>
                                    <div>
                                        <span className=''>{walletData.withdrawInProgress}</span>
                                       {walletData.withdrawInProgress  && (<button onClick={() => setshowForm(true)} className='mx-3 bg-gray-700 text-white p-2 rounded-lg '><span className='mr-2'></span>
                                            Mark As Deposit</button>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className='font-bold'>Bank details</h1>
                        <div className='grid  grid-cols-2'>
                            <p className='m-0'>UPI Id/PhonePe/Gpay No</p>
                            <p>{walletData.upiId}</p>
                            {/* {isEditing ? (
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
    )} */}
                        </div>
                        {showForm && (
                            <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center px-2">
                                <div className="bg-white p-5 rounded shadow-md w-full max-w-md relative">
                                    <h1 className="font-bold text-center">Transcation Details</h1>
                                    <form onSubmit={handleSubmit}>
                                        <div className='mb-2'>
                                            <label className='block text-gray-700 text-start'><strong>Transcation ID</strong><span className='text-red-700'>*</span></label>
                                            <input
                                                type='text'
                                                value={transcationId}
                                                className='w-full px-3 py-2 border rounded-md'
                                                onChange={(e) => setTranscationId(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="bg-blue-700 text-white p-2 mx-2 rounded">submit</button>
                                            <button onClick={(() => setshowForm(false))} className="bg-gray-700 text-white p-2 rounded">close</button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        <h1 className='font-bold mt-5'>
                            Transcation history
                        </h1>
                        {walletData?.transactionHistory?.map((item, index) => (
                            <div className="p-2 my-1" key={index}>
                                <p>Date : {item.transactionOn}</p>
                                <p>Amount : {item.amount}</p>
                                <p>Transaction Id : {item.transactionId}</p>
                            </div>
                        ))}


                    </div>)}

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
export default EmpWalletDetails;