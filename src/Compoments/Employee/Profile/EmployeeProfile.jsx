import { useState, useEffect } from 'react';
import { logoutEmployee } from '../slices/employeeLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import config from '../../../config';
import SideBar from '../SideBar/SideBar';
import Footer from '../SideBar/Footer';

function EmployeeProfile() {
    const log = useSelector(state => state.emplog);
    const token = log.data.token;
    const decoded = token ? jwtDecode(token) : null;
    const email = decoded ? decoded.sub : null;
    const mobile = decoded ? decoded.mobile : null;
    const name = decoded ? decoded.username : null;
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: name,
        email: email,
        mobile: mobile,
        currentCompany: '',
        totalExperience: '',
        linkedInUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/employee-login');
        }
    }, [token, navigate]);

    useEffect(() => {
        fetchProfile();
    }, [token, email]);

    const fetchProfile = () => {
        setLoading(true);
        axios.get(`${config.api.baseURL}${config.api.jobPoster.getProfile}${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then(response => {

                if (response.status === 200) {
                    setProfile(response.data);
                }
                if (response.status === 204) {
                    setProfile(null);
                }
            })
            .catch(error => {
                if (error.response.status === 403) {
                    setErrorMessage('session Expired')
                    setTimeout(() => {
                        setErrorMessage('')
                        handleLogout();
                    }, 2000)
                }
                else {
                    setErrorMessage('Error fetching profile')
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 2000)
                }

            })
            .finally(() => setLoading(false))

    }



    const handleLogout = () => {
        dispatch(logoutEmployee());
        navigate('/employee-login');
    };



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = isEditing
            ? `${config.api.baseURL}${config.api.jobPoster.updateProfile}`
            : `${config.api.baseURL}${config.api.jobPoster.saveProfile}`;
        const method = isEditing ? 'put' : 'post';
        setLoading(true);
        axios({
            method: method,
            url: url,
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setProfile(formData);
                setIsEditing(false);
                setSuccessMessage('Profile saved successfully')
                setTimeout(() => {
                    setSuccessMessage('')
                }, 2000);
            })
            .catch(error => {
                if (error.response.status === 403) {
                    setErrorMessage('session Expired')
                    setTimeout(() => {
                        setErrorMessage('')
                        handleLogout();
                    }, 2000)
                }
                else {
                    setErrorMessage('Error saving  profile')
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 2000)
                }

            })
            .finally(() => setLoading(false))

    };

    const handleEdit = () => {
        setIsEditing(true);
        setFormData({
            name: profile.name,
            email: profile.email,
            mobile: profile.mobile,
            currentCompany: profile.currentCompany,
            totalExperience: profile.totalExperience,
            linkedInUrl: profile.linkedInUrl
        });
    };

    const cancelButton = () => {
        setIsEditing(false);
    }

    return (
        <div className='flex flex-col min-h-screen bg-[#f5faff]'>
            <SideBar />
            <div className='flex-grow  ml-0 xl:ml-[20%] pt-20 lg:pt-2'>
                <div className='' >

                    {loading ? (
                        <div className="flex flex-col justify-center items-center h-screen">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                            <p className="mt-4 text-gray-900">Loading...</p>
                        </div>
                    ) : (
                        <div>
                            {profile && !isEditing ? (
                                <div className='text-center bg-[#fcfcfa] mx-auto border border-gray-300 shadow-md rounded-lg px-5 lg:px-6 w-full max-w-xs lg:max-w-lg my-4 py-2 lg:py-6'>
                                    <h2 className='text-lg font-semibold mb-3'> My Profile</h2>
                                    <div>
                                        <div className='mb-1'>
                                            <label className='block  text-start'>Full Name</label>
                                            <input
                                                type='text'
                                                value={profile.name}
                                                className='border border-gray-300 p-2 w-full max-w-lg rounded-md'
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-2'>
                                            <label className='block  text-start'>Email</label>
                                            <input
                                                type='email'
                                                value={profile.email}
                                                className='border border-gray-300 p-2 w-full max-w-lg rounded-md'
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-2'>
                                            <label className='block  text-start'>Mobile</label>
                                            <input
                                                type='text'
                                                value={profile.mobile}
                                                className='border border-gray-300 p-2 w-full max-w-lg rounded-md'
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div>

                                        <div className='mb-2'>
                                            <label className='block  text-start' >Current Company</label>
                                            <input
                                                type='text'
                                                value={profile.currentCompany}
                                                className='border border-gray-300 p-2 w-full max-w-lg rounded-md'
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-2'>
                                            <label className='block  text-start'>Total Experience</label>
                                            <input
                                                type='text'
                                                value={profile.totalExperience}
                                                className='border border-gray-300 p-2 w-full max-w-lg rounded-md'
                                                readOnly
                                            />
                                        </div>
                                        {profile.linkedInUrl && (<div className='mb-2'>
                                            <label className='block  text-start'>LinkedIn URL</label>
                                            <input
                                                type='url'
                                                value={profile.linkedInUrl}
                                                className='border border-gray-300 p-2 w-full max-w-lg rounded-md'
                                                readOnly
                                            />
                                        </div>)}
                                    </div >
                                    <button
                                        onClick={handleEdit}
                                        className=' bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded mr-2'
                                    >
                                        Update Profile
                                    </button>
                                </div>
                            ) : (
                                <div className='text-center bg-[#fcfcfa] mx-auto border border-gray-300 shadow-md rounded-lg px-5 lg:px-10 w-full max-w-xs lg:max-w-lg m-4 py-2' >
                                    <h2 className='text-lg   font-semibold mb-4'>{isEditing ? 'Edit Profile' : 'Complete Profile'}</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className='mb-4'>
                                            <label className='block text-black-900 bold text-start'>Full Name<span className='text-red-700'>*</span></label>
                                            <input
                                                type='text'
                                                name='name'
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className='w-full px-3 py-2 border rounded-md'
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-4'>
                                            <label className='block text-gray-700 bold text-start'>Email<span className='text-red-700'>*</span></label>
                                            <input
                                                type='email'
                                                name='email'
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className='w-full px-3 py-2 border rounded-md'
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-4'>
                                            <label className='block text-gray-700 bold text-start'>Mobile<span className='text-red-700'>*</span></label>
                                            <input
                                                type='text'
                                                name='mobile'
                                                value={formData.mobile}
                                                onChange={handleInputChange}
                                                className='w-full px-3 py-2 border rounded-md'
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-4'>
                                            <label className='block text-gray-700 bold text-start'>Current Company<span className='text-red-700'>*</span></label>
                                            <input
                                                type='text'
                                                name='currentCompany'
                                                value={formData.currentCompany}
                                                onChange={handleInputChange}
                                                className='w-full px-3 py-2 border rounded-md'
                                                required
                                            />
                                        </div>
                                        <div className='mb-4'>
                                            <label className='block text-gray-700 bold text-start'>
                                                Total Experience<span className='text-red-700'>*</span>
                                            </label>
                                            <select
                                                id='totalExperience'
                                                name='totalExperience'
                                                value={formData.totalExperience}
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
                                        {isEditing && (
                                            <button className=' bg-red-700 hover:bg-red-800 text-white px-4 py-1.5 rounded mr-2' onClick={cancelButton} >Cancel</button>
                                        )}
                                        <button type='submit' className={`${!isEditing ? ' bg-blue-700 hover:bg-blue-800 text-white px-4 py-1.5 rounded mr-2' : ' bg-green-700 hover:bg-green-800 text-white px-4 py-1.5 rounded mr-2'}`}>
                                            Save
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>
            {successMessage && (
                <div className="bg-green-500 text-white py-2 px-4 rounded-md fixed  left-1/2 transform -translate-x-1/2">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="bg-red-500 text-white py-2 px-4 rounded-md fixed text-center  left-1/2 transform -translate-x-1/2">
                    {errorMessage}
                </div>
            )}
            <Footer />
        </div>

    );
}

export default EmployeeProfile;
