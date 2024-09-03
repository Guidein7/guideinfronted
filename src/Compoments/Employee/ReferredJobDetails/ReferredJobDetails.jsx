import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState,  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutEmployee } from '../slices/employeeLoginSlice';
import config from "../../../config";
import SideBar from "../SideBar/SideBar";
import Footer from "../SideBar/Footer";

function ReferredJobDetails() {
    const log = useSelector(state => state.emplog);
    const token = log.data.token;
    const location = useLocation();
    const dispatch = useDispatch();
    const { referredJob } = location.state || {};
    const referralId = referredJob ? referredJob.referralId: null;
    const [referredJobDetails, setReferredJobdetails] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [proof, setProof] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(!token){
            navigate('/employee-login')
        }
        else if(!referredJob?.referralId){
            navigate(-1);
        }
    },[navigate,token,referredJob])

    function base64ToBlob(base64, mime) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mime });
    }

    function createBlobUrl(base64, mime) {
        const blob = base64ToBlob(base64, mime);
        return URL.createObjectURL(blob);
    }

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
            setReferredJobdetails(response.data);
           
            setProof(response.data.proof);
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

    const handleLogout = () => {
        dispatch(logoutEmployee());
        navigate('/employee-login');
    };

    const handleResumeView = () => {
        const pdfWindow = window.open('');
        pdfWindow.document.write('<iframe width="100%" height="100%" src="data:application/pdf;base64,' + encodeURI(referredJobDetails.candidateResume) + '"></iframe>');
    };
   
    const viewProof = () => {
        const base64String = proof;
        const mimeType = getMimeType(base64String);
        const blobUrl = createBlobUrl(base64String, mimeType);
        return blobUrl;
    }

    return (
        <div className='flex flex-col min-h-screen bg-[#f5faff]'>
            <SideBar />
            <div className='flex-grow pt-16 lg:pt-2 p-4 ml-0 xl:ml-[20%]'>
                {loading ? (<div className="flex flex-col justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-900">Loading...</p>
                </div>) : (
                    <div>
                        <div className="mx-2  pt-2 lg:pt-0 ">
                            <h1 className="font-bold mb-3">CandidateDetails</h1>
                            {errorMessage && (<p className="text-red-500 py-2 px-4 fixed left-1/2 transform -translate-x-1/2  bg-white">{errorMessage}</p>)}
                            <p className="mb-2"> Full Name : {referredJobDetails.candidateName}</p>
                            <p className="mb-2">Email {referredJobDetails.candidateEmail}</p>
                            <p className="mb-2">mobile:{referredJobDetails.candidateMobile}</p>
                            <p className="mb-2"> Experience: {referredJobDetails.candidateExperience}</p>
                            <p className="mb-2">Resume: <span className="cursor-pointer text-blue-500" onClick={handleResumeView}>{referredJobDetails.candidateName}.pdf</span></p>
                            <p className="mb-4">Requested on: {referredJobDetails.requestedOn}</p>
                            <h1 className="font-bold mb-2">Referral requested For</h1>
                            <p className=" mb-2">JobTitle: {referredJobDetails.referralFor}</p>
                            <p className="mb-2"> Company:{referredJobDetails.company}</p>
                            <p className="mb-2">Location: {referredJobDetails?.jobLocation
                                                    ?.split(',')
                                                    .map(location => location.trim())
                                                    .filter(location => location.toLowerCase() !== 'others' && location !== '')
                                                    .join(', ')
                                            }</p>
                            <p className="mb-4">job PostedOn: {referredJobDetails.jobPostedOn}</p>
                            <h1 className="font-bold mb-2">Referral Details </h1>
                            {referredJobDetails.dateOfReferral && (<p className=" mb-2">Date Of Referral: {referredJobDetails.dateOfReferral}</p>)}
                            {referredJobDetails.methodOfReferral && (<p className="mb-2"> Method Of Referral: {referredJobDetails.methodOfReferral}</p>)}
                            {referredJobDetails.proof && (<p className="mb-2">uploaded proof:  <a href={viewProof()} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                View proof
                            </a></p>)}
                            <p>Job Status: <span className={` ${referredJobDetails.status === 'IN_VERIFICATION' ? 'text-yellow-500 font-bold' : referredJobDetails.status === 'REFERRED' ? 'text-green-500 font-bold' : 'text-green-500 font-bold'}`}>{referredJobDetails.referralStatus}</span></p>
                            {referredJobDetails.reason && (<p>Reason: <span className="">{referredJobDetails.reason}</span></p>)}
                            <p className="mb-2">Comments: {referredJobDetails.comments}</p>
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    )
}
export default ReferredJobDetails;