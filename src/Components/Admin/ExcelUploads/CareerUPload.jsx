// import { useEffect, useState } from "react"
// import UploadButtons from "./UploadButtons";
// import { useRef } from "react";
// import ExcelModel from "./ExcelModel";
// import { DownloadTemplate, handleAdd } from "./ExcelReuseCalls";
// import { types } from "./types";
// import axios from "axios";
// import { resources } from "../../resources";
// import { toast } from "react-toastify";
// import { useSearchParams, useNavigate } from "react-router-dom";


// export default function CareerUpload() {

//     const successMessage = (message) => {
//         toast.success(message, {
//             position: 'top-center',
//             autoClose: 1000
//         })
//     }

//     const errorMessage = (message) => {
//         toast.error(message, {
//             position: 'top-center',
//             autoClose: 1000
//         })
//     }


//     const [searchParams, setSearchParams] = useSearchParams();
//     const navigate = useNavigate();
//     const industry = searchParams.get("industry") || "";
//     const hiringStatus = searchParams.get("hiringStatus") || "";
//     const companyName = searchParams.get("companyName") || "";
//     const page = parseInt(searchParams.get("page")) || 0;
//     const [totalPages, setTotalPages] = useState(1);
//      const [data, setData] = useState([]);

//     const [file, setFile] = useState(null);
//     const [fileName, setFileName] = useState('');
//     const [isOpen, setIsOpen] = useState(false);
//     const fileInputRef = useRef(null);
//     const [industries,setIndustries] = useState([]);
//     const [hirings,sethirings] = useState([]);


//     const getData = () => {
//         const params = new URLSearchParams({
//             type: types.CAREER,
//             page: page.toString(),
//             size: "5"
//         });

//         if (industry && industry.trim() !== "") {
//             params.append("industry", industry);
//         }

//         if (hiringStatus && hiringStatus.trim() !== "") {
//             params.append("hiringStatus", hiringStatus);
//         }

//         if (companyName && companyName.trim() !== "") {
//             params.append("companyName", companyName);
//         }


//         axios.get(`${resources.APPLICATION_URL}view/data?${params}`)
//             .then(response => {
//                 if (Array.isArray(response.data.content)) {
//                     setData(response.data.content);
//                     setTotalPages(response.data.totalPages || 1);
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     };


//     useEffect(() => {

//         getDropdown();
//     }, [])


//     useEffect(() => {
//         getData();

//     }, [industry, hiringStatus, companyName, page]);



//     const getDropdown = () => {
//         axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.CAREER}`).then(response => {
//             console.log(response)
//             setIndustries(response.data.industry);
//             sethirings(response.data.hiringStatus)

//         }).catch(error => {
//             console.log(error)
//         })
//     }


//     const updateFilters = (newFilters) => {
//         const updatedParams = {
//             industry,
//             hiringStatus,
//             companyName,
//             page: "0",
//             ...newFilters
//         };
//         setSearchParams(updatedParams);
//     };

//     const updatePage = (newPage) => {
//         setSearchParams({
//             industry,
//             hiringStatus,
//             companyName,
//             page: newPage.toString()
//         });
//     };



//     const add = () => {

//     }

//     const upload = () => {
//         handleAdd(setIsOpen)
//     }

//     const download = () => {
//         DownloadTemplate(types.CAREER);
//     }

//     const handleClose = () => {
//         setFile(null);
//         setFileName('');
//         setIsOpen(false)
//     }

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         setFile(file)
//         if (file) setFileName(file.name);

//     }

//     const handleUploadClick = () => {
//         fileInputRef.current.click();
//     };


//     const handleUPload = () => {
//         const formData = new FormData();
//         formData.append('file', file)
//         axios.post(`${resources.APPLICATION_URL}upload?type=${encodeURIComponent(types.CAREER)}`, formData).then(response => {
//             console.log(response)
//             successMessage(response.data)
//         }).catch(error => {
//             console.log(error)
//             errorMessage('Error Uploading File')
//         })
//     }




//     return (
//         <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//             <UploadButtons add={add} upload={upload} download={download} />

//             {isOpen && (
//                 <ExcelModel fileName={fileName} fileInputRef={fileInputRef} handleClose={handleClose} handleUploadClick={handleUploadClick} handleFileChange={handleFileChange} handleUPload={handleUPload} />
//             )}

//             {/* Filters Section */}
//             <div style={{
//                 background: '#f8f9fa',
//                 padding: '20px',
//                 borderRadius: '8px',
//                 marginBottom: '20px',
//                 border: '1px solid #e9ecef'
//             }}>
//                 <h3 style={{ 
//                     margin: '0 0 15px 0', 
//                     color: '#495057',
//                     fontSize: '18px',
//                     fontWeight: '600'
//                 }}>
//                     Filters
//                 </h3>

//                 <div style={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//                     gap: '15px',
//                     alignItems: 'end'
//                 }}>
//                     <div>
//                         <label style={{
//                             display: 'block',
//                             marginBottom: '5px',
//                             fontWeight: '500',
//                             color: '#495057',
//                             fontSize: '14px'
//                         }}>
//                             Company Name
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="Search by company name"
//                             value={companyName}
//                             onChange={(e) => updateFilters({ companyName: e.target.value })}
//                             style={{
//                                 width: '100%',
//                                 padding: '10px 12px',
//                                 border: '1px solid #ced4da',
//                                 borderRadius: '4px',
//                                 fontSize: '14px',
//                                 boxSizing: 'border-box',
//                                 transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
//                             }}
//                             onFocus={(e) => {
//                                 e.target.style.borderColor = '#80bdff';
//                                 e.target.style.boxShadow = '0 0 0 0.2rem rgba(0, 123, 255, 0.25)';
//                             }}
//                             onBlur={(e) => {
//                                 e.target.style.borderColor = '#ced4da';
//                                 e.target.style.boxShadow = 'none';
//                             }}
//                         />
//                     </div>

//                     <div>
//                         <label style={{
//                             display: 'block',
//                             marginBottom: '5px',
//                             fontWeight: '500',
//                             color: '#495057',
//                             fontSize: '14px'
//                         }}>
//                             Industry
//                         </label>
//                         <select 
//                             value={industry} 
//                             onChange={(e) => updateFilters({ industry: e.target.value })}
//                             style={{
//                                 width: '100%',
//                                 padding: '10px 12px',
//                                 border: '1px solid #ced4da',
//                                 borderRadius: '4px',
//                                 fontSize: '14px',
//                                 backgroundColor: 'white',
//                                 boxSizing: 'border-box',
//                                 cursor: 'pointer'
//                             }}
//                         >
//                             <option value="">All Industries</option>
//                             {industries?.map((indus,ind) => (
//                                 <option key={ind} value={indus}>{indus}</option>
//                             ))}

//                         </select>
//                     </div>

//                     <div>
//                         <label style={{
//                             display: 'block',
//                             marginBottom: '5px',
//                             fontWeight: '500',
//                             color: '#495057',
//                             fontSize: '14px'
//                         }}>
//                             Hiring Status
//                         </label>
//                         <select 
//                             value={hiringStatus} 
//                             onChange={(e) => updateFilters({ hiringStatus: e.target.value })}
//                             style={{
//                                 width: '100%',
//                                 padding: '10px 12px',
//                                 border: '1px solid #ced4da',
//                                 borderRadius: '4px',
//                                 fontSize: '14px',
//                                 backgroundColor: 'white',
//                                 boxSizing: 'border-box',
//                                 cursor: 'pointer'
//                             }}
//                         >
//                             <option value="">All Hiring Status</option>
//                             {hirings?.map((hiring,ind ) => (
//                                 <option key={ind} value={hiring}>{hiring}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//             </div>

//             {/* Table Section */}
//             <div className="table-wrapper" style={{
//                 background: 'white',
//                 borderRadius: '8px',
//                 overflow: 'hidden',
//                 boxShadow: '0 0 10px rgba(0,0,0,0.1)',
//                 marginBottom: '20px'
//             }}>
//                 <table className="responsive-table" style={{
//                     width: '100%',
//                     borderCollapse: 'collapse',
//                     fontSize: '14px'
//                 }}>
//                     <thead>
//                         <tr style={{ backgroundColor: '#f8f9fa' }}>
//                             <th style={{
//                                 padding: '15px 12px',
//                                 textAlign: 'left',
//                                 fontWeight: '600',
//                                 color: '#495057',
//                                 borderBottom: '2px solid #dee2e6'
//                             }}>S.no</th>
//                             <th style={{
//                                 padding: '15px 12px',
//                                 textAlign: 'left',
//                                 fontWeight: '600',
//                                 color: '#495057',
//                                 borderBottom: '2px solid #dee2e6'
//                             }}>Company Name</th>
//                             <th style={{
//                                 padding: '15px 12px',
//                                 textAlign: 'left',
//                                 fontWeight: '600',
//                                 color: '#495057',
//                                 borderBottom: '2px solid #dee2e6'
//                             }}>Industry</th>
//                             <th style={{
//                                 padding: '15px 12px',
//                                 textAlign: 'left',
//                                 fontWeight: '600',
//                                 color: '#495057',
//                                 borderBottom: '2px solid #dee2e6'
//                             }}>CareerPage Url</th>
//                             <th style={{
//                                 padding: '15px 12px',
//                                 textAlign: 'left',
//                                 fontWeight: '600',
//                                 color: '#495057',
//                                 borderBottom: '2px solid #dee2e6'
//                             }}>Overview</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((item, idx) => (
//                             <tr key={idx} style={{
//                                 borderBottom: '1px solid #dee2e6',
//                                 transition: 'background-color 0.15s ease-in-out'
//                             }}
//                             onMouseEnter={(e) => e.target.parentElement.style.backgroundColor = '#f8f9fa'}
//                             onMouseLeave={(e) => e.target.parentElement.style.backgroundColor = 'transparent'}
//                             >
//                                 <td style={{ padding: '12px', color: '#495057' }}>{page * 5 + idx + 1}</td>
//                                 <td style={{ padding: '12px', color: '#495057', fontWeight: '500' }}>{item.companyName}</td>
//                                 <td style={{ padding: '12px', color: '#495057' }}>{item.industry}</td>
//                                 <td style={{ padding: '12px', color: '#007bff', wordBreak: 'break-all' }}>
//                                     {item.careerPageUrl ? (
//                                         <a href={item.careerPageUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
//                                             {item.careerPageUrl}
//                                         </a>
//                                     ) : (
//                                         item.careerPageUrl
//                                     )}
//                                 </td>
//                                 <td style={{ padding: '12px', color: '#495057', maxWidth: '300px' }}>
//                                     <div style={{ 
//                                         maxHeight: '60px', 
//                                         overflow: 'hidden',
//                                         textOverflow: 'ellipsis',
//                                         display: '-webkit-box',
//                                         WebkitLineClamp: 3,
//                                         WebkitBoxOrient: 'vertical'
//                                     }}>
//                                         {item.companyOverview}
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination Section */}
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 gap: '15px',
//                 padding: '20px',
//                 background: '#f8f9fa',
//                 borderRadius: '8px',
//                 border: '1px solid #e9ecef'
//             }}>
//                 <button 
//                     onClick={() => updatePage(page - 1)} 
//                     disabled={page === 0}
//                     style={{
//                         padding: '8px 16px',
//                         border: '1px solid #007bff',
//                         borderRadius: '4px',
//                         backgroundColor: page === 0 ? '#e9ecef' : '#007bff',
//                         color: page === 0 ? '#6c757d' : 'white',
//                         cursor: page === 0 ? 'not-allowed' : 'pointer',
//                         fontSize: '14px',
//                         fontWeight: '500',
//                         transition: 'all 0.15s ease-in-out'
//                     }}
//                     onMouseEnter={(e) => {
//                         if (page !== 0) {
//                             e.target.style.backgroundColor = '#0056b3';
//                         }
//                     }}
//                     onMouseLeave={(e) => {
//                         if (page !== 0) {
//                             e.target.style.backgroundColor = '#007bff';
//                         }
//                     }}
//                 >
//                     Previous
//                 </button>

//                 <span style={{
//                     padding: '8px 12px',
//                     background: 'white',
//                     border: '1px solid #dee2e6',
//                     borderRadius: '4px',
//                     fontSize: '14px',
//                     fontWeight: '500',
//                     color: '#495057',
//                     minWidth: '120px',
//                     textAlign: 'center'
//                 }}>
//                     Page {page + 1} of {totalPages}
//                 </span>

//                 <button 
//                     onClick={() => updatePage(page + 1)} 
//                     disabled={page + 1 >= totalPages}
//                     style={{
//                         padding: '8px 16px',
//                         border: '1px solid #007bff',
//                         borderRadius: '4px',
//                         backgroundColor: page + 1 >= totalPages ? '#e9ecef' : '#007bff',
//                         color: page + 1 >= totalPages ? '#6c757d' : 'white',
//                         cursor: page + 1 >= totalPages ? 'not-allowed' : 'pointer',
//                         fontSize: '14px',
//                         fontWeight: '500',
//                         transition: 'all 0.15s ease-in-out'
//                     }}
//                     onMouseEnter={(e) => {
//                         if (page + 1 < totalPages) {
//                             e.target.style.backgroundColor = '#0056b3';
//                         }
//                     }}
//                     onMouseLeave={(e) => {
//                         if (page + 1 < totalPages) {
//                             e.target.style.backgroundColor = '#007bff';
//                         }
//                     }}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     )
// }


import { useEffect, useState } from "react";
import UploadButtons from "./UploadButtons";
import { useRef } from "react";
import ExcelModel from "./ExcelModel";
import { DownloadTemplate, handleAdd } from "./ExcelReuseCalls";
import { types } from "./types";
import axios from "axios";
import { resources } from "../../resources";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Mock ReactQuill component (unchanged from your provided code)
// const ReactQuill = ({ value, onChange, placeholder, modules, formats }) => (
//   <div style={{ border: '1px solid #ced4da', borderRadius: '4px', minHeight: '150px' }}>
//     <div style={{ 
//       borderBottom: '1px solid #ced4da', 
//       padding: '8px',
//       backgroundColor: '#f8f9fa',
//       fontSize: '12px',
//       display: 'flex',
//       gap: '8px'
//     }}>
//       <button type="button" style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '2px' }}>B</button>
//       <button type="button" style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '2px' }}>I</button>
//       <button type="button" style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '2px' }}>U</button>
//       <select style={{ padding: '4px', border: '1px solid #ccc', borderRadius: '2px' }}>
//         <option>Normal</option>
//         <option>Heading 1</option>
//         <option>Heading 2</option>
//       </select>
//     </div>
//     <textarea
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       style={{
//         width: '100%',
//         minHeight: '120px',
//         border: 'none',
//         padding: '12px',
//         resize: 'vertical',
//         fontFamily: 'Arial, sans-serif',
//         fontSize: '14px',
//         outline: 'none'
//       }}
//     />
//   </div>
// );

// EditModal component (unchanged from your provided code)
const EditModal = ({ isOpen, onClose, editData, onSave, industries, hirings }) => {
    const [formData, setFormData] = useState({
        id: '',
        companyName: '',
        industry: '',
        companyOverview: '',
        careerPageUrl: '',
        hiringStatus: '',
        totalEmployees: '',
        hiringGrowth: '',
        medianTenure: '',
        ratingAmbitionbox: '',
        numberOfReviewsAB: '',
        ratingGlassdoor: '',
        numberOfReviewsGS: '',
        tags: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (editData) {
            setFormData({
                id: editData.id || '',
                companyName: editData.companyName || '',
                industry: editData.industry || '',
                companyOverview: editData.companyOverview || '',
                careerPageUrl: editData.careerPageUrl || '',
                hiringStatus: editData.hiringStatus || '',
                totalEmployees: editData.totalEmployees || '',
                hiringGrowth: editData.hiringGrowth || '',
                medianTenure: editData.medianTenure || '',
                ratingAmbitionbox: editData.ratingAmbitionbox || '',
                numberOfReviewsAB: editData.numberOfReviewsAB || '',
                ratingGlassdoor: editData.ratingGlassdoor || '',
                numberOfReviewsGS: editData.numberOfReviewsGS || '',
                tags: editData.tags || ''
            });
            setFileName('');
            setSelectedFile(null);
        }
    }, [editData]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
        }
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData, selectedFile);
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative'
            }}>
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #e9ecef',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'white',
                    zIndex: 1001
                }}>
                    <h2 style={{ margin: 0, color: '#495057', fontSize: '24px' }}>Edit Company Details</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '24px',
                            cursor: 'pointer',
                            color: '#6c757d',
                            padding: '0',
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '20px',
                        marginBottom: '20px'
                    }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                                Company Name *
                            </label>
                            <input
                                type="text"
                                value={formData.companyName}
                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                                Industry *
                            </label>
                            <select
                                value={formData.industry}
                                onChange={(e) => handleInputChange('industry', e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box',
                                    backgroundColor: 'white'
                                }}
                            >
                                <option value="">Select Industry</option>
                                {industries?.map((industry, idx) => (
                                    <option key={idx} value={industry}>{industry}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                                Career Page URL
                            </label>
                            <input
                                type="url"
                                value={formData.careerPageUrl}
                                onChange={(e) => handleInputChange('careerPageUrl', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                                Hiring Status
                            </label>
                            <select
                                value={formData.hiringStatus}
                                onChange={(e) => handleInputChange('hiringStatus', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box',
                                    backgroundColor: 'white'
                                }}
                            >
                                <option value="">Select Hiring Status</option>
                                {hirings?.map((hiring, idx) => (
                                    <option key={idx} value={hiring}>{hiring}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                                Total Employees
                            </label>
                            <input
                                type="number"
                                value={formData.totalEmployees}
                                onChange={(e) => handleInputChange('totalEmployees', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                                Hiring Growth
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.hiringGrowth}
                                onChange={(e) => handleInputChange('hiringGrowth', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                                Median Tenure
                            </label>
                            <input
                                type="text"
                                value={formData.medianTenure}
                                onChange={(e) => handleInputChange('medianTenure', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                                Rating Ambitionbox
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                value={formData.ratingAmbitionbox}
                                onChange={(e) => handleInputChange('ratingAmbitionbox', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                                Number of Reviews (Ambitionbox)
                            </label>
                            <input
                                type="number"
                                value={formData.numberOfReviewsAB}
                                onChange={(e) => handleInputChange('numberOfReviewsAB', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                                Rating Glassdoor
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                value={formData.ratingGlassdoor}
                                onChange={(e) => handleInputChange('ratingGlassdoor', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                                Number of Reviews (Glassdoor)
                            </label>
                            <input
                                type="number"
                                value={formData.numberOfReviewsGS}
                                onChange={(e) => handleInputChange('numberOfReviewsGS', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                                Tags
                            </label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => handleInputChange('tags', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                            Company Overview
                        </label>
                        <ReactQuill
                            value={formData.companyOverview}
                            onChange={(value) => handleInputChange('companyOverview', value)}
                            placeholder="Enter company overview..."
                            theme="snow"
                            modules={{
                                toolbar: [
                                    [{ 'header': [1, 2, 3, false] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                                    ['link', 'image'],
                                    [{ 'color': [] }, { 'background': [] }],
                                    [{ 'align': [] }],
                                    ['blockquote', 'code-block'],
                                    ['clean']
                                ]
                            }}
                            formats={[
                                'header',
                                'bold', 'italic', 'underline', 'strike',
                                'list', 'bullet', 'indent',
                                'link', 'image',
                                'color', 'background',
                                'align',
                                'blockquote', 'code-block'
                            ]}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '4px',
                                fontFamily: 'Arial, sans-serif',
                                fontSize: '14px'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                            Company Image
                        </label>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <button
                                type="button"
                                onClick={handleFileClick}
                                style={{
                                    padding: '10px 20px',
                                    border: '1px solid #007bff',
                                    borderRadius: '4px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                Choose File
                            </button>
                            <span style={{ fontSize: '14px', color: '#6c757d' }}>
                                {fileName || 'No file chosen'}
                            </span>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '10px',
                        paddingTop: '20px',
                        borderTop: '1px solid #e9ecef'
                    }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '10px 20px',
                                border: '1px solid #6c757d',
                                borderRadius: '4px',
                                backgroundColor: 'transparent',
                                color: '#6c757d',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                border: '1px solid #28a745',
                                borderRadius: '4px',
                                backgroundColor: '#28a745',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function CareerUpload() {
    const successMessage = (message) => {
        toast.success(message, {
            position: 'top-center',
            autoClose: 1000
        });
    };

    const errorMessage = (message) => {
        toast.error(message, {
            position: 'top-center',
            autoClose: 1000
        });
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const industry = searchParams.get("industry") || "";
    const hiringStatus = searchParams.get("hiringStatus") || "";
    const companyName = searchParams.get("companyName") || "";
    const page = parseInt(searchParams.get("page")) || 0;
    const [totalPages, setTotalPages] = useState(1);
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef(null);
    const [industries, setIndustries] = useState([]);
    const [hirings, setHirings] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const getData = () => {
        const params = new URLSearchParams({
            type: types.CAREER,
            page: page.toString(),
            size: "5"
        });

        if (industry && industry.trim() !== "") {
            params.append("industry", industry);
        }

        if (hiringStatus && hiringStatus.trim() !== "") {
            params.append("hiringStatus", hiringStatus);
        }

        if (companyName && companyName.trim() !== "") {
            params.append("companyName", companyName);
        }

        axios.get(`${resources.APPLICATION_URL}view/data?${params}`)
            .then(response => {
                if (Array.isArray(response.data.content)) {
                    setData(response.data.content);
                    setTotalPages(response.data.totalPages || 1);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getDropdown();
    }, []);

    useEffect(() => {
        getData();
    }, [industry, hiringStatus, companyName, page]);

    const getDropdown = () => {
        axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.CAREER}`)
            .then(response => {
                setIndustries(response.data.industry);
                setHirings(response.data.hiringStatus);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const updateFilters = (newFilters) => {
        const updatedParams = {
            industry,
            hiringStatus,
            companyName,
            page: "0",
            ...newFilters
        };
        setSearchParams(updatedParams);
    };

    const updatePage = (newPage) => {
        setSearchParams({
            industry,
            hiringStatus,
            companyName,
            page: newPage.toString()
        });
    };

    const add = () => {
        // Placeholder for add functionality
    };

    const upload = () => {
        handleAdd(setIsOpen);
    };

    const download = () => {
        DownloadTemplate(types.CAREER);
    };

    const handleClose = () => {
        setFile(null);
        setFileName('');
        setIsOpen(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        if (file) setFileName(file.name);
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleUPload = () => {
        const formData = new FormData();
        formData.append('file', file);
        axios.post(`${resources.APPLICATION_URL}upload?type=${encodeURIComponent(types.CAREER)}`, formData)
            .then(response => {
                successMessage(response.data);
            })
            .catch(error => {
                console.log(error);
                errorMessage('Error Uploading File');
            });
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        setIsEditModalOpen(true);
    };

    const handleEditClose = () => {
        setIsEditModalOpen(false);
        setEditingRecord(null);
    };

    const handleEditSave = async (formData, file) => {
        try {
            const editFormData = new FormData();
            editFormData.append('object', new Blob([JSON.stringify(formData)], { type: "application/json" }));

            if (file) {
                editFormData.append('file', file);
            }
            await axios.post(`${resources.APPLICATION_URL}edit-data?type=${encodeURIComponent(types.CAREER)}`, editFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            successMessage('Record updated successfully');
            handleEditClose();
            getData();
        } catch (error) {
            console.error(error);
            errorMessage('Error updating record');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <UploadButtons add={add} upload={upload} download={download} />

            {isOpen && (
                <ExcelModel
                    fileName={fileName}
                    fileInputRef={fileInputRef}
                    handleClose={handleClose}
                    handleUploadClick={handleUploadClick}
                    handleFileChange={handleFileChange}
                    handleUPload={handleUPload}
                />
            )}

            {isEditModalOpen && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={handleEditClose}
                    editData={editingRecord}
                    onSave={handleEditSave}
                    industries={industries}
                    hirings={hirings}
                />
            )}

            <div style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #e9ecef'
            }}>
                <h3 style={{
                    margin: '0 0 15px 0',
                    color: '#495057',
                    fontSize: '18px',
                    fontWeight: '600'
                }}>
                    Filters
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '15px',
                    alignItems: 'end'
                }}>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontWeight: '500',
                            color: '#495057',
                            fontSize: '14px'
                        }}>
                            Company Name
                        </label>
                        <input
                            type="text"
                            placeholder="Search by company name"
                            value={companyName}
                            onChange={(e) => updateFilters({ companyName: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #ced4da',
                                borderRadius: '4px',
                                fontSize: '14px',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#80bdff';
                                e.target.style.boxShadow = '0 0 0 0.2rem rgba(0, 123, 255, 0.25)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#ced4da';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontWeight: '500',
                            color: '#495057',
                            fontSize: '14px'
                        }}>
                            Industry
                        </label>
                        <select
                            value={industry}
                            onChange={(e) => updateFilters({ industry: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #ced4da',
                                borderRadius: '4px',
                                fontSize: '14px',
                                backgroundColor: 'white',
                                boxSizing: 'border-box',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="">All Industries</option>
                            {industries?.map((indus, ind) => (
                                <option key={ind} value={indus}>{indus}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontWeight: '500',
                            color: '#495057',
                            fontSize: '14px'
                        }}>
                            Hiring Status
                        </label>
                        <select
                            value={hiringStatus}
                            onChange={(e) => updateFilters({ hiringStatus: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #ced4da',
                                borderRadius: '4px',
                                fontSize: '14px',
                                backgroundColor: 'white',
                                boxSizing: 'border-box',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="">All Hiring Status</option>
                            {hirings?.map((hiring, ind) => (
                                <option key={ind} value={hiring}>{hiring}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="table-wrapper" style={{
                background: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                marginBottom: '20px'
            }}>
                <table className="responsive-table" style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '14px'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>S.no</th>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>Company Name</th>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>Industry</th>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>Career Page URL</th>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>Hiring Status</th>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>Total Employees</th>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>Hiring Growth</th>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>Median Tenure</th>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>Ambitionbox Rating</th>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>Glassdoor Rating</th>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>Tags</th>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx} style={{
                                borderBottom: '1px solid #dee2e6',
                                transition: 'background-color 0.15s ease-in-out'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <td style={{ padding: '12px', color: '#495057' }}>{page * 5 + idx + 1}</td>
                                <td style={{ padding: '12px', color: '#495057', fontWeight: '500' }}>{item.companyName}</td>
                                <td style={{ padding: '12px', color: '#495057' }}>{item.industry}</td>
                                <td style={{ padding: '12px', color: '#007bff', wordBreak: 'break-all' }}>
                                    {item.careerPageUrl ? (
                                        <a href={item.careerPageUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
                                            {item.careerPageUrl}
                                        </a>
                                    ) : (
                                        item.careerPageUrl
                                    )}
                                </td>
                                <td style={{ padding: '12px', color: '#495057' }}>{item.hiringStatus}</td>
                                <td style={{ padding: '12px', color: '#495057' }}>{item.totalEmployees}</td>
                                <td style={{ padding: '12px', color: '#495057' }}>{item.hiringGrowth}</td>
                                <td style={{ padding: '12px', color: '#495057' }}>{item.medianTenure}</td>
                                <td style={{ padding: '12px', color: '#495057' }}>{item.ratingAmbitionbox}</td>
                                <td style={{ padding: '12px', color: '#495057' }}>{item.ratingGlassdoor}</td>
                                <td style={{ padding: '12px', color: '#495057' }}>{item.tags}</td>
                                <td style={{ padding: '12px', color: '#495057' }}>
                                    <button
                                        onClick={() => handleEdit(item)}
                                        style={{
                                            padding: '6px 12px',
                                            border: '1px solid #007bff',
                                            borderRadius: '4px',
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            transition: 'background-color 0.15s ease-in-out'
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '15px',
                padding: '20px',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
            }}>
                <button
                    onClick={() => updatePage(page - 1)}
                    disabled={page === 0}
                    style={{
                        padding: '8px 16px',
                        border: '1px solid #007bff',
                        borderRadius: '4px',
                        backgroundColor: page === 0 ? '#e9ecef' : '#007bff',
                        color: page === 0 ? '#6c757d' : 'white',
                        cursor: page === 0 ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.15s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                        if (page !== 0) {
                            e.target.style.backgroundColor = '#0056b3';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (page !== 0) {
                            e.target.style.backgroundColor = '#007bff';
                        }
                    }}
                >
                    Previous
                </button>
                <span style={{
                    padding: '8px 12px',
                    background: 'white',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#495057',
                    minWidth: '120px',
                    textAlign: 'center'
                }}>
                    Page {page + 1} of {totalPages}
                </span>
                <button
                    onClick={() => updatePage(page + 1)}
                    disabled={page + 1 >= totalPages}
                    style={{
                        padding: '8px 16px',
                        border: '1px solid #007bff',
                        borderRadius: '4px',
                        backgroundColor: page + 1 >= totalPages ? '#e9ecef' : '#007bff',
                        color: page + 1 >= totalPages ? '#6c757d' : 'white',
                        cursor: page + 1 >= totalPages ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.15s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                        if (page + 1 < totalPages) {
                            e.target.style.backgroundColor = '#0056b3';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (page + 1 < totalPages) {
                            e.target.style.backgroundColor = '#007bff';
                        }
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}