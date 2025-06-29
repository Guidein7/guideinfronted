import { useEffect, useState } from "react"
import UploadButtons from "./UploadButtons";
import { useRef } from "react";
import ExcelModel from "./ExcelModel";
import { DownloadTemplate, handleAdd } from "./ExcelReuseCalls";
import { types } from "./types";
import axios from "axios";
import { resources } from "../../resources";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";


export default function CareerUpload() {

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
    const [industries,setIndustries] = useState([]);
    const [hirings,sethirings] = useState([]);
   

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
    }, [])


    useEffect(() => {
        getData();

    }, [industry, hiringStatus, companyName, page]);



    const getDropdown = () => {
        axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.CAREER}`).then(response => {
            console.log(response)
            setIndustries(response.data.industry);
            sethirings(response.data.hiringStatus)

        }).catch(error => {
            console.log(error)
        })
    }


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

    }

    const upload = () => {
        handleAdd(setIsOpen)
    }

    const download = () => {
        DownloadTemplate(types.CAREER);
    }

    const handleClose = () => {
        setFile(null);
        setFileName('');
        setIsOpen(false)
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
        const formData = new FormData();
        formData.append('file', file)
        axios.post(`${resources.APPLICATION_URL}upload?type=${encodeURIComponent(types.CAREER)}`, formData).then(response => {
            console.log(response)
            successMessage(response.data)
        }).catch(error => {
            console.log(error)
            errorMessage('Error Uploading File')
        })
    }




    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <UploadButtons add={add} upload={upload} download={download} />
            
            {isOpen && (
                <ExcelModel fileName={fileName} fileInputRef={fileInputRef} handleClose={handleClose} handleUploadClick={handleUploadClick} handleFileChange={handleFileChange} handleUPload={handleUPload} />
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
                            {industries.map((indus,ind) => (
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
                            {hirings.map((hiring,ind ) => (
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
                            }}>CareerPage Url</th>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>Overview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx} style={{
                                borderBottom: '1px solid #dee2e6',
                                transition: 'background-color 0.15s ease-in-out'
                            }}
                            onMouseEnter={(e) => e.target.parentElement.style.backgroundColor = '#f8f9fa'}
                            onMouseLeave={(e) => e.target.parentElement.style.backgroundColor = 'transparent'}
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
                                <td style={{ padding: '12px', color: '#495057', maxWidth: '300px' }}>
                                    <div style={{ 
                                        maxHeight: '60px', 
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical'
                                    }}>
                                        {item.companyOverview}
                                    </div>
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
    )
}