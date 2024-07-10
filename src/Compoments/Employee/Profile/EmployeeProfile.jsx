import { useState, useEffect } from 'react';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { IoAlarmOutline } from "react-icons/io5";
import { MdOutlineModelTraining } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMdLaptop } from "react-icons/io";
import { logoutEmployee } from '../slices/employeeLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { CgProfile } from "react-icons/cg";
import GuideinLogo from '../../../assets/GuideinLogo.png'
import config from '../../../config';
import SideBar from '../SideBar/SideBar';

function EmployeeProfile() {
    const log = useSelector(state => state.emplog);
    const token = log.data.token;
    const decoded = jwtDecode(token);
    const email = decoded.sub;
    const mobile = decoded.mobile;
    const name = decoded.username;

    const [isOpen, setIsOpen] = useState(false);
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

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${config.api.baseURL}${config.api.jobPoster.getProfile}${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    setProfile(response.data);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 204) {
                    setProfile(null);
                } else {
                    console.error('Error fetching profile:', error);
                }

            })
            .finally(() => setLoading(false))
    }, [token, email]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleLogout = () => {
        dispatch(logoutEmployee());
        navigate('/employee-login');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
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
        setLoading(true);
        const url = isEditing
            ? `${config.api.baseURL}${config.api.jobPoster.updateProfile}`
            : `${config.api.baseURL}${config.api.jobPoster.saveProfile}`;
        const method = isEditing ? 'put' : 'post';

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
                console.log('Profile saved successfully:', response);
            })
            .catch(error => console.error('Error saving profile:', error))
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
           <SideBar/>
            <div className='flex-grow flex justify-center items-center w-full min-w-lg'>
                <div >

                    {loading ? (
                        <div className="flex flex-col justify-center items-center h-screen">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                            <p className="mt-4 text-gray-900">Loading...</p>
                        </div>
                    ) : (
                        <div>

                            {profile && !isEditing ? (
                                <div className='text-center bg-white shadow-md rounded-lg px-10 w-full max-w-lg m-4 py-2'>
                                    <h2 className='text-2xl font-semibold mb-4'>Profile</h2>
                                    <div>
                                        <h3 className='text-xl font-semibold mb-2 text-start'>Personal Details</h3>
                                        <div className='mb-2'>
                                            <label className='block  text-start'><strong>Full Name:</strong></label>
                                            <input
                                                type='text'
                                                value={profile.name}
                                                className='border border-gray-300 p-2 w-full max-w-lg rounded-md'
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-2'>
                                            <label className='block  text-start'><strong>Email:</strong></label>
                                            <input
                                                type='email'
                                                value={profile.email}
                                                className='border border-gray-300 p-2 w-full max-w-lg rounded-md'
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-2'>
                                            <label className='block  text-start'><strong>Mobile:</strong></label>
                                            <input
                                                type='text'
                                                value={profile.mobile}
                                                className='border border-gray-300 p-2 w-full max-w-lg rounded-md'
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className='text-xl font-semibold mb-2 text-start'>Employment Details</h3>
                                        <div className='mb-2'>
                                            <label className='block  text-start' ><strong>Current Company:</strong></label>
                                            <input
                                                type='text'
                                                value={profile.currentCompany}
                                                className='border border-gray-300 p-2 w-full max-w-lg rounded-md'
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-2'>
                                            <label className='block  text-start'><strong>Total Experience:</strong></label>
                                            <input
                                                type='text'
                                                value={profile.totalExperience}
                                                className='border border-gray-300 p-2 w-full max-w-lg rounded-md'
                                                readOnly
                                            />
                                        </div>
                                        <div className='mb-2'>
                                            <label className='block  text-start'><strong>LinkedIn URL:</strong></label>
                                            <input
                                                type='url'
                                                value={profile.linkedInUrl}
                                                className='border border-gray-300 p-2 w-full max-w-lg rounded-md'
                                                readOnly
                                            />
                                        </div>
                                    </div >
                                    <button
                                        onClick={handleEdit}
                                        className=' bg-blue-500 text-white py-2 px-4 rounded-md'
                                    >
                                        Edit
                                    </button>
                                </div>
                            ) : (
                                <div className='text-center bg-white shadow-md rounded-lg p-6 w-full max-w-sm m-4' >
                                    <h2 className='text-2xl font-semibold mb-4'>{isEditing ? 'Edit Profile' : 'Complete Profile'}</h2>
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
                                            <label className='block text-gray-700 bold text-start'>LinkedIn URL<span className='text-red-700'>*</span></label>
                                            <input
                                                type='text'
                                                name='linkedInUrl'
                                                value={formData.linkedInUrl}
                                                onChange={handleInputChange}
                                                className='w-full px-3 py-2 border rounded-md'
                                                required
                                            />
                                        </div>
                                        {isEditing && (
                                            <button className='w-25 bg-gray-500 text-white py-2 rounded-md mx-3' onClick={cancelButton} >cancel</button>
                                        )}
                                        <button type='submit' className=' bg-blue-500 text-white p-2 rounded-md '>
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
    <div className="bg-green-500 text-white py-2 px-4 rounded-md absolute top-[10%] left-1/2 transform -translate-x-1/2">
        {successMessage}
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

export default EmployeeProfile;
