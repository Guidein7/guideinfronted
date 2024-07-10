import { useLocation, useNavigate, Link } from 'react-router-dom';
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
import '../CandidateDtails/Responsive.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import GuideinLogo from '../../../assets/GuideinLogo.png'
import { CgProfile } from "react-icons/cg";
import config from '../../../config';
import SideBar from '../SideBar/SideBar';

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
    const { candidate } = location.state;
    const [loading, setLoading] = useState(false);
    const [candidateDetails, setCandidateDetails] = useState({});
    const [showReferMessage, setShowReferMessage] = useState(false)
    const [rejectData, setRejectData] = useState({
        reason: "",
        comments: ""
    });
    const [formData, setFormData] = useState({
        name: candidate.candidateName,
        positionAppliedFOR: candidate.referralFor,
        companyName: '',
        dateOfReferral: '',
        methodOfReferral: '',
        otherReferral: '', // Add this line
        proof: null,
        comments: '',
    });


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

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
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
        })
            .then(response => {
                console.log(response);
                setCandidateDetails(response.data);
                formData.companyName = response.data.company;
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    const rejectReferral = (e) => {
        e.preventDefault();
        setLoading(true);
        const rej = { ...rejectData, referralId: candidateDetails.referralId };
        axios.post(`${config.api.baseURL}${config.api.jobPoster.rejectReferral}`, rej, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log(response);
                setReject(false)
                getReferralRequest();
                setRejectData({
                    reason: "",
                    comments: ""
                })

            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))

    };

    const handleResumeView = () => {
        const pdfWindow = window.open('');
        pdfWindow.document.write('<iframe width="100%" height="100%" src="data:application/pdf;base64,' + encodeURI(candidateDetails.candidateResume) + '"></iframe>');
    };

    const referJob = (e) => {
        e.preventDefault();
        setLoading(true);
        const dateOfreferral = formData.dateOfReferral;
        let methodOfReferral = formData.methodOfReferral;
        const comments = formData.comments;
        const proof = formData.proof;

        if (methodOfReferral === 'Others' && formData.otherReferral) {
            methodOfReferral += `: ${formData.otherReferral}`;
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

        axios.post(`${config.api.baseURL}${config.api.jobPoster.submitReferral}`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            console.log(response)
            setRefer(false);
            setShowReferMessage(true);
            getReferralRequest();
        })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    };
    const today = new Date().toISOString().split('T')[0];

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className='flex flex-col min-h-screen bg-[#f5faff]'>
        <SideBar/>
            <div className='flex-grow flex flex-col justify-between p-4 ml-0 xl:ml-[20%]'>

                {loading ? (<div className="flex flex-col justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-900">Loading...</p>
                </div>) :
                    (<div className=''>

                       
                        <IoMdArrowRoundBack onClick={handleBackClick} size={24} className=' cursor-pointer my-1' />
                        <div className='bg-white p-4 rounded shadow-md mb-2'>
                            <h1 className='font-bold'>Candidate Details</h1>

                            <p>Full Name : <span>{candidateDetails.candidateName}</span></p>
                            <p>Mail Id : <span>{candidateDetails.candidateEmail}</span></p>
                            <p>Mobile Number : <span>{candidateDetails.candidateMobile}</span></p>
                            <p>Candidate experience: {candidateDetails.candidateExperience}</p>

                            <h1 className='font-bold mt-2'>Referral Requested for</h1>
                            <p><span className='underline'>{candidateDetails.referralFor}</span></p>
                            <p>{candidateDetails.company}</p>
                            <p>{candidateDetails.jobLocation}</p>
                            <p>Experience: {candidateDetails.experienceRequired}</p>
                            <p>Posted on: {candidateDetails.jobPostedOn}</p>
                            <p >Resume: <span className='text-blue-500 cursor-pointer' onClick={handleResumeView}>{candidateDetails.candidateName}.pdf</span></p>

                            <div className='flex mt-4'>
                                <button className='bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded mr-2' disabled={candidateDetails.referralStatus !== 'REQUESTED'} onClick={() => setRefer(true)}>{candidateDetails.referralStatus === 'REQUESTED' ? 'Refer' : candidateDetails.referralStatus}</button>
                                {candidateDetails.referralStatus === 'REQUESTED' && (<button className='bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded' onClick={() => setReject(true)}>Reject</button>)}
                            </div>
                        </div>
                    </div>)}
            </div>
            {refer && (
                <div className="fixed top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center" ref={modalRef}>
                    <div className="modal-content py-4 text-left px-6 overflow-y-scroll max-h-screen bg-white rounded shadow-md mt-4">
                        <h1 className="text-lg font-bold mb-2 text-center">Candidate Referral Confirmation</h1>
                        <h1 className="font-bold mb-2">Instructions</h1>
                        <p className="mb-2">Please use this form to confirm your referral of a candidate to</p>
                        <p className="mb-2">Note: Only fill this form only after the candidate is referred process the candidate has been finalized</p>

                        <h1 className="font-bold mb-2">Candidate Information</h1>
                        <form>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-start"><strong>Full Name</strong><span className="text-red-700">*</span></label>
                                <input id="name" type="text" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" readOnly />
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-start"><strong>Position Applied for</strong><span className="text-red-700">*</span></label>
                                <input type="text" id="positionAppliedFor" value={formData.positionAppliedFOR} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" readOnly />
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-start"><strong>Company Name</strong><span className="text-red-700">*</span></label>
                                <input type="text" id="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" readOnly />
                            </div>

                            <h1 className="font-bold mb-2">Referral Details</h1>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-start">
                                    <strong>Date of referral</strong>
                                    <span className="text-red-700">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="dateOfReferral"
                                    value={formData.dateOfReferral}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    max={today} // Set max attribute to today's date
                                />
                            </div>

                            <div className="mb-3">
                                <label className="block text-gray-700 text-start">
                                    <strong>Method of referral</strong>
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
                                    <label className="block text-gray-700 text-start">
                                        <strong>Please specify</strong>
                                    </label>
                                    <input
                                        type="text"
                                        id="otherReferral"
                                        value={formData.otherReferral}
                                        onChange={handleOtherChange}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                            )}


                            <h1 className="font-bold mb-2">Proof of referral</h1>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-start"><strong>Proof of referral</strong><span className="text-red-700">*</span></label>
                                <input type="file" id="proof" onChange={handleFileChange} className="w-full px-3 py-2 border rounded-md" required />
                            </div>

                            <h1 className="font-bold mb-2">Additional comments</h1>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-start">
                                    <strong>Comments</strong>
                                    <span className="text-red-700">*</span>
                                </label>
                                <textarea id="comments" value={formData.comments} onChange={handleChange} className="w-full px-3 py-2 border rounded-md"></textarea>
                            </div>
                            <div className="text-center">
                                <button type="button" className="w-25 bg-gray-500 text-white py-2 rounded-md mx-2" onClick={() => setRefer(false)}>Cancel</button>
                                <button type="submit" onClick={referJob} className="w-25 bg-blue-500 text-white py-2 rounded-md mx-2">Submit</button>
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
                                <button type="button" className="w-25 bg-gray-500 text-white py-2 rounded-md mx-2" onClick={() => setReject(false)}>Cancel</button>
                                <button type="submit" className="w-25 bg-blue-500 text-white py-2 rounded-md mx-2">Reject</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showReferMessage && (
                <div className="fixed top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center" ref={modalRef}>
                    <div className="modal-content py-4 text-left px-6 overflow-y-scroll max-h-screen bg-white rounded shadow-md mt-4">
                        <p className='text-red-500'>Thank you for submitting your referral confirmation</p>
                        <p className='text-red-500'>your submission has been received and is now being processed. Our team will verify the details provided
                            , and the referral amount will be credited to your wallet upon successful verification.</p>
                        <p className='text-red-500'>Please note that the verification process take upto 24-48-hours </p>
                        <p className='text-red-500'>If you have any questions or concerns, please feel free to conntact us</p>
                        <div className='text-center'>
                            <button className='bg-gray-500 text-white p-2 rounded' onClick={() => setShowReferMessage(false)}>close</button>
                        </div>
                    </div>
                </div>
            )}
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
    );
}

export default CandidateDetails;
