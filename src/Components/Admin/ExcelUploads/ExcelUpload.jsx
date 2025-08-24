import { act, useState } from 'react'
import './ExcelUpload.css'
import { useSearchParams } from 'react-router-dom'
import CareerUpload from './CareerUPload';
import YoutubeUpload from './YoutubeUpload';
import CoachingUpload from './CoachingUpload';
import CertificateUpload from './CertificateUpload';
import AdminNavbar from '../navbar/AdminNavbar';


export default function ExcelUpload() {
    
    const [searchParams,setSearchParams] = useSearchParams();
    const [activeTab,setActiveTab] = useState(searchParams.get('activeTab') || "career");
    const changeTab = (value) => {
    const newParams = new URLSearchParams(); 
    newParams.set("activeTab", value);       
    setSearchParams(newParams);             
    setActiveTab(value);                
};


    return(
        <>
        <AdminNavbar/>
        <div className="bg-[#f5faff] w-full min-h-screen">
            <div className="flex justify-between p-3">
                <button onClick={() => changeTab('career')} className={`font-sans admin-tabbutton ${activeTab === 'career' ? 'admin-tabactive' :''}`}> Career Page</button>
                <button onClick={() => changeTab('youtube')} className={`font-sans admin-tabbutton ${activeTab === 'youtube' ? 'admin-tabactive' :''}`}>Youtube Learning</button>
                <button onClick={() => changeTab('coaching')} className={`font-sans admin-tabbutton ${activeTab === 'coaching' ? 'admin-tabactive' :''}`}>Coaching Center</button>
                <button onClick={() => changeTab('certification')} className={`font-sans admin-tabbutton ${activeTab === 'certification' ? 'admin-tabactive' :''}`}>Free Certification</button>
            </div>

            {activeTab === 'career' && <CareerUpload/>}
            {activeTab === 'youtube' && <YoutubeUpload/>}
            {activeTab === 'coaching' && <CoachingUpload/>}
            {activeTab === 'certification' && <CertificateUpload/>}


        </div>
        </>
    )
    
}