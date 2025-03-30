
import { Route,Routes,useLocation } from 'react-router-dom'
import './App.css'
import { useEffect,useState } from 'react'
import Registration from './Compoments/JobSeeker/Registration/Registration'
import LandingPage from './Compoments/JobSeeker/LandingPage/LandingPage'
import Login from './Compoments/JobSeeker/Login/Login'
import EmployeeLandingPage from './Compoments/Employee/LandingPage/EmployeeLandingPage'
import EmployeeRegistration from './Compoments/Employee/Registration/EmployeeRegistration'
import EmployeeLogin from './Compoments/Employee/Login/EmployeeLogin'
import Welcome from './Compoments/JobSeeker/Welcome'
import Welcome2 from './Compoments/Employee/Welcome2'
import Verification from './Compoments/JobSeeker/Verification/Verification'
import ForgetPassword from './Compoments/JobSeeker/Login/ForgotPassword'
import PasswordResetVerification from './Compoments/JobSeeker/Login/Verification'
import PasswordReset from './Compoments/JobSeeker/Login/PasswordReset'
import EmployeeVerification from './Compoments/Employee/Registration/EmployeeVerification'
import { useSelector,useDispatch } from 'react-redux'
import JobsPosted from './Compoments/Employee/JobsPosted/JobsPosted'
import EmployeeDashboard from './Compoments/Employee/Dashboard/EmployeeDashboard'
import ReferrelsRequested from './Compoments/Employee/ReferralsRequested/ReferrelsRequested'
import ReferredJobs from './Compoments/Employee/ReferredJobs/ReferredJobs'
import Wallet from './Compoments/Employee/wallet/Wallet'
import EmployeeForgetPassword from './Compoments/Employee/Login/EmployeeForgotPassword'
import EmployeePasswordResetVerification from './Compoments/Employee/Login/EmployeePasswordResetVeification'
import EmployeePasswordReset from './Compoments/Employee/Login/EmployeePasswordReset'
import SearchJobs from './Compoments/JobSeeker/SearchJobs/SearchJobs'
import EmployeeProfile from './Compoments/Employee/Profile/EmployeeProfile'
import Profile from './Compoments/JobSeeker/profile/Profile'
import SavedJobs from './Compoments/JobSeeker/SavedJobs/SavedJobs'
import JobDetails from './Compoments/JobSeeker/JobDetails/JobDetails'
import CandidateDetails from './Compoments/Employee/CandidateDtails/CandidateDetails'
import AppliedJobs from './Compoments/JobSeeker/AppliedJobs/AppliedJobs'
import Subscribe from './Compoments/JobSeeker/Subscription/Subscribe'
import ReferredJobDetails from './Compoments/Employee/ReferredJobDetails/ReferredJobDetails'
import AppliedRefeReferralDetails from './Compoments/JobSeeker/AppliedReferralDetails/AppliedReferralDetails'
import Home from './Compoments/JobSeeker/Home/Home'
import DashBoard from './Compoments/JobSeeker/Dashboard/Dashboard'
import EmployeeHome from './Compoments/Employee/Home/EmployeeHome'
import AdminHome from './Compoments/Admin/Home/AdminHome'
import RegisteredUsers from './Compoments/Admin/JobSeeker/RegisteredUsers'
import RegisteredEmployees from './Compoments/Admin/Employee/RegisteredEmployees'
import PostedJobs from './Compoments/Admin/Employee/PostedJobs'
import SubscribedUsers from './Compoments/Admin/JobSeeker/SubscribedUsers'
import Sample from './Compoments/Admin/samplepage'
import SideBar from './Compoments/Employee/SideBar/SideBar'
import UserVerification from './Compoments/JobSeeker/Login/UserVerification'
import OtpAuthentication from './Compoments/JobSeeker/Login/OtpAuthentication'
import JobPosterVerification from './Compoments/Employee/Login/JobPosterVerification'
import JobPosterOtpAuthentication from './Compoments/Employee/Login/JobPosterOtpAuthentication'
import AdminLogins from './Compoments/Admin/Login/AdminLogin'
import PostedJobDetails from './Compoments/Admin/Employee/PostedJobDetails'
import Referrals from './Compoments/Admin/Employee/Referrals'
import ReferralStatus from './Compoments/Admin/Employee/ReferralStatus'
import WalletDetails from './Compoments/Admin/Employee/WalletDetails'
import EmpWalletDetails from './Compoments/Admin/Employee/EmpWalletDetails'
import DisabledJobs from './Compoments/Admin/Employee/DIsabledJobs'
import DisabledJobDetails from './Compoments/Admin/Employee/DisabledJobDetails'
import Contactus from './Compoments/JobSeeker/NavBar/Contactus'
import ContactUsJs from './Compoments/JobSeeker/LandingPage/Contactusjs'
import EContactus from './Compoments/Employee/SideBar/Econtactus'
import EContactUsJp from './Compoments/Employee/LandingPage/EContactusJp'
import SubscribeJ from './Compoments/JobSeeker/Subscription/SubscribeJ'
import FAQ from './Compoments/Employee/LandingPage/Faqs'
import EFAQ from './Compoments/Employee/SideBar/EFaq'
import ReferralFAQ from './Compoments/JobSeeker/LandingPage/ReferralFaq'
import JReferralFAQ from './Compoments/JobSeeker/NavBar/JReferralFaq'
import JobseekerViewProfile from './Compoments/Admin/JobSeeker/JobseekerViewProfile'
import JobposterViewProfile from './Compoments/Admin/Employee/JobposterViewProfile'
import NotFound from './Compoments/NotFound'
import { ScrollRestoration } from "react-router-dom";
import Homepage from './Compoments/ProductCoaching/Homepage'
import { ToastContainer } from 'react-toastify'



function App() { 

  const log = useSelector(state => state.emplog);
  let auth = log.isAuthenticated;
  //  const location = useLocation();
  
  // useEffect(() => {
  //   // Check if the current location is the login page
  //  if(location.pathname == '/job-post'){
  //   auth = true;
  //  }
   
  // }, [location.pathname]);

  
  

  return (
    
    <>
    
   <ToastContainer/>
    
      <Routes>
      
        
        <Route path='/guidein' element={<LandingPage/>}/>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path="/verification" element={<Verification/>} />
        <Route path='/forgot-password' element={<ForgetPassword/>}/>
        <Route path='/reset-verify' element={<PasswordResetVerification/>}/>
        <Route path='/reset-password' element={<PasswordReset/>}/>
        <Route path="/user-verification" element={<UserVerification/>} />
        <Route path="/otp-authentication" element={<OtpAuthentication/>} />
        <Route path="/contactus" element={<Contactus/>} />
        <Route path="/contact-us" element={<ContactUsJs/>} />
        <Route path="/subscribej" element={<SubscribeJ/>} />

        <Route path='/search-jobs' element={<SearchJobs/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/saved-jobs' element={<SavedJobs/>} />
        <Route path='/job-details/:jobPostedBy/:jobId' element={<JobDetails/>} />
        <Route path="/applied-referrals" element={<AppliedJobs/>} />
        <Route path="/subscribe" element={<Subscribe/>} />
        <Route path="/applied-referral-details" element={<AppliedRefeReferralDetails/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/referral-faqs" element={<ReferralFAQ/>} />
        <Route path="/faqs-referral" element={<JReferralFAQ/>} />

        

     
        


        <Route path='/employee' element={<EmployeeLandingPage/>}/>
        <Route path='/employee-register' element={<EmployeeRegistration/>} />
        <Route path='employee-login' element={<EmployeeLogin/>}/>
        <Route path='/employee-forgot-password' element={<EmployeeForgetPassword/>}/>
        <Route path='/employee-reset-verify' element={<EmployeePasswordResetVerification/>}/>
        <Route path='/employee-reset-password' element={<EmployeePasswordReset/>}/>
        <Route path='/employee-verification' element={<EmployeeVerification/>}/>
        <Route path='/job-post' element={<JobsPosted/>} />
        <Route path='/employee-dashboard' element={<EmployeeDashboard/>} />
        <Route path='/referred-jobs' element={<ReferredJobs/>} />
        <Route path='/referrels-requested' element={<ReferrelsRequested/>} />
        <Route path='/wallet' element={<Wallet/>} />
        <Route path='/employee-profile' element={<EmployeeProfile/>} />
        <Route path="/candidate-details" element={<CandidateDetails/>} />
        <Route path="/referred-job-details" element={<ReferredJobDetails/>} />
        <Route path="/employee-home" element={<EmployeeHome/>} />
        <Route path="/job-poster-verification" element={<JobPosterVerification/>} />
        <Route path="/job-poster-otp-authentication" element={<JobPosterOtpAuthentication/>} />
        <Route path='/sidebar' element={<SideBar/>}/>
        <Route path="/econtactus" element={<EContactus/>} />
        <Route path="/econtact-us" element={<EContactUsJp/>} />
        <Route path="/employee-faqs" element={<FAQ/>} />
        <Route path="/faqs-employee" element={<EFAQ/>} />

        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/welcome2' element={<Welcome2/>}/>


        <Route path='/admin-login' element={<AdminLogins/>}/>
        <Route path='/admin-home' element={<AdminHome/>}/>
        <Route path='/registered-users' element={<RegisteredUsers/>}/>
        <Route path='/subscribed-users' element={<SubscribedUsers />}/>
        <Route path='/registered-employees' element={<RegisteredEmployees/>}/>
        <Route path='/jobs-posted' element={<PostedJobs/>}/>
        <Route path='/posted-jobdetails' element={<PostedJobDetails/>}/>
        <Route path='/referrals' element={<Referrals/>}/>
        <Route path='/referrals-status' element={<ReferralStatus/>}/>
        <Route path='/wallet-details' element={<WalletDetails/>}/>
        <Route path='/emp-wallet-details' element={<EmpWalletDetails/>}/>
        <Route path='/disabled-jobs' element={<DisabledJobs/>}/>
        <Route path='/disabled-jobdetails' element={<DisabledJobDetails/>}/>
        <Route path='/jsview-profile/:name/:mail' element={<JobseekerViewProfile/>}/>
        <Route path='/jpview-profile/:name/:mail' element={<JobposterViewProfile/>}/>

        <Route path='/sample' element={<Sample/>}/>
        <Route path='/sample' element={<Sample/>}/>



      <Route path='*' element={<NotFound/>} />

        

      </Routes>
      

     
     
 
    </>
  )
}

export default App
