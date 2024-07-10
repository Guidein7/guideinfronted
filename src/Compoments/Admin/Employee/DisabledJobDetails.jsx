import { useLocation, useNavigate } from "react-router-dom";
import AdminNavBar from "../NavBar/AdminNavBar";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import config from "../../../config";
import { IoMdArrowRoundBack } from "react-icons/io";
function DisabledJobDetails(){
    const log = useSelector(state => state.adminlog);
    const token = log.data.token;
    const location = useLocation();
    const {jobData }= location.state;
    const[loading,setLoading] = useState(false);
    const[showMessage,setShowMessage] = useState('');
    console.log(jobData);
    const navigate = useNavigate();

    const enableJob = () => {
        setLoading(true);
        axios.put(`${config.api.baseURL}${config.api.admin.enableJob}${jobData.jobId}`,{},{
            headers: {
                Authorization: `Bearer ${token}`,
              },

        }).then(response => {
            console.log(response);
            setShowMessage('job disabled successfully')
            setTimeout(() => {
                setShowMessage('');
                navigate('/disabled-jobs')
            },2000);
        }).catch(error =>{
            console.log(error)
            setShowMessage('Error occured, try again')
            setTimeout(() => {
                setShowMessage('');
            
            },2000);
            
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    return (

        <div className='bg-[#f5faff] min-h-screen flex flex-col'>
        <AdminNavBar />
        <div className='flex-grow'>
            <IoMdArrowRoundBack className="mx-10 mt-4 cursor-pointer" size={24} onClick={handleBackClick}/>
            {showMessage && (<div className="text-center mt-2 text-green-400"><p>{showMessage}</p></div>)}
          {loading ? ( <div className="flex flex-col justify-center items-center h-screen">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                  <p className="mt-4 text-gray-900">Loading...</p>
              </div>) : (<div>
                <div className="mx-10 mt-6">
                <h1 className="font-bold text-xl underline my-1">{jobData.jobTitle}</h1>
                <h1 className="font-bold text-sm my-1">{jobData.companyName}</h1>
                <h1 className="my-1 ">{jobData.jobLocation}</h1>
                <h1 className="my-1">Experience: {jobData.experienceRequired}</h1>
                <h1 className="my-1">Posted On: {jobData.postedOn}</h1>
                <h1 className="mt-2 font-bold">Know more about the job</h1>
                <a className="my-1 text-blue-500 underline" target="_blank" href={jobData.jobDescriptionLink}>{jobData.jobDescriptionLink}</a>

                <h1 className="my-2 font-bold">Job Posted by</h1>
                <h1 className="my-1">Employee Name: {jobData.jobPosterName}</h1>
                <h1 className="my-1">Company Name: {jobData.companyName}</h1>
                {jobData.disabledByAdmin && (
                <button  onClick={enableJob}className="bg-gray-700 text-white p-2 rounded my-2 mx-10">Enable Job</button>)}
                </div>
  
           
          </div>)}
  
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
export default DisabledJobDetails;