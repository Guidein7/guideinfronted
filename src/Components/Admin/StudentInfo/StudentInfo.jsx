import axios from "axios"
import { resources } from "../../resources"
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { types } from "../ExcelUploads/types";


export default function StudentInfo (){
 const [searchParams, setSearchParams] = useSearchParams();
 const[loading,setLoading] = useState(false)
     const page = parseInt(searchParams.get("page")) || 0;
    const [totalPages, setTotalPages] = useState(1);
     const [data, setData] = useState([]);

     const getData = () => {
        setLoading(true);
        const params = new URLSearchParams({
            type: types.STUDENT,
            page: page.toString(),
            size: "10"
        });

       

        axios.get(`${resources.APPLICATION_URL}view/data?${params}`)
            .then(response => {
                if (Array.isArray(response.data.content)) {
                    setData(response.data.content);
                    setTotalPages(response.data.totalPages || 1);
                } else {
                    setData([]);
                    setTotalPages(1);
                }
            })
            .catch(error => {
                console.log(error);
                errorMessage('Failed to fetch data');
                setData([]);
                setTotalPages(1);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getData();
    },[page])

    const updatePage = (newPage) => {
        setSearchParams({
           
            page: newPage.toString()
        });
    };


    return (
        <>
        
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
                            }}> Name</th>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>Mobile Number</th>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>Email</th>
                            <th style={{
                                padding: '15px 12px',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#495057',
                                borderBottom: '2px solid #dee2e6'
                            }}>Institute Id</th>
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
                                <td style={{ padding: '12px', color: '#495057', fontWeight: '500' }}>{item.name}</td>
                                <td style={{ padding: '12px', color: '#495057' }}>{item.mobileNumber}</td>
                                <td style={{ padding: '12px', color: '#007bff', wordBreak: 'break-all' }}>
                                   {item.email}
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
                                        {item.instituteId}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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
        </>
    )


}