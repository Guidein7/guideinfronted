import GuideinLogo from '../../../assets/GuideinLogo.png';
import { useState, useEffect, useRef } from 'react';
import { logoutUser } from '../Slices/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FaFilePdf } from "react-icons/fa";
import NavBar from '../NavBar/NavBar';
import config from '../../../config';

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const decoded = jwtDecode(token);
    const email = decoded.sub;
    const mobile = decoded.mobile;
    const name = decoded.username;
    const [isOpen, setIsOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true); // Loader state
    const fileInputRef = useRef();
    const [isNewResumeUploaded, setIsNewResumeUploaded] = useState(false)
    const [resumeFileName, setResumeFileName] = useState('')
    const [formData, setFormData] = useState({
        name: name,
        email: email,
        mobile: mobile,
        currentStatus: '',
        experience: '',
        linkedInUrl: '',
        resume: null,
    });
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = () => {
        axios.get(`${config.api.baseURL}${config.api.jobSeeker.getProfile}${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        })
            .then(response => {
               
                if (response.status === 200) {
                    setProfile(response.data);
                    setFormData({
                        ...formData,
                        name: response.data.name,
                        currentStatus: response.data.currentStatus,
                        experience: response.data.experience,
                        linkedInUrl: response.data.linkedInUrl
                    });
                }
                else if (response.status === 204) {
                    setProfile(null);
                }
            })
            .catch(error => {
               if(error.response.status === 403) {
                setErrorMessage('session expired')
                setTimeout(() => {
                    setErrorMessage('')
                    handleLogout();
                }, 2000);
               }
               else{
                setErrorMessage('Error while fetching profile')
                setTimeout(() => {
                    setErrorMessage('')
                    handleLogout();
                }, 2000);
               }
            })
            .finally(() => setLoading(false));
    }
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);
    function base64ToBlob(base64, mime) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mime });
    }
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type !== 'application/pdf') {
            setErrorMessage('Please upload a pdf file')
            setTimeout(() => setErrorMessage(''), 2000)
            // window.location.reload();

        }
        setFormData({
            ...formData,
            resume: file
        });
        if (file) {

            setResumeFileName(file.name);
            setIsNewResumeUploaded(true);  // Set the flag to true when a new file is uploaded
        }


    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.resume && formData.resume.type !== 'application/pdf') {
            setErrorMessage('Please upload a pdf file')
            setTimeout(() => setErrorMessage(''), 2000)
            return;
        }

        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('mobile', formData.mobile);
        form.append('currentStatus', formData.currentStatus);
        form.append('experience', formData.experience);
        form.append('linkedInUrl', formData.linkedInUrl);
        if (isNewResumeUploaded) {
            if (formData.resume) {
                form.append('resume', formData.resume);
            }
        } else {
            // Convert base64 resume to Blob and append to form
            const oldResumeBlob = base64ToBlob(profile.resume, 'application/pdf');
            form.append('resume', oldResumeBlob, `${formData.name}.resume.pdf`);
        }
        const url = isEditing
            ? `${config.api.baseURL}${config.api.jobSeeker.updateProfile}`
            : `${config.api.baseURL}${config.api.jobSeeker.saveProfile}`;
        const method = isEditing ? 'put' : 'post';

        setLoading(true); // Start loading when submitting the form
        axios({
            method: method,
            url: url,
            data: form,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setProfile(formData);
                setIsEditing(false);
                setSuccessMessage('Profile successfully saved');
                getProfile();
            })
            .catch(error => {
                setErrorMessage('Error while saving profile')
                setTimeout(() => {
                    setErrorMessage('')
                    handleLogout();
                }, 2000);
            })
            .finally(() => setLoading(false)); // Stop loading after the request is done
    };

    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleResumeView = () => {
        const pdfWindow = window.open('');
        pdfWindow.document.write('<iframe width="100%" height="100%" src="data:application/pdf;base64,' + encodeURI(profile.resume) + '"></iframe>');
    };

    const cancelButton = () => {
        setIsEditing(false);
    }

    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col justify-between ">
            <NavBar />
            {loading ? (
                <div className="flex flex-col justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-900">Loading...</p>
                </div>
            ) : (
                <div className='flex-grow flex justify-center items-center pt-24'>
                    <div >
                        {errorMessage && (<p className='text-red-400 text-center fixed w-full z-10 text-3xl'>{errorMessage}</p>)}

                        {profile && !isEditing ? (
                            <div className='text-center bg-white shadow-md rounded-lg p-6 w-full max-w-md m-4'>
                                <h2 className='text-2xl font-semibold mb-3'>profile</h2>

                                <div className='mb-3'>
                                    <label className='block text-gray-700 text-start'><strong>Full Name</strong><span className='text-red-700'>*</span></label>
                                    <input
                                        type='text'
                                        value={profile.name}
                                        className='w-full px-3 py-2 border rounded-md'
                                        readOnly
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='block text-gray-700 text-start'><strong>Email</strong><span className='text-red-700'>*</span></label>
                                    <input
                                        type='email'
                                        value={profile.email}
                                        className='w-full px-3 py-2 border rounded-md'
                                        readOnly
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='block text-gray-700 text-start'><strong>Mobile No</strong><span className='text-red-700'>*</span></label>
                                    <input
                                        type='text'
                                        value={profile.mobile}
                                        className='w-full px-3 py-2 border rounded-md'
                                        readOnly
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='block text-gray-700 text-start'><strong>Current Status</strong><span className='text-red-700'>*</span></label>
                                    <input
                                        type='text'
                                        value={profile.currentStatus}
                                        className='w-full px-3 py-2 border rounded-md'
                                        readOnly
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='block text-gray-700 text-start'><strong>Experience</strong><span className='text-red-700'>*</span></label>
                                    <input
                                        type='text'
                                        value={profile.experience}
                                        className='w-full px-3 py-2 border rounded-md'
                                        readOnly
                                    />


                                </div>
                                <div className='mb-3'>
                                    <label className='block text-gray-700 text-start'><strong>Linkedin URL </strong><span className='text-red-700'>*</span></label>
                                    <input
                                        type='text'
                                        value={profile.linkedInUrl}
                                        className='w-full px-3 py-2 border rounded-md'
                                        readOnly
                                    />
                                </div>

                                <div className='text-start flex flex-row mb-3'>
                                    <span ><strong> Resume:</strong></span>
                                    <FaFilePdf size={40} onClick={handleResumeView} className='cursor-pointer' />
                                </div>
                                <button onClick={handleEdit} className='w-25 bg-blue-700 text-white p-2 rounded-md mx-2 mt-2'>edit</button>
                            </div>
                        ) : (
                            <div className='text-center bg-white shadow-md rounded-lg p-6 w-full max-w-md m-4'>
                                <h2 className='text-2xl font-semibold mb-3'>{isEditing ? 'Edit Profile' : 'Complete profile'}</h2>

                                <form onSubmit={handleSubmit}>
                                    <div className='mb-3'>
                                        <label className='block text-gray-700 text-start'><strong>Full Name</strong><span className='text-red-700'>*</span></label>
                                        <input
                                            type='text'
                                            name='name'
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className='w-full px-3 py-2 border rounded-md'
                                            required

                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='block text-gray-700 text-start'><strong>Email</strong><span className='text-red-700'>*</span></label>
                                        <input
                                            type='email'
                                            name='email'
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className='w-full px-3 py-2 border rounded-md'
                                            required

                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='block text-gray-700 text-start'><strong>Mobile No</strong><span className='text-red-700'>*</span></label>
                                        <input
                                            type='text'
                                            name='mobile'
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            className='w-full px-3 py-2 border rounded-md'
                                            required

                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='block text-gray-700 text-start'><strong>Current Status</strong><span className='text-red-700'>*</span></label>
                                        <select
                                            type='text'
                                            name='currentStatus'
                                            value={formData.currentStatus}
                                            onChange={handleInputChange}
                                            className='w-full px-3 py-2 border rounded-md'
                                            required
                                        >
                                            <option value=''>Select</option>
                                            <option value='Student'>Student</option>
                                            <option value='Fresher'>Fresher</option>
                                            <option value='Self-Employed'>Self-Employed</option>
                                            <option value='Experienced'>Experienced</option>
                                        </select>

                                    </div>
                                    <div className='mb-3'>
                                        <label className='block text-gray-700 text-start'><strong>Experience</strong><span className='text-red-700'>*</span></label>
                                        <select
                                            id='experience'
                                            name='experience'
                                            value={formData.experience}
                                            onChange={handleInputChange}
                                            className='w-full px-3 py-2 border rounded-md'
                                            required
                                        >
                                            <option value=''>Select</option>
                                            <option value='0-1 Years'>0-1 Years</option>
                                            <option value='1-3 Years'>1-3 Years</option>
                                            <option value='3-5 Years'>3-5 Years</option>
                                            <option value='5-7 Years'>5-7 Years</option>
                                            <option value='7+ Years'>7+ Years</option>
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='block text-gray-700 text-start'><strong>Linkedin URL </strong><span className='text-red-700'>*</span></label>
                                        <input
                                            type='text'
                                            name='linkedInUrl'
                                            value={formData.linkedInUrl}
                                            onChange={handleInputChange}
                                            className='w-full px-3 py-2 border rounded-md'
                                            required
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label className="block text-gray-700 text-start"><strong>Resume</strong></label>
                                        {!profile ? (
                                            <div>
                                                <input
                                                    type="file"
                                                    name="resume"
                                                    onChange={handleFileChange}
                                                    required
                                                />
                                                <p className='text-red-500 mr-32'>Accept .pdf max size 5mb</p>
                                            </div>
                                        ) : (
                                            <div>
                                                {!isNewResumeUploaded && (
                                                    <p className="cursor-pointer mb-3 flex" onClick={handleResumeView}>
                                                        <FaFilePdf className='mt-1' />
                                                        <span className='text-blue-500'>{formData.name}.resume</span>
                                                    </p>
                                                )}
                                                {resumeFileName && (
                                                    <p className="text-gray-700">{resumeFileName}</p>
                                                )}
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={() => fileInputRef.current.click()}
                                                        className="bg-blue-700 p-1 text-white rounded focus:outline-none"
                                                    >
                                                        Update Resume
                                                    </button>
                                                    <input
                                                        type="file"
                                                        name="resume"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file && file.type !== 'application/pdf') {
                                                                alert('Please upload a PDF file.');
                                                                return;
                                                            }
                                                            handleFileChange(e);
                                                        }}
                                                        ref={fileInputRef}
                                                        style={{ display: 'none' }}
                                                        
                                                    />
                                                    <p className='text-xs text-red-500'> accept .pdf  (5mb)</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>


                                    {isEditing && (
                                        <button onClick={cancelButton} className='w-25 bg-gray-500 text-white p-2 rounded-md mx-2'>cancel</button>
                                    )}
                                    <button type='submit' className='w-25 bg-blue-700 text-white p-2 rounded-md mx-2'>
                                        Save
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {successMessage && (
                <div className="bg-green-500 text-white py-2 px-4 rounded-md absolute top-[40%] left-[80%] transform -translate-x-1/2">
                    {successMessage}
                </div>)}
            <footer className="bg-[#00145e] w-full p-4">
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
export default Profile;