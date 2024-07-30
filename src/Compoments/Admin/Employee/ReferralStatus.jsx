import { useLocation, useNavigate } from "react-router-dom";
import AdminNavBar from "../NavBar/AdminNavBar";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../config";
import { IoMdArrowRoundBack } from "react-icons/io";

function ReferralStatus() {
    const log = useSelector(state => state.adminlog);
    const token = log.data.token;
    const location = useLocation();
    const { status } = location.state;
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState('');
    const [details, setDetails] = useState({});
    const [proof, setProof] = useState('');
    const[showRejectForm,setShowRejectForm] = useState(false);
    const modalRef = useRef();
    const [reject, setReject] = useState(false);

    const [rejectData, setRejectData] = useState({
        reason: "",
        comments: ""
    });

    const [rejectForm,setRejectForm] = useState({
        reason:'',
        comments:'',
        
    });
    const[errors,setErrors] = useState({
        reason:'',
        comments:''
    })

    const navigate = useNavigate();


    const approveRequest = () => {
        setLoading(true)
        axios.put(
            `${config.api.baseURL}${config.api.admin.approveReferral}${status.refferalId}`, // Constructing the URL
            {}, // No request body
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Setting the authorization header
                },
            }
        )
        .then(response => {
            console.log(response); // Log the response on success
            getReferralDeetails();
        })
        .catch(error => {
            console.error('Error approving the request:', error); // Log the error with a descriptive message
        }).finally(() => setLoading(false))
    }
    

    const getReferralDeetails = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.admin.referralDetails}${status.refferalId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },

        }).then(response => {
            console.log(response);
            setDetails(response.data)
            setProof(response.data.proof)


        }).catch(error => {
            console.log(error)


        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getReferralDeetails();
    }, [])
    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleResumeView = () => {
        const pdfWindow = window.open('');
        pdfWindow.document.write('<iframe width="100%" height="100%" src="data:application/pdf;base64,' + encodeURI(details.resume) + '"></iframe>');
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



    function viweProfile() {
        const base64String = proof;
        if(proof){
        const mimeType = getMimeType(base64String);
        const blobUrl = createBlobUrl(base64String, mimeType);

        return blobUrl;
        }
        return ;
    }

   const  handleRejectChange = (e) => {
    const{name,value} = e.target;
    setRejectForm(prevform => ({
        ...prevform,
        [name]:value
    }))
   }

   const handleAdminRejectChange = (e) => {
    const { id, value } = e.target;
    setRejectData(prevFormData => ({
        ...prevFormData,
        [id]: value
    }));
};

   function validateField(name,value) {
        let error = '';
        switch(name) {
            case 'comments': 
            if(!value){
                error = 'This field is required'
            }
            break;
            case 'reason': 
            if(!value){
                error = 'This field is required'
            }
            break;
            default : 
            error ='';
            break;
        }

        setErrors(preverror => ({
            ...preverror,
            [name]:error
        }))

   }

   const validateForm = () => {
    let valid = true;
      Object.keys(rejectForm).forEach(item => {
        validateField(item, rejectForm[item]);

        if (rejectForm[item] === '' || errors[item] !== '') {
          valid = false;
        }
      })
      return valid;
   }

   const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = {
        ...rejectForm, // Spread properties of rejectForm
        referralId: status.refferalId // Add referralId property from status
    };
    console.log(formData)

    if (validateForm()) { // Check if the form is valid
        setLoading(true);
        axios.put(
            `${config.api.baseURL}${config.api.admin.rejectReferral}`, 
            formData, // Request body with form data
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Set the authorization header
                },
            }
        )
        .then(response => {
            console.log(response); // Log the response on success
            getReferralDeetails();
            setShowRejectForm(false); // Hide the reject form
        })
        .catch(error => {
            console.error('Error rejecting the referral:', error); // Log the error with a descriptive message
        }).finally(() => setLoading(false))
    }
};

const closeRejectForm = () => {
    setRejectData({
        reason: "",
        comments: ""
    })
    setReject(false)
}

const rejectReferral = (e) => {
    e.preventDefault();
    const rej = { ...rejectData, referralId: details.referralId };
    setLoading(true);
    axios.put(`${config.api.baseURL}${config.api.admin.adminReject}`, rej, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(response => {
        setReject(false)
        alert('successfully rejected')
        console.log(response)
        getReferralDeetails();
        setRejectData({
            reason: "",
            comments: ""
        })

    })
        .catch(error => {
            setReject(false)
            alert('rejection failed')
            if (error.response.status === 403) {
                // setErrorMessage('session Expired')
                // setTimeout(() => {
                //     setErrorMessage('');
                //     handleLogout();
                // }, 2000);
                console.log(error)
            }
            else {
                // setErrorMessage('Error  while rejecting job')
                // setTimeout(() => {
                //     setErrorMessage('')
                // }, 2000);
                console.log(error)
            }
        }).finally(() => setLoading(false))
};





    return (

        <div className='bg-[#f5faff] min-h-screen flex flex-col'>
            <AdminNavBar />
            <div className='flex-grow'>
                <IoMdArrowRoundBack className="mx-10 mt-4 cursor-pointer" size={24} onClick={handleBackClick} />
                {showMessage && (<div className="text-center mt-2 text-green-400"><p>{showMessage}</p></div>)}
                {loading ? (<div className="flex flex-col justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-900">Loading...</p>
                </div>) : (<div>
                    <div className="mx-10 mt-3 mb-4">
                        <h1 className="font-bold my-2 text-lg ">Candidate Details</h1>
                        <h1>Name: {status.requestedBy}</h1>
                        <h1>Mail Id: {details.candidateEmail}</h1>
                        <h1>Mobile: {status?.mobileOfrequestedBy}</h1>
                        <h1>Experience: {details?.candidateExperience}</h1>
                        <p >Resume: <span className='text-blue-500 cursor-pointer' onClick={handleResumeView}>{status.requestedBy}.pdf</span></p>


                        <h1 className="font-bold my-2 text-lg">Referral Requested for</h1>
                        <h1 className=" font-bold  text-sm">{details?.jobTitle}</h1>
                        <h1 className=" font-bold text-sm ">{details?.companyName}</h1>
                        <h1>{details.jobLocation}({details.workMode})</h1>
                        <h1>Experience: {details?.experienceRequired}</h1>
                        <h1>Posted On: {details?.postedOn}</h1>
                        <h1>Job Posted By: {details?.jobPosterName}</h1>

                        {details.currentStatus === 'REQUESTED' && (<div>
                            <button className="bg-blue-700 text-white px-4 py-2 rounded me-2">Requested</button>
                            <button  onClick={() =>setReject(true)} className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded mr-2">Reject</button>
                        </div>)}
                        
                       

                        {(details.currentStatus === 'IN_VERIFICATION' || details.currentStatus === 'REFERRED') && (
                            <div>
                                <h1 className="font-bold my-2 text-lg">Referral details</h1>
                                <h1>Referral Date: {details.dateOfReferral}</h1>
                                <h1>Mode of Referral: {details.methodOfReferral}</h1>
                                <h1>comments:{details.comments} </h1>

                                {(details.currentStatus === 'IN_VERIFICATION' || details.currentStatus === 'REFERRED' ) && (
                                    <h1>Proof Of referral: <span className=''><a href={viweProfile()} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                        View proof
                                    </a></span></h1>)}

                            </div>
                        )}
                         {(details.currentStatus === 'VERIFICATION_FAILED' || details.currentStatus === 'REJECTED') && (
                            <div>
                                <h1 className="font-bold my-2 text-lg">Referral details</h1>
                             {details.currentStatus === 'VERIFICATION_FAILED' && <h1>Rejected Date: {details.dateOfReferral}</h1>}   
                                <h1>Reason: {details.reason}</h1>
                                <h1>comments:{details.comments} </h1>

                                {(details.currentStatus === 'IN_VERIFICATION' || details.currentStatus === 'REFERRED' ) && (
                                    <h1>Proof Of referral: <span className=''><a href={viweProfile()} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                        View proof
                                    </a></span></h1>)}

                            </div>
                        )}

                        {details.currentStatus === 'IN_VERIFICATION' && (
                            <div>
                                <button onClick={approveRequest} className="bg-green-500 text-white p-2 rounded-lg mx-2">Aprove</button>
                                <button onClick={() => setShowRejectForm(true)} className="bg-red-500 text-white p-2 rounded-lg">Reject</button>
                            </div>

                        )}

                        {details.currentStatus === 'REJECTED' && (<div>
                            <button className="bg-red-500 text-white p-2 rounded my-2">{details.currentStatus}</button>

                        </div>)}

                        {details.currentStatus === 'REFERRED' && (<div>
                            <button className="bg-green-500 text-white p-2 rounded my-2">{details.currentStatus}</button>

                        </div>)}

                        {details.currentStatus === 'VERIFICATION_FAILED' && (<div>
                            <button className="bg-red-500 text-white p-2 rounded my-2">{details.currentStatus} </button>

                        </div>)}


                    </div>


                </div>)}
                {showRejectForm && (
                    <div className="fixed top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center" ref={modalRef}>
                    <div className="modal-content py-4 text-left px-6 overflow-y-scroll max-h-screen bg-white rounded shadow-md mt-4">


                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                <label htmlFor="comments" className="block text-gray-700 text-start mb-1">
                                    <strong> reason</strong>
                                    <span className="text-red-700">*</span>
                                </label>

                                <input
                                    name="reason"
                                    value={rejectForm.reason}
                                    onChange={handleRejectChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    rows="4"
                                    required
                                />

                                </div>
                            <div className="mb-3">
                                <label htmlFor="comments" className="block text-gray-700 text-start mb-1">
                                    <strong> Comments</strong>
                                    <span className="text-red-700">*</span>
                                </label>
                                <textarea
                                    name="comments"
                                    value={rejectForm.comments}
                                    onChange={handleRejectChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="bg-blue-700 text-white p-2 rounded mx-2">submit</button>
                                <button onClick={() => setShowRejectForm(false)} className="bg-gray-700 text-white p-2 rounded">cancel</button>
                            </div>
                            </form>
                        </div>

                        </div>
                )}
                {reject && (
                <div className="fixed top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center" ref={modalRef}>
                    <div className="modal-content py-4 text-left px-6 overflow-y-scroll max-h-screen bg-white rounded shadow-md mt-4">
                        <h1 className='font-bold text-center mb-4'>Admin Rejection</h1>
                        <form onSubmit={rejectReferral}>
                            <div className="mb-3">
                                <label htmlFor="reason" className="block text-gray-700 text-start mb-1">
                                    <strong>Reason For Rejection</strong>
                                    <span className="text-red-700">*</span>
                                </label>
                                <select
                                    id="reason"
                                    value={rejectData.reason}
                                    onChange={handleAdminRejectChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                >
                                    <option value="">Select</option>
                                  
                                    <option value="No response from employee">No resposne from employee</option>
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
                                    onChange={handleAdminRejectChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div className='text-center'>
                                <button type="button" className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded mr-2" onClick={closeRejectForm}>Cancel</button>
                                <button  type="submit" className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded mr-2">Reject</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
export default ReferralStatus;