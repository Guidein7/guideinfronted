import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../Slices/loginSlice';
import { useDispatch } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import config from '../../../config';
import JSFooter from '../NavBar/JSFooter';

function AppliedRefeReferralDetails() {
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const decoded = token ? jwtDecode(token) : null;
    const name = decoded ? decoded.username : null;
    const location = useLocation();
    const { status } = location.state || {};
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login')
        } else if (!status?.referralId) {
            navigate(-1); // Go back to the previous page
        }
    }, [token, navigate, status])

    const handleLogout = () => {
        navigate('/login');
        dispatch(logoutUser());
    };

    const [loading, setLoading] = useState(false);
    const [referralDetails, setReferralDetails] = useState({})
    const [proof, setProof] = useState('');
    const [errorMessage, setErrorMessage] = useState('')




    useEffect(() => {
        if (status?.referralId) {
            getappliedReferraDetails();
        }
    }, [])

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

            if (error.response.status === 403) {
                setErrorMessage('session expired');
                setTimeout(() => {
                    setErrorMessage('');
                    handleLogout();
                }, 2000);

            }
            else {
                setErrorMessage('error while fetching data');
                setTimeout(() => {
                    setErrorMessage('');
                    handleLogout();
                }, 2000);
            }

        }).finally(() => setLoading(false))
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
            return 'application/octet-stream';
        }
    }
    function viweProfile() {
        const base64String = proof;
        const mimeType = getMimeType(base64String);
        const blobUrl = createBlobUrl(base64String, mimeType);
        return blobUrl;

    }
    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between">
            <NavBar />
            <div className='flex-grow ml-0 xl:ml-[20%] pt-16 lg:pt-5'>
                {errorMessage && <p className='text-red-500 fixed left-1/2 px-4 py-2 bg-white transform -translate-x-1/2'>{errorMessage}</p>}
                {loading ? (<div className="flex flex-col justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-900">Loading...</p>
                </div>) : (
                    <div className='pl-5'>
                        <h1 className='text-xl lg:text-2xl font-bold  my-1'>{referralDetails.jobTitle}</h1>
                        <p className='font-bold  my-1 lg:my-2'> {referralDetails.companyName}</p>
                        <p className='my-1 lg:my-2'> {
                            referralDetails?.jobLocation
                                ?.split(',')
                                ?.map(location => location.trim())
                                ?.filter(location => location.toLowerCase() !== 'others' && location !== '')
                                ?.join(', ')
                        } ({referralDetails
                            .workMode})</p>
                        <p className='my-1 lg:my-2'>Job Type: {referralDetails.jobType}</p>
                        <p className='my-1 lg:my-2'>Experience: {referralDetails.experienceRequired}</p>
                        <p className='my-1 lg:my-2'>Requested On: {referralDetails.requstedOn}</p>
                        <p className='my-1 lg:my-2'>Resume:<span className='text-blue-500 cursor-pointer' onClick={handleResumeView}>{name}.pdf </span></p>
                        <p> Job Link: <a className='text-blue-700 underline break-words my-1' target="_blank" href={referralDetails.jobDescriptionLink} style={{ wordWrap: 'break-word' }}>{referralDetails.jobDescriptionLink}</a></p>
                        <p className='my-1 lg:my-2'>Job Posted by: {referralDetails.jobPosterName}</p>
                        <h1 className='font-bold'>Referral Details:</h1>
                        <p>Current Status: <span className={`my-1 lg:my-2 ${referralDetails.currentStatus === 'REFERRED' ? 'text-green-500 font-bold' : referralDetails.currentStatus === 'IN_PROGRESS' ? 'text-yellow-500  font-bold' : referralDetails.currentStatus === 'REQUESTED' ? 'text-blue-500 font-bold' : 'text-red-500 font-bold'}`}> {referralDetails.currentStatus}</span></p>
                        {referralDetails.reason && (
                            <p className='my-1 lg:my-2'>Reason: {referralDetails.reason}</p>
                        )}
                        {(referralDetails.currentStatus !== 'REQUESTED' && referralDetails.currentStatus !== 'REJECTED') && (
                            <div>
                                <p className='my-1 lg:my-2'>Date of Referral: {referralDetails.dateOfReferral}</p>
                                <p className='my-1 lg:my-2'>Method Of Referral: {referralDetails.methodOfReferral}</p>
                                <p className='my-1 lg:my-2'>Comments: {referralDetails.comments}</p>
                            </div>
                        )}
                        {referralDetails.currentStatus === 'REFERRED' && (
                            <span className=' ml-0 '>Proof Of Referral: <a href={viweProfile()} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                View proof
                            </a></span>
                        )}
                    </div>
                )}
            </div>
            <JSFooter />

        </div>
    );
}

export default AppliedRefeReferralDetails;
