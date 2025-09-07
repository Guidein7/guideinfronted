import { useState } from 'react'
import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import ExcelUpload from './Components/Admin/ExcelUploads/ExcelUpload'
import HomePage from './Components/User/HomePage/HomePage'
import Career from './Components/User/Career/Career'
import Youtub from './Components/User/Youtube/Youtube'
import Institute from './Components/User/Institute/Institute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CareerOverview from './Components/User/Career/CareerOverview'
import YoutubeOverView from './Components/User/Youtube/YoutubeOverview'
import Certificate from './Components/User/Certificate/Certificate'
import InstituteOverview from './Components/User/Institute/InstituteOverview'
import CertificateOverview from './Components/User/Certificate/CertificateOverview'
import GuideinLogo from './assets/Guidein_logo.png'
import PrivacyPolicy from './Components/User/PrivacyPolicy/PrivacyPolicy'
import ScrollToTop from './Components/ScrollToTop'
import StudentInfo from './Components/Admin/StudentInfo/StudentInfo'
import AboutUs from './Components/User/Aboutus/Aboutus'
import Contactus from './Components/User/Contactus/Contactus'
import NotFound from './Components/User/NotFound'
import Footer from './Components/User/Footer'
import TermsAndConditions from './Components/User/PrivacyPolicy/TermsAndConditions'
import BlogEditor from './Components/Admin/Blog/UplaodBlog'
import BlogList from './Components/Admin/Blog/BlogList'
import SingleBlog from './Components/User/Blogs/SingleBlog'
import AdminBlogList from './Components/Admin/Blogs/AdminBlogList'
import EditBlog from './Components/Admin/Blog/EditBlog'
import InterviewQA from './Components/User/Interviews/InterviewQA'
import Answer from './Components/User/Interviews/Answer'



function App() {

  const navigate = useNavigate();
  const location = useLocation();


  return (
    < div className='flex flex-col min-h-screen'>
      <ToastContainer />
      <ScrollToTop />
      <nav className="h-[60px] w-full fixed p-2 z-10 bg-white flex justify-between">
        <div className='cursor-pointer' onClick={() => navigate('/')}>
          <img src={GuideinLogo} className='h-8' />

        </div>

      </nav>
      <div className='flex-grow pt-[60px]'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/admin-upload' element={<ExcelUpload />} />
          <Route path='/career' element={<Career />} />
          <Route path='/interview-Q&A' element={<Youtub />} />
          <Route path='/institute' element={<Institute />} />
          <Route path='career/:id/:name' element={<CareerOverview />} />
          <Route path='/interview-Q&A/:id/:name' element={<YoutubeOverView />} />
          <Route path='/certificate' element={<Certificate />} />
          <Route path='/institute/:id/:name' element={<InstituteOverview />} />
          <Route path='/certificate/:id/:name' element={<CertificateOverview />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/admin-data' element={<StudentInfo />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact-us' element={<Contactus />} />
          <Route path='/terms-conditions' element={<TermsAndConditions />} />
          <Route path='/admin-blog' element={<BlogEditor/>} />
          <Route path='/admin-blog-list' element={<AdminBlogList/>} />
          <Route path='/knowledge-hub' element={<BlogList/>} />
          <Route path="/knowledge-hub/:slug" element={<SingleBlog />} />
          <Route path="/edit-blog/:blogId" element={<EditBlog />} />
          <Route path='/interviewqa-hub' element={<InterviewQA />}/>
          <Route path='/answer' element={<Answer/>}/>


          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>

    
     
    </div>
  )
}

export default App
