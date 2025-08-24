// // import { useState } from "react"
// // import { useSearchParams } from "react-router-dom"
// // import UploadButtons from "./UploadButtons";
// // import { useRef } from "react";
// // import ExcelModel from "./ExcelModel";
// // import { DownloadTemplate, handleAdd } from "./ExcelReuseCalls";
// // import { types } from "./types";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { resources } from "../../resources";
// // import { useEffect } from "react";

// // export default function YoutubeUpload() {
// //      const successMessage = (message) => {
// //             toast.success(message,{
// //                 position:'top-center',
// //                 autoClose:1000
// //             })
// //         }
    
// //          const errorMessage = (message) => {
// //             toast.error(message,{
// //                 position:'top-center',
// //                 autoClose:1000
// //             })
// //         }
// //     const [searchParams, setSearchParams] = useSearchParams();
// //     const topic = searchParams.get("topic") || "";
// //     const page = parseInt(searchParams.get("page")) || 0;
// //     const [totalPages, setTotalPages] = useState(1);
// //     const [data, setData] = useState([]);
// //     const [file, setFile] = useState(null);
// //     const [fileName, setFileName] = useState('');
// //     const [isOpen, setIsOpen] = useState(false);
// //     const fileInputRef = useRef(null);

// //     const getData = () => {
// //         const params = new URLSearchParams({
// //             type: types.YOUTUBE,
// //             page: page.toString(),
// //             size: "5"
// //         });

// //         if (topic && topic.trim() !== "") {
// //             params.append("topic", topic);
// //         }



// //         axios.get(`${resources.APPLICATION_URL}view/data?${params}`)
// //             .then(response => {
// //                 if (Array.isArray(response.data.content)) {
// //                     setData(response.data.content);
// //                     setTotalPages(response.data.totalPages || 1);
// //                 }
// //             })
// //             .catch(error => {
// //                 console.log(error);
// //             });
// //     };


// //     useEffect(() => {

// //         getDropdown();
// //     }, [])


// //     useEffect(() => {
// //         getData();
// //     }, [topic, page]);


// //     const getDropdown = () => {
// //         axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.YOUTUBE}`).then(response => {
// //             console.log(response)
// //         }).catch(error => {
// //             console.log(error)
// //         })
// //     }


// //     const updateFilters = (newFilters) => {
// //         const updatedParams = {
// //             topic,
// //             page: "0",
// //             ...newFilters
// //         };
// //         setSearchParams(updatedParams);
// //     };

// //     const updatePage = (newPage) => {
// //         setSearchParams({
// //             topic,
// //             page: newPage.toString()
// //         });
// //     };

// //     const add = () => {

// //     }

// //     const upload = () => {
// //         handleAdd(setIsOpen)
// //     }

// //     const download = () => {
// //         DownloadTemplate(types.YOUTUBE);
// //     }

// //     const handleClose = () => {
// //         setFile(null);
// //         setFileName('');
// //         setIsOpen(false)
// //     }

// //     const handleFileChange = (e) => {
// //         const file = e.target.files[0];
// //         setFile(file)
// //         if (file) setFileName(file.name);

// //     }

// //     const handleUploadClick = () => {
// //         fileInputRef.current.click();
// //     };


// //     const handleUPload = () => {
// //         const formData = new FormData();
// //         formData.append('file', file)
// //         axios.post(`${resources.APPLICATION_URL}upload?type=${encodeURIComponent(types.YOUTUBE)}`, formData).then(response => {
// //             console.log(response)
// //             successMessage(response.data)
// //         }).catch(error => {
// //             console.log(error)
// //             errorMessage('Failed to upload File')
// //         })
// //     }


// //     return (
// //         <>
// //             <UploadButtons add={add} upload={upload} download={download} />
// //             {isOpen && (
// //                 <ExcelModel fileName={fileName} fileInputRef={fileInputRef} handleClose={handleClose} handleUploadClick={handleUploadClick} handleFileChange={handleFileChange} handleUPload={handleUPload} />
// //             )}

// //               <select value={topic} onChange={(e) => updateFilters({ topic: e.target.value })}>
// //                 <option value="">All Hiring Status</option>
// //                 <option value="Hiring">Hiring</option>
// //                 <option value="Moderately Hiring">Moderately Hiring</option>
// //             </select>

// //             <div className="table-wrapper">
// //                 <table className="responsive-table">
// //                     <thead>
// //                         <tr>
// //                             <th>S.no</th>
// //                             <th>Topic</th>
// //                             <th>Video Title</th>
// //                             <th>Video Url</th>
// //                             <th>Duration</th>
// //                             <th>Channel Name</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {data.map((item, idx) => (
// //                             <tr key={idx}>
// //                                 <td>{idx + 1}</td>
// //                                 <td>{item.topic}</td>
// //                                 <td>{item.videoTitle}</td>
// //                                 <td>{item.youtubeUrl}</td>
// //                                 <td>{item.duration}</td>
// //                                 <td>{item.channelName?.split('@')?.at(-1)}</td>
// //                             </tr>
// //                         ))}
// //                     </tbody>

// //                 </table>
// //             </div>
// //             <div>
// //                 <button onClick={() => updatePage(page - 1)} disabled={page === 0}>Prev</button>
// //                 <span>{(page + 1) / (totalPages)}</span>
// //                 <button onClick={() => updatePage(page + 1)} disabled={page + 1 >= totalPages}>Next</button>
// //             </div>
// //         </>
// //     )
// // }


// import { useState } from "react"
// import { useSearchParams } from "react-router-dom"
// import UploadButtons from "./UploadButtons";
// import { useRef } from "react";
// import ExcelModel from "./ExcelModel";
// import { DownloadTemplate, handleAdd } from "./ExcelReuseCalls";
// import { types } from "./types";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { resources } from "../../resources";
// import { useEffect } from "react";

// export default function YoutubeUpload() {
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
//     const topic = searchParams.get("topic") || "";
//     const duration = searchParams.get("duration") || "";
//     const page = parseInt(searchParams.get("page")) || 0;
    
//     const [totalPages, setTotalPages] = useState(1);
//     const [totalElements, setTotalElements] = useState(0);
//     const [data, setData] = useState([]);
//     const [file, setFile] = useState(null);
//     const [fileName, setFileName] = useState('');
//     const [isOpen, setIsOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
    
//     // Dropdown options state
//     const [topicOptions, setTopicOptions] = useState([]);
//     const [durationOptions, setDurationOptions] = useState([]);
    
//     const fileInputRef = useRef(null);

//     const getData = () => {
//         setLoading(true);
//         const params = new URLSearchParams({
//             type: types.YOUTUBE,
//             page: page.toString(),
//             size: "5"
//         });

//         if (topic && topic.trim() !== "") {
//             params.append("topic", topic);
//         }

//         if (duration && duration.trim() !== "") {
//             params.append("duration", duration);
//         }

//         axios.get(`${resources.APPLICATION_URL}view/data?${params}`)
//             .then(response => {
//                 if (Array.isArray(response.data.content)) {
//                     setData(response.data.content);
//                     setTotalPages(response.data.totalPages || 1);
//                     setTotalElements(response.data.totalElements || 0);
//                 } else {
//                     setData([]);
//                     setTotalPages(1);
//                     setTotalElements(0);
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//                 errorMessage('Failed to fetch data');
//                 setData([]);
//                 setTotalPages(1);
//                 setTotalElements(0);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     const getDropdown = () => {
//         axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.YOUTUBE}`)
//             .then(response => {
//                 console.log(response);
//                 if (response.data) {
//                     // Set topic options
//                     if (response.data.topic && Array.isArray(response.data.topic)) {
//                         setTopicOptions(response.data.topic);
//                     }
                    
//                     // Set duration options
//                     if (response.data.duration && Array.isArray(response.data.duration)) {
//                         setDurationOptions(response.data.duration);
//                     }
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//                 errorMessage('Failed to fetch dropdown options');
//             });
//     }

//     useEffect(() => {
//         getDropdown();
//     }, [])

//     useEffect(() => {
//         getData();
//     }, [topic, duration, page]);

//     const updateFilters = (newFilters) => {
//         const updatedParams = {
//             topic,
//             duration,
//             page: "0", // Reset to first page when filters change
//             ...newFilters
//         };
        
//         // Remove empty values
//         Object.keys(updatedParams).forEach(key => {
//             if (updatedParams[key] === "" || updatedParams[key] === null) {
//                 delete updatedParams[key];
//             }
//         });
        
//         setSearchParams(updatedParams);
//     };

//     const updatePage = (newPage) => {
//         const updatedParams = {
//             page: newPage.toString()
//         };
        
//         if (topic) updatedParams.topic = topic;
//         if (duration) updatedParams.duration = duration;
        
//         setSearchParams(updatedParams);
//     };

//     const clearFilters = () => {
//         setSearchParams({ page: "0" });
//     };

//     const add = () => {
//         // Implementation for add functionality
//     }

//     const upload = () => {
//         handleAdd(setIsOpen)
//     }

//     const download = () => {
//         DownloadTemplate(types.YOUTUBE);
//     }

//     const handleClose = () => {
//         setFile(null);
//         setFileName('');
//         setIsOpen(false);
//         // Refresh data after upload
//         getData();
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
//         if (!file) {
//             errorMessage('Please select a file first');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', file);
        
//         axios.post(`${resources.APPLICATION_URL}upload?type=${encodeURIComponent(types.YOUTUBE)}`, formData)
//             .then(response => {
//                 console.log(response);
//                 successMessage(response.data || 'File uploaded successfully');
//                 handleClose(); // This will also refresh the data
//             })
//             .catch(error => {
//                 console.log(error);
//                 errorMessage(error.response?.data || 'Failed to upload File');
//             });
//     }

//     // Calculate display range for pagination
//     const startIndex = page * 5 + 1;
//     const endIndex = Math.min((page + 1) * 5, totalElements);

//     return (
//         <>
//             <UploadButtons add={add} upload={upload} download={download} />
            
//             {isOpen && (
//                 <ExcelModel 
//                     fileName={fileName} 
//                     fileInputRef={fileInputRef} 
//                     handleClose={handleClose} 
//                     handleUploadClick={handleUploadClick} 
//                     handleFileChange={handleFileChange} 
//                     handleUPload={handleUPload} 
//                 />
//             )}

//             {/* Filters Section */}
//             <div className="filters-section" style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
//                 <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
//                     <div>
//                         <label htmlFor="topic-select" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
//                             Topic:
//                         </label>
//                         <select 
//                             id="topic-select"
//                             value={topic} 
//                             onChange={(e) => updateFilters({ topic: e.target.value })}
//                             style={{ padding: '8px', minWidth: '150px', borderRadius: '4px', border: '1px solid #ccc' }}
//                         >
//                             <option value="">All Topics</option>
//                             {topicOptions.map((topicOption, index) => (
//                                 <option key={index} value={topicOption}>
//                                     {topicOption}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div>
//                         <label htmlFor="duration-select" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
//                             Duration:
//                         </label>
//                         <select 
//                             id="duration-select"
//                             value={duration} 
//                             onChange={(e) => updateFilters({ duration: e.target.value })}
//                             style={{ padding: '8px', minWidth: '150px', borderRadius: '4px', border: '1px solid #ccc' }}
//                         >
//                             <option value="">All Durations</option>
//                             {durationOptions.map((durationOption, index) => (
//                                 <option key={index} value={durationOption}>
//                                     {durationOption}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div style={{ marginTop: '20px' }}>
//                         <button 
//                             onClick={clearFilters}
//                             style={{ 
//                                 padding: '8px 15px', 
//                                 backgroundColor: '#6c757d', 
//                                 color: 'white', 
//                                 border: 'none', 
//                                 borderRadius: '4px',
//                                 cursor: 'pointer'
//                             }}
//                         >
//                             Clear Filters
//                         </button>
//                     </div>
//                 </div>

//                 {/* Active Filters Display */}
//                 {(topic || duration) && (
//                     <div style={{ marginTop: '10px', fontSize: '14px' }}>
//                         <span style={{ fontWeight: 'bold' }}>Active Filters: </span>
//                         {topic && <span style={{ background: '#007bff', color: 'white', padding: '2px 8px', borderRadius: '12px', marginRight: '5px' }}>Topic: {topic}</span>}
//                         {duration && <span style={{ background: '#28a745', color: 'white', padding: '2px 8px', borderRadius: '12px', marginRight: '5px' }}>Duration: {duration}</span>}
//                     </div>
//                 )}
//             </div>

//             {/* Loading State */}
//             {loading && (
//                 <div style={{ textAlign: 'center', padding: '20px' }}>
//                     <p>Loading data...</p>
//                 </div>
//             )}

//             {/* Data Table */}
//             <div className="table-wrapper">
//                 <table className="responsive-table">
//                     <thead>
//                         <tr>
//                             <th>S.no</th>
//                             <th>Topic</th>
//                             <th>Video Title</th>
//                             <th>Video Url</th>
//                             <th>Duration</th>
//                             <th>Channel Name</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.length > 0 ? (
//                             data.map((item, idx) => (
//                                 <tr key={idx}>
//                                     <td>{startIndex + idx}</td>
//                                     <td>{item.topic}</td>
//                                     <td>{item.videoTitle}</td>
//                                     <td>
//                                         <a 
//                                             href={item.youtubeUrl} 
//                                             target="_blank" 
//                                             rel="noopener noreferrer"
//                                             style={{ color: '#007bff', textDecoration: 'none' }}
//                                         >
//                                             {item.youtubeUrl}
//                                         </a>
//                                     </td>
//                                     <td>{item.duration}</td>
//                                     <td>{item.channelName?.split('@')?.at(-1)}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             !loading && (
//                                 <tr>
//                                     <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
//                                         No data available
//                                     </td>
//                                 </tr>
//                             )
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Enhanced Pagination */}
//             <div style={{ 
//                 display: 'flex', 
//                 justifyContent: 'space-between', 
//                 alignItems: 'center', 
//                 marginTop: '20px',
//                 padding: '15px',
//                 backgroundColor: '#f8f9fa',
//                 borderRadius: '8px'
//             }}>
//                 <div style={{ fontSize: '14px', color: '#6c757d' }}>
//                     {totalElements > 0 ? (
//                         `Showing ${startIndex} to ${endIndex} of ${totalElements} entries`
//                     ) : (
//                         'No entries to show'
//                     )}
//                 </div>

//                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                     <button 
//                         onClick={() => updatePage(0)} 
//                         disabled={page === 0}
//                         style={{
//                             padding: '8px 12px',
//                             backgroundColor: page === 0 ? '#e9ecef' : '#007bff',
//                             color: page === 0 ? '#6c757d' : 'white',
//                             border: 'none',
//                             borderRadius: '4px',
//                             cursor: page === 0 ? 'not-allowed' : 'pointer'
//                         }}
//                     >
//                         First
//                     </button>
                    
//                     <button 
//                         onClick={() => updatePage(page - 1)} 
//                         disabled={page === 0}
//                         style={{
//                             padding: '8px 12px',
//                             backgroundColor: page === 0 ? '#e9ecef' : '#007bff',
//                             color: page === 0 ? '#6c757d' : 'white',
//                             border: 'none',
//                             borderRadius: '4px',
//                             cursor: page === 0 ? 'not-allowed' : 'pointer'
//                         }}
//                     >
//                         Prev
//                     </button>

//                     <span style={{ 
//                         padding: '8px 15px', 
//                         backgroundColor: 'white', 
//                         border: '1px solid #dee2e6',
//                         borderRadius: '4px',
//                         fontWeight: 'bold'
//                     }}>
//                         Page {page + 1} of {totalPages}
//                     </span>

//                     <button 
//                         onClick={() => updatePage(page + 1)} 
//                         disabled={page + 1 >= totalPages}
//                         style={{
//                             padding: '8px 12px',
//                             backgroundColor: page + 1 >= totalPages ? '#e9ecef' : '#007bff',
//                             color: page + 1 >= totalPages ? '#6c757d' : 'white',
//                             border: 'none',
//                             borderRadius: '4px',
//                             cursor: page + 1 >= totalPages ? 'not-allowed' : 'pointer'
//                         }}
//                     >
//                         Next
//                     </button>

//                     <button 
//                         onClick={() => updatePage(totalPages - 1)} 
//                         disabled={page + 1 >= totalPages}
//                         style={{
//                             padding: '8px 12px',
//                             backgroundColor: page + 1 >= totalPages ? '#e9ecef' : '#007bff',
//                             color: page + 1 >= totalPages ? '#6c757d' : 'white',
//                             border: 'none',
//                             borderRadius: '4px',
//                             cursor: page + 1 >= totalPages ? 'not-allowed' : 'pointer'
//                         }}
//                     >
//                         Last
//                     </button>
//                 </div>
//             </div>
//         </>
//     )
// }


import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import UploadButtons from "./UploadButtons";
import ExcelModel from "./ExcelModel";
import { DownloadTemplate, handleAdd } from "./ExcelReuseCalls";
import { types } from "./types";
import axios from "axios";
import { toast } from "react-toastify";
import { resources } from "../../resources";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// EditModal Component
const EditModal = ({ isOpen, onClose, editData, onSave, topics, durations }) => {
  const [formData, setFormData] = useState({
    id: '',
    topic: '',
    videoTitle: '',
    totalViews: '',
    youtubeUrl: '',
    channelName: '',
    duration: '',
    shortDescription: '',
    tags: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editData) {
      setFormData({
        id: editData.id || '',
        topic: editData.topic || '',
        videoTitle: editData.videoTitle || '',
        totalViews: editData.totalViews || '',
        youtubeUrl: editData.youtubeUrl || '',
        channelName: editData.channelName || '',
        duration: editData.duration || '',
        shortDescription: editData.shortDescription || '',
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
          <h2 style={{ margin: 0, color: '#495057', fontSize: '24px' }}>Edit YouTube Video</h2>
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
            {/* Topic */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                Topic *
              </label>
              <select
                value={formData.topic}
                onChange={(e) => handleInputChange('topic', e.target.value)}
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
                <option value="">Select Topic</option>
                {topics?.map((topic, idx) => (
                  <option key={idx} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            {/* Video Title */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                Video Title *
              </label>
              <input
                type="text"
                value={formData.videoTitle}
                onChange={(e) => handleInputChange('videoTitle', e.target.value)}
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

            {/* YouTube URL */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                YouTube URL
              </label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
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

            {/* Channel Name */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                Channel Name
              </label>
              <input
                type="text"
                value={formData.channelName}
                onChange={(e) => handleInputChange('channelName', e.target.value)}
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

            {/* Duration */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                Duration
              </label>
              <select
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
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
                <option value="">Select Duration</option>
                {durations?.map((duration, idx) => (
                  <option key={idx} value={duration}>{duration}</option>
                ))}
              </select>
            </div>

            {/* Total Views */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
                Total Views
              </label>
              <input
                type="text"
                value={formData.totalViews}
                onChange={(e) => handleInputChange('totalViews', e.target.value)}
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

            {/* Tags */}
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

          {/* Short Description with ReactQuill */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
              Short Description
            </label>
            <ReactQuill
              value={formData.shortDescription}
              onChange={(value) => handleInputChange('shortDescription', value)}
              placeholder="Enter short description..."
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

          {/* File Upload */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#495057' }}>
              Video Thumbnail
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

          {/* Action Buttons */}
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

export default function YoutubeUpload() {
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
  const topic = searchParams.get("topic") || "";
  const duration = searchParams.get("duration") || "";
  const page = parseInt(searchParams.get("page")) || 0;
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topicOptions, setTopicOptions] = useState([]);
  const [durationOptions, setDurationOptions] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const fileInputRef = useRef(null);

  const getData = () => {
    setLoading(true);
    const params = new URLSearchParams({
      type: types.YOUTUBE,
      page: page.toString(),
      size: "5"
    });

    if (topic && topic.trim() !== "") {
      params.append("topic", topic);
    }

    if (duration && duration.trim() !== "") {
      params.append("duration", duration);
    }

    axios.get(`${resources.APPLICATION_URL}view/data?${params}`)
      .then(response => {
        if (Array.isArray(response.data.content)) {
          setData(response.data.content);
          setTotalPages(response.data.totalPages || 1);
          setTotalElements(response.data.totalElements || 0);
        } else {
          setData([]);
          setTotalPages(1);
          setTotalElements(0);
        }
      })
      .catch(error => {
        console.log(error);
        errorMessage('Failed to fetch data');
        setData([]);
        setTotalPages(1);
        setTotalElements(0);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDropdown = () => {
    axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.YOUTUBE}`)
      .then(response => {
        if (response.data) {
          setTopicOptions(response.data.topic && Array.isArray(response.data.topic) ? response.data.topic : []);
          setDurationOptions(response.data.duration && Array.isArray(response.data.duration) ? response.data.duration : []);
        }
      })
      .catch(error => {
        console.log(error);
        errorMessage('Failed to fetch dropdown options');
      });
  };

  useEffect(() => {
    getDropdown();
  }, []);

  useEffect(() => {
    getData();
  }, [topic, duration, page]);

  const updateFilters = (newFilters) => {
    const updatedParams = {
      topic,
      duration,
      page: "0",
      ...newFilters
    };

    Object.keys(updatedParams).forEach(key => {
      if (updatedParams[key] === "" || updatedParams[key] === null) {
        delete updatedParams[key];
      }
    });

    setSearchParams(updatedParams);
  };

  const updatePage = (newPage) => {
    const updatedParams = {
      page: newPage.toString()
    };

    if (topic) updatedParams.topic = topic;
    if (duration) updatedParams.duration = duration;

    setSearchParams(updatedParams);
  };

  const clearFilters = () => {
    setSearchParams({ page: "0" });
  };

  const add = () => {
    // Placeholder for add functionality
  };

  const upload = () => {
    handleAdd(setIsOpen);
  };

  const download = () => {
    DownloadTemplate(types.YOUTUBE);
  };

  const handleClose = () => {
    setFile(null);
    setFileName('');
    setIsOpen(false);
    getData();
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
    if (!file) {
      errorMessage('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    axios.post(`${resources.APPLICATION_URL}upload?type=${encodeURIComponent(types.YOUTUBE)}`, formData)
      .then(response => {
        successMessage(response.data || 'File uploaded successfully');
        handleClose();
      })
      .catch(error => {
        console.log(error);
        errorMessage(error.response?.data || 'Failed to upload File');
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
      editFormData.append('object', new Blob([JSON.stringify(formData)], { type: "application/json"} ));
      if (file) {
        editFormData.append('file', file);
      }
      await axios.post(`${resources.APPLICATION_URL}edit-data?type=${encodeURIComponent(types.YOUTUBE)}`, editFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      successMessage('Record updated successfully');
      handleEditClose();
      getData();
    } catch (error) {
      console.error(error);
      errorMessage(error.response?.data || 'Error updating record');
    }
  };

  const startIndex = page * 5 + 1;
  const endIndex = Math.min((page + 1) * 5, totalElements);

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
          topics={topicOptions}
          durations={durationOptions}
        />
      )}

      {/* Filters Section */}
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
              Topic
            </label>
            <select 
              value={topic} 
              onChange={(e) => updateFilters({ topic: e.target.value })}
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
              <option value="">All Topics</option>
              {topicOptions.map((topicOption, idx) => (
                <option key={idx} value={topicOption}>{topicOption}</option>
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
              Duration
            </label>
            <select 
              value={duration} 
              onChange={(e) => updateFilters({ duration: e.target.value })}
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
              <option value="">All Durations</option>
              {durationOptions.map((durationOption, idx) => (
                <option key={idx} value={durationOption}>{durationOption}</option>
              ))}
            </select>
          </div>
          <div>
            <button
              onClick={clearFilters}
              style={{
                padding: '10px 20px',
                border: '1px solid #6c757d',
                borderRadius: '4px',
                backgroundColor: '#6c757d',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                marginTop: '25px'
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
        {(topic || duration) && (
          <div style={{ marginTop: '10px', fontSize: '14px' }}>
            <span style={{ fontWeight: '500', color: '#495057' }}>Active Filters: </span>
            {topic && <span style={{ background: '#007bff', color: 'white', padding: '2px 8px', borderRadius: '12px', marginRight: '5px' }}>Topic: {topic}</span>}
            {duration && <span style={{ background: '#28a745', color: 'white', padding: '2px 8px', borderRadius: '12px', marginRight: '5px' }}>Duration: {duration}</span>}
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#495057' }}>
          Loading data...
        </div>
      )}

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
              }}>Topic</th>
              <th style={{
                padding: '15px 12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#495057',
                borderBottom: '2px solid #dee2e6'
              }}>Video Title</th>
              <th style={{
                padding: '15px 12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#495057',
                borderBottom: '2px solid #dee2e6'
              }}>YouTube URL</th>
              <th style={{
                padding: '15px 12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#495057',
                borderBottom: '2px solid #dee2e6'
              }}>Duration</th>
              <th style={{
                padding: '15px 12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#495057',
                borderBottom: '2px solid #dee2e6'
              }}>Channel Name</th>
              <th style={{
                padding: '15px 12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#495057',
                borderBottom: '2px solid #dee2e6'
              }}>Total Views</th>
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
            {data.length > 0 ? (
              data.map((item, idx) => (
                <tr key={idx} style={{
                  borderBottom: '1px solid #dee2e6',
                  transition: 'background-color 0.15s ease-in-out'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '12px', color: '#495057' }}>{startIndex + idx}</td>
                  <td style={{ padding: '12px', color: '#495057' }}>{item.topic}</td>
                  <td style={{ padding: '12px', color: '#495057', fontWeight: '500' }}>{item.videoTitle}</td>
                  <td style={{ padding: '12px', color: '#007bff', wordBreak: 'break-all' }}>
                    {item.youtubeUrl ? (
                      <a href={item.youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
                        {item.youtubeUrl}
                      </a>
                    ) : (
                      item.youtubeUrl
                    )}
                  </td>
                  <td style={{ padding: '12px', color: '#495057' }}>{item.duration}</td>
                  <td style={{ padding: '12px', color: '#495057' }}>{item.channelName?.split('@')?.at(-1)}</td>
                  <td style={{ padding: '12px', color: '#495057' }}>{item.totalViews}</td>
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
              ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '20px', color: '#495057' }}>
                    No data available
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '15px',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <div style={{ fontSize: '14px', color: '#6c757d' }}>
          {totalElements > 0 ? (
            `Showing ${startIndex} to ${endIndex} of ${totalElements} entries`
          ) : (
            'No entries to show'
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => updatePage(0)} 
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
              if (page !== 0) e.target.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              if (page !== 0) e.target.style.backgroundColor = '#007bff';
            }}
          >
            First
          </button>
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
              if (page !== 0) e.target.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              if (page !== 0) e.target.style.backgroundColor = '#007bff';
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
              if (page + 1 < totalPages) e.target.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              if (page + 1 < totalPages) e.target.style.backgroundColor = '#007bff';
            }}
          >
            Next
          </button>
          <button 
            onClick={() => updatePage(totalPages - 1)} 
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
              if (page + 1 < totalPages) e.target.style.backgroundColor = '#0056b3';
            }}
            onMouseLeave={(e) => {
              if (page + 1 < totalPages) e.target.style.backgroundColor = '#007bff';
            }}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
}