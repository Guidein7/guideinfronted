

// import { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { types } from "../../Admin/ExcelUploads/types";
// import axios from "axios";
// import { resources } from "../../resources";
// import { GrCertificate } from "react-icons/gr";
// import { RxClock } from "react-icons/rx";
// import { HiOutlineAcademicCap, HiOutlineGlobeAlt, HiOutlineExternalLink } from "react-icons/hi";
// import { BiFilterAlt } from "react-icons/bi";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { ChevronLeft,ChevronRight } from "lucide-react";

// export default function Certificate() {
//     const [searchParms, setSearchParams] = useSearchParams();
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const courseCategory = searchParms.get("courseCategory") || "";
//     const page = parseInt(searchParms.get("page")) || 0;
//     const courseDuration = searchParms.get('courseDuration') || "";
//     const [data, setData] = useState([]);
//     const [courseCategories, setCourseCategories] = useState([]);
//     const [totalPages, setTotalPages] = useState(1);
//     const [durations, setDurations] = useState([]);

//     const getData = () => {
//         setLoading(true);
//         const params = new URLSearchParams({
//             type: types.CERTIFICATE,
//             page: page.toString(),
//             size: "5"
//         });

//         if (courseCategory && courseCategory.trim() !== "") {
//             params.append("courseCategory", courseCategory);
//         }

//         if (courseDuration && courseDuration.trim() !== "") {
//             params.append("courseDuration", courseDuration);
//         }

//         axios.get(`${resources.APPLICATION_URL}view/data?${params}`)
//             .then(response => {
//                 if (Array.isArray(response.data.content)) {
//                     setData(response.data.content);
//                     setTotalPages(response.data.totalPages || 1);
//                 }
//             })
//             .catch(error => {
//                 console.log('Data fetch error:', error);
//                 setData([]);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     useEffect(() => {
//         getData();

//     }, [courseCategory, courseDuration, page]);

//     useEffect(() => {
//          window.scrollTo(0, 0);
//     },[page])

//     const updateFilters = (newFilters) => {
//         const updatedParams = {
//             courseCategory,
//             courseDuration,
//             page: "0",
//             ...newFilters
//         };

//         Object.keys(updatedParams).forEach(key => {
//             if (!updatedParams[key] || updatedParams[key] === "") {
//                 delete updatedParams[key];
//             }
//         });

//         setSearchParams(updatedParams);
//     };

//     const updatePage = (newPage) => {
//         const currentParams = {
//             ...(courseCategory && { courseCategory }),
//             ...(courseDuration && { courseDuration }),
//             page: newPage.toString()
//         };
//         setSearchParams(currentParams);
//     };

//     const getDropdown = () => {
//         axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.CERTIFICATE}`)
//             .then(response => {
//                 setCourseCategories(response.data.courseCategory);
//                 setDurations(response.data.courseDuration);
//             })
//             .catch(error => {
//                 console.log('Dropdown error:', error);
//             });
//     };

//     useEffect(() => {
//         getDropdown();
//     }, []);

//     const handleChange = (e) => {
//         updateFilters({ courseCategory: e.target.value });
//     };

//     const handleDuration = (e) => {
//         updateFilters({ courseDuration: e.target.value });
//     };

//     const clearFilters = () => {
//         setSearchParams({});
//     };

//     const hasActiveFilters = courseCategory || courseDuration;

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ">
//             {/* Header Section */}
//             <div className=" border-b border-slate-200 ">
//                 <div className="max-w-7xl mx-auto px-6 py-8">
//                     <div className=" mb-8">
//                         <h1 className="md:text-2xl font-bold text-slate-800 mb-2 text-lg">Professional Certificates</h1>
//                         <p className="text-slate-600  max-w-2xl ">
//                            Get Free Certifications from Top Platforms – Skill Up Today
//                         </p>
//                     </div>


//                     <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
//                         <div className="flex items-center gap-3 mb-4">
//                             {hasActiveFilters && (
//                                 <button
//                                     onClick={clearFilters}
//                                     className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                                 >
//                                     Clear all filters
//                                 </button>
//                             )}
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium text-slate-700">Course Category</label>
//                                 <select
//                                     className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-slate-700"
//                                     value={courseCategory}
//                                     onChange={handleChange}
//                                 >
//                                     <option value="">All Categories</option>
//                                     {courseCategories.map((course, key) => (
//                                         <option key={key} value={course}>{course}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-sm font-medium text-slate-700">Duration</label>
//                                 <select
//                                     className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-slate-700"
//                                     value={courseDuration}
//                                     onChange={handleDuration}
//                                 >
//                                     <option value="">All Durations</option>
//                                     {durations.map((duration, key) => (
//                                         <option key={key} value={duration}>{duration}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//             <div className="max-w-7xl mx-auto px-6 py-8">
//                 {loading ? (
//                     <div className="flex justify-center items-center py-20">
//                         <div className="flex items-center gap-3 text-slate-600">
//                             <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin" />
//                             <span className="text-lg">Loading courses...</span>
//                         </div>
//                     </div>
//                 ) : data.length === 0 ? (
//                     <div className="text-center py-20">
//                         <div className="mb-4">
//                             <GrCertificate className="w-16 h-16 text-slate-400 mx-auto" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-slate-600 mb-2">No courses found</h3>
//                         <p className="text-slate-500">Try adjusting your filters to see more results</p>
//                     </div>
//                 ) : (
//                     <div className="space-y-6">
//                         {data.map((item, idx) => (
//                             <>
//                                 <div
//                                     key={idx}
//                                     className="hidden md:block bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 overflow-hidden group"
//                                 >
//                                     <div className="p-8 flex flex-col lg:flex-row gap-8">
//                                         {/* Certificate Icon */}
//                                         <div className="flex-shrink-0">
//                                             <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
//                                                 <GrCertificate className="w-12 h-12 text-blue-600" />
//                                             </div>
//                                         </div>

//                                         {/* Course Details */}
//                                         <div className="flex-1 space-y-4">
//                                             <div>
//                                                 <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
//                                                     {item.courseTitle}
//                                                 </h2>
//                                                 <div className="flex flex-wrap items-center gap-4 text-slate-600">
//                                                     <div className="flex items-center gap-2" title="provider">
//                                                         <HiOutlineAcademicCap className="w-4 h-4" />
//                                                         <span className="font-medium">{item.provider}</span>
//                                                     </div>
//                                                     <div className="flex items-center gap-2" title="platform">
//                                                         <HiOutlineGlobeAlt className="w-4 h-4" />
//                                                         <span>{item.platform}</span>
//                                                     </div>
//                                                     <div className="flex items-center gap-2" title="duraiton">
//                                                         <RxClock className="w-4 h-4" />
//                                                         <span className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium">
//                                                             {item.courseDuration}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             {/* Action Buttons */}
//                                             <div className="flex flex-wrap gap-4">
//                                                 <a
//                                                     href={item?.courseLink}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                     className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
//                                                 >
//                                                     Start Course
//                                                     <HiOutlineExternalLink className="w-4 h-4" />
//                                                 </a>

//                                                 <button
//                                                     onClick={() => navigate(`/certificate/${item.id}/${item.courseTitle}`)}
//                                                     className="inline-flex items-center gap-2 bg-white text-slate-700 px-6 py-3 rounded-xl font-semibold border-2 border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
//                                                 >
//                                                     View Details
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div
//                                     key={idx}
//                                     className="md:hidden  bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 overflow-hidden group py-2"
//                                 >
//                                     <div className="p-6 flex  gap-4">

//                                         <div className="flex-shrink-0">
//                                             <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
//                                                 <GrCertificate className="w-10 h-10 text-blue-600" />
//                                             </div>
//                                         </div>
//                                         <h2 className=" md:text-xl font-semibold md:font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
//                                                 {item.courseTitle}
//                                             </h2>
//                                     </div>

//                                     <div className="flex-1 space-y-4">
//                                         <div className="px-4">

//                                             <div className="flex flex-wrap items-center gap-4 text-slate-600">
//                                                 <div className="flex items-center gap-2" title="provider">
//                                                     <HiOutlineAcademicCap className="w-4 h-4" />
//                                                     <span className="font-medium">{item.provider}</span>
//                                                 </div>
//                                                 <div className="flex items-center gap-2" title="platform">
//                                                     <HiOutlineGlobeAlt className="w-4 h-4" />
//                                                     <span>{item.platform}</span>
//                                                 </div>
//                                                 {/* <div className="flex items-center gap-2" title="duraiton">
//                                                     <RxClock className="w-4 h-4" />
//                                                     <span className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium">
//                                                         {item.courseDuration}
//                                                     </span>
//                                                 </div> */}
//                                             </div>
//                                         </div>

//                                         {/* Action Buttons */}
//                                         <div className="flex flex-wrap gap-1 justify-center">
//                                             <a
//                                                 href={item?.courseLink}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-1 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
//                                             >
//                                                 Start Course

//                                             </a>

//                                             <button
//                                                 onClick={() => navigate(`/certificate/${item.id}/${item.courseTitle}`)}
//                                                 className="inline-flex items-center gap-2 bg-white text-slate-700 px-5 py-1 rounded-xl font-semibold border-2 border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
//                                             >
//                                                 View Details
//                                             </button>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </>
//                         ))}
//                     </div>
//                 )}


//                  {totalPages > 1 && (
//           <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-5">
//             <div className="flex items-center gap-2 mb-2 sm:mb-0">
//               <button
//                 onClick={() => updatePage(Math.max(0, page - 1))}
//                 disabled={page === 0}
//                 className="px-3 py-2 sm:px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft/>
//               </button>

//               {/* Show limited page numbers on mobile */}
//               <div className="flex gap-1 sm:gap-2">
//                 {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
//                   let pageNum;
//                   if (totalPages <= 5) {
//                     pageNum = i;
//                   } else if (page < 3) {
//                     pageNum = i;
//                   } else if (page > totalPages - 4) {
//                     pageNum = totalPages - 5 + i;
//                   } else {
//                     pageNum = page - 2 + i;
//                   }

//                   return (
//                     <button
//                       key={pageNum}
//                       onClick={() => updatePage(pageNum)}
//                       className={`px-3 py-2 sm:px-4 rounded-lg text-sm font-medium ${
//                         page === pageNum
//                           ? 'bg-blue-600 text-white'
//                           : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
//                       }`}
//                     >
//                       {pageNum + 1}
//                     </button>
//                   );
//                 })}
//               </div>

//               <button
//                 onClick={() => updatePage(Math.min(totalPages - 1, page + 1))}
//                 disabled={page === totalPages - 1}
//                 className="px-3 py-2 sm:px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight/>
//               </button>
//             </div>
//           </div>
//         )}

//             </div>
//         </div>
//     );
// }


import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { types } from "../../Admin/ExcelUploads/types";
import axios from "axios";
import { resources } from "../../resources";
import { GrCertificate } from "react-icons/gr";
import { RxClock } from "react-icons/rx";
import { HiOutlineAcademicCap, HiOutlineGlobeAlt, HiOutlineExternalLink } from "react-icons/hi";
import { BiFilterAlt } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ChevronLeft, ChevronRight, ChevronDown, Filter, Search, } from "lucide-react";
import { Link } from 'react-router-dom'
import certificate from '../../../assets/certificate.png'

const FilterDropdown = ({ label, options, selected, onChange, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionSelect = (value) => {
        onChange(value);
        setIsOpen(false);
    };

    const handleClearSelection = () => {
        onChange('');
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-2 py-2 sm:px-4 sm:py-3 text-left bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between hover:bg-gray-50 transition-colors ${selected ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                    }`}
            >
                <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                    {Icon && <Icon className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${selected ? 'text-blue-600' : 'text-gray-500'}`} />}
                    <span className={`text-xs sm:text-sm font-medium truncate ${selected ? 'text-blue-700' : 'text-gray-700'}`}>
                        {selected || `Select ${label}`}
                    </span>
                </div>
                <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''} ${selected ? 'text-blue-600' : 'text-gray-500'
                    }`} />
            </button>

            {isOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 sm:max-h-60 overflow-y-auto">
                    {selected && (
                        <button
                            onClick={handleClearSelection}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 text-xs sm:text-sm text-gray-500 italic"
                        >
                            Clear selection
                        </button>
                    )}
                    {options.map(option => (
                        <button
                            key={option}
                            onClick={() => handleOptionSelect(option)}
                            className={`w-full px-3 py-2 text-left hover:bg-gray-50 text-xs sm:text-sm transition-colors ${selected === option ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Certificate() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showFilters, setShowFilters] = useState(false);

    const courseCategory = searchParams.get("courseCategory") || "";
    const courseDuration = searchParams.get("courseDuration") || "";
    const searchQuery = searchParams.get("searchQuery") || "";
    const page = parseInt(searchParams.get("page")) || 0;

    const [data, setData] = useState([]);
    const [courseCategories, setCourseCategories] = useState([]);
    const [durations, setDurations] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

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
            params.append("duration", courseDuration.trim());
        }
        if (searchQuery && searchQuery.trim() !== "") {
            params.append("searchQuery", searchQuery);
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

    const getDropdown = () => {
        axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.CERTIFICATE}`)
            .then(response => {
                setCourseCategories(response.data.courseCategory || []);
                setDurations(response.data.courseDuration || []);
            })
            .catch(error => {
                console.log('Dropdown error:', error);
            });
    };

    const updateFilters = (newFilters) => {
        const updatedParams = {
            courseCategory,
            courseDuration,
            searchQuery,
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
            ...(searchQuery && { searchQuery }),
            page: newPage.toString()
        };
        setSearchParams(currentParams);
    };

    const handleCategoryChange = (selected) => {
        updateFilters({ courseCategory: selected });
    };

    const handleDurationChange = (selected) => {
        updateFilters({ courseDuration: selected });
    };

    const clearFilters = () => {
        setSearchParams({});
    };

    const hasActiveFilters = courseCategory || courseDuration || searchQuery;

    useEffect(() => {
        getDropdown();
    }, []);

    useEffect(() => {
        getData();
    }, [courseCategory, courseDuration, searchQuery, page]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="fixed z-10 bg-white p-2 w-full">
                <div className="max-w-7xl mx-auto px-6 py-1">
                    <div className="mb-3">
                        <div className="flex gap-1 items-center text-blue-500 mb-2">
                            <Link to="/" className="hover:underline">Home</Link>
                            <ChevronRight size={18} />
                            <Link to="/certificate" className="hover:underline">Certificates</Link>
                        </div>
                        <h1 className="md:text-2xl font-bold text-slate-800 mb-2 text-lg">Professional Certificates</h1>
                        <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
                            Get Free Certifications from Top Platforms – Skill Up Today
                        </p>
                    </div>

                    <div className="md:hidden my-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`px-3 py-2 rounded-md flex items-center justify-center gap-2 transition-colors ${hasActiveFilters
                                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                : 'bg-white text-black border border-gray-300'
                                }`}
                        >
                            <Filter className="w-4 h-4" />
                            <span>Filters</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    <div className={`bg-white rounded-lg md:mt-2 p-4 md:p-0 md:w-[50%] mx-auto ${showFilters ? 'block' : 'hidden'} md:block`}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <FilterDropdown
                                label="Course Category"
                                options={courseCategories}
                                selected={courseCategory}
                                onChange={handleCategoryChange}
                                icon={GrCertificate}
                            />
                            <FilterDropdown
                                label="Duration"
                                options={durations}
                                selected={courseDuration}
                                onChange={handleDurationChange}
                                icon={RxClock}
                            />
                            {/* <div className="lg:col-span-1">
                                <input
                                    type="text"
                                    placeholder="Search by course title"
                                    value={searchQuery}
                                    onChange={e => updateFilters({ searchQuery: e.target.value })}
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                                />
                            </div> */}
                            <div className="hidden md:block">
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-54   ">
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
                            <img src={certificate} className="w-16 h-16 text-slate-400 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-600 mb-2">No courses found</h3>
                        <p className="text-slate-500">Try adjusting your filters to see more results</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {data.map((item, idx) => (
                            <>
                                <div
                                    onClick={() => navigate(`/certificate/${item.id}/${item.courseTitle}`)}
                                    key={idx}
                                    className="hidden md:block bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 overflow-hidden group"
                                >
                                    <div className="p-8 flex flex-col lg:flex-row gap-8">
                                        <div className="flex-shrink-0">
                                            <div className="w-20 h-20 bg-gray-200   rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                                                <img src={certificate} className="w-16 h-16 text-slate-400 mx-auto" />
                                            </div>
                                        </div>
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
                                                    <div className="flex items-center gap-2" title="duration">
                                                        <RxClock className="w-4 h-4" />
                                                        <span className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium">
                                                            {item.courseDuration}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
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
                                    className="md:hidden bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 overflow-hidden group py-2"
                                >
                                    <div className="p-2 flex gap-4 items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 bg-gray-200  rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">

                                                <img src={certificate} className="w-12 h-12 text-slate-400 mx-auto" />

                                            </div>
                                        </div>
                                        <h2 className="md:text-xl font-semibold md:font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
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
                                            </div>
                                        </div>
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

                {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-5">
                        <div className="flex items-center gap-2 mb-2 sm:mb-0">
                            <button
                                onClick={() => updatePage(Math.max(0, page - 1))}
                                disabled={page === 0}
                                className="px-3 py-2 sm:px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft />
                            </button>
                            <div className="flex gap-1 sm:gap-2">
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i;
                                    } else if (page < 3) {
                                        pageNum = i;
                                    } else if (page > totalPages - 4) {
                                        pageNum = totalPages - 5 + i;
                                    } else {
                                        pageNum = page - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => updatePage(pageNum)}
                                            className={`px-3 py-2 sm:px-4 rounded-lg text-sm font-medium ${page === pageNum
                                                ? 'bg-blue-600 text-white'
                                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {pageNum + 1}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                onClick={() => updatePage(Math.min(totalPages - 1, page + 1))}
                                disabled={page === totalPages - 1}
                                className="px-3 py-2 sm:px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}