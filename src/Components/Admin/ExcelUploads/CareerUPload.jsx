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
        <div>
            <UploadButtons add={add} upload={upload} download={download} />
            {isOpen && (
                <ExcelModel fileName={fileName} fileInputRef={fileInputRef} handleClose={handleClose} handleUploadClick={handleUploadClick} handleFileChange={handleFileChange} handleUPload={handleUPload} />
            )}
            <input
                placeholder="companyName company"
                value={companyName}
                onChange={(e) => updateFilters({ companyName: e.target.value })}
            />

            <select value={industry} onChange={(e) => updateFilters({ industry: e.target.value })}>
                <option value="">All Industries</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
            </select>

            <select value={hiringStatus} onChange={(e) => updateFilters({ hiringStatus: e.target.value })}>
                <option value="">All Hiring Status</option>
                <option value="Hiring">Hiring</option>
                <option value="Moderately Hiring">Moderately Hiring</option>
            </select>

            <div className="table-wrapper">
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Company Name</th>
                            <th>Industry</th>
                            <th>CareerPage Url</th>
                            <th>Overview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{item.companyName}</td>
                                <td>{item.industry}</td>
                                <td>{item.careerPageUrl}</td>
                                <td>{item.companyOverview}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <div>
                <button onClick={() => updatePage(page - 1)} disabled={page === 0}>Prev</button>
                <span>{(page + 1) / (totalPages)}</span>
                <button onClick={() => updatePage(page + 1)} disabled={page + 1 >= totalPages}>Next</button>
            </div>

        </div>
    )

}