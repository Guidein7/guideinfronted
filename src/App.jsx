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
          <Route path='/youtube' element={<Youtub />} />
          <Route path='/institute' element={<Institute />} />
          <Route path='career/:id/:name' element={<CareerOverview />} />
          <Route path='/youtube/:id/:name' element={<YoutubeOverView />} />
          <Route path='/certificate' element={<Certificate />} />
          <Route path='/institute/:id/:name' element={<InstituteOverview />} />
          <Route path='/certificate/:id/:name' element={<CertificateOverview />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/admin-data' element={<StudentInfo />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact-us' element={<Contactus />} />
          <Route path='/terms-conditions' element={<TermsAndConditions />} />
          <Route path='/admin-blog' element={<BlogEditor/>} />
          <Route path='/admin-blog-list' element={<BlogList/>} />
           <Route path='/blogs' element={<BlogList/>} />
          <Route path="/blog/:slug" element={<SingleBlog />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
{}
      <div className='bg-black text-white flex flex-col gap-2 px-2  md:px-10 py-1'>
        <div className='flex  justify-around  md:justify-evenly gap-2'>
           <div className='flex flex-col gap-2'>
          <p className="cursor-pointer" onClick={() => navigate('/contact-us')}>Contact us</p>
                       <p className='cursor-pointer md:hidden' onClick={() => navigate('/terms-conditions')}>Terms & Conditions</p>

            </div>
          <p className='cursor-pointer' onClick={() => navigate('/about')}>About us</p>
       
            <p className='cursor-pointer ' onClick={() => navigate('/privacy-policy')}>Privacy Policy</p>

           
      
           <p className='cursor-pointer hidden md:block' onClick={() => navigate('/terms-conditions')}>Terms & Conditions</p>

        </div>
        <div className='flex justify-center'>

          <Footer />

        </div>
        <div className='flex justify-center'>

         
          <p>CopyRight&#169;{new Date().getFullYear()}</p>

        </div>

      </div>
     
    </div>
  )
}

export default App
