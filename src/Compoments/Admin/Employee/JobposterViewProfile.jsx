import { useParams } from "react-router-dom";
import AdminNavBar from "../NavBar/AdminNavBar";
import { useState, useEffect } from "react";
import config from "../../../config";
import { useSelector } from 'react-redux';
import axios from "axios";


function JobposterViewProfile() {
    const log = useSelector(state => state.adminlog);
    const token = log.data.token;
    console.log(token);
    const params = useParams();
    const email = params.mail;
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const[errorMessage,setErrorMessage] = useState('');


    const getProfile = () => {
        axios.get(`${config.api.baseURL}${config.api.admin.getJobPosterProfile}${email}`, {
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
                                    <label className='block text-start lg:mb-1'>Current company</label>
                                    <input
                                        type='text'
                                        value={profile?.currentCompany}
                                        className='w-full px-3 py-2 border rounded-md'
                                        readOnly
                                    />
                                </div>
                                <div className='mb-2 lg:mb-3'>
                                    <label className='block text-start lg:mb-1'>Experience</label>
                                    <input
                                        type='text'
                                        value={profile.totalExperience}
                                        className='w-full px-3 py-2 border rounded-md'
                                        readOnly
                                    />


                                </div>
                                <div className='mb-2 lg:mb-3'>
                                    <label className='block text-start lg:mb-1'>Linkedin URL </label>
                                    <input
                                        type='text'
                                        value={profile.linkedInUrl}
                                        className='w-full px-3 py-2 border rounded-md'
                                        readOnly
                                    />
                                </div>

                        
                            </div>
                        ) : (<div>No profile found</div>)}
                    </div>)}
            </div>
        </div>
    )
}
export default JobposterViewProfile;