import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import UploadButtons from "./UploadButtons";
import { useRef } from "react";
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
        })

    }

    const errorMessage = (message) => {
        toast.error(message, {
            position: 'top-center',
            autoClose: 1000
        })

    }

    const [searchParams, setSearchParams] = useSearchParams();

    const location = searchParams.get("location") || "";
    const price = searchParams.get("price") || "";
    const courseDuration = searchParams.get("courseDuration") || "";
    const modeOfClass = searchParams.get('modeOfClass')
    const page = parseInt(searchParams.get("page")) || 0;
    const [totalPages, setTotalPages] = useState(1);
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef(null);


     const getData = () => {
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

    }, [location, price, courseDuration, modeOfClass, page]);



    const getDropdown = () => {
        axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.COACHING}`).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }


    const updateFilters = (newFilters) => {
        const updatedParams = {
            location,
            price,
            courseDuration,
            modeOfClass,
            page: "0",
            ...newFilters
        };
        setSearchParams(updatedParams);
    };

    const updatePage = (newPage) => {
        setSearchParams({
             location,
            price,
            courseDuration,
            modeOfClass,
            page: newPage.toString()
        });
    };




    const add = () => {

    }

    const upload = () => {
        handleAdd(setIsOpen)
    }

    const download = () => {
        DownloadTemplate(types.COACHING);
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
        axios.post(`${resources.APPLICATION_URL}upload?type=${encodeURIComponent(types.COACHING)}`, formData).then(response => {
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
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{item.courseName}</td>
                                <td>{item.instituteName}</td>
                                <td>{item.courseDuration}</td>
                                <td>{item.courseLink}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>
    )
}