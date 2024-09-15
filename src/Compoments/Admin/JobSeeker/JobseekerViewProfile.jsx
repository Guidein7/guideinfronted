import { useParams } from "react-router-dom";
import AdminNavBar from "../NavBar/AdminNavBar";
import { useState, useEffect } from "react";
import config from "../../../config";
import { useSelector } from 'react-redux';
import axios from "axios";


function JobseekerViewProfile() {
    const log = useSelector(state => state.adminlog);
    const token = log.data.token;
    console.log(token);
    const params = useParams();
    const email = params.mail;
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const[errorMessage,setErrorMessage] = useState('');

    console.log("hello");


    const getProfile = () => {
        setLoading(true)
        axios.get(`${config.api.baseURL}${config.api.admin.getJobseekerProfile}${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            },
        })
            .then(response => {

                if (response.status === 200) {
                    setProfile(response.data);
                }
                else if (response.status === 204) {
                    setProfile(null);
                }
                console.log(response);
            })
            .catch(error => {
                if (error.response.status === 403) {
                    setErrorMessage('session expired')
                    setTimeout(() => {
                        setErrorMessage('')
                        //handleLogout();
                    }, 2000);
                }
                else {
                    setErrorMessage('Error while fetching profile')
                    setTimeout(() => {
                        setErrorMessage('')
                        // handleLogout();
                    }, 2000);
                }
                console.log(error);
            })
            .finally(() => setLoading(false));
    }
    const handleResumeView = () => {
        const pdfWindow = window.open('');
        pdfWindow.document.write('<iframe width="100%" height="100%" src="data:application/pdf;base64,' + encodeURI(profile.resume) + '"></iframe>');
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="bg-[#f5faff] min-h-screen flex flex-col">
            <AdminNavBar />

            <div>
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-gray-900">Loading...</p>
                    </div>
                ) : (

                    <div>
                        {profile ? (
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
                                <div className='mb-2 lg:mb-3'>
                                    <label className='block text-start lg:mb-1'>Linkedin URL </label>
                                    <input
                                        type='text'
                                        value={profile.linkedInUrl}
                                        className='w-full px-3 py-2 border rounded-md'
                                        readOnly
                                    />
                                </div>

                                <div className='text-start flex flex-row mb-2 lg:mb-3'>
                                    <span > Resume: </span>
                                    <p onClick={handleResumeView} className='cursor-pointer text-blue-400'>{profile.name}.pdf</p>
                                </div>
                            </div>
                        ) : (<div>No profile found</div>)}
                    </div>)}
            </div>
        </div>
    )
}
export default JobseekerViewProfile;