// import { useEffect, useState } from "react"
// import { useSearchParams } from "react-router-dom"
// import UploadButtons from "./UploadButtons";
// import { useRef } from "react";
// import ExcelModel from "./ExcelModel";
// import { DownloadTemplate, handleAdd } from "./ExcelReuseCalls";
// import { types } from "./types";
// import axios from "axios";
// import { resources } from "../../resources";
// import { toast } from "react-toastify";


// export default function CoachingUpload() {

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

//     const location = searchParams.get("location") || "";
//     const price = searchParams.get("price") || "";
//     const courseDuration = searchParams.get("courseDuration") || "";
//     const modeOfClass = searchParams.get('modeOfClass')
//     const page = parseInt(searchParams.get("page")) || 0;
//     const [totalPages, setTotalPages] = useState(1);
//     const [data, setData] = useState([]);
//     const [file, setFile] = useState(null);
//     const [fileName, setFileName] = useState('');
//     const [isOpen, setIsOpen] = useState(false);
//     const fileInputRef = useRef(null);


//      const getData = () => {
//         const params = new URLSearchParams({
//             type: types.COACHING,
//             page: page.toString(),
//             size: "5"
//         });

//          if (location && location.trim() !== "") {
//             params.append("location", location);
//         }

//         if (price && price.trim() !== "") {
//             params.append("price", price);
//         }

//         if (courseDuration && courseDuration.trim() !== "") {
//             params.append("courseDuration", courseDuration);
//         }

//         if (modeOfClass && modeOfClass.trim() !== "") {
//             params.append("modeOfClass", modeOfClass);
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

//     }, [location, price, courseDuration, modeOfClass, page]);



//     const getDropdown = () => {
//         axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.COACHING}`).then(response => {
//             console.log(response)
//         }).catch(error => {
//             console.log(error)
//         })
//     }


//     const updateFilters = (newFilters) => {
//         const updatedParams = {
//             location,
//             price,
//             courseDuration,
//             modeOfClass,
//             page: "0",
//             ...newFilters
//         };
//         setSearchParams(updatedParams);
//     };

//     const updatePage = (newPage) => {
//         setSearchParams({
//              location,
//             price,
//             courseDuration,
//             modeOfClass,
//             page: newPage.toString()
//         });
//     };




//     const add = () => {

//     }

//     const upload = () => {
//         handleAdd(setIsOpen)
//     }

//     const download = () => {
//         DownloadTemplate(types.COACHING);
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
//         axios.post(`${resources.APPLICATION_URL}upload?type=${encodeURIComponent(types.COACHING)}`, formData).then(response => {
//             console.log(response)
//             successMessage(response.data)
//         }).catch(error => {
//             console.log(error)
//             errorMessage('Error Uploading File')
//         })
//     }
//     return (
//         <>
//             <UploadButtons add={add} upload={upload} download={download} />
//             {isOpen && (
//                 <ExcelModel fileName={fileName} fileInputRef={fileInputRef} handleClose={handleClose} handleUploadClick={handleUploadClick} handleFileChange={handleFileChange} handleUPload={handleUPload} />
//             )}
//             <div className="table-wrapper">
//                 <table className="responsive-table"> 
//                     <thead>
//                         <tr>
//                             <th>S.no</th>
//                             <th>Course Name</th>
//                             <th>Institute Name</th>
//                             <th>Course Duration</th>
//                             <th>Course Link</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data.map((item, idx) => (
//                             <tr key={idx}>
//                                 <td>{idx + 1}</td>
//                                 <td>{item.courseName}</td>
//                                 <td>{item.instituteName}</td>
//                                 <td>{item.courseDuration}</td>
//                                 <td>{item.courseLink}</td>
//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>
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
import { resources } from "../../resources";
import { toast } from "react-toastify";

export default function CoachingUpload() {
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
    const location = searchParams.get("location") || "";
    const price = searchParams.get("price") || "";
    const courseDuration = searchParams.get("courseDuration") || "";
    const modeOfClass = searchParams.get("modeOfClass") || "";
    const page = parseInt(searchParams.get("page")) || 0;

    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Dropdown options state
    const [locationOptions, setLocationOptions] = useState([]);
    const [priceOptions, setPriceOptions] = useState([]);
    const [courseDurationOptions, setCourseDurationOptions] = useState([]);
    const [modeOfClassOptions, setModeOfClassOptions] = useState([]);

    const fileInputRef = useRef(null);

    const getData = () => {
        setLoading(true);
        const params = new URLSearchParams({
            type: types.COACHING,
            page: page.toString(),
            size: "5"
        });

        if (location && location.trim() !== "") {
            params.append("location", location);
        }
        if (price && price.trim() !== "") {
            params.append("price", price);
        }
        if (courseDuration && courseDuration.trim() !== "") {
            params.append("courseDuration", courseDuration);
        }
        if (modeOfClass && modeOfClass.trim() !== "") {
            params.append("modeOfClass", modeOfClass);
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
        axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.COACHING}`)
            .then(response => {
                if (response.data) {
                    setLocationOptions(response.data.location || []);
                    setPriceOptions(response.data.price || []);
                    setCourseDurationOptions(response.data.courseDuration || []);
                    setModeOfClassOptions(response.data.modeOfClass || []);
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
    }, [location, price, courseDuration, modeOfClass, page]);

    const updateFilters = (newFilters) => {
        const updatedParams = {
            location,
            price,
            courseDuration,
            modeOfClass,
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

        if (location) updatedParams.location = location;
        if (price) updatedParams.price = price;
        if (courseDuration) updatedParams.courseDuration = courseDuration;
        if (modeOfClass) updatedParams.modeOfClass = modeOfClass;

        setSearchParams(updatedParams);
    };

    const clearFilters = () => {
        setSearchParams({ page: "0" });
    };

    const add = () => {
        // Implementation for add functionality
    };

    const upload = () => {
        handleAdd(setIsOpen);
    };

    const download = () => {
        DownloadTemplate(types.COACHING);
    };

    const handleClose = () => {
        setFile(null);
        setFileName('');
        setIsOpen(false);
        getData(); // Refresh data after upload
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
        axios.post(`${resources.APPLICATION_URL}upload?type=${encodeURIComponent(types.COACHING)}`, formData)
            .then(response => {
                console.log(response);
                successMessage(response.data || 'File uploaded successfully');
                handleClose();
            })
            .catch(error => {
                console.log(error);
                errorMessage(error.response?.data || 'Failed to upload File');
            });
    };

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
                        <label htmlFor="location-select" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Location:
                        </label>
                        <select
                            id="location-select"
                            value={location}
                            onChange={(e) => updateFilters({ location: e.target.value })}
                            style={{ padding: '8px', minWidth: '150px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="">All Locations</option>
                            {locationOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="price-select" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Price:
                        </label>
                        <select
                            id="price-select"
                            value={price}
                            onChange={(e) => updateFilters({ price: e.target.value })}
                            style={{ padding: '8px', minWidth: '150px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="">All Prices</option>
                            {priceOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="courseDuration-select" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Course Duration:
                        </label>
                        <select
                            id="courseDuration-select"
                            value={courseDuration}
                            onChange={(e) => updateFilters({ courseDuration: e.target.value })}
                            style={{ padding: '8px', minWidth: '150px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="">All Durations</option>
                            {courseDurationOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="modeOfClass-select" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Mode of Class:
                        </label>
                        <select
                            id="modeOfClass-select"
                            value={modeOfClass}
                            onChange={(e) => updateFilters({ modeOfClass: e.target.value })}
                            style={{ padding: '8px', minWidth: '150px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="">All Modes</option>
                            {modeOfClassOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <button
                            onClick={clearFilters_test}
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
                {(location || price || courseDuration || modeOfClass) && (
                    <div style={{ marginTop: '10px', fontSize: '14px' }}>
                        <span style={{ fontWeight: 'bold' }}>Active Filters: </span>
                        {location && <span style={{ background: '#007bff', color: 'white', padding: '2px 8px', borderRadius: '12px', marginRight: '5px' }}>Location: {location}</span>}
                        {price && <span style={{ background: '#28a745', color: 'white', padding: '2px 8px', borderRadius: '12px', marginRight: '5px' }}>Price: {price}</span>}
                        {courseDuration && <span style={{ background: '#17a2b8', color: 'white', padding: '2px 8px', borderRadius: '12px', marginRight: '5px' }}>Duration: {courseDuration}</span>}
                        {modeOfClass && <span style={{ background: '#ffc107', color: 'black', padding: '2px 8px', borderRadius: '12px', marginRight: '5px' }}>Mode: {modeOfClass}</span>}
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
                            <th>Course Name</th>
                            <th>Institute Name</th>
                            <th>Course Duration</th>
                            <th>Course Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{startIndex + idx}</td>
                                    <td>{item.courseName}</td>
                                    <td>{item.instituteName}</td>
                                    <td>{item.courseDuration}</td>
                                    <td>
                                        <a
                                            href={item.courseLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#007bff', textDecoration: 'none' }}
                                        >
                                            {item.courseLink}
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            !loading && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
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
    );
}
