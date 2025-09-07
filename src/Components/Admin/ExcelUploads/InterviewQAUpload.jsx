
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import UploadButtons from "./UploadButtons";
import ExcelModel from "./ExcelModel";
import { DownloadTemplate, handleAdd } from "./ExcelReuseCalls";
import { types } from "./types";
import axios from "axios";
import { resources } from "../../resources";
import { toast } from "react-toastify";

export default function InterviewQAUpload() {
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
    const courseCategory = searchParams.get("courseCategory") || "";
    const courseDuration = searchParams.get("courseDuration") || "";
    const page = parseInt(searchParams.get("page")) || 0;

    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Dropdown options state
    const [courseCategoryOptions, setCourseCategoryOptions] = useState([]);
    const [courseDurationOptions, setCourseDurationOptions] = useState([]);

    const fileInputRef = useRef(null);

    const getData = () => {
        setLoading(true);
        const params = new URLSearchParams({
            type: types.INTERVIEW,
            page: page.toString(),
            size: "5"
        });

        if (courseCategory && courseCategory.trim() !== "") {
            params.append("courseCategory", courseCategory);
        }
        if (courseDuration && courseDuration.trim() !== "") {
            params.append("courseDuration", courseDuration);
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
        axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.INTERVIEW}`)
            .then(response => {
                if (response.data) {
                    setCourseCategoryOptions(response.data.courseCategory || []);
                    setCourseDurationOptions(response.data.courseDuration || []);
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
    }, [courseCategory, courseDuration, page]);

    const updateFilters = (newFilters) => {
        const updatedParams = {
            courseCategory,
            courseDuration,
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

        if (courseCategory) updatedParams.courseCategory = courseCategory;
        if (courseDuration) updatedParams.courseDuration = courseDuration;

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
        DownloadTemplate(types.CERTIFICATE);
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
        axios.post(`${resources.APPLICATION_URL}upload?type=${encodeURIComponent(types.INTERVIEW)}`, formData)
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
         

            {/* Loading State */}
            {/* {loading && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p>Loading data...</p>
                </div>
            )} */}

            {/* Data Table */}
            {/* <div className="table-wrapper">
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Course Category</th>
                            <th>Course Title</th>
                            <th>Course Duration</th>
                            <th>Course Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{startIndex + idx}</td>
                                    <td>{item.courseCategory}</td>
                                    <td>{item.courseTitle}</td>
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
            </div> */}

            {/* Enhanced Pagination */}
            {/* <div style={{
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
            </div> */}
        </>
    );
}
