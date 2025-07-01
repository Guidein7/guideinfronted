

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { types } from "../../Admin/ExcelUploads/types";
import axios from "axios";
import { resources } from "../../resources";
import { GrCertificate } from "react-icons/gr";
import { RxClock } from "react-icons/rx";
import { HiOutlineAcademicCap, HiOutlineGlobeAlt, HiOutlineExternalLink } from "react-icons/hi";
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Certificate() {
    const [searchParms, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const courseCategory = searchParms.get("courseCategory") || "";
    const page = parseInt(searchParms.get("page")) || 0;
    const courseDuration = searchParms.get('courseDuration') || "";
    const [data, setData] = useState([]);
    const [courseCategories, setCourseCategories] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [durations, setDurations] = useState([]);

    const getData = () => {
        setLoading(true);
        const params = new URLSearchParams({
            type: types.CERTIFICATE,
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
                }
            })
            .catch(error => {
                console.log('Data fetch error:', error);
                setData([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getData();
         
    }, [courseCategory, courseDuration, page]);

    useEffect(() => {
         window.scrollTo(0, 0);
    },[page])

    const updateFilters = (newFilters) => {
        const updatedParams = {
            courseCategory,
            courseDuration,
            page: "0",
            ...newFilters
        };

        Object.keys(updatedParams).forEach(key => {
            if (!updatedParams[key] || updatedParams[key] === "") {
                delete updatedParams[key];
            }
        });

        setSearchParams(updatedParams);
    };

    const updatePage = (newPage) => {
        const currentParams = {
            ...(courseCategory && { courseCategory }),
            ...(courseDuration && { courseDuration }),
            page: newPage.toString()
        };
        setSearchParams(currentParams);
    };

    const getDropdown = () => {
        axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.CERTIFICATE}`)
            .then(response => {
                setCourseCategories(response.data.courseCategory);
                setDurations(response.data.courseDuration);
            })
            .catch(error => {
                console.log('Dropdown error:', error);
            });
    };

    useEffect(() => {
        getDropdown();
    }, []);

    const handleChange = (e) => {
        updateFilters({ courseCategory: e.target.value });
    };

    const handleDuration = (e) => {
        updateFilters({ courseDuration: e.target.value });
    };

    const clearFilters = () => {
        setSearchParams({});
    };

    const hasActiveFilters = courseCategory || courseDuration;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ">
            {/* Header Section */}
            <div className=" border-b border-slate-200 ">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className=" mb-8">
                        <h1 className="md:text-2xl font-bold text-slate-800 mb-2 text-lg">Professional Certificates</h1>
                        <p className="text-slate-600  max-w-2xl ">
                            Advance your career with industry-recognized certificates from top providers
                        </p>
                    </div>


                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
                        <div className="flex items-center gap-3 mb-4">
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Course Category</label>
                                <select
                                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-slate-700"
                                    value={courseCategory}
                                    onChange={handleChange}
                                >
                                    <option value="">All Categories</option>
                                    {courseCategories.map((course, key) => (
                                        <option key={key} value={course}>{course}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Duration</label>
                                <select
                                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-slate-700"
                                    value={courseDuration}
                                    onChange={handleDuration}
                                >
                                    <option value="">All Durations</option>
                                    {durations.map((duration, key) => (
                                        <option key={key} value={duration}>{duration}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="max-w-7xl mx-auto px-6 py-8">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="flex items-center gap-3 text-slate-600">
                            <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin" />
                            <span className="text-lg">Loading courses...</span>
                        </div>
                    </div>
                ) : data.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="mb-4">
                            <GrCertificate className="w-16 h-16 text-slate-400 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-600 mb-2">No courses found</h3>
                        <p className="text-slate-500">Try adjusting your filters to see more results</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {data.map((item, idx) => (
                            <>
                                <div
                                    key={idx}
                                    className="hidden md:block bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 overflow-hidden group"
                                >
                                    <div className="p-8 flex flex-col lg:flex-row gap-8">
                                        {/* Certificate Icon */}
                                        <div className="flex-shrink-0">
                                            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                                                <GrCertificate className="w-12 h-12 text-blue-600" />
                                            </div>
                                        </div>

                                        {/* Course Details */}
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                                                    {item.courseTitle}
                                                </h2>
                                                <div className="flex flex-wrap items-center gap-4 text-slate-600">
                                                    <div className="flex items-center gap-2" title="provider">
                                                        <HiOutlineAcademicCap className="w-4 h-4" />
                                                        <span className="font-medium">{item.provider}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2" title="platform">
                                                        <HiOutlineGlobeAlt className="w-4 h-4" />
                                                        <span>{item.platform}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2" title="duraiton">
                                                        <RxClock className="w-4 h-4" />
                                                        <span className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium">
                                                            {item.courseDuration}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-wrap gap-4">
                                                <a
                                                    href={item?.courseLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                                                >
                                                    Start Course
                                                    <HiOutlineExternalLink className="w-4 h-4" />
                                                </a>

                                                <button
                                                    onClick={() => navigate(`/certificate/${item.id}/${item.courseTitle}`)}
                                                    className="inline-flex items-center gap-2 bg-white text-slate-700 px-6 py-3 rounded-xl font-semibold border-2 border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    key={idx}
                                    className="md:hidden  bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 overflow-hidden group py-2"
                                >
                                    <div className="p-6 flex  gap-4">
                                       
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                                                <GrCertificate className="w-10 h-10 text-blue-600" />
                                            </div>
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                                                {item.courseTitle}
                                            </h2>
                                    </div>
                                   
                                    <div className="flex-1 space-y-4">
                                        <div className="px-4">
                                            
                                            <div className="flex flex-wrap items-center gap-4 text-slate-600">
                                                <div className="flex items-center gap-2" title="provider">
                                                    <HiOutlineAcademicCap className="w-4 h-4" />
                                                    <span className="font-medium">{item.provider}</span>
                                                </div>
                                                <div className="flex items-center gap-2" title="platform">
                                                    <HiOutlineGlobeAlt className="w-4 h-4" />
                                                    <span>{item.platform}</span>
                                                </div>
                                                {/* <div className="flex items-center gap-2" title="duraiton">
                                                    <RxClock className="w-4 h-4" />
                                                    <span className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium">
                                                        {item.courseDuration}
                                                    </span>
                                                </div> */}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-1 justify-center">
                                            <a
                                                href={item?.courseLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-1 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                                            >
                                                Start Course
                                               
                                            </a>

                                            <button
                                                onClick={() => navigate(`/certificate/${item.id}/${item.courseTitle}`)}
                                                className="inline-flex items-center gap-2 bg-white text-slate-700 px-5 py-1 rounded-xl font-semibold border-2 border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && !loading && (
                    <div className="flex justify-center items-center gap-2 mt-12 pt-8 border-t border-slate-200">
                        <button
                            onClick={() => updatePage(Math.max(0, page - 1))}
                            disabled={page === 0}
                            className="px-5 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            Previous
                        </button>

                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => updatePage(i)}
                                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${page === i
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => updatePage(Math.min(totalPages - 1, page + 1))}
                            disabled={page === totalPages - 1}
                            className="px-5 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}