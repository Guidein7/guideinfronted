
// import React, { useState, useEffect } from 'react';
// import { ChevronDown, MapPin, Clock, GraduationCap, Search, Tag, ChevronRight, Star, ExternalLink, Phone, Globe, DollarSign, Building2, IndianRupee, ChevronLeft } from 'lucide-react';
// import { IoCallOutline } from "react-icons/io5";
// import { LuMessageCircleMore } from "react-icons/lu";
// import { CgDetailsMore } from "react-icons/cg";
// import { Link } from 'react-router-dom';

// import { resources } from '../../resources';
// import { types } from '../../Admin/ExcelUploads/types';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import maps from '../../../assets/maps.webp';
// import EnquiryModal from './EnquiryModel';
// import 'react-toastify/dist/ReactToastify.css';



// const successMessage = (message) => {
//   toast.success(message, {
//     position: 'top-center',
//     autoClose: 3000
//   })
// }


// const errorMessage = (message) => {
//   toast.error(message, {
//     position: 'top-center',
//     autoClose: 1000
//   })
// }


// // Single Select Filter Dropdown Component
// const SingleSelectDropdown = ({ label, options, selected, onChange, icon: Icon, placeholder }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleSelect = (value) => {
//     onChange(value === selected ? '' : value); // Toggle selection
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full px-4 py-3 text-left bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
//       >
//         <div className="flex items-center gap-3">
//           {Icon && <Icon className="w-5 h-5 text-gray-500" />}
//           <span className={`${selected ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
//             {selected || placeholder || `Select ${label}`}
//           </span>
//         </div>
//         <div className="flex items-center gap-2">
//           {selected && (
//             <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
//               Selected
//             </span>
//           )}
//           <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//         </div>
//       </button>

//       {isOpen && (
//         <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
//           <div className="p-2">
//             {options.map(option => (
//               <button
//                 key={option}
//                 onClick={() => handleSelect(option)}
//                 className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${selected === option
//                   ? 'bg-blue-50 text-blue-700 font-medium'
//                   : 'hover:bg-gray-50 text-gray-700'
//                   }`}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Enhanced Institute Card Component
// const InstituteCard = ({ course, setShowModel, setId }) => {

//   const navigate = useNavigate()
//   // Map API response to expected format
//   const mappedCourse = {
//     courseName: course.courseName,
//     instituteName: course.instituteName,
//     location: course.location,
//     address: course.address,
//     mobile: course.mobileNumber ? `${course.mobileNumber}` : 'N/A',
//     duration: course.courseDuration,
//     mode: course.modeOfClass ,
//     batch: course.courseBatch,
//     computerLab: course.computerLab === '1.0' ? 'Available' : 'Not Available',
//     price: `₹${parseFloat(course.estimatedCoursePrice).toLocaleString('en-IN')}`,
//     rating: course.rating,
//     reviews: parseInt(course.numberOfReviews) || 0,
//     website: course.websiteUrl,
//     jobAssistance: course.jobAssistance === '1.0' ? 'Yes' : 'No',
//     description: course.instituteDescription,
//     mapLocation: course.mapLocation,
//     tags: course.tags ? course.tags.split(' ').map(tag => tag.replace('#', '')) : []
//   };

//   return (
//     <>
//       <div className=" hidden md:block bg-white border border-gray-200 rounded-2xl p-2 hover:shadow-xl transition-all duration-300 hover:border-blue-200 transform hover:-translate-y-1">
//         <div className="flex flex lg:flex-row gap-6">
//           {/* Institute logo */}
//           <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
//             <GraduationCap className="w-10 h-10 text-white" />
//           </div>

//           {/* Institute info */}
//           <div className="flex-1 min-w-0">
//             <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
//               <div className="flex-1">
//                 <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{mappedCourse.courseName}</h3>
//                 <p className="text-lg text-blue-600 font-semibold mb-3 flex items-center gap-2">
//                   <Building2 className="w-5 h-5" />
//                   {mappedCourse.instituteName}
//                 </p>
//                 {/* <p className='flex gap-2 items-center'> <span>{mappedCourse.price} (estimated) </span></p> */}
//               </div>
//               <a
//                 href={mappedCourse.mapLocation}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-2 sm:mt-0 px-4 py-2  text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center gap-2 self-start"
//               >
//                 <img src={maps} className='w-8 h-8' />

//               </a>
//             </div>

//             {/* Course details */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//               <div title='location' className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
//                 <MapPin className="w-4 h-4 text-gray-500" />
//                 <span className="font-medium">{mappedCourse.location}</span>
//               </div>
//               <div title='course duration' className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
//                 <Clock className="w-4 h-4 text-gray-500" />
//                 <span className="font-medium">{mappedCourse.duration}</span>
//               </div>
//               <div title='class mode' className="flex items-center gap-2">
//                 <span className={`px-3 py-2 rounded-lg text-sm font-semibold ${mappedCourse.mode === 'Online' ? 'bg-green-100 text-green-800' :
//                   mappedCourse.mode === 'Offline' ? 'bg-orange-100 text-orange-800' :
//                     'bg-purple-100 text-purple-800'
//                   }`}>
//                   {mappedCourse.mode}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                 <span className="font-semibold text-gray-900">{mappedCourse.rating}</span>
//                 <span className="text-gray-500">({mappedCourse.reviews} reviews)</span>
//               </div>
//             </div>

//             {/* Description */}
//             <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">{mappedCourse.description}</p>

//             {/* Action buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//               <a
//                 href={`tel:${Number(mappedCourse.mobile).toString()}`}
//                 className="flex items-center justify-center gap-3 bg-[#058a07] hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
//               >
//                 <IoCallOutline className="w-5 h-5" />
//                 <span>{Number(mappedCourse.mobile).toString()}</span>
//               </a>

//               <button
//                 onClick={() => { setId(course.id); setShowModel(true) }}
//                 className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
//               >
//                 <LuMessageCircleMore className="w-5 h-5" />
//                 <span>Request Callback</span>
//               </button>

//               <button
//                 onClick={() => navigate(`/institute/${course.id}/${mappedCourse.instituteName}`)}
//                 className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-all duration-200 border border-gray-200 hover:border-gray-300"
//               >
//                 <CgDetailsMore className="w-5 h-5" />
//                 <span>View Details</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div onClick={() => navigate(`/institute/${course.id}/${encodeURIComponent(mappedCourse.instituteName)}`)} className='md:hidden bg-white border border-gray-200 rounded-2xl p-2 flex flex-col gap-1'>
//         <div className='flex gap-5'>
//           <div>
//             <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
//               <GraduationCap className="w-10 h-10 text-white" />
//             </div>
//           </div>
//           <div className='flex flex-col gap-1'>
//             <div className='flex flex-col'>
//               <div className='flex justify-between items-center gap-5 '>
//               <span className='text-[20px] font-bold'>{mappedCourse.courseName}</span>
//               {/* <Link className='text-blue-500 text-xs underline' to={`/institute/${course.id}/${mappedCourse.instituteName}`}>View Details</Link> */}
//               </div>
//               <Link to={`/institute/${course.id}/${mappedCourse.instituteName}`} className='text-[16px] text-blue-500'>{mappedCourse.instituteName}</Link>
//               {/* <p>{mappedCourse.price} - estimated price</p> */}
//             </div>
//             <div className='flex gap-2 items-center'>
//               <span className='bg-blue-700 text-white flex items-center p-1 gap-2 w-[60px] rounded-lg'>
//                 <span> {mappedCourse.rating}</span>
//                 <Star size={16} />
//               </span>
//               <div className='flex'>
//                 <img className='w-6 h-6' src={maps} />
//                 <span> {mappedCourse.location}</span>
//               </div>
//             </div>



//           </div>
//         </div>
//         {/* <div className='flex flex-wrap gap-2 justify-center items-center my-2'>
//           <Tag size={16} className='text-green-400' />
//           {mappedCourse?.tags?.slice(0, 2)?.map((tag, idx) => (

//             <div key={idx} className=''>
//               <span className='bg-green-100 p-1 rounded-lg text-sm '>{tag}</span>
//             </div>
//           ))}
//         </div> */}


//         <div className="flex flex gap-3 justify-center my-2">
//           <a
//             href={`tel:${Number(mappedCourse.mobile).toString()}`}
//             onClick={(e) => {
//     e.stopPropagation();
//     // Optional: If you want to prevent default <a> behavior (e.g., for modal), use e.preventDefault();
//   }}
//             className="flex items-center justify-center px-2 gap-2 bg-[#058a07] hover:bg-green-600 text-white py-1 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
//           >
//             <IoCallOutline className="w-5 h-5" />
//             <span>Call Now</span>
//           </a>

//           <button
//             onClick={(e) => {e.stopPropagation(); setId(course.id); setShowModel(true) }}
//             className="flex items-center justify-cente px-2 gap-2 bg-blue-700 hover:bg-blue-700 text-white py-1  rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
//           >
//             <LuMessageCircleMore className="w-5 h-5" />
//             <span>Request Callback</span>
//           </button>
//         </div>




//       </div>
//     </>
//   );
// };

// // Enhanced Modal Component


// const Institute = () => {

//   const [searchCompany, setSearchCompany] = useState('');
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [selectedPrice, setSelectedPrice] = useState('');
//   const [selectedDuration, setSelectedDuration] = useState('');
//   const [selectedMode, setSelectedMode] = useState('');
//   const [showModel, setShowModel] = useState(false);
//   const [data, setData] = useState([]);
//   const [id, setId] = useState(null)
//   const [dropdownData, setDropdownData] = useState({
//     location: [],
//     price: [],
//     courseDuration: [],
//     modeOfClass: []
//   });
//   const [loading, setLoading] = useState(false);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(0);

//   const getData = () => {
//     setLoading(true);
//     const params = new URLSearchParams({
//       type: types.COACHING,
//       page: currentPage.toString(),
//       size: "5"
//     });

//     if (selectedLocation && selectedLocation.trim() !== "") {
//       params.append("location", selectedLocation);
//     }

//     if (selectedPrice && selectedPrice.trim() !== "") {
//       const numericPrice = selectedPrice.replace(/[₹,]/g, '');
//       params.append("price", numericPrice);
//     }

//     if (selectedDuration && selectedDuration.trim() !== "") {
//       params.append("courseDuration", selectedDuration);
//     }

//     if (selectedMode && selectedMode.trim() !== "") {
//       const apiValue = selectedMode;
//       params.append("modeOfClass", apiValue);
//     }

//     // Add company search if exists
//     // if (searchCompany && searchCompany.trim() !== "") {
//     //   params.append("instituteName", searchCompany);
//     // }

//     axios.get(`${resources.APPLICATION_URL}view/data?${params}`)
//       .then(response => {
//         if (Array.isArray(response.data.content)) {
//           setData(response.data.content);
//           setTotalPages(response.data.totalPages || 1);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//         setData([]);
//       })
//       .finally(() => setLoading(false));
//   };

//   const getDropdownData = () => {
//     axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.COACHING}`)
//       .then(response => {
//         setDropdownData(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching dropdown data:", error);
//       });
//   };

//   useEffect(() => {
//     getDropdownData();
//   }, []);

//   useEffect(() => {
//     getData();
//   }, [currentPage, selectedPrice, selectedLocation, selectedDuration, selectedMode]);

//   useEffect(() => {
//          window.scrollTo(0, 0);
//     },[currentPage])

//   // const getModeDisplayName = (modeValue) => {
//   //   switch (modeValue) {
//   //     case '1.0': return 'Online';
//   //     case '2.0': return 'Offline';
//   //     case '3.0': return 'Hybrid';
//   //     default: return modeValue;
//   //   }
//   // };

//   const getModeApiValue = (displayName) => {
//     switch (displayName) {
//       case 'Online': return '1.0';
//       case 'Offline': return '2.0';
//       case 'Hybrid': return '3.0';
//       default: return displayName;
//     }
//   };

//   const formatPrice = (price) => {
//     return `₹${parseInt(price).toLocaleString('en-IN')}`;
//   };

//   const clearFilters = () => {
//     setSelectedLocation('');
//     setSelectedPrice('');
//     setSelectedDuration('');
//     setSelectedMode('');
//     setSearchCompany('');
//     setCurrentPage(0);
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const modeOptions = dropdownData.modeOfClass || [];
//   const priceOptions = dropdownData.price?.map(price => formatPrice(price)) || [];
//   const locationOptions = dropdownData.location || [];
//   const durationOptions = dropdownData.courseDuration || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       <ToastContainer />
//       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
//         <div className="mb-8">
//           <div className="flex gap-2 items-center text-blue-600 mb-4">
//             <a href="/" className="hover:text-blue-800 transition-colors duration-200">Home</a>
//             <ChevronRight size={18} />
//             <span className="text-gray-600">Institutes</span>
//           </div>
//           <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Find Your Perfect Course</h1>
//           <p className="md:text-lg text-gray-600">Find the Best Coaching Institutes – Online & Offline</p>
//         </div>

//         {/* Enhanced Filters */}
//         <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-lg">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">Filter Your Search</h2>
//             <button
//               onClick={clearFilters}
//               className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 underline"
//             >
//               Clear All Filters
//             </button>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
//             {/* Company Search */}
//             {/* <div className="xl:col-span-2">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <Building2 className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search by company name"
//                   value={searchCompany}
//                   onChange={e => setSearchCompany(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
//                 />
//               </div>
//             </div> */}

//             {/* Location Filter */}
//             <SingleSelectDropdown
//               label="Location"
//               options={locationOptions}
//               selected={selectedLocation}
//               onChange={setSelectedLocation}
//               icon={MapPin}
//               placeholder="Any Location"
//             />

//             {/* Price Filter */}
//             {/* <SingleSelectDropdown
//               label="Price"
//               options={priceOptions}
//               selected={selectedPrice}
//               onChange={setSelectedPrice}
//               icon={IndianRupee}
//               placeholder="Any Price"
//             /> */}

//             {/* Duration Filter */}
//             <SingleSelectDropdown
//               label="Duration"
//               options={durationOptions}
//               selected={selectedDuration}
//               onChange={setSelectedDuration}
//               icon={Clock}
//               placeholder="Any Duration"
//             />

//             {/* Mode Filter */}
//             <SingleSelectDropdown
//               label="Mode"
//               options={modeOptions}
//               selected={selectedMode}
//               onChange={setSelectedMode}
//               icon={GraduationCap}
//               placeholder="Any Mode"
//             />
//           </div>
//         </div>

//         {/* Results count */}
//         {/* <div className="mb-6">
//           <p className="text-lg text-gray-600">
//             Showing <span className="font-semibold text-gray-900">{data.length}</span> courses
//             {totalPages > 1 && (
//               <span> (Page {currentPage + 1} of {totalPages})</span>
//             )}
//           </p>
//         </div> */}

//         {/* Loading state */}
//         {loading && (
//           <div className="text-center py-20">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
//             <p className="text-gray-500 mt-6 text-lg">Loading courses...</p>
//           </div>
//         )}

//         {/* Institute Cards */}
//         {!loading && (
//           <div className="space-y-6 mb-8">
//             {data.length > 0 ? (
//               data.map((course, index) => (
//                 <InstituteCard key={course.id || index} course={course} setShowModel={setShowModel} setId={setId} />
//               ))
//             ) : (
//               <div className="text-center py-20">
//                 <GraduationCap className="w-20 h-20 text-gray-300 mx-auto mb-6" />
//                 <h3 className="text-2xl font-semibold text-gray-900 mb-2">No courses found</h3>
//                 <p className="text-gray-500 text-lg">Try adjusting your filters to find more courses.</p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && !loading && (
//   <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-8">
//     <div className="flex items-center gap-1 md:gap-2 ">
//       <button
//         onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
//         disabled={currentPage === 0}
//         className=" border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//       >
//         <ChevronLeft/>
//       </button>

//       <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
//         {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
//           let pageNum;
//           if (totalPages <= 5) {
//             pageNum = i;
//           } else if (currentPage < 3) {
//             pageNum = i;
//           } else if (currentPage > totalPages - 3) {
//             pageNum = totalPages - 5 + i;
//           } else {
//             pageNum = currentPage - 2 + i;
//           }

//           return (
//             <button
//               key={pageNum}
//               onClick={() => handlePageChange(pageNum)}
//               className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
//                 currentPage === pageNum
//                   ? 'bg-blue-600 text-white shadow-md'
//                   : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               {pageNum + 1}
//             </button>
//           );
//         })}
//       </div>

//       <button
//         onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
//         disabled={currentPage === totalPages - 1}
//         className=" border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//       >
//      <ChevronRight/>
//       </button>
//     </div>
//   </div>
// )}

//         {/* Enhanced Modal */}
//         <EnquiryModal showModel={showModel} setId={setId} id={id} setShowModel={setShowModel} successMessage={successMessage} errorMessage={errorMessage}/>
//       </div>
//     </div>
//   );
// };

// export default Institute;

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, MapPin, Clock, GraduationCap, Search, Tag, ChevronRight, Star, ExternalLink, Phone, Globe, DollarSign, Building2, IndianRupee, ChevronLeft, Filter, X } from 'lucide-react';
import { IoCallOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { CgDetailsMore } from "react-icons/cg";
import { Link, useSearchParams } from 'react-router-dom';
import { resources } from '../../resources';
import { types } from '../../Admin/ExcelUploads/types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import maps from '../../../assets/maps.webp';
import EnquiryModal from './EnquiryModel';
import 'react-toastify/dist/ReactToastify.css';

const successMessage = (message) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 3000
  });
};

const errorMessage = (message) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: 1000
  });
};

// Single Select Filter Dropdown Component
const SingleSelectDropdown = ({ label, options, selected, onChange, icon: Icon, placeholder }) => {
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

  const handleSelect = (value) => {
    onChange(value === selected ? '' : value); // Toggle selection
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
        className={`w-full px-2 py-2 sm:px-4 sm:py-3 text-left bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between hover:bg-gray-50 transition-colors ${
          selected ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
          {Icon && <Icon className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${selected ? 'text-blue-600' : 'text-gray-500'}`} />}
          <span className={`text-xs sm:text-sm font-medium truncate ${selected ? 'text-blue-700' : 'text-gray-700'}`}>
            {selected || placeholder || `Select ${label}`}
          </span>
        </div>
        <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''} ${
          selected ? 'text-blue-600' : 'text-gray-500'
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
              onClick={() => handleSelect(option)}
              className={`w-full px-3 py-2 text-left hover:bg-gray-50 text-xs sm:text-sm transition-colors ${
                selected === option ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
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

// Enhanced Institute Card Component
const InstituteCard = ({ course, setShowModel, setId }) => {
  const navigate = useNavigate();
  // Map API response to expected format
  const mappedCourse = {
    subLocation: course.subLocation,
    courseName: course.courseName,
    instituteName: course.instituteName,
    location: course.location,
    address: course.address,
    mobile: course.mobileNumber ? `${course.mobileNumber}` : 'N/A',
    duration: course.courseDuration,
    mode: course.modeOfClass,
    batch: course.courseBatch,
    computerLab: course.computerLab,
    price: `₹${parseFloat(course.estimatedCoursePrice).toLocaleString('en-IN')}`,
    rating: course.rating,
    reviews: parseInt(course.numberOfReviews) || 0,
    website: course.websiteUrl,
    jobAssistance: course.jobAssistance,
    description: course.instituteDescription,
    mapLocation: course.mapLocation,
    tags: course.tags ? course.tags.split(' ').map(tag => tag.replace('#', '')) : []
  };

  return (
    <>
      <div className="hidden md:block bg-white border border-gray-200 rounded-2xl p-2 hover:shadow-xl transition-all duration-300 hover:border-blue-200 transform hover:-translate-y-1">
        <div className="flex flex lg:flex-row gap-6">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{mappedCourse.courseName}</h3>
                <p className="text-lg text-blue-600 font-semibold mb-3 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  {mappedCourse.instituteName}
                </p>
              </div>
              <a
                href={mappedCourse.mapLocation}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 sm:mt-0 px-4 py-2 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center gap-2 self-start"
              >
                <img src={maps} className="w-8 h-8" />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div title="location" className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{mappedCourse.location}, <span>{mappedCourse.subLocation}</span></span>
              </div>
              <div title="course duration" className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{mappedCourse.duration}</span>
              </div>
              <div title="class mode" className="flex items-center gap-2">
                <span
                  className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                    mappedCourse.mode === 'Online'
                      ? 'bg-green-100 text-green-800'
                      : mappedCourse.mode === 'Offline'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {mappedCourse.mode}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">{mappedCourse.rating}</span>
                <span className="text-gray-500">({mappedCourse.reviews} reviews)</span>
              </div>
            </div>
            <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">{mappedCourse.description}</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={`tel:${Number(mappedCourse.mobile).toString()}`}
                className="flex items-center justify-center gap-3 bg-[#058a07] hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <IoCallOutline className="w-5 h-5" />
                <span>{Number(mappedCourse.mobile).toString()}</span>
              </a>
              <button
                onClick={() => {
                  setId(course.id);
                  setShowModel(true);
                }}
                className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <LuMessageCircleMore className="w-5 h-5" />
                <span>Request Callback</span>
              </button>
              <button
                onClick={() => navigate(`/institute/${course.id}/${mappedCourse.instituteName}`)}
                className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-all duration-200 border border-gray-200 hover:border-gray-300"
              >
                <CgDetailsMore className="w-5 h-5" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => navigate(`/institute/${course.id}/${encodeURIComponent(mappedCourse.instituteName)}`)}
        className="md:hidden bg-white border border-gray-200 rounded-2xl p-2 flex flex-col gap-1"
      >
        <div className="flex gap-5">
          <div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col">
              <div className="flex justify-between items-center gap-5">
                <span className="text-[20px] font-bold">{mappedCourse.courseName}</span>
              </div>
              <Link to={`/institute/${course.id}/${mappedCourse.instituteName}`} className="text-[16px] text-blue-500">
                {mappedCourse.instituteName}
              </Link>
            </div>
            <div className="flex gap-2 items-center">
              <span className="bg-blue-700 text-white flex items-center p-1 gap-2 w-[60px] rounded-lg">
                <span>{mappedCourse.rating}</span>
                <Star size={16} />
              </span>
              <div className="flex">
                <img className="w-6 h-6" src={maps} />
                <span>{mappedCourse.location}, <span>{mappedCourse.subLocation}</span></span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-center my-2">
          <a
            href={`tel:${Number(mappedCourse.mobile).toString()}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex items-center justify-center px-2 gap-2 bg-[#058a07] hover:bg-green-600 text-white py-1 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <IoCallOutline className="w-5 h-5" />
            <span>Call Now</span>
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setId(course.id);
              setShowModel(true);
            }}
            className="flex items-center justify-center px-2 gap-2 bg-blue-700 hover:bg-blue-700 text-white py-1 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <LuMessageCircleMore className="w-5 h-5" />
            <span>Request Callback</span>
          </button>
        </div>
      </div>
    </>
  );
};

// Enhanced Modal Component

const Institute = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const selectedLocation = searchParams.get("location") || "";
  const selectedPrice = searchParams.get("price") || "";
  const selectedDuration = searchParams.get("courseDuration") || "";
  const selectedMode = searchParams.get("modeOfClass") || "";
  const searchCompany = searchParams.get("instituteName") || "";
  const currentPage = parseInt(searchParams.get("page")) || 0;

  const [showModel, setShowModel] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [dropdownData, setDropdownData] = useState({
    location: [],
    price: [],
    courseDuration: [],
    modeOfClass: []
  });
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const getData = () => {
    setLoading(true);
    const params = new URLSearchParams({
      type: types.COACHING,
      page: currentPage.toString(),
      size: "5"
    });

    if (selectedLocation && selectedLocation.trim() !== "") {
      params.append("location", selectedLocation);
    }
    if (selectedPrice && selectedPrice.trim() !== "") {
      const numericPrice = selectedPrice.replace(/[₹,]/g, '');
      params.append("price", numericPrice);
    }
    if (selectedDuration && selectedDuration.trim() !== "") {
      params.append("duration", selectedDuration);
    }
    if (selectedMode && selectedMode.trim() !== "") {
      params.append("modeOfClass", selectedMode);
    }
    if (searchCompany && searchCompany.trim() !== "") {
      params.append("key", searchCompany);
    }

    axios.get(`${resources.APPLICATION_URL}view/data?${params}`)
      .then(response => {
        if (Array.isArray(response.data.content)) {
          setData(response.data.content);
          setTotalPages(response.data.totalPages || 1);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setData([]);
      })
      .finally(() => setLoading(false));
  };

  const getDropdownData = () => {
    axios.get(`${resources.APPLICATION_URL}drop-down?type=${types.COACHING}`)
      .then(response => {
        setDropdownData(response.data);
      })
      .catch(error => {
        console.error("Error fetching dropdown data:", error);
      });
  };

  const updateFilters = (newFilters) => {
    const updatedParams = {
      location: selectedLocation,
      price: selectedPrice,
      courseDuration: selectedDuration,
      modeOfClass: selectedMode,
      instituteName: searchCompany,
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
      ...(selectedLocation && { location: selectedLocation }),
      ...(selectedPrice && { price: selectedPrice }),
      ...(selectedDuration && { courseDuration: selectedDuration }),
      ...(selectedMode && { modeOfClass: selectedMode }),
      ...(searchCompany && { instituteName: searchCompany }),
      page: newPage.toString()
    };
    setSearchParams(currentParams);
  };

  const handleLocationChange = (selected) => {
    updateFilters({ location: selected });
  };

  const handlePriceChange = (selected) => {
    updateFilters({ price: selected });
  };

  const handleDurationChange = (selected) => {
    updateFilters({ courseDuration: selected });
  };

  const handleModeChange = (selected) => {
    updateFilters({ modeOfClass: selected });
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = selectedLocation || selectedPrice || selectedDuration || selectedMode || searchCompany;

  useEffect(() => {
    getDropdownData();
  }, []);

  useEffect(() => {
    getData();
  }, [selectedLocation, selectedPrice, selectedDuration, selectedMode, searchCompany, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const formatPrice = (price) => {
    return `₹${parseInt(price).toLocaleString('en-IN')}`;
  };

  const priceOptions = dropdownData.price?.map(price => formatPrice(price)) || [];
  const locationOptions = dropdownData.location || [];
  const durationOptions = dropdownData.courseDuration || [];
  const modeOptions = dropdownData.modeOfClass || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <ToastContainer />
      <div className="fixed z-10 bg-white p-2 w-full">
        <div className="">
          <div className="flex gap-2 items-center text-blue-600 mb-4">
            <a href="/" className="hover:text-blue-800 transition-colors duration-200">Home</a>
            <ChevronRight size={18} />
            <span className="text-gray-600">Institutes</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Find Your Perfect Course</h1>
          <p className="md:text-lg text-gray-600 text-sm sm:text-base">Find the Best Coaching Institutes – Online & Offline</p>
        </div>

        <div className="md:hidden my-2 flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2 rounded-md flex items-center justify-center gap-2 transition-colors ${
              hasActiveFilters
                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                : 'bg-white text-black border border-gray-300'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          <div className="lg:col-span-1">
              <input
                type="text"
                placeholder="institute name or course name"
                value={searchCompany}
                onChange={e => updateFilters({ instituteName: e.target.value })}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
        </div>

        <div className={`bg-white rounded-lg md:mt-2 p-4 md:p-0 md:w-[80%] mx-auto ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <SingleSelectDropdown
              label="Location"
              options={locationOptions}
              selected={selectedLocation}
              onChange={handleLocationChange}
              icon={MapPin}
              placeholder="Location"
            />
            {/* <SingleSelectDropdown
              label="Price"
              options={priceOptions}
              selected={selectedPrice}
              onChange={handlePriceChange}
              icon={IndianRupee}
              placeholder="Any Price"
            /> */}
            <SingleSelectDropdown
              label="Duration"
              options={durationOptions}
              selected={selectedDuration}
              onChange={handleDurationChange}
              icon={Clock}
              placeholder=" Duration"
            />
            <SingleSelectDropdown
              label="Mode"
              options={modeOptions}
              selected={selectedMode}
              onChange={handleModeChange}
              icon={GraduationCap}
              placeholder=" Mode"
            />
            <div className="hidden md:block lg:col-span-1 ">
              <input
                type="text"
                placeholder="institute name or course name"
                value={searchCompany}
                onChange={e => updateFilters({ instituteName: e.target.value })}
                className="w-full min-w-[400px]  px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
            <div className="hidden md:block">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-44 md:pt-54 p-4 ">
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-6 text-lg">Loading courses...</p>
          </div>
        )}
        {!loading && (
          <div className="space-y-6 mb-8">
            {data.length > 0 ? (
              data.map((course, index) => (
                <InstituteCard key={course.id || index} course={course} setShowModel={setShowModel} setId={setId} />
              ))
            ) : (
              <div className="text-center py-20">
                <GraduationCap className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-500 text-lg">Try adjusting your filters to find more courses.</p>
              </div>
            )}
          </div>
        )}
        {totalPages > 1 && !loading && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-8">
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => updatePage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft />
              </button>
              <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i;
                  } else if (currentPage < 3) {
                    pageNum = i;
                  } else if (currentPage > totalPages - 3) {
                    pageNum = totalPages - 5 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => updatePage(pageNum)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum + 1}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => updatePage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
        <EnquiryModal showModel={showModel} setId={setId} id={id} setShowModel={setShowModel} successMessage={successMessage} errorMessage={errorMessage} />
      </div>
    </div>
  );
};

export default Institute;