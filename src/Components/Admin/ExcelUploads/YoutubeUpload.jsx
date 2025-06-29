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
//      const successMessage = (message) => {
//             toast.success(message,{
//                 position:'top-center',
//                 autoClose:1000
//             })
//         }
    
//          const errorMessage = (message) => {
//             toast.error(message,{
//                 position:'top-center',
//                 autoClose:1000
//             })
//         }
//     const [searchParams, setSearchParams] = useSearchParams();
//     const topic = searchParams.get("topic") || "";
//     const page = parseInt(searchParams.get("page")) || 0;
//     const [totalPages, setTotalPages] = useState(1);
//     const [data, setData] = useState([]);
//     const [file, setFile] = useState(null);
//     const [fileName, setFileName] = useState('');
//     const [isOpen, setIsOpen] = useState(false);
//     const fileInputRef = useRef(null);

//     const getData = () => {
//         const params = new URLSearchParams({
//             type: types.YOUTUBE,
//             page: page.toString(),
//             size: "5"
//         });

//         if (topic && topic.trim() !== "") {
//             params.append("topic", topic);
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
//     }, [topic, page]);


//     const getDropdown = () => {
//         axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.YOUTUBE}`).then(response => {
//             console.log(response)
//         }).catch(error => {
//             console.log(error)
//         })
//     }


//     const updateFilters = (newFilters) => {
//         const updatedParams = {
//             topic,
//             page: "0",
//             ...newFilters
//         };
//         setSearchParams(updatedParams);
//     };

//     const updatePage = (newPage) => {
//         setSearchParams({
//             topic,
//             page: newPage.toString()
//         });
//     };

//     const add = () => {

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
//         axios.post(`${resources.APPLICATION_URL}upload?type=${encodeURIComponent(types.YOUTUBE)}`, formData).then(response => {
//             console.log(response)
//             successMessage(response.data)
//         }).catch(error => {
//             console.log(error)
//             errorMessage('Failed to upload File')
//         })
//     }


//     return (
//         <>
//             <UploadButtons add={add} upload={upload} download={download} />
//             {isOpen && (
//                 <ExcelModel fileName={fileName} fileInputRef={fileInputRef} handleClose={handleClose} handleUploadClick={handleUploadClick} handleFileChange={handleFileChange} handleUPload={handleUPload} />
//             )}

//               <select value={topic} onChange={(e) => updateFilters({ topic: e.target.value })}>
//                 <option value="">All Hiring Status</option>
//                 <option value="Hiring">Hiring</option>
//                 <option value="Moderately Hiring">Moderately Hiring</option>
//             </select>

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
//                         {data.map((item, idx) => (
//                             <tr key={idx}>
//                                 <td>{idx + 1}</td>
//                                 <td>{item.topic}</td>
//                                 <td>{item.videoTitle}</td>
//                                 <td>{item.youtubeUrl}</td>
//                                 <td>{item.duration}</td>
//                                 <td>{item.channelName?.split('@')?.at(-1)}</td>
//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>
//             </div>
//             <div>
//                 <button onClick={() => updatePage(page - 1)} disabled={page === 0}>Prev</button>
//                 <span>{(page + 1) / (totalPages)}</span>
//                 <button onClick={() => updatePage(page + 1)} disabled={page + 1 >= totalPages}>Next</button>
//             </div>
//         </>
//     )
// }


import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import UploadButtons from "./UploadButtons";
import { useRef } from "react";
import ExcelModel from "./ExcelModel";
import { DownloadTemplate, handleAdd } from "./ExcelReuseCalls";
import { types } from "./types";
import axios from "axios";
import { toast } from "react-toastify";
import { resources } from "../../resources";
import { useEffect } from "react";

export default function YoutubeUpload() {
    const successMessage = (message) => {
        toast.success(message, {
            position: 'top-center',
            autoClose: 1000
        })
    }

    const errorMessage = (message) => {
        toast.error(message, {
            position: 'top-center',
            autoClose: 1000
        })
    }

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
    
    // Dropdown options state
    const [topicOptions, setTopicOptions] = useState([]);
    const [durationOptions, setDurationOptions] = useState([]);
    
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
                console.log(response);
                if (response.data) {
                    // Set topic options
                    if (response.data.topic && Array.isArray(response.data.topic)) {
                        setTopicOptions(response.data.topic);
                    }
                    
                    // Set duration options
                    if (response.data.duration && Array.isArray(response.data.duration)) {
                        setDurationOptions(response.data.duration);
                    }
                }
            })
            .catch(error => {
                console.log(error);
                errorMessage('Failed to fetch dropdown options');
            });
    }

    useEffect(() => {
        getDropdown();
    }, [])

    useEffect(() => {
        getData();
    }, [topic, duration, page]);

    const updateFilters = (newFilters) => {
        const updatedParams = {
            topic,
            duration,
            page: "0", // Reset to first page when filters change
            ...newFilters
        };
        
        // Remove empty values
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
        // Implementation for add functionality
    }

    const upload = () => {
        handleAdd(setIsOpen)
    }

    const download = () => {
        DownloadTemplate(types.YOUTUBE);
    }

    const handleClose = () => {
        setFile(null);
        setFileName('');
        setIsOpen(false);
        // Refresh data after upload
        getData();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file)
        if (file) setFileName(file.name);
    }

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
                console.log(response);
                successMessage(response.data || 'File uploaded successfully');
                handleClose(); // This will also refresh the data
            })
            .catch(error => {
                console.log(error);
                errorMessage(error.response?.data || 'Failed to upload File');
            });
    }

    // Calculate display range for pagination
    const startIndex = page * 5 + 1;
    const endIndex = Math.min((page + 1) * 5, totalElements);

    return (
        <>
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

            {/* Filters Section */}
            <div className="filters-section" style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>
                        <label htmlFor="topic-select" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Topic:
                        </label>
                        <select 
                            id="topic-select"
                            value={topic} 
                            onChange={(e) => updateFilters({ topic: e.target.value })}
                            style={{ padding: '8px', minWidth: '150px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="">All Topics</option>
                            {topicOptions.map((topicOption, index) => (
                                <option key={index} value={topicOption}>
                                    {topicOption}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="duration-select" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Duration:
                        </label>
                        <select 
                            id="duration-select"
                            value={duration} 
                            onChange={(e) => updateFilters({ duration: e.target.value })}
                            style={{ padding: '8px', minWidth: '150px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="">All Durations</option>
                            {durationOptions.map((durationOption, index) => (
                                <option key={index} value={durationOption}>
                                    {durationOption}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <button 
                            onClick={clearFilters}
                            style={{ 
                                padding: '8px 15px', 
                                backgroundColor: '#6c757d', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Active Filters Display */}
                {(topic || duration) && (
                    <div style={{ marginTop: '10px', fontSize: '14px' }}>
                        <span style={{ fontWeight: 'bold' }}>Active Filters: </span>
                        {topic && <span style={{ background: '#007bff', color: 'white', padding: '2px 8px', borderRadius: '12px', marginRight: '5px' }}>Topic: {topic}</span>}
                        {duration && <span style={{ background: '#28a745', color: 'white', padding: '2px 8px', borderRadius: '12px', marginRight: '5px' }}>Duration: {duration}</span>}
                    </div>
                )}
            </div>

            {/* Loading State */}
            {loading && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p>Loading data...</p>
                </div>
            )}

            {/* Data Table */}
            <div className="table-wrapper">
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Topic</th>
                            <th>Video Title</th>
                            <th>Video Url</th>
                            <th>Duration</th>
                            <th>Channel Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{startIndex + idx}</td>
                                    <td>{item.topic}</td>
                                    <td>{item.videoTitle}</td>
                                    <td>
                                        <a 
                                            href={item.youtubeUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            style={{ color: '#007bff', textDecoration: 'none' }}
                                        >
                                            {item.youtubeUrl}
                                        </a>
                                    </td>
                                    <td>{item.duration}</td>
                                    <td>{item.channelName?.split('@')?.at(-1)}</td>
                                </tr>
                            ))
                        ) : (
                            !loading && (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                        No data available
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            {/* Enhanced Pagination */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
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
                            padding: '8px 12px',
                            backgroundColor: page === 0 ? '#e9ecef' : '#007bff',
                            color: page === 0 ? '#6c757d' : 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: page === 0 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        First
                    </button>
                    
                    <button 
                        onClick={() => updatePage(page - 1)} 
                        disabled={page === 0}
                        style={{
                            padding: '8px 12px',
                            backgroundColor: page === 0 ? '#e9ecef' : '#007bff',
                            color: page === 0 ? '#6c757d' : 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: page === 0 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Prev
                    </button>

                    <span style={{ 
                        padding: '8px 15px', 
                        backgroundColor: 'white', 
                        border: '1px solid #dee2e6',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                    }}>
                        Page {page + 1} of {totalPages}
                    </span>

                    <button 
                        onClick={() => updatePage(page + 1)} 
                        disabled={page + 1 >= totalPages}
                        style={{
                            padding: '8px 12px',
                            backgroundColor: page + 1 >= totalPages ? '#e9ecef' : '#007bff',
                            color: page + 1 >= totalPages ? '#6c757d' : 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: page + 1 >= totalPages ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Next
                    </button>

                    <button 
                        onClick={() => updatePage(totalPages - 1)} 
                        disabled={page + 1 >= totalPages}
                        style={{
                            padding: '8px 12px',
                            backgroundColor: page + 1 >= totalPages ? '#e9ecef' : '#007bff',
                            color: page + 1 >= totalPages ? '#6c757d' : 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: page + 1 >= totalPages ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Last
                    </button>
                </div>
            </div>
        </>
    )
}