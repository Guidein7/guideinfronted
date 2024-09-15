import { useState, useEffect, useRef } from 'react';
import { logoutUser } from '../Slices/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import NavBar from '../NavBar/NavBar';
import config from '../../../config';
import JSFooter from '../NavBar/JSFooter';
import { current } from '@reduxjs/toolkit';

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const log = useSelector(state => state.log);
    const token = log.data.token;
    const decoded = token ? jwtDecode(token) : null;
    const email = decoded ? decoded.sub : null;
    const mobile = decoded ? decoded.mobile : null;
    const name = decoded ? decoded.username : null;
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
        currentCompany: '',
        currentRole: '',
        preferredRole: '',
        linkedInUrl: '',
        resume: null,
    });
    const [uploadedResumeURL, setUploadedResumeURL] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token, navigate])

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
                        linkedInUrl: response.data.linkedInUrl,
                        preferredRole:response.data?.preferredRole,
                        currentRole:response.data?.currentRole,
                        currentCompany:response.data?.currentCompany
                    });
                }
                else if (response.status === 204) {
                    setProfile(null);
                }
            })
            .catch(error => {
                if (error.response.status === 403) {
                    setErrorMessage('session expired')
                    setTimeout(() => {
                        setErrorMessage('')
                        handleLogout();
                    }, 2000);
                }
                else {
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
        const maxSize = 5 * 1024 * 1024;

        if (file && file.type !== 'application/pdf') {
            setErrorMessage('Please upload a pdf file')
            setTimeout(() => setErrorMessage(''), 2000)
            e.target.value = null;
            return;
        }
        if (file && file.size > maxSize) {
            setErrorMessage('File size exceeds 5 MB');
            setTimeout(() => setErrorMessage(''), 2000);
            e.target.value = null;
            return;
        }

        setFormData({
            ...formData,
            resume: file
        });

        if (file) {
            setResumeFileName(file.name);
            setIsNewResumeUploaded(true);
            const fileURL = URL.createObjectURL(file);
            setUploadedResumeURL(fileURL);
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
        form.append('preferredRole', formData.preferredRole)
        form.append('currentCompany', formData.currentCompany)
        form.append('currentRole', formData.currentRole)
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
        setIsNewResumeUploaded(false);
        setResumeFileName('')
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
                <div className='flex-grow ml-0 lg:ml-[20%] pt-16 lg:pt-0'>
                    <div >



                        {profile && !isEditing ? (
                            <div className='text-center mx-auto bg-[#fcfcfa] shadow-md border border-gray-300 rounded-lg p-2 lg:p-6 w-full max-w-xs lg:max-w-lg m-4'>
                                <h2 className='text-2xl text-[#21259] mb-3'>My Profile</h2>

                                <div className='mb-2 lg:mb-3'>
                                    <label className='block text-start lg:mb-1'>Full Name</label>
                                    <input
                                        type='text'
                                        value={profile.name}
                                        className='w-full px-3 py-2 border  rounded-md'
                                        readOnly
                                    />
                                </div>
                                <div className='mb-2 lg:mb-3'>
                                    <label className='block text-start lg:mb-1'>Email</label>
                                    <input
                                        type='email'
                                        value={profile.email}
                                        className='w-full px-3 py-2 border rounded-md'
                                        readOnly
                                    />
                                </div>
                                <div className='mb-2 lg:mb-3'>
                                    <label className='block text-start lg:mb-1'>Mobile No</label>
                                    <input
                                        type='text'
                                        value={profile.mobile}
                                        className='w-full px-3 py-2 border rounded-md'
                                        readOnly
                                    />
                                </div>
                                <div className='mb-2 lg:mb-3'>
                                    <label className='block text-start lg:mb-1'>Current Status</label>
                                    <input
                                        type='text'
                                        value={profile.currentStatus}
                                        className='w-full px-3 py-2 border rounded-md'
                                        readOnly
                                    />
                                </div>
                                <div className='mb-2 lg:mb-3'>
                                    <label className='block text-start lg:mb-1'>Experience</label>
                                    <input
                                        type='text'
                                        value={profile.experience}
                                        className='w-full px-3 py-2 border rounded-md'
                                        readOnly
                                    />


                                </div>
                                {profile?.currentCompany && (
                                    <div className='mb-2 lg:mb-3'>
                                        <label className='block text-start lg:mb-1'>Current Company </label>
                                        <input
                                            type='text'
                                            value={profile.currentCompany}
                                            className='w-full px-3 py-2 border rounded-md'
                                            readOnly
                                        />
                                    </div>
                                )}
                                {profile?.currentRole && (
                                    <div className='mb-2 lg:mb-3'>
                                        <label className='block text-start lg:mb-1'>Current Role </label>
                                        <input
                                            type='text'
                                            value={profile.currentRole}
                                            className='w-full px-3 py-2 border rounded-md'
                                            readOnly
                                        />
                                    </div>
                                )}
                                {profile?.preferredRole && (
                                    <div className='mb-2 lg:mb-3'>
                                        <label className='block text-start lg:mb-1'>Preferred Role </label>
                                        <input
                                            type='text'
                                            value={profile.preferredRole}
                                            className='w-full px-3 py-2 border rounded-md'
                                            readOnly
                                        />
                                    </div>
                                )}
                                {profile?.linkedInUrl && (
                                    <div className='mb-2 lg:mb-3'>
                                        <label className='block text-start lg:mb-1'>Linkedin URL </label>
                                        <input
                                            type='text'
                                            value={profile.linkedInUrl}
                                            className='w-full px-3 py-2 border rounded-md'
                                            readOnly
                                        />
                                    </div>
                                )}

                                <div className='text-start flex flex-row mb-2 lg:mb-3'>
                                    <span > Resume: </span>
                                    <p onClick={handleResumeView} className='cursor-pointer text-blue-400'>{profile.name}.pdf</p>
                                </div>
                                <button onClick={handleEdit} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-10 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Update Profile</button>
                            </div>
                        ) : (
                            <div className='bg-white shadow-md border border-gray-300 bg-[#fcfcfa] rounded-lg p-2 lg:p-6 w-full max-w-xs lg:max-w-lg mx-auto m-4'>
                                <h2 className='text-2xl font-semibold text-center mb-2'>{isEditing ? 'Edit Profile' : 'Complete profile'}</h2>

                                <form onSubmit={handleSubmit}>
                                    <div className='mb-2 lg:mb-3'>
                                        <label className='block text-start lg:mb-1'>Full Name<span className='text-red-700'>*</span></label>
                                        <input
                                            type='text'
                                            name='name'
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className='w-full px-3 py-2 border rounded-md'
                                            required
                                            readOnly

                                        />
                                    </div>
                                    <div className='mb-2 lg:mb-3'>
                                        <label className='block text-start lg:mb-1'>Email<span className='text-red-700'>*</span></label>
                                        <input
                                            type='email'
                                            name='email'
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className='w-full px-3 py-2 border rounded-md'
                                            required
                                            readOnly

                                        />
                                    </div>
                                    <div className='mb-2 lg:mb-3'>
                                        <label className='block text-start lg:mb-1'>Mobile No<span className='text-red-700'>*</span></label>
                                        <input
                                            type='text'
                                            name='mobile'
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            className='w-full px-3 py-2 border rounded-md'
                                            required
                                            readOnly

                                        />
                                    </div>
                                    <div className='mb-2 lg:mb-3'>
                                        <label className='block text-start lg:mb-1'>Current Status<span className='text-red-700'>*</span></label>
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
                                    {(formData.currentStatus !== 'Student' && formData.currentStatus !== 'Fresher' && formData.currentStatus !== '') && (
                                        <div>
                                            <div className='mb-2 lg:mb-3'>
                                                <label className='block text-start lg:mb-1'>Current Company<span className='text-red-700'></span></label>
                                                <input
                                                    type='text'
                                                    name='currentCompany'
                                                    value={formData.currentCompany}
                                                    onChange={handleInputChange}
                                                    className='w-full px-3 py-2 border rounded-md'
                                                   

                                                />
                                            </div>
                                            <div className='mb-2 lg:mb-3'>
                                                <label className='block text-start lg:mb-1'>Current Role<span className='text-red-700'></span></label>
                                                <input
                                                    type='text'
                                                    name='currentRole'
                                                    value={formData.currentRole}
                                                    onChange={handleInputChange}
                                                    className='w-full px-3 py-2 border rounded-md'
                                                />
                                            </div>
                                        </div>
                                    )}
                                     <div className='mb-2 lg:mb-3'>
                                                <label className='block text-start lg:mb-1'>Preferred Role<span className='text-red-700'>*</span></label>
                                                <input
                                                    type='text'
                                                    name='preferredRole'
                                                    value={formData.preferredRole}
                                                    onChange={handleInputChange}
                                                    className='w-full px-3 py-2 border rounded-md'
                                                    required
                                                  

                                                />
                                            </div>
                                    <div className='mb-2 lg:mb-3'>
                                        <label className='block text-start lg:mb-1'>Experience<span className='text-red-700'>*</span></label>
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
                                    <div className='mb-4'>
                                        <label className='block text-gray-700 bold text-start'>LinkedIn URL(<a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" className=" text-blue-500">
                                            click here to get
                                        </a>)</label>
                                        <input
                                            type='text'
                                            name='linkedInUrl'
                                            value={formData.linkedInUrl}
                                            onChange={handleInputChange}
                                            className='w-full px-3 py-2 border rounded-md'

                                        />

                                    </div>


                                    <div className="mb-2 lg:mb-1">
                                        {!profile ? (
                                            <div>
                                                <label className='block text-start lg:mb-1'>Upload Resume<span className='text-red-700'>*</span></label>

                                                <input
                                                    type="file"
                                                    name="resume"
                                                    onChange={handleFileChange}
                                                    accept="application/pdf"
                                                    ref={fileInputRef}
                                                    required
                                                />
                                                <p className='text-xs mr-32'>Only .PDF (5 MB)</p>
                                            </div>
                                        ) : (
                                            <div>
                                                {!isNewResumeUploaded && (
                                                    <p className="cursor-pointer mb-1 flex" onClick={handleResumeView}>
                                                        Resume:
                                                        <span className='text-blue-500'>{formData.name}.pdf</span>
                                                    </p>
                                                )}
                                                {resumeFileName && (
                                                    <a href={uploadedResumeURL} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                                        {resumeFileName}
                                                    </a>
                                                )}
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={() => fileInputRef.current.click()}
                                                        className="bg-blue-700 p-1 text-white rounded focus:outline-none m-0"
                                                    >
                                                        Update Resume
                                                    </button>
                                                    <input
                                                        type="file"
                                                        name="resume"
                                                        accept="application/pdf"
                                                        onChange={handleFileChange}
                                                        ref={fileInputRef}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <p className='text-xs '> Only .PDF (5 MB)</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>



                                    <div className='text-center'>
                                        {isEditing && (
                                            <button onClick={cancelButton} className='bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded mr-2'>cancel</button>
                                        )}
                                        <button type='submit' className='bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded mr-2'>
                                            Save
                                        </button>
                                    </div>

                                </form>
                            </div>
                        )}
                    </div>
                    {successMessage && (
                        <div className="bg-green-500 text-white py-2 px-4 rounded-md fixed text-center top-[10%] left-1/2 transform -translate-x-1/2">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <p className="bg-red-500 text-white py-2 px-4 rounded-md fixed text-center top-[10%] left-1/2 transform -translate-x-1/2">
                            {errorMessage}
                        </p>
                    )}

                </div>
            )}


            <JSFooter />
        </div>
    );
}
export default Profile;