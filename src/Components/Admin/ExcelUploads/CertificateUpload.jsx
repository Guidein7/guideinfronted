import { useState } from "react"
import UploadButtons from "./UploadButtons";
import { useRef } from "react";
import ExcelModel from "./ExcelModel";
import { DownloadTemplate, handleAdd } from "./ExcelReuseCalls";
import { types } from "./types";
import axios from "axios";
import { resources } from "../../resources";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CertificateUpload() {

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
    const courseCategory = searchParams.get("courseCategory") || "";
    const page = parseInt(searchParams.get("page")) || 0;
    const [totalPages, setTotalPages] = useState(1);
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef(null);

    const getData = () => {
        const params = new URLSearchParams({
            type: types.CERTIFICATE,
            page: page.toString(),
            size: "5"
        });

        if (courseCategory && courseCategory.trim() !== "") {
            params.append("courseCategory", courseCategory);
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
    }, [courseCategory, page]);


    const getDropdown = () => {
        axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.CERTIFICATE}`).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }


    const updateFilters = (newFilters) => {
        const updatedParams = {
            courseCategory,
            page: "0",
            ...newFilters
        };
        setSearchParams(updatedParams);
    };

    const updatePage = (newPage) => {
        setSearchParams({
            courseCategory,
            page: newPage.toString()
        });
    };


    const add = () => {

    }

    const upload = () => {
        handleAdd(setIsOpen)
    }

    const download = () => {
        DownloadTemplate(types.CERTIFICATE);
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
        axios.post(`${resources.APPLICATION_URL}upload?type=${encodeURIComponent(types.CERTIFICATE)}`, formData).then(response => {
            console.log(response)
            successMessage(response.data)
        }).catch(error => {
            console.log(error)
            errorMessage('Error Uploading File')
        })
    }
    return (
        <>
            <UploadButtons add={add} upload={upload} download={download} />
            {isOpen && (
                <ExcelModel fileName={fileName} fileInputRef={fileInputRef} handleClose={handleClose} handleUploadClick={handleUploadClick} handleFileChange={handleFileChange} handleUPload={handleUPload} />
            )}


            <select value={courseCategory} onChange={(e) => updateFilters({ courseCategory: e.target.value })}>
                <option value="">All Hiring Status</option>
                <option value="Hiring">Hiring</option>
                <option value="Moderately Hiring">Moderately Hiring</option>
            </select>

            <div className="table-wrapper">
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
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{item.courseCategory}</td>
                                <td>{item.courseTitle}</td>
                                <td>{item.courseDuration}</td>
                                <td>{item.courseLink}</td>
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
        </>
    )
}