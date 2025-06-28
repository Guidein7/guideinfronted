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
            toast.success(message,{
                position:'top-center',
                autoClose:1000
            })
        }
    
         const errorMessage = (message) => {
            toast.error(message,{
                position:'top-center',
                autoClose:1000
            })
        }
    const [searchParams, setSearchParams] = useSearchParams();
    const topic = searchParams.get("topic") || "";
    const page = parseInt(searchParams.get("page")) || 0;
    const [totalPages, setTotalPages] = useState(1);
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef(null);

    const getData = () => {
        const params = new URLSearchParams({
            type: types.YOUTUBE,
            page: page.toString(),
            size: "5"
        });

        if (topic && topic.trim() !== "") {
            params.append("topic", topic);
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
    }, [topic, page]);


    const getDropdown = () => {
        axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.YOUTUBE}`).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }


    const updateFilters = (newFilters) => {
        const updatedParams = {
            topic,
            page: "0",
            ...newFilters
        };
        setSearchParams(updatedParams);
    };

    const updatePage = (newPage) => {
        setSearchParams({
            topic,
            page: newPage.toString()
        });
    };

    const add = () => {

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
        axios.post(`${resources.APPLICATION_URL}upload?type=${encodeURIComponent(types.YOUTUBE)}`, formData).then(response => {
            console.log(response)
            successMessage(response.data)
        }).catch(error => {
            console.log(error)
            errorMessage('Failed to upload File')
        })
    }


    return (
        <>
            <UploadButtons add={add} upload={upload} download={download} />
            {isOpen && (
                <ExcelModel fileName={fileName} fileInputRef={fileInputRef} handleClose={handleClose} handleUploadClick={handleUploadClick} handleFileChange={handleFileChange} handleUPload={handleUPload} />
            )}

              <select value={topic} onChange={(e) => updateFilters({ topic: e.target.value })}>
                <option value="">All Hiring Status</option>
                <option value="Hiring">Hiring</option>
                <option value="Moderately Hiring">Moderately Hiring</option>
            </select>

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
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{item.topic}</td>
                                <td>{item.videoTitle}</td>
                                <td>{item.youtubeUrl}</td>
                                <td>{item.duration}</td>
                                <td>{item.channelName?.split('@')?.at(-1)}</td>
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