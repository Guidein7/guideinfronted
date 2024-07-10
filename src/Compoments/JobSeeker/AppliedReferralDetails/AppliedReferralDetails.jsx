import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import GuideinLogo from '../../../assets/GuideinLogo.png';
import { logoutUser } from '../Slices/loginSlice';
import { useDispatch } from 'react-redux';
import { IoMdArrowRoundBack } from "react-icons/io";
import NavBar from '../NavBar/NavBar';
import config from '../../../config';
import session from 'redux-persist/lib/storage/session';

function AppliedRefeReferralDetails() {
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const decoded = jwtDecode(token);
    const email = decoded.sub;
    const name = decoded.username;
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { status } = location.state;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login');
        dispatch(logoutUser());
    };

    const [loading,setLoading] = useState(false);
    const [referralDetails,setReferralDetails] = useState({})
    const[proof,setProof] = useState('');
    const[errorMessage,setErrorMessage] = useState('')
    
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };
useEffect(() => {

    
    getappliedReferraDetails();
},[])
    const getappliedReferraDetails = () => {
        setLoading(true)
        axios.get(`${config.api.baseURL}${config.api.jobSeeker.getAppliedReferral}${status.referralId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        }
        ).then(response => {
            
            setReferralDetails(response.data)
            setProof(response.data.proof);
        }).catch(error => {
            
            if(error.response.status === 403){
                setErrorMessage('session expired');
                setTimeout(() => {
                    setErrorMessage('');
                    handleLogout();
                }, 2000);

            }
            setErrorMessage('error while fetching data');
                setTimeout(() => {
                    setErrorMessage('');
                    handleLogout();
                }, 2000);

            
        })
        .finally(() => setLoading(false))
    }

    const handleResumeView = () => {
        const pdfWindow = window.open('');
        pdfWindow.document.write('<iframe width="100%" height="100%" src="data:application/pdf;base64,' + encodeURI(referralDetails.resume) + '"></iframe>');
    };


    function base64ToBlob(base64, mime) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mime });
    }

    // Utility function to create a Blob URL from a Base64 string
    function createBlobUrl(base64, mime) {
        const blob = base64ToBlob(base64, mime);
        return URL.createObjectURL(blob);
    }

    // Utility function to infer MIME type from Base64 string
    function getMimeType(base64) {
        if (base64.startsWith('/9j/')) {
            return 'image/jpeg';
        } else if (base64.startsWith('iVBORw0KGgo')) {
            return 'image/png';
        } else if (base64.startsWith('R0lGODdh')) {
            return 'image/gif';
        } else if (base64.startsWith('UklGR')) {
            return 'image/webp';
        } else if (base64.startsWith('JVBERi0')) {
            return 'application/pdf';
        } else {
            return 'application/octet-stream'; // Default to binary if unknown
        }
    }

   

    function viweProfile (){
        const base64String = proof;
        const mimeType = getMimeType(base64String);
        const blobUrl = createBlobUrl(base64String, mimeType);

        return blobUrl;

    }
   
    
    


    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between">
           <NavBar/>

            <div className='flex-grow pt-24'>
                {errorMessage && <p className='text-red text-center'>{errorMessage}</p>}
                <IoMdArrowRoundBack onClick={handleBackClick} size={24} className='mx-10 cursor-pointer my-1  ' />
                {loading ? (<div className="flex flex-col justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                <p className="mt-4 text-gray-900">Loading...</p>
            </div>):(

                <div className='my-3 mx-10 bg-white p-2'>
                    <div className='flex flex-col md:flex-row mb-2 p-2'>
                        <span className='md:w-40 font-bold'>Job Title:</span>
                        <span className='text-xl ml-0 md:ml-12'>{referralDetails.jobTitle}</span>
                    </div>
                    <div className='flex flex-col md:flex-row mb-2 p-2'>
                        <span className='md:w-40 font-bold'>Company Name:</span>
                        <span className='text-xl ml-0 md:ml-12'>{referralDetails.companyName}</span>
                    </div>
                    <div className='flex flex-col md:flex-row mb-2 p-2'>
                        <span className='md:w-40 font-bold'>Job Location:</span>
                        <span className='text-xl ml-0 md:ml-12'>{referralDetails.jobLocation}</span>
                    </div>
                    <div className='flex flex-col md:flex-row mb-2 p-2'>
                        <span className='md:w-40 font-bold'>Experience Required:</span>
                        <span className='text-xl ml-0 md:ml-12'>{referralDetails.experienceRequired}</span>
                    </div>
                    <div className='flex flex-col md:flex-row mb-2 p-2'>
                        <span className='md:w-40 font-bold'>Requested On:</span>
                        <span className='text-xl ml-0 md:ml-12'>{referralDetails.requstedOn}</span>
                    </div>
                    <div className='flex flex-col md:flex-row mb-2 p-2'>
                        <span className='md:w-40 font-bold'>Uploaded Resume:</span>
                        <span className='text-blue-500 cursor-pointer text-xl ml-0 md:ml-12' onClick={handleResumeView}>{name}.pdf</span>
                    </div>

                  
                    <div className='flex flex-col md:flex-row mb-2 p-2'>
                        <span className='md:w-40 font-bold'>Job  Link:</span>
                        <a href={status.jobDescriptionLink} className='text-xl ml-0 md:ml-12 text-blue-500 cursor-pointer'>{referralDetails.jobDescriptionLink}</a>
                    </div>
                    <div className='flex flex-col md:flex-row mb-2 p-2'>
                        <span className='md:w-40 font-bold'>Job Poster Name:</span>
                        <span className='text-xl ml-0 md:ml-12'>{referralDetails.jobPosterName}</span>
                    </div>
                    <div className='flex flex-col md:flex-row mb-2 p-2'>
                        <span className='md:w-40 font-bold'>Current Status:</span>
                        <span className='text-xl ml-0 md:ml-12'>{referralDetails.currentStatus}</span>
                    </div>
                    {status.reason && (<div className='flex flex-col md:flex-row mb-2 p-2'>
                        <span className='md:w-40 font-bold'>Reason</span>
                        <span className='text-xl ml-0 md:ml-12'>{referralDetails.reason}</span>
                    </div>)}

                   {referralDetails.currentStatus !== 'REQUESTED' && referralDetails.currentStatus !== 'REJECTED' && (<div>
                    <h1 className='font-bold m-2 text-2xl'>Referral datails</h1>
                    <div className='flex flex-col md:flex-row mb-2 p-2'>
                        <span className='md:w-40 font-bold'>Date of Referral:</span>
                        <span className='text-xl ml-0 md:ml-12'>{referralDetails.dateOfReferral }</span>
                    </div>
                    <div className='flex flex-col md:flex-row mb-2 p-2'>
                        <span className='md:w-40 font-bold'>Method Of Referral:</span>
                        <span className='text-xl ml-0 md:ml-12'>{referralDetails.methodOfReferral    }</span>
                    </div>
                    <div className='flex flex-col md:flex-row mb-2 p-2'>
                        <span className='md:w-40 font-bold'>Comments:</span>
                        <span className='text-xl ml-0 md:ml-12'>{referralDetails.comments    }</span>
                    </div>

                 {referralDetails.currentStatus === 'REFERRED'    &&(   <div className='flex flex-col md:flex-row mb-2 p-2'>
                        <span className='md:w-40 font-bold'>Proof of referral</span>
                        <span className='text-xl ml-0 md:ml-12'><a href={viweProfile()} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                View proof
                            </a></span>
                    </div>)}

                    {/* */}

                   
                </div> )}
                </div>)}
            </div>

            <div className="bg-[#00145e] w-full p-4 ">
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
                        <p>Copyright &copy; {new Date().getFullYear()}</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default AppliedRefeReferralDetails;
