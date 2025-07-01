import { useState } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
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



function App() {

  const navigate = useNavigate()


  return (
    <>
      <ToastContainer />
      <ScrollToTop/>
      <nav className="h-[60px] p-2 bg-white flex justify-between">
        <div className='cursor-pointer' onClick={() => navigate('/')}>
          <img src={GuideinLogo} className='h-8' />

        </div>
       
      </nav>
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
        <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
         <Route path='/admin-data' element={<StudentInfo/>} />
      </Routes>
    
      <div className='bg-black text-white flex justify-between items-center h-[60px] px-2  md:px-10 py-4'>
        <p>Contact us</p>
         <p>CopyRight&#169;{new Date().getFullYear()}</p>
          <p className='cursor-pointer ' onClick={() => navigate('/privacy-policy')}>Privacy Policy</p>

      </div>
    </>
  )
}

export default App
