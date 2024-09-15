import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutEmployee } from '../slices/employeeLoginSlice';
import '../CandidateDtails/Responsive.css';
import config from '../../../config';
import SideBar from '../SideBar/SideBar';
import Footer from '../SideBar/Footer';

function CandidateDetails() {
    const log = useSelector(state => state.emplog);
    const token = log.data.token;
    const modalRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [refer, setRefer] = useState(false);
    const [reject, setReject] = useState(false);
    const { candidate } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [candidateDetails, setCandidateDetails] = useState({});
    const [showReferMessage, setShowReferMessage] = useState(false)
    const [rejectData, setRejectData] = useState({
        reason: "",
        comments: ""
    });
    const [formData, setFormData] = useState({
        name: candidate?.candidateName,
        positionAppliedFOR: candidate?.referralFor,
        companyName: '',
        dateOfReferral: '',
        methodOfReferral: '',
        otherReferral: '',
        proof: null,
        comments: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/employee-login');
        }
        else if(!candidate?.referralId){
            navigate(-1);

        }
    }, [token, navigate,candidate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
            ...(id === 'methodOfReferral' && value === 'Others' ? { otherReferral: '' } : {}),
        });
    };

    const handleOtherChange = (e) => {
        setFormData({
            ...formData,
            otherReferral: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFormData({
            ...formData,
            proof: file
        });
    };


    const handleRejectChange = (e) => {
        const { id, value } = e.target;
        setRejectData(prevFormData => ({
            ...prevFormData,
            [id]: value
        }));
    };

    const handleLogout = () => {
        dispatch(logoutEmployee());
        navigate('/employee-login');
    };

    useEffect(() => {
        getReferralRequest();

    }, []);

    const getReferralRequest = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobPoster.getReferralRequest}${candidate.referralId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
            params: {
                candidateEmail: candidate.candidateEmail,
                jobId: candidate.jobId,
            }
        }).then(response => {
            setCandidateDetails(response.data);
            formData.companyName = response.data.company;
        })
            .catch(error => {
                if (error.response.status === 403) {
                    setErrorMessage('session Expired')
                    setTimeout(() => {
                        setErrorMessage('');
                        handleLogout();
                    }, 2000);
                }
                else {
                    setErrorMessage('Error fetching data')
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 2000);
                }
            }).finally(() => setLoading(false))
    }

    const rejectReferral = (e) => {
        e.preventDefault();
        const rej = { ...rejectData, referralId: candidateDetails.referralId };
        setLoading(true);
        axios.post(`${config.api.baseURL}${config.api.jobPoster.rejectReferral}`, rej, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            setReject(false)
            getReferralRequest();
            setRejectData({
                reason: "",
                comments: ""
            })

        })
            .catch(error => {
                if (error.response.status === 403) {
                    setErrorMessage('session Expired')
                    setTimeout(() => {
                        setErrorMessage('');
                        handleLogout();
                    }, 2000);
                }
                else {
                    setErrorMessage('Error  while rejecting job')
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 2000);
                }
            }).finally(() => setLoading(false))
    };

    const handleResumeView = () => {
        const pdfWindow = window.open('');
        pdfWindow.document.write('<iframe width="100%" height="100%" src="data:application/pdf;base64,' + encodeURI(candidateDetails.candidateResume) + '"></iframe>');
    };

    const closeRefferJob = () => {
        setFormData({
            name: candidate.candidateName,
            positionAppliedFOR: candidate.referralFor,
            companyName: candidateDetails.company,
            dateOfReferral: '',
            methodOfReferral: '',
            otherReferral: '',
            proof: null,
            comments: '',
        })
        setRefer(false);
    }

    const closeRejectForm = () => {
        setRejectData({
            reason: "",
            comments: ""
        })
        setReject(false)
    }
    const referJob = (e) => {
        e.preventDefault();
        const dateOfreferral = formData.dateOfReferral;
        let methodOfReferral = formData.methodOfReferral;
        const comments = formData.comments;
        const proof = formData.proof;
        if (methodOfReferral === 'Others' && formData.otherReferral) {
            methodOfReferral = formData.otherReferral;
        }
        const referForm = {
            dateOfreferral: dateOfreferral,
            referralId: candidateDetails.referralId,
            methodOfReferral: methodOfReferral,
            comments: comments,
            proof: proof,
        };
        const form = new FormData();
        form.append('referralId', referForm.referralId);
        form.append('dateOfReferral', referForm.dateOfreferral);
        form.append('comments', referForm.comments);
        form.append('methodOfReferral', referForm.methodOfReferral);
        form.append('proof', referForm.proof);
        setLoading(true);
        axios.post(`${config.api.baseURL}${config.api.jobPoster.submitReferral}`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            setRefer(false);
            setShowReferMessage(true);
            getReferralRequest();
        }).catch(error => {
            if (error.response.status === 403) {
                setErrorMessage('session Expired')
                setTimeout(() => {
                    setErrorMessage('');
                    handleLogout();
                }, 2000);
            }
            else {
                setRefer(false);
                setErrorMessage('Error occured')
                setTimeout(() => {
                    setErrorMessage('')
                }, 2000);
            }
        }).finally(() => setLoading(false));
    };
    const today = new Date().toISOString().split('T')[0];


    return (
        <div className='flex flex-col min-h-screen bg-[#f5faff]'>
            <SideBar />
            <div className='flex-grow flex flex-col justify-between p-4 ml-0 xl:ml-[20%] pt-16 lg:pt-0'>
                {errorMessage && (<p className='text-red-500 bg-white my-1 py-2 px-4  fixed left-1/2 transform -translate-x-1/2'>{errorMessage}</p>)}
                {loading ? (<div className="flex flex-col justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-900">Loading...</p>
                </div>) :
                    (<div className=''>
                        <div className=' lg:p-4 rounded mb-2'>
                            <h1 className='font-bold text-center text-xl mb-3'>Candidate Details</h1>
                            <p className='mb-1'>Full Name: <span>{candidateDetails.candidateName}</span></p>
                            <p className='mb-1'>Mail Id: <span>{candidateDetails.candidateEmail}</span></p>
                            <p className='mb-1'>Mobile Number: <span>{candidateDetails.candidateMobile}</span></p>
                            <p className='mb-1'>Candidate Experience: {candidateDetails.candidateExperience}</p>
                            <p >Resume: <span className='text-blue-500 cursor-pointer' onClick={handleResumeView}>{candidateDetails.candidateName}.pdf</span></p>
                            <h1 className='font-bold mt-2'>Referral Requested for</h1>
                            <p className='mb-1'>Job Role: <span className=''>{candidateDetails.referralFor}</span></p>
                            <a href={candidateDetails?.jobDescriptionLink} target='_blank' className='underline'>JobDescriptionLink</a>

                            <p className='mb-1'>Company: {candidateDetails.company}</p>
                            <p className='mb-1'>Location: {candidateDetails?.jobLocation
                                                    ?.split(',')
                                                    ?.map(location => location.trim())
                                                    ?.filter(location => location.toLowerCase() !== 'others' && location !== '')
                                                    ?.join(', ')
                                            } </p>
                            <p>Experience: {candidateDetails.experienceRequired}</p>
                            <p>Posted On: {candidateDetails.jobPostedOn}</p>
                            <div className='flex mt-4'>
                                {candidateDetails.referralStatus === 'REQUESTED' && (<button className='bg-red-700 hover:bg-red-800 text-white px-4 mr-2 py-2 rounded' onClick={() => setReject(true)}>Reject</button>)}
                                <button
                                    className={candidateDetails.referralStatus === 'IN_VERIFICATION'
                                        ? 'bg-yellow-500 hover:bg-yellow-500 text-white px-4 mr-2 py-2 rounded'
                                        : (candidateDetails.referralStatus === 'REJECTED' || candidateDetails.referralStatus === 'VERIFICATION_FAILED')
                                            ? 'bg-red-700 hover:bg-red-800 text-white px-4 mr-2 py-2 rounded'
                                            : 'bg-green-700 hover:bg-green-800 text-white px-4 mr-2 py-2 rounded'
                                    }
                                    disabled={candidateDetails.referralStatus !== 'REQUESTED'}
                                    onClick={() => setRefer(true)}
                                >
                                    {candidateDetails.referralStatus === 'REQUESTED' ? 'Refer' : candidateDetails.referralStatus}
                                </button>
                            </div>
                        </div>
                    </div>)}
            </div>
            {refer && (
                <div className="fixed top-0 left-0 w-full  bg-gray-500 bg-opacity-50 flex justify-center items-center " ref={modalRef}>
                    <div className="modal-content py-4 text-left px-3 lg:px-6 overflow-y-scroll  bg-white rounded shadow-md my-4">
                        <h1 className="text-lg font-bold mb-2 text-center">Candidate Referral Confirmation</h1>
                        <div className='bg-blue-500 p-2 text-white rounded mb-2'>
                            <h1 className=" ml-2">Instructions</h1>
                            <ul className="list-disc list-inside pl-4">
                                <li className="text-sm flex items-start">
                                    <span className="flex-shrink-0">•</span>
                                    <span className="ml-2">Use this form to confirm your referral</span>
                                </li>
                                <li className="text-sm flex items-start">
                                    <span className="flex-shrink-0">•</span>
                                    <span className="ml-2">Fill this form only after the candidate is referred</span>
                                </li>
                            </ul>
                        </div>
                        <h1 className="font-bold mb-2">Candidate Information</h1>
                        <form onSubmit={referJob}>
                            <div className="mb-3">
                                <label className="block  text-start">Full Name<span className="text-red-700">*</span></label>
                                <input id="name" type="text" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" readOnly />
                            </div>
                            <div className="mb-3">
                                <label className="block  text-start">Position Applied for<span className="text-red-700">*</span></label>
                                <input type="text" id="positionAppliedFor" value={formData.positionAppliedFOR} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" readOnly />
                            </div>
                            <div className="mb-3">
                                <label className="block  text-start">Company Name<span className="text-red-700">*</span></label>
                                <input type="text" id="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" readOnly />
                            </div>

                            <h1 className="font-bold mb-2">Referral Details</h1>
                            <div className="mb-3">
                                <label className="block  text-start">
                                    Date of referral
                                    <span className="text-red-700">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="dateOfReferral"
                                    value={formData.dateOfReferral}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    max={today} // Set max attribute to today's date
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="block text-start">
                                    Method of referral
                                    <span className="text-red-700">*</span>
                                </label>
                                <select id="methodOfReferral" value={formData.methodOfReferral} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required>
                                    <option value="">select</option>
                                    <option value="Through Company's career portal">Through Company's career portal</option>
                                    <option value="Email to HR Team">Email to HR Team</option>
                                    <option value="Others">Others</option>

                                </select>
                            </div>
                            {formData.methodOfReferral === 'Others' && (
                                <div className="mb-3">
                                    <label className="block  text-start">
                                        Please specify<span className="text-red-700">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="otherReferral"
                                        value={formData.otherReferral}
                                        onChange={handleOtherChange}
                                        className="w-full px-3 py-2 border rounded-md"
                                        required
                                    />
                                </div>
                            )}


                            <h1 className="font-bold mb-2">Proof Details</h1>
                            <div className="mb-3">
                                <label className="block  text-start">Proof of referral<span className="text-red-700">*</span></label>
                                <input type="file" id="proof" onChange={handleFileChange} className="w-full px-3 py-2 border rounded-md" required />
                            </div>

                            <h1 className="font-bold mb-2">Additional comments</h1>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-start">
                                    <strong>Comments</strong>
                                    <span className="text-red-700">*</span>
                                </label>
                                <textarea id="comments" value={formData.comments} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required></textarea>
                            </div>
                            <div className="text-center">
                                <button type="button" className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded mr-2" onClick={closeRefferJob}>Cancel</button>
                                <button type="submit" className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded mr-2">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {reject && (
                <div className="fixed top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center" ref={modalRef}>
                    <div className="modal-content py-4 text-left px-6 overflow-y-scroll max-h-screen bg-white rounded shadow-md mt-4">
                        <h1 className='font-bold text-center mb-4'>Candidate Rejection</h1>
                        <form onSubmit={rejectReferral}>
                            <div className="mb-3">
                                <label htmlFor="reason" className="block text-gray-700 text-start mb-1">
                                    <strong>Reason For Rejection</strong>
                                    <span className="text-red-700">*</span>
                                </label>
                                <select
                                    id="reason"
                                    value={rejectData.reason}
                                    onChange={handleRejectChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Not Meeting Job Requirements">Not Meeting Job Requirements</option>
                                    <option value="Job Position Filled">Job Position Filled</option>
                                    <option value="Red Flags in Background Check">Red Flags in Background Check</option>
                                    <option value="Overqualified/Underqualified">Overqualified/Underqualified</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="comments" className="block text-gray-700 text-start mb-1">
                                    <strong>Additional Comments</strong>
                                    <span className="text-red-700">*</span>
                                </label>
                                <textarea
                                    id="comments"
                                    value={rejectData.comments}
                                    onChange={handleRejectChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div className='text-center'>
                                <button type="button" className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded mr-2" onClick={closeRejectForm}>Cancel</button>
                                <button type="submit" className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded mr-2">Reject</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showReferMessage && (
                <div className="fixed top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center" ref={modalRef}>
                    <div className="modal-content py-4 text-left px-6 overflow-y-scroll  bg-white rounded shadow-md mt-2 mb-2">
                        <p className="font-bold text-lg text-center text-green-500">Thank you</p>
                        <p className="font-bold">What Next?</p>
                        <ul className="list-disc pl-5">
                            <li>Your submission has been received and is now being processed.</li>
                            <li>Our team will verify the details provided.</li>
                            <li>Referral amount will be credited to your wallet upon successful verification.</li>
                        </ul>
                        <p className="font-bold mt-4">Note</p>
                        <ul className="list-disc pl-5">
                            <li>Verification process takes up to 24-48 hours.</li>
                            <li>If you have any questions or concerns, please feel free to contact us.</li>
                        </ul>

                        <div className='text-center'>
                            <button className='bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded mr-2' onClick={() => setShowReferMessage(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
           <Footer/>
        </div>
    );
}

export default CandidateDetails;
