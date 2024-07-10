import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode'; // Remove curly braces
import axios from 'axios';
import { logoutEmployee } from '../slices/employeeLoginSlice';
import { MdOutlineCurrencyRupee, MdPolicy } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { IoAlarmOutline } from "react-icons/io5";
import { MdOutlineModelTraining } from "react-icons/md";
import { PiGlobe } from "react-icons/pi";
import { IoFlashOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMdLaptop } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import GuideinLogo from '../../../assets/GuideinLogo.png'
import { CgProfile } from "react-icons/cg";
import config from "../../../config";
import SideBar from "../SideBar/SideBar";





function ReferredJobDetails() {
    const log = useSelector(state => state.emplog);
    const token = log.data.token;
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const { referredJob } = location.state;
    const referralId = referredJob.referralId;
    const [referredJobDetails, setReferredJobdetails] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [proof, setProof] = useState('')

    console.log(referredJob);


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


    useEffect(() => {
        getData();



    }, []);

    const getData = () => {
        setLoading(true)
        axios.get(`${config.api.baseURL}${config.api.jobPoster.getReferredStatus}${referralId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        }).then(response => {
            console.log(response);
            setReferredJobdetails(response.data);
            setProof(response.data.proof);
        }).catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    const handleLogout = () => {
        dispatch(logoutEmployee());
        navigate('/employee-login');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleResumeView = () => {
        const pdfWindow = window.open('');
        pdfWindow.document.write('<iframe width="100%" height="100%" src="data:application/pdf;base64,' + encodeURI(referredJobDetails.candidateResume) + '"></iframe>');
    };
    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    const base64String = proof;
    const mimeType = getMimeType(base64String);
    const blobUrl = createBlobUrl(base64String, mimeType);

    return (
        <div className='flex flex-col min-h-screen bg-[#f5faff]'>
           <SideBar/>
            <div className='flex-grow flex flex-col justify-between p-4 ml-0 xl:ml-[20%]'>

                {loading ? (<div className="flex flex-col justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-900">Loading...</p>
                </div>) : (
                    <div>
                        <IoMdArrowRoundBack onClick={handleBackClick} size={24} className=' cursor-pointer my-1' />
                        <div className="mx-2  bg-white p-2 ">
                            <h1 className="font-bold mb-3">CandidateDetails</h1>
                            <p className="mb-2"> Full Name : {referredJobDetails.candidateName}</p>
                            <p className="mb-2">Email {referredJobDetails.candidateEmail}</p>
                            <p className="mb-2">mobile:{referredJobDetails.candidateMobile}</p>
                            <p className="mb-2"> Experience: {referredJobDetails.candidateExperience}</p>
                            <p className="mb-2">Resume: <span className="cursor-pointer text-blue-500" onClick={handleResumeView}>{referredJobDetails.candidateName}.pdf</span></p>
                            <p className="mb-4">Requested on: {referredJob.requestedOn}</p>
                            <h1 className="font-bold mb-2">Referral requested For</h1>
                            <p className=" mb-2">JobTitle: {referredJobDetails.referralFor}</p>
                            <p className="mb-2"> Company:{referredJobDetails.company}</p>
                            <p className="mb-2">Location: {referredJobDetails.jobLocation}</p>
                            <p className="mb-4">job PostedOn: {referredJobDetails.jobPostedOn}</p>

                            <h1 className="font-bold mb-2">Referral Details </h1>
                            <p className=" mb-2">Date Of Referral: {referredJobDetails.dateOfReferral}</p>
                            <p className="mb-2"> Method Of Referral:{referredJobDetails.methodOfReferral}</p>
                            <p className="mb-2">Comments: {referredJobDetails.comments}</p>
                            <p className="mb-2">uploaded proof:  <a href={blobUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                View proof
                            </a></p>
                            
                           



                            <p>Job Status:<span className="text-green-500 font-bold">{referredJobDetails.referralStatus}</span></p>

                            {referredJob.reason && (<p>Reason: <span className="">{referredJob.reason}</span></p>)}


                        </div>
                    </div>
                )}

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
export default ReferredJobDetails;